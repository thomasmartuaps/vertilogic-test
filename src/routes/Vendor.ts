import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const router = Router();

interface Restaurant {
  name: string;
};

const unhandledErrorMsg = 'Unhandled error! Check references and handle this error accordingly.';

// create function made in 15 minutes
router.post('/', async (req, res) => {
  const { body }: { body: Restaurant } = req;
  const result = await prisma.vendor.create({
    data: {
      name: body.name
    }
  }).then((res) => {
    return {
      status: 200,
      vendor: res,
      message: 'New vendor created!'
    }
  }).catch((e) => {
    if (e.code === 'P2002') {
      return {
        status: 400,
        errorCode: e.code,
        message: `${e.meta.target} already exists!`
      }
    } else {
      return {
        status: 500,
        errorCode: e.code,
        error: e.meta,
        message: unhandledErrorMsg
      }
    }
  })

  return res.status(result.status).json(result);
});

// read function made in 5 minutes
router.get('/', async (req, res) => {
  const result = await prisma.vendor.findMany({
    include: {
      tags: {
        include: {
          tag: true
        }
      },
      menu: {
        include: {
          order: true
        }
      }
    }
  })
    .then((res) => {
      return {
        status: 200,
        vendors: res,
        message: "Vendors found."
      }
    })
    .catch((e) => {
      return {
        status: 500,
        message: unhandledErrorMsg
      }
    })

  return res.status(result.status).json(result);
});


router.get('/:id', async (req, res) => {
  const result = await prisma.vendor.findUnique({
    where: {
      id: Number(req.params.id)
    },
    include: {
      tags: {
        include: {
          tag: true
        }
      },
      menu: {
        include: {
          order: true
        }
      }
    }
  })
    .then((res) => {
      return {
        status: 200,
        vendor: res,
        message: "Vendors found."
      }
    })
    .catch((e) => {
      return {
        status: 500,
        message: unhandledErrorMsg
      }
    })

  return res.status(result.status).json(result);
});
router.put('/:id');
router.delete('/:id');

export default router;
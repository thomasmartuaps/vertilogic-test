import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const router = Router();

interface Restaurant {
  name: string;
};

const unhandledErrorMsg = 'Unhandled error! Check references and handle this error accordingly.';

// create tag function written in 5 minutes
router.post('/', async (req, res) => {
  const { body } = req;
  const result = await prisma.tag.create({
    data: {
      title: body.title
    }
  }).then((res) => {
    return {
      status: 201,
      tag: res,
      message: "New Tag added."
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

// read function written in 5 minutes
router.get('/', async (req, res) => {
  const result = await prisma.tag.findMany({
    include: {
      vendors: {
        include: {
          vendor: true
        }
      }
    }
  })
    .then((res) => {
      return {
        status: 200,
        tags: res,
        message: "Tags found."
      }
    })
    .catch((e) => {
      return {
        status: 500,
        message: unhandledErrorMsg
      }
    })

  return res.status(result.status).json(res);
});

// read by title function written in 10 minutes
router.get('/:title', async (req, res) => {
  const result = await prisma.tag.findUnique({
    where: {
      title: req.params.title
    },
    include: {
      vendors: {
        include: {
          vendor: true
        }
      }
    }
  })
    .then((res) => {
      if (res) {
        return {
          status: 200,
          tag: res.title,
          vendors: res.vendors,
          message: "Vendor found based on tag."
        }
      }
      else {
        return {
          status: 404,
          message: "No vendor under such tag."
        }
      }
    })
    .catch((e) => {
      return {
        status: 500,
        message: unhandledErrorMsg
      }
    })

  return res.status(result.status).json(result);
})

export default router;
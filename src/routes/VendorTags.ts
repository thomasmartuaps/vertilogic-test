import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const router = Router();

interface VendorTags {
  vendorId: number;
  tagId: number;
};

const unhandledErrorMsg = 'Unhandled error! Check references and handle this error accordingly.';

// create function made in 30 minutes
router.post('/', async (req, res) => {
  const { body }: { body: VendorTags } = req;
  const result = await prisma.vendorTags.create({
    data: {
      vendor: {
        connect: {
          id: Number(body.vendorId)
        }
      },
      tag: {
        connect: {
          id: Number(body.tagId)
        }
      }
    }
  }).then((res) => {
    return {
      status: 200,
      vendortag: res,
      message: 'New tag added to vendor!'
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

router.get('/:id');
router.put('/:id');
router.delete('/:id');

export default router;
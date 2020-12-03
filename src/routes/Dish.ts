import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface DishData {
  menuname: string;
  vendorId: number;
}

const unhandledErrorMsg = 'Unhandled error! Check references and handle this error accordingly.';


const router = Router();

// create function written in 30 minutes
router.post('/', async (req, res) => {
  const { body }: { body: DishData } = req;
  const result = await prisma.dish.create({
    data: {
      menuname: body.menuname,
      vendor: {
        connect: { id: Number(body.vendorId) }
      }
    }
  }).then((res) => {
    return {
      status: 201,
      dish: res,
      message: 'A new dish menu created!'
    }
  })
    .catch((e) => {
      return {
        status: 500,
        errorCode: e.code,
        error: e.meta,
        message: unhandledErrorMsg
      }
    })

  return res.status(result.status).json(result);
});
router.put('/:id');
router.delete('/:id');

export default router;
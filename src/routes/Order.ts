import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface OrderData {
  specialreq: string;
  dishId: number;
}

const unhandledErrorMsg = 'Unhandled error! Check references and handle this error accordingly.';


const router = Router();

// create function written in 5 minutes
router.post('/', async (req, res) => {
  const { body }: { body: OrderData } = req;
  const result = await prisma.order.create({
    data: {
      specialreq: body.specialreq || '',
      dish: {
        connect: { id: Number(body.dishId) }
      }
    }
  }).then((res) => {
    return {
      status: 201,
      dish: res,
      message: 'A new order created!'
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

export default router;
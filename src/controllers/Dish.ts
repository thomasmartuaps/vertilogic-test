import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface DishData {
  menuname: string;
  vendorId: number;
}

const unhandledErrorMsg = 'Unhandled error! Check references and handle this error accordingly.';


class Dish {
  // create function written in 30 minutes
  static async create (req, res) {
    const { body }: { body: DishData } = req;
    const result = await prisma.dish.create({
      data: {
        menuname: body.menuname,
        vendor: {
          connect: { id: body.vendorId }
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
  }

  // static async read (req, res) {
  //   const { body } = req;
  //   const result = await prisma.dish.findUnique({
  //     where: {
  //       id: 
  //     }
  //   })
  // }
}

export default Dish
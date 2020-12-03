import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Restaurant {
  name: string;
}

class Vendor {

  // create function made in 15 minutes
  static async create (req, res) {
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
          message: 'Unhandled error! Check references and handle this error accordingly.'
        }
      }
    })

    return res.status(result.status).json(result);
  }
}

export default Vendor
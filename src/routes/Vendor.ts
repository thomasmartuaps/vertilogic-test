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

// Basic READ endpoint + Querying endpoint
// read function made in 5 minutes + 20 minutes debugging for include
// + 1 hour for querying
router.get('/', async (req, res) => {
  const { query }: { query: any } = req;
  const tags = query.tag;
  if (tags) {
    let orArray: any[] = [];

    const mapperPromise = new Promise ((resolve, reject) => {
      console.log(tags)
      console.log(orArray)
      tags.map((tag: string) => {
        orArray.push({
          tag: {
            title: tag
          }
        })
      })
      console.log(orArray, 'mapped')
      resolve('Go to prisma')
    }) 

    const result = await mapperPromise
      .then(async (res) => {
        console.log('lewat then pertama')
        return await prisma.vendor.findMany({
        include: {
          tags: {
            where: {
              OR: orArray
            }
          },
          menu: true
        }
      })
    })
      .then((res) => {
        return {
          status: 200,
          vendors: res,
          message: "Vendors found according to query."
        }
      })
      .catch((e) => {
        console.log(e)
        return {
          status: 500,
          error: e,
          message: unhandledErrorMsg
        }
      })
  
    return res.status(result.status).json(result);
  } else {
    const result = await prisma.vendor.findMany({
      include: {
        tags: {
          include: {
            tag: true
          }
        },
        menu: true
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

    return res.status(200).json(result)
  }
});

router.get('/test', async (req, res) => {
  const { query } = req;
  console.log(query);
  return res.status(200).json(query);
})

// read function written in 5
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
        message: "Vendor found."
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


// ENDPOINT FOR RETRIEVING DISHES OF SPECIFIC RESTAURANT
// read function written in 5
router.get('/:name', async (req, res) => {
  const result = await prisma.vendor.findUnique({
    where: {
      name: req.params.name
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
      if (res) {
        return {
          status: 200,
          vendor: res.name,
          menu: res.menu,
          message: "Vendor found, retrieved their dishes."
        }
      }
      else {
        return {
          status: 404,
          message: "No vendor with that name."
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
});

// Update function created in 15 minutes
router.put('/:id', async (req, res) => {
  const { body }: { body: Restaurant } = req;
  const vendorId = Number(req.params.id);
  const result = await prisma.vendor.update({
    where: {
      id: vendorId,
    },
    data: {
      name: body.name
    }
  }).then((res) => {
    return {
      status: 200,
      vendor: res,
      message: 'Vendor updated.'
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

// 
router.delete('/:id', async (req, res) => {
  const vendorId = Number(req.params.id);
  const result = await prisma.vendor.delete({
    where: {
      id: vendorId
    }
  }).then((res) => {
    return {
      status: 200,
      vendor: res,
      message: 'Vendor deleted.'
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

export default router;
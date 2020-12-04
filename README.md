# vertilogic-test

**Backend setup** <br>
I use Prisma as the ORM for this backend application, which might not be familiar to you, so I decided to put a quick tutorial to help you get the server up and running quickly. To set up the backend, follow these steps:
1. Please install the dependencies using the terminal command yarn install
2. Create a .env file in the prisma folder
3. Copy-paste the .txt files to the .env file
4. configure the prisma .env file according to your postgresql configuration (Keep the database name as is.)
5. create a new database with the name vertilogic_test and connect to it in the psql shell using the command \c vertilogic_test
6. Run the schema.sql script file in the root folder using from psql shell using the command \i 'the exact location of the schema.sql file'
7. Run the terminal command yarn prisma introspect, then yarn prisma generate (More info on this, look up the primsa tutorial.)
8. You should be able to start the backend using the command yarn dev from the terminal

**API Endpoints:**
<br>
<br>

**POST "/vendor"** => Add new vendor
**body:**

```JSON
name: string
```

**GET "/vendor"** => get all vendor<br>
**GET "/vendor?tag[]=tagname&tag[]=secondtagname"** => get all vendor, with query filter<br>
**GET "/vendor/:restaurantname"** => retrieving dish for specific restaurant<br>
**PUT "/vendor/:id"** => update vendor<br>
**DELETE "/vendor/:id"** => delete vendor<br>
<br>
**POST "/tag"** => Add new tag<br>
**body:**

```JSON
title: string
```

**GET "/tag"** => get all tags<br>
**GET "/tag/:name"** => find restaurants based on a tag, if querying is not possible<br>
<br>
**POST "/vendortags"** => add tag to vendor<br>
**body:** 

```JSON
vendorId: number,
tagId: number
```

<br><br>
**POST  "/dish"** => add new dish<br>
**body:** 

```json
menuname: string,
vendorId: number
```

<br>
<br>
**
**POST "/order"** => add new order<br>
**body:** 

```JSON
specialreq: string,
dishId: number
```


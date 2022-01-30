import { Router } from "https://deno.land/x/oak/mod.ts";
// import { config } from 'https://deno.land/x/dotenv/mod.ts'

export interface Client {
    name: string;
    company: string;
    email: string;
    telephone?: string;
    notes?: string;
}
const router = new Router()

// const { DATA_API_KEY } = config()

const BASE_URI = `https://data.mongodb-api.com/app/${Deno.env.get('DATA_API_KEY')}/endpoint/data/beta`

const connections = {
    collection: 'clients',
    database: "client_db",
    dataSource: 'Cluster0'
}

const options = {
    method: "POST",
    headers: {
        'Content-Type': "application/json",
        'api-key': Deno.env.get('DATA_API_KEY') || ''
    },
    body: ""
}

router.get('/clients', async (ctx) => {

    // we need to find all the results
    const URI = `${BASE_URI}/action/find`

    options.body = JSON.stringify({
        ...connections
    })

    // we do a fetch
    const res = await fetch(URI, options)
    const data = await res.json()

    ctx.response.status = 200

    ctx.response.body = data
})

router.get('/clients/:id', async (ctx) => {

    const { id } = ctx.params

    const URI = `${BASE_URI}/action/findOne`

    options.body = JSON.stringify({
        ...connections,
        filter: {
            _id: {
                "$oid": id
            }
        }
    })

    const res = await fetch(URI, options)

    const data = await res.json()

    if(!data) return
    ctx.response.status = 200
    ctx.response.body = data
})

router.post('/clients', async (ctx) => {

    const bodyData = ctx.request.body()

    const newUser: Client = await bodyData.value

    // we what to insert
    const URI = `${BASE_URI}/action/insertOne`

    options.body = JSON.stringify({
        ...connections,
        document: newUser

    })

    const res = await fetch(URI, options)
    const data = await res.json()

    ctx.response.status = 200
    ctx.response.body = data
})

router.put('/clients/:id', async (ctx) => {
    // get the id by params
    const { id } = ctx.params

    // we what to update
    const URI = `${BASE_URI}/action/updateOne`

    // I get the body
    const body = ctx.request.body()
    const dataClient: Client = await body.value

    options.body = JSON.stringify({
        ...connections,
        filter: {
            _id: {
                $oid: id
            }
        },
        update: {
            $set: dataClient
        }
    })

    const res = await fetch(URI, options)
    const data = await res.json()
     
    // I response to the client
    ctx.response.body = data
})


router.delete('/clients/:id', async (ctx) => {
    // get the id by params
    const { id } = ctx.params
    console.log(id);
    // I found the client in my arrays of clients
     // we what to update
    const URI = `${BASE_URI}/action/deleteOne`

    options.body = JSON.stringify({
        ...connections,
        filter: {
            _id: {
                $oid: id
            }
        }
    })

    const res = await fetch(URI, options)  
    const data = await res.json()
    ctx.response.status = 200
    ctx.response.body = data
})

export default router

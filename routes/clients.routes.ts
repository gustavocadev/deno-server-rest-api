import { Router } from "https://deno.land/x/oak/mod.ts";
import readJSON from '../jsonMethods/readJSON.ts';
import writeJSON from '../jsonMethods/writeJSON.ts';
export interface Client {
    name: string;
    company: string;
    email: string;
    telephone?: string;
    notes?: string;
    id: string
}

const router = new Router()

const { clients } = await readJSON()

router.get('/clients', (ctx) => {
    ctx.response.status = 200
    ctx.response.body = clients
})

router.get('/clients/:id', (ctx) => {

    const { id } = ctx.params

    const clientFound = clients.find(client => client.id === id)

    if(!clientFound) return
    ctx.response.status = 200
    ctx.response.body = clientFound
})

router.post('/clients', async (ctx) => {

    const body = ctx.request.body()

    const data: Client = await body.value

    const newUser = {
        ...data,
        id: globalThis.crypto.randomUUID()
    }

    clients.push( newUser)

    await writeJSON(clients)

    ctx.response.status = 200
    ctx.response.body = newUser
})

router.put('/clients/:id', async (ctx) => {
    // get the id by params
    const { id } = ctx.params

    const clientFound = clients.find(client => client.id === id)

    // I get the body
    const body = ctx.request.body()
    const data: Client = await body.value

    if (!clientFound) return 

    // I update the changes
    clientFound.name = data.name
    clientFound.company = data.company
    clientFound.email = data.email
    clientFound.notes = data.notes
    clientFound.telephone = data.telephone

    await writeJSON(clients)
     
    // I response to the client
    ctx.response.body = data
})


router.delete('/clients/:id', async (ctx) => {
    // get the id by params
    const { id } = ctx.params
    console.log(id);
    // I found the client in my arrays of clients
    const clientFound = clients.find((client) => client.id === id)

    console.log(clientFound);
    if (!clientFound) return
    
    const idx = clients.indexOf(clientFound)

    clients.splice(idx, 1)

    await writeJSON(clients)
    
    ctx.response.status = 200
    ctx.response.body = clients
})

export default router

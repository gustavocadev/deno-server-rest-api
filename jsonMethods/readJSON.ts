import { Client } from '../routes/clients.routes.ts';
import * as path from "https://deno.land/std/path/mod.ts";


interface JSONClient {
    clients: Client[]
}

const readJSON = async (): Promise<JSONClient> => {
    const data = await Deno.readTextFile(path.join(Deno.cwd(), 'db.json'))
    
    // console.log();
    return JSON.parse(data)
}
export default readJSON
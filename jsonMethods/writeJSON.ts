import type { Client } from '../routes/clients.routes.ts'
import * as path from "https://deno.land/std/path/mod.ts";

const writeJSON = async (newArray: Client[]) => {
    const newData = {
        clients: newArray
    }
    await Deno.writeTextFile(path.join(Deno.cwd(), 'db.json'), JSON.stringify(newData))
}


export default writeJSON
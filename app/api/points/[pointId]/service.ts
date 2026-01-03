import { prisma } from "@/app/lib/prisma";
import { toPOIsDTO } from "./mapper";

export async function editPOIs(
    id: number,
    body: editPOIsBody): Promise<POIsDTO>{
    
    const pOI = await prisma.pOIs.update({
        where: {id: id},
            data: {
            name: body.name
            },
        });

    return toPOIsDTO(pOI); 
}

export async function deletePOIs(id:number) {
    return await prisma.pOIs.delete({
            where: {id: id}
            });

}
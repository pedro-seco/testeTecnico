import { prisma } from "@/app/lib/prisma";
import { toPontoDTO } from "./mapper";

export async function editarPonto(
    id: number,
    body: editarPontoBody): Promise<PontoDTO>{
    
    const pOI = await prisma.pOIs.update({
        where: {id: id},
            data: {
            titulo: body.titulo ?? undefined,
            },
        });

    return toPontoDTO(pOI); 
}

export async function deletarPonto(id:number) {
    return await prisma.pOIs.delete({
            where: {id: id}
            });

}
import { prisma } from "@/app/lib/prisma";
import { POIs } from "@/prisma/generated/prisma/client";
import { toPontoNoMapaDTO } from "./mapper";

export async function criarPontoNoMapa(mapId:number, body: POIs): Promise<PontoNoMapaDTO>{
    const pontoCriado = await prisma.pOIs.create({
            data: {
                titulo:body.titulo,
                lat:body.lat,
                long:body.long,
                mapId: Number(mapId),
            }
        });

    return toPontoNoMapaDTO(pontoCriado);
}

export async function deletarPontosNoMapa(id:number){
    return await prisma.pOIs.deleteMany({
                where: {
                mapId: id,
            },
        });
}
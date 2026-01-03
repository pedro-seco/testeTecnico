import { prisma } from "@/app/lib/prisma";
import { POIs } from "@/prisma/generated/prisma/client";
import { toPOIsOnMapDTO } from "./mapper";


//  O MAP ID VEM DA URL -> PROMISE MAP ID CONSERTAR DEPOIS
export async function createPOIsOnMap(mapId:number, body: POIs): Promise<POIsOnMapDTO>{
    const createdPOI = await prisma.pOIs.create({
            data: {
                name:body.name,
                latitude:body.latitude,
                longitude:body.longitude,
                mapId: Number(mapId),
            }
        });
    return toPOIsOnMapDTO(createdPOI);
}

export async function deleteAllPOIsOnMap(id:number){
    return await prisma.pOIs.deleteMany({
                where: {
                mapId: id,
            },
        });
}
import { prisma } from "@/app/lib/prisma";
import { MapWithPOIsDTO} from "../types";
import { toMapWithPOIsDTO } from "../mapper";

export async function searchMapWithPOIs(id:number): Promise<MapWithPOIsDTO | null>{
    const maps = await prisma.map.findUnique({
        where: {id: id},
        include: {pois: true}
    });
    return maps ? toMapWithPOIsDTO(maps) : null;
}

export async function deleteMapWithPOIs(id:number) {
    await prisma.pOIs.deleteMany({
            where: {mapId: id}
        });

    await prisma.map.delete({
            where: {id: id},
            include: {pois: true}
        });
}
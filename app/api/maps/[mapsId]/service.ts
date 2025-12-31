import { prisma } from "@/app/lib/prisma";
import { MapaComPontoDTO} from "../types";
import { toMapaComPontoDTO } from "../mapper";

export async function buscarMapaComPontos(id:number): Promise<MapaComPontoDTO | null>{
    const mapa = await prisma.mapas.findUnique({
        where: {id: id},
        include: {pontos: true}
    });
    return mapa ? toMapaComPontoDTO(mapa) : null;
}

export async function deletarMapaComPontos(id:number) {
    await prisma.pOIs.deleteMany({
            where: {mapId: id}
        });

    await prisma.mapas.delete({
            where: {id: id},
            include: {pontos: true}
        });
}
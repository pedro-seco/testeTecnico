import { prisma } from "@/app/lib/prisma";
import { toMapaComPontoDTO, toMapaDTO } from "./mapper";
import { MapaComPontoDTO, criarMapaBody, MapaDTO } from "./types";

export async function buscarMapas(): Promise<MapaComPontoDTO[]> {
    const mapasEncontrados = await prisma.mapas.findMany({
        include: {pontos: true},
        });
    return mapasEncontrados.map(toMapaComPontoDTO)
}

export async function criarMapa(
    body:criarMapaBody): Promise<MapaDTO>{
    
    const mapaCriado = await prisma.mapas.create({
            data: {name: body.name},
        });

    return toMapaDTO(mapaCriado);
}
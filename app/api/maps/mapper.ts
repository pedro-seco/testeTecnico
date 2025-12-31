import { toPontoDTO } from "../points/[pointId]/mapper";
import { MapaComPontoDTO, MapaDTO, mapaComPontos } from "./types";
import { Mapas } from "@/prisma/generated/prisma/browser";

export function toMapaComPontoDTO(mapas: mapaComPontos): MapaComPontoDTO{
    return {
        id: mapas.id,
        name: mapas.name ?? undefined,
        pontos: mapas.pontos.map(toPontoDTO)
    }
}

export function toMapaDTO(mapas: Mapas):MapaDTO{
    return {
        id: mapas.id,
        name: mapas.name ?? undefined,
    }
}
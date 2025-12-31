import { POIs } from "@/prisma/generated/prisma/client";

export function toPontoNoMapaDTO(ponto: POIs): PontoNoMapaDTO{
    return {
        id: ponto.id,
        titulo: ponto.titulo ?? undefined,
        lat: ponto.lat,
        long: ponto.long,
        mapId: ponto.mapId
    }
}
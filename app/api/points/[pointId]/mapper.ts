import { POIs } from "@/prisma/generated/prisma/client";

export function toPontoDTO(pOI: POIs): PontoDTO{
    return {
        id: pOI.id,
        titulo: pOI.titulo ?? undefined,
        lat: pOI.lat,
        long: pOI.long
    }
}
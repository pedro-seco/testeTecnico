import { POIs, Prisma } from "@/prisma/generated/prisma/client"

export type MapaComPontoDTO = {
    id: number, 
    name?: string,
    pontos: PontoDTO[],
}

export type MapaDTO = {
    id:number,
    name?: string
}

export type criarMapaBody = {
    name?: string,
    pontos?: POIs[]
}

export type mapaComPontos = Prisma.MapasGetPayload<{include:{pontos: true}}>
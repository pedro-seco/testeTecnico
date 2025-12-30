import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// GET -> Retorna pontos de um mapa
export async function GET(
    request: Request,
    context: {params: Promise<{mapsId:string}>}
    ){
    const {mapsId} = await context.params;
    const retornaPontos = await prisma.mapas.findUnique({
        where: {
            id: parseInt(mapsId),
        },
        include: {
            pontos: true,
        },
    });
    
    return NextResponse.json(retornaPontos?.pontos, {
        status: 200
    });
}

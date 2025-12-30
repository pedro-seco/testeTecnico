import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

//POST -> criaPonto(dados)
export async function POST(
    request: Request,
    context: {params: Promise<{mapsId:number}>}
){
    const {mapsId} = await context.params;
    const body = await request.json();
    const criaPonto = await prisma.pOIs.create({
        data: {
            titulo:body.titulo,
            lat:body.lat,
            long:body.long,
            mapId: mapsId,
        }
    });

    return NextResponse.json(criaPonto,{
        status:201,
    });
}

// DELETE -> deletaPontos(idMapa)
export async function DELETE(
    request: Request,
    context: {params: Promise<{mapsId:string}>}
    ){ 
    const {mapsId} = await context.params;
    const deletaPonto = await prisma.pOIs.deleteMany({
        where: {
            mapId: parseInt(mapsId),
        },
    });
    return NextResponse.json(deletaPonto, {
        status: 202
    });
}

import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";


// PUT -> editaPonto(id, alteracoes)
export async function PUT(
    request: Request, 
    context: { params: Promise<{pointId:string}>}
){  
    const body = await request.json();
    const {pointId} = await context.params;
    const editaPonto = await prisma.pOIs.update({
        where: {
            id: parseInt(pointId),
        },
        data: {
            titulo: body.titulo ?? undefined,
            lat: body.lat ?? undefined,
            long: body.long ?? undefined,
        },
    });

    return NextResponse.json(editaPonto, {
        status: 202
    });
}

// DELETE -> deletaPonto(id)
export async function DELETE(
    request:Request,
    context: {params: Promise<{pointId:string}>}
    ){
    const {pointId} = await context.params;
    const deletaPonto = await prisma.pOIs.delete({
        where: {
            id: parseInt(pointId),
        }
    });
    return NextResponse.json(deletaPonto,{
        status: 202
    })
}
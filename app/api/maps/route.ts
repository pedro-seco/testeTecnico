import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

//GET -> Lista mapas e seus respectivos pontos
export async function GET(){
    try{
    const maps = await prisma.mapas.findMany({
    include:{
      pontos: true,
    },
  });

  return NextResponse.json(maps,{
    status: 200
});
  
} catch (error) {
    console.error("Erro ao buscar mapas: ", error);
    return NextResponse.json(
        {error: "Erro interno ao buscar os mapas"},
        {status: 500 }
    );
  }
}

//POST -> Cria um mapa (e seus respectivos pontos)
export async function POST(request: Request){
    const body = await request.json();
    const novoMapa = await prisma.mapas.create({
        data: {
            name: body.name,
            pontos: {
                create: body.pontos || []
            },
        },
        include: {
            pontos: true,
        },
    });

  return NextResponse.json(novoMapa, {
    status: 201
});
}

//DELETE -> Deleta um mapa, junto com todos os seus pontos
export async function DELETE(request: Request){
    const body = await request.json();
    const deletarPontos = await prisma.pOIs.deleteMany({
        where: {
            mapId: body.id,
        }
    });

    const deletarMapa = await prisma.mapas.delete({
        where: {
            id: body.id,
        },
        include: { /* retornoa pontos [] */
            pontos: true,
        }
    });

    return NextResponse.json(deletarMapa,{
        status: 202,
    })
}
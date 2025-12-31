import { NextResponse } from "next/server";
import { badRequest, prismaToHttp } from "@/app/api/helper/httpUtils";
import { isAtributeMissing, isBodyEmpty, isIdValid } from "@/app/api/helper/commonFunctions";
import { criarPontoNoMapa, deletarPontosNoMapa } from "./services";

// /api/maps/[mapsId]/points
//POST -> criaPonto(dados)
export async function POST(
    request: Request,
    context: {params: Promise<{mapsId:string}>}
    ){

    try{
        const {mapsId} = await context.params;
        const id = Number(mapsId);

        if (!isIdValid(id) ){
            return badRequest()
        }

        const body = await request.json();
        
        if(isBodyEmpty(body)){
            return badRequest()
        }

        for (const atributo in body){
            if(isAtributeMissing(atributo)){
                return badRequest();
            }
        }

        const pontoCriado = await criarPontoNoMapa(id, body)
        
        return NextResponse.json(pontoCriado,{status: 200});
    } catch(error) {return prismaToHttp(error)}
    
}

// DELETE -> deletaPontos(idMapa)
export async function DELETE(
    request: Request,
    context: {params: Promise<{mapsId:string}>}
        ){
        try{
            const {mapsId} = await context.params;
            const id = Number(mapsId);
            
            if (!isIdValid(id)){
                return badRequest()
            }

            await deletarPontosNoMapa(id);

            return new NextResponse(null, {status: 204});
        } catch(error) {return prismaToHttp(error)}
    }
import { NextResponse } from "next/server";
import { badRequest, prismaToHttp } from "../helper/httpUtils";
import { isAtributeMissing, isBodyEmpty } from "../helper/commonFunctions";
import { buscarMapas, criarMapa } from "./service";

// api/maps/
//GET -> Lista mapas e seus respectivos pontos
export async function GET(){
    try{
        const mapasEncontrados = await buscarMapas();

        return NextResponse.json(mapasEncontrados, {status: 200});
    } catch(error) {return prismaToHttp(error)}
}

//POST -> Cria um mapa
export async function POST(request: Request){
    try{
        const body = await request.json();

        if (isBodyEmpty(body) || isAtributeMissing(body.name)){
            return badRequest()
        }

        const novoMapa = await criarMapa(body);

        return NextResponse.json(novoMapa, {status: 200});
    } catch(error) {return prismaToHttp(error)}
}
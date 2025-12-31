import { NextResponse } from "next/server";
import { badRequest, prismaToHttp } from "../../helper/httpUtils";
import { isIdValid } from "../../helper/commonFunctions";
import { buscarMapaComPontos, deletarMapaComPontos } from "./service";

//app/api/maps/[mapsId]
//GET -> retornaPontos(mapsId)

//Retorna os pontos de um mapa
export async function GET(
    request: Request,
    context: {params: Promise<{mapsId:string}>}
    ){
        try{
            const {mapsId} = await context.params;
            const id = Number(mapsId);
            
            if (!isIdValid(id)){
                return badRequest()
            }

            const dados = await buscarMapaComPontos(id);

            return NextResponse.json(dados, { status: 200});
        } catch(error) {return prismaToHttp(error)}
}

//DELETE -> Deleta um mapa, junto com todos os seus pontos
export async function DELETE(
    request: Request,
    context: {params: Promise<{mapsId:string}>}
){
    try{
        const {mapsId} =  await context.params;
        const id = Number(mapsId);

        if (!isIdValid(id)){
            return badRequest()
        }

        await deletarMapaComPontos(id);

        return new NextResponse(null, {status: 204})
    } catch(error)  {return prismaToHttp(error)}
}
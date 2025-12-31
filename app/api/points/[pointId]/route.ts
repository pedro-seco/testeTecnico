import { NextResponse } from "next/server";
import {isBodyEmpty, isIdValid} from "../../helper/commonFunctions";
import { badRequest, prismaToHttp } from "../../helper/httpUtils";
import { deletarPonto, editarPonto } from "./service";

// /api/points/[pointId]
// PUT -> editaPonto(id, alteracoes)

export async function PUT(
    request: Request, 
    context: {params: Promise<{pointId:string}>}){

    try {
        const {pointId} = await context.params; 
        const id = Number(pointId);
        
        if (!isIdValid(id)) {
            return badRequest();
        }

        const body = await request.json();

        if(isBodyEmpty(body)){
            return badRequest()
        }
        
        const pontoEditado = await editarPonto(id,body);        

        return NextResponse.json(pontoEditado, {status: 200});
    }catch (error) {return prismaToHttp(error);}
}

// DELETE -> deletaPonto(id)
export async function DELETE(
    request:Request,
    context: {params: Promise<{pointId:string}>}
    ){
        try{
            const {pointId} = await context.params;
            const id = Number(pointId);

            if (!isIdValid(id)){
                return badRequest()
            }
            
            await deletarPonto(id);
            
            return new NextResponse(null, {status: 204});
        }catch(error) {return prismaToHttp(error)}
    }
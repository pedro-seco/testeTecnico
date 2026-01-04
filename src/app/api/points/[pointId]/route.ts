import { NextResponse } from "next/server";
import {isBodyEmpty, isIdValid} from "../../helper/commonFunctions";
import { badRequest, prismaToHttp } from "../../helper/httpUtils";
import { deletePOIs, editPOIs } from "./service";

// /api/points/[pointId]

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
        
        const editedPOIs = await editPOIs(id,body);        

        return NextResponse.json(editedPOIs, {status: 200});
    }catch (error) {return prismaToHttp(error);}
}

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
            
            await deletePOIs(id);
            
            return new NextResponse(null, {status: 204});
        }catch(error) {return prismaToHttp(error)}
    }
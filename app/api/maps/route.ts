import { NextResponse } from "next/server";
import { badRequest, prismaToHttp } from "../helper/httpUtils";
import { isAtributeMissing, isBodyEmpty } from "../helper/commonFunctions";
import { searchMaps, createMap } from "./service";

// api/maps/
export async function GET(){
    try{
        const foundMap = await searchMaps();

        return NextResponse.json(foundMap, {status: 200});
    } catch(error) {return prismaToHttp(error)}
}

export async function POST(request: Request){
    try{
        const body = await request.json();

        if (isBodyEmpty(body) || isAtributeMissing(body.name)){
            return badRequest()
        }

        const newMap = await createMap(body);

        return NextResponse.json(newMap, {status: 200});
    } catch(error) {return prismaToHttp(error)}
}
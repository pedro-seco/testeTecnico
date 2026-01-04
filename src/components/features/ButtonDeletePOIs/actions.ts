'use server'

import { deletePOIs } from "@/src/app/api/points/[pointId]/service";

export async function deletePOIsAction(mapId: number){
    await deletePOIs(mapId);
}
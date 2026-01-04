'use server'

import { deleteMapWithPOIs } from "@/src/app/api/maps/[mapsId]/service";

export async function deleteMapAction(mapId: number){
    await deleteMapWithPOIs(mapId);
}
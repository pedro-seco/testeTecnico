'use server'

import { deleteAllMaps } from "@/src/app/api/maps/[mapsId]/service";

export async function deleteAllMapAction(){
    await deleteAllMaps();
}

import { deleteAllPOIsOnMap } from "@/src/app/api/maps/[mapsId]/points/services";

export async function deleteAllPointsAction(mapId: number){
    await deleteAllPOIsOnMap(mapId);
}
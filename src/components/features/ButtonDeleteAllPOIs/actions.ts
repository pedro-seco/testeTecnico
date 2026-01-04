'use server';

import { deleteAllPOIsOnMap } from "@/src/app/api/maps/[mapsId]/points/services";

export async function deleteAllPointsAction(mapId: number){
    await deleteAllPOIsOnMap(mapId);
}
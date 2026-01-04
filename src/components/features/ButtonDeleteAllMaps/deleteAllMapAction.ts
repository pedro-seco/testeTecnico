'use server'

import { deleteAllMaps } from "@/src/app/api/maps/[mapsId]/service";

export async function deleteAllMapAction(){
    await deleteAllMaps();
}
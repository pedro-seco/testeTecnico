'use server'

import { createMap } from "@/src/app/api/maps/service";
import { Borders} from "../../../types/types";
import { redirect } from "next/navigation";
import { FoundCity, FormState } from "../../../types/types";
import { getCityMaxBounds, parseAndValidateCoord, bBoxToBorders } from "@/src/services/CreateMapPageBar/services";
import { COORTYPE } from "@/src/types/enums";


function normalizePlaceInput(raw: string) {
  return raw.trim().replace(/\s+/g, " ");
}

export async function createMapAction(_: FormState, formData: FormData): Promise<FormState> {
    const inputCity = formData.get("mapName");
    
    if (typeof(inputCity) !== "string"){
        return { ok: false, error: "Informe um nome de cidade válido." }
    }

    const city = normalizePlaceInput(inputCity);

    if (city.length < 2) {
      return { ok: false, error: "Informe um nome de cidade válido." };
    }

    let results;

    try {
        results = await getCityMaxBounds(city) 
    } catch(error){return { ok: false, error: "Erro na criaçao" }}

/*     if(typeof(results) !== MaxBounds){
        return { ok: false, error: "Nada encontrado" }
    } */

    const foundCity = results[0];
    
    let borders:Borders;

    try {borders = bBoxToBorders(foundCity.boundingbox)
    } catch(error) {return { ok: false, error: "Erro ao calcular limites." }}

    const inputCreateMap = buildCreateMapInput(foundCity);

    const createdMap = await createMap(inputCreateMap)
    redirect(`/maps/${createdMap.id}`)
}

function buildCreateMapInput(foundCity: FoundCity) {
  const latitude = parseAndValidateCoord(foundCity.lat, COORTYPE.LAT);
  const longitude = parseAndValidateCoord(foundCity.lon, COORTYPE.LONG);
  const borders: Borders = bBoxToBorders(foundCity.boundingbox);

  return {
    name: foundCity.name,
    latitude,
    longitude,
    borders,
  };
}
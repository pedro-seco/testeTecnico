'use server';

import { createMap } from "@/src/app/api/maps/service";
import { Borders} from "../../../types/types";
import { redirect } from "next/navigation";
import { FoundCity, FormState } from "../../../types/types";
import { getCityMaxBounds, parseAndValidateCoord, bBoxToBorders } from "@/src/services/CreateMapPageBar/services";
import { COORTYPE } from "@/src/types/enums";
import { createMapBody } from "@/src/app/api/maps/types";

export async function createMapAction(_: FormState, formData: FormData): Promise<FormState> {
  const inputCity = formData.get("mapName");
  
  if(!isValidCityName(inputCity)){
    return toMapFormError("Informe um nome de cidade válido.");
  }

  const cityName = normalizePlaceInput(String((inputCity)));
  let results;

  try {
      results = await getCityMaxBounds(cityName) 
  } catch(error){return toMapFormError("Erro na criação do mapa.");}

  if(results.length > 1){
    console.log(results);
    return toMapFormError("Endereço selecionado ambíguo. Tente algo como 'Rio de Janerio, RJ");
  }

  const foundCity = results[0];
  let borders: Borders;

  try {borders = bBoxToBorders(foundCity.boundingbox);
  } catch(error) {return toMapFormError("Erro ao calcular limites do mapa.");}

  const inputCreateMap = buildCreateMapInput(foundCity);

  const createdMap = await createMap(inputCreateMap);
  redirect(`/maps/${createdMap.id}`);
}

function buildCreateMapInput(foundCity: FoundCity): createMapBody {
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

function normalizePlaceInput(raw: string): string {
  return raw.trim().replace(/\s+/g, " ");
}

function toMapFormError(error: string): FormState{
  return {ok: false, error};
}

function isValidCityName(inputCity: any): boolean{
  if(typeof(inputCity) !== "string"){
    return false;
  }

  const trimmed = inputCity.trim();
  if (trimmed.length <= 2) {
    return false;
  }
  
  const isOnlyDigits = /^\d+$/.test(trimmed);
  if(isOnlyDigits){
    return false;
  }

  return true;
}
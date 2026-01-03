import { COORTYPE, Borders, LIMITS} from "../../models/types"

export async function getCityMaxBounds(query: string) {
  const url = `https://nominatim.openstreetmap.org/search?` +
    new URLSearchParams({
      q: query,
      format: "jsonv2",
      limit: "5",
      adressdetails: "1",
      countrycodes: "br"
    });

  const response = await fetch(url, {
    headers: {
      // importante: em produção, setar um User-Agent identificável
      "User-Agent": "teste-tecnico/1.0 (pedrinho.seco@gmail.com)",
      "Accept-Language": "pt-BR"
    },

    cache: "no-store",
    // opcional: cache no server
    // next: { revalidate: 60 * 60 * 24 },
  });

  if (!response.ok) throw new Error("Falha ao geocodificar cidade");

  const data = (await response.json()) as Array<{
    boundingbox: [string, string, string, string]; // [south, north, west, east]
    lat: string;
    lon: string;
    name:string;
  }>;

  if (!data.length) throw new Error("Cidade não encontrada");

  return data;

/*   const [south, north, west, east] = data[0].boundingbox.map(Number) as number[];

  return [
    [west, south], // SW
    [east, north], // NE
  ]; */
}

export function bBoxToBorders(boundingbox: [string, string, string, string]): Borders{
    
    const south = parseAndValidateCoord(boundingbox[0], COORTYPE.LAT);
    const north = parseAndValidateCoord(boundingbox[1], COORTYPE.LAT);
    const west  = parseAndValidateCoord(boundingbox[2], COORTYPE.LONG);
    const east  = parseAndValidateCoord(boundingbox[3], COORTYPE.LONG);

    if (south > north) {
        throw new Error("BBox inconsistente: A latitude Sul é maior que a Norte.");
    }

    return {
    sw: { longitude: west, latitude: south},
    ne: { longitude: east, latitude: north},
    }
}

export function parseAndValidateCoord(value: string, type: COORTYPE): number {
    
    if (typeof value !== "string") {
      throw new Error("Coordinate must be a string.");
    }

    const trimmed = value.trim();
    
    if (!trimmed) {
      throw new Error(`Missing ${type} coordinate.`);
    }   
    
    const num = Number(trimmed);
    
    if (!Number.isFinite(num)) {
      throw new Error(`Invalid ${type} coordinate: not a number ("${value}").`);
    }   
    
    const { min, max } = LIMITS[type];
    
    if (num < min || num > max) {
      throw new Error(
        `Invalid ${type} coordinate: ${num} out of range [${min}, ${max}].`
      );
    }

    return num; 
}
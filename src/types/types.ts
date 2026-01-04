export type Borders = {
    sw: { longitude: number; latitude: number};
    ne: { longitude: number; latitude: number};
}

export enum COORTYPE  {
    LAT = "LAT",
    LONG = "LONG"
}

export const LIMITS: Record<COORTYPE, { min: number; max: number }> = {
  [COORTYPE.LAT]: { min: -90, max: 90 },
  [COORTYPE.LONG]: { min: -180, max: 180 },
};

export type FoundCity = {
  boundingbox: [string,string, string, string];
  lat: string;
  lon: string;
  name: string;
}

export type FormState =
  | { ok: true }
  | { ok: false; error: string;};
'use client';

import { useCallback } from "react";
import { useMap } from "react-map-gl/maplibre";

interface ButtonFlyToPOI {
    longitude: number;
    latitude: number;
    label?: string;
}



export default function ButtonFlyToPOI({latitude, longitude, label = ""} :ButtonFlyToPOI){
    const {current: map } = useMap();

    const handleFlyTo = useCallback(() =>{
      if(!map){
        return;
      }

      map.flyTo({
        center:[longitude,latitude],
        zoom:14
      });
    }, [map,longitude,latitude]);

  return (
    <button onClick={handleFlyTo}>
      {label}
    </button>
  );
}
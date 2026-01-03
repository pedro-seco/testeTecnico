'use client';

import 'maplibre-gl/dist/maplibre-gl.css'
import { MapWithPOIsDTO } from '@/app/api/maps/types';
import { IoIosPin } from "react-icons/io";
import { Map, Marker } from 'react-map-gl/maplibre';
import { useState } from 'react';
import { createPOIsOnMap } from '@/app/api/maps/[mapsId]/points/services';

interface MapWindow {
    map: MapWithPOIsDTO;
}

export function MapWindow({map}: {map: MapWithPOIsDTO}) {

    const [currentZoom, setCurrentZoom] = useState(12);
    const [currentLocation, setCurrentLocation] = useState(false);

    return(
        <div className='relative w-full h-full'>
            <Map
            /*Todo - Definir MapBounds */
        initialViewState={{
            longitude: map.longitude,
            latitude: map.latitude,
            zoom: 12
        }}
        style={{ 
            position: 'absolute',
            inset:0
         }}
        onMove={(e) => setCurrentZoom(e.viewState.zoom)}
        mapStyle="https://api.maptiler.com/maps/019b7f78-6aa1-7b81-a948-4aed01823400/style.json?key=FBcr1UfJ94yghhvyACBs"
        /*TODO - mover para .env */
      >

        {map.pois.map((poi) =>(
            <Marker key={poi.id} longitude={poi.longitude} latitude={poi.latitude} anchor='bottom'>
                <div className="flex flex-col items-center justify-end group">
                    { currentZoom > 15 &&(
                        <span className="bg-gray-900 p-1.5 rounded-2xl text-white" >{poi.name}</span>
                    )}
                    <IoIosPin className='text-gray-900 text-4xl'/>
                    {/* TODO - Cluster de Pontos */}
                </div>
            </Marker>
        ))}
      </Map>
        </div>
    );
}
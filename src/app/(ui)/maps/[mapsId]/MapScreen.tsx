'use client';

import { MapWindow } from "@/src/components/features/MapWindow/MapWindow";
import PointsMenu from "@/src/components/features/PointsMenu/PointsMenu";
import { MapRef } from "react-map-gl/maplibre";
import { useCallback, useRef } from 'react';
import { POINT_DEFAULT_ZOOM } from "@/src/components/config";
import { MapProps } from "@/src/types/interfaces";



export default function MapScreen({mapWithPOIs}: MapProps){
    const mapRef = useRef<MapRef | null>(null);

    const onSelectPoint = useCallback((lat: number,lng: number) => {
        mapRef.current?.flyTo({center: [lng,lat], zoom: POINT_DEFAULT_ZOOM })
    },[]);
    
    return (
        <div className="h-full p-5">
            <main className="grid grid-cols-[1fr_3fr] gap-10 h-full">
                <div className="min-h-0 grow">
                    <PointsMenu map={mapWithPOIs} onSelectPoint={onSelectPoint} />
                </div>
                <section className="relative min-h-0">
                    <h2 className="absolute -top-5 left-8 txt-title">
                       {mapWithPOIs.name}
                    </h2>
                    <div className="h-full border p-5 grow">
                        <MapWindow map={mapWithPOIs} mapRef={mapRef} />
                    </div>
                </section>
            </main>
        </div>
    );
}
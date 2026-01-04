'use client';

import 'maplibre-gl/dist/maplibre-gl.css'
import { MapWithPOIsDTO } from '@/src/app/api/maps/types';
import { IoIosPin } from "react-icons/io";
import { Map, Marker, Popup } from 'react-map-gl/maplibre';
import { useState } from 'react';
import { CreatePOIsOnMapAction } from '../CreatePOIsPopup/actions';
import { useRouter } from 'next/navigation';

interface MapWindow {
    map: MapWithPOIsDTO;
}

export function MapWindow({map}: {map: MapWithPOIsDTO}) {
    const router = useRouter();
    const [currentZoom, setCurrentZoom] = useState(12);
    const [loading, setLoading] = useState(false);
    const [newPoint, setNewPoint] = useState<{lat: number; lng: number} | null>(null);
    const [pointName, setPointName] = useState("");
    
    const handleRightClick = (event: any) =>{
            const {lat,lng} = event.lngLat;
            setNewPoint({lat,lng});
            setPointName("");
    }


    async function handleCreatePoint(){
        if (!newPoint || !pointName){
            return;
        
        }

        setLoading(true);

        const body = {
            name: pointName,
            lat: newPoint.lat,
            lng: newPoint.lng
        }

        try {
            await CreatePOIsOnMapAction(map.id, body)
            setNewPoint(null);
            router.refresh();
        } catch(error) {console.error(error);
        } finally { setLoading(false);}
    }

    return(
        <div className='relative w-full h-full'>
            <Map //TODO - AVALIAR COMPONENTE MAP
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
                onContextMenu={handleRightClick}
                maxBounds={[[map.borders.sw.longitude, map.borders.sw.latitude],
                            [map.borders.ne.longitude,map.borders.ne.latitude]]}
                
                mapStyle={`${process.env.NEXT_PUBLIC_MAP_STYLE}?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`}
                >

                {map.pois.map((poi) =>(
                    <Marker key={poi.id} longitude={poi.longitude} latitude={poi.latitude} anchor='bottom'>
                        <div className="flex flex-col items-center justify-end group">
                          
                            { currentZoom > 15 &&(
                                <span className=" text-gray-600 text-xl px-1" >{poi.name}</span>
                            )}
                            <IoIosPin className='text-red-500 text-4xl'/>
                        </div>
                    </Marker>                  
                ))}

                {newPoint && (
                <Popup
                  longitude={newPoint.lng}
                  latitude={newPoint.lat}
                  anchor="bottom"
                  onClose={() => setNewPoint(null)}
                  closeOnClick={false}
                  closeButton={false}
                  className="text-black red"
                >
                  <div className="flex flex-col gap-2 p-3 text-white min-w-50">
                    <h3 className="font-bold text-sm">Novo Ponto</h3>

                    <input
                      type="text"
                      placeholder="Padaria, Academia..."
                      value={pointName}
                      onChange={(e) => setPointName(e.target.value)}
                      className="border p-1 text-sm  w-full"
                      autoFocus
                    />

                    <div className="flex gap-2 justify-end mt-1">
                      <button 
                        onClick={() => setNewPoint(null)}
                        className="px-1 text-white hover:opacity-80"
                      >
                        Cancelar
                      </button>
                      <button 
                        onClick={handleCreatePoint}
                        disabled={loading || !pointName}
                        className="text-white text-xs px-3 py-1 border hover:bg-white hover:text-black"
                      >
                        {loading ? "..." : "Salvar"}
                      </button>
                    </div>
                  </div>
                </Popup>
                )}
            </Map>
        </div>
    );
}
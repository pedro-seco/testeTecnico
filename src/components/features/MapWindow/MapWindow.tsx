'use client';

import 'maplibre-gl/dist/maplibre-gl.css'
import { MapWithPOIsDTO } from '@/src/app/api/maps/types';
import { IoIosPin } from "react-icons/io";
import { Map, MapRef, Marker, Popup } from 'react-map-gl/maplibre';
import { useRef, useState } from 'react';
import { CreatePOIsOnMapAction } from './actions';
import { useRouter } from 'next/navigation';
import { DEFAULT_PIN_ZOOM_THRESHOLD, MAP_DEFAULT_ZOOM } from '../../config';

interface MapWindow {
    map: MapWithPOIsDTO;
}


type lngLatEvent = {
  lngLat :{
    lat:number,
    lng:number
  }
}

export function MapWindow({map}: {map: MapWithPOIsDTO}) {
    const zoomNum = MAP_DEFAULT_ZOOM;
    const pinZoomNum = DEFAULT_PIN_ZOOM_THRESHOLD;
    const router = useRouter();
    const [currentZoom, setCurrentZoom] = useState(zoomNum);
    const [loading, setLoading] = useState(false);
    const [newPoint, setNewPoint] = useState<{lat: number; lng: number} | null>(null);
    const [pointName, setPointName] = useState("");
    const mapRef = useRef<MapRef>(null);

    /* const onCLickPOI = useCallback(({latitude, longitude}) => {
      mapRef.current?.flyTo({center: [latitude,longitude]})
    },[]); */

    const handleRightClick = (event: lngLatEvent) =>{
            const {lat,lng} = event.lngLat;
            setNewPoint({lat,lng});
            setPointName("");
    }

    async function handleCreatePoint(){
        if (loading || !newPoint || !pointName) {
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
            <Map
                ref={mapRef}
                initialViewState={{
                    longitude: map.longitude,
                    latitude: map.latitude,
                    zoom: zoomNum
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
                          
                            { currentZoom > pinZoomNum &&(
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
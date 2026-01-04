import { MapWithPOIsDTO } from "@/src/app/api/maps/types";

export interface MapProps {
    mapWithPOIs:MapWithPOIsDTO;
}

export interface PointListProps {
  onSelectPointAction?: (lat: number, lng: number) => void;
  pointList: POIsDTO[];
}

export interface MapItemProps {
    map: MapWithPOIsDTO;
    onSelectPoint: (lat: number, lng: number) => void;
}

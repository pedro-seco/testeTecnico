'use client';

import { ENTITIES } from "@/src/app/(ui)/types/enums";
import ButtonDelete from "../../common/ButtonDelete/ButtonDelete";
import { PointListProps } from "@/src/app/(ui)/types/interfaces";

export default function ItemPointList({pointList, onSelectPointAction}: PointListProps){
  return (
    <ol className="flex flex-col text-2xl gap-4 overflow-y-scroll font-sans">
      {pointList.length > 0 ? (
        pointList.map((point) => (
          <li key={point.id}>
            <div className="flex grow items-center justify-between border-b border-white/10 pb-2 mb-2">
              <button 
              onClick={/* () => console.log("botao funciona") */
                () => onSelectPointAction?.(point.latitude,point.longitude)
              } 
              className="hover:opacity-80 cursor-pointer">{point.name}</button>
              <ButtonDelete id={point.id} entity={ENTITIES.POI} />
            </div> 
          </li>
        ))
      ) : (
        <p className="text-gray-400 text-sm font-light italic mt-4 text-center">
          Nenhum ponto cadastrado.
        </p>
      )}
    </ol>
  )
}

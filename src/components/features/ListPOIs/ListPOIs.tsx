import { ENTITIES } from "@/src/types/enums";
import { MapWithPOIsDTO } from "../../../app/api/maps/types";
import ItemPOIs from "../ItemPOIs/ItemPOIs";
import ButtonDeleteAll from "../../common/ButtonDeleteAll/ButtonDeleteAll";


interface mapItemProps {
    map: MapWithPOIsDTO;
}

export default async function ListPOIs({map} :mapItemProps){
    return(
        <div className="relative w-full h-full border flex flex-col">
          <span className="absolute left-8 -translate-y-1/2 txt-title z-10">
            Pontos
          </span>
          <div className="h-full w-full p-6 pt-10 overflow-y-auto custom-scrollbar">
              <ol className="flex flex-col text-2xl gap-4 overflow-y-scroll font-sans">
                {map.pois.length > 0 ? (
                  map.pois.map((pois) => (
                    <ItemPOIs key={pois.id} id={pois.id} name={pois.name} />
                  ))
                ) : (
                  <p className="text-gray-400 text-sm font-light italic mt-4 text-center">
                    Nenhum ponto cadastrado.
                  </p>
                )}
              </ol>
          </div>
          <ButtonDeleteAll id={map.id} entity={ENTITIES.POI} />
        </div>
    )
}

import { ENTITIES } from "@/src/types/enums";
import ButtonDelete from "../../common/ButtonDelete/ButtonDelete";

interface ItemPOIs {
    id: number;
    name: string;
}

export default async function ItemPOIs(pois :ItemPOIs){
    return(
        <li key={pois.id}>
          <div className="flex grow items-center justify-between border-b border-white/10 pb-2 mb-2">
            <button className="hover:opacity-80 cursor-pointer">{pois.name}</button>
            <ButtonDelete id={pois.id} entity={ENTITIES.POI} />
          </div> 
        </li>
    )
}

import ButtonDeletePOIs from "./ButtonDeletePOIs";

interface ItemPOIs {
    id: number;
    name: string;
}

export default async function ItemPOIs(pois :ItemPOIs){
    return(
        <li key={pois.id}>
          <div className="flex grow items-center justify-between border-b border-white/10 pb-2 mb-2">
            {pois.name}
            <div className="border border-white px-6 py-1 text-sm hover:bg-white hover:text-black">
              <ButtonDeletePOIs idPOIs={pois.id} />
            </div>
          </div>
          
    </li>
        
    )
}

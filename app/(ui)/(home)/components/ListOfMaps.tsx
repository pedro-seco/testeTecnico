import Link from "next/link";
import { ListMaps } from "../../models/interfaces"

export default async function ListOfMaps({map}: ListMaps){
   
    return(

    <div className="relative w-full h-150 border border-white">
      <span className="absolute -top-5 left-8 bg-[#232121] px-2 text-3xl">
        Cidades
      </span>
      <div className="h-full w-full p-6 pt-10 overflow-y-auto custom-scrollbar">
        <ol className="flex flex-col gap-4 font-sans">
          {map.length > 0 ? (
            map.map((item) => (
              <li key={item.id} className="w-full">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                  <div>
                    <p className="font-bold text-2xl">{item.name}</p>
                    <p className="text-gray-400 font-light text-sm">Pontos Cadastrados: {item.pois?.length || 0}</p>
                  </div>
                  <Link 
                    href={`/maps/${item.id}`} 
                    className="border border-white px-6 py-1 hover:bg-white hover:text-black"
                  >
                    ACESSAR
                  </Link>
                </div>
              </li>
            ))
          ) : (
             <p className="text-center italic text-gray-500 mt-10">Nenhum mapa encontrado.</p>
          )}
        </ol>
        </div>
        <Link href="/createMap" className="flex justify-center hover:opacity-80 px-2">Não encontrou o que procurava? Crie seu próprio mapa!</Link>
    </div>
    );
}
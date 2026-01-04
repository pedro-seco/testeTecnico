import { searchMaps } from "../../../api/maps/service";
import ListOfMaps from "../../components/features/ListOfMaps/ListOfMaps";
import Link from "next/link";

export default async function Home() {
  const listMaps = await searchMaps();
  
  return (
    <div className="p-8 sm:p-6">
      <main className="grow flex flex-col items-center justify-center w-full pb-10">
        <div className="relative w-1/2 min-w-100">
          <div className="absolute -top-4 right-4 px-2 bg-[#232121] z-10">
            <Link href="/createMap" className="btn-default px-2">Crie seu próprio mapa!</Link>
          </div>  
          <ListOfMaps map={listMaps}/>
        </div>
      </main>
    </div>
  );
}
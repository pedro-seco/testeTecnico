import { searchMaps } from "../../api/maps/service";
import ListOfMaps from "../../../components/features/ListOfMaps/ListOfMaps";
import NavBar from "../../../components/layouts/NavBar";
import ButtonDeleteAllMap from "@/src/components/features/ButtonDeleteAllMaps/ButtonDeleteAllMap";
import Link from "next/link";

export default async function Home() {


  const listMaps = await searchMaps();
  
  return (
    <div className="p-8 sm:p-6">
      <NavBar/>
      <main className="grow flex flex-col items-center justify-center w-full pb-10">
        <div className=" text-sm">
          <Link href="/createMap" className="flex justify-center hover:opacity-80 px-2">Não encontrou o que procurava? Crie seu próprio mapa!</Link>
        </div>
        <div className="w-1/2 min-w-100">
          <ListOfMaps map={listMaps}/>
        </div>
      </main>
    </div>
  );
}
import { searchMaps } from "../../api/maps/service";
import ListOfMaps from "./components/ListOfMaps";
import NavBar from "../commonComponents/NavBar";
import Link from "next/link";


export default async function Home() {


  const listMaps = await searchMaps();
  
  return (
    <div className="p-8 sm:p-6">
      <NavBar/>
      <main className="grow flex items-center justify-center w-full pb-10">
        <div className="w-1/2 min-w-100">
           <ListOfMaps map={listMaps}/>
        </div>
      </main>
    </div>
  );
}
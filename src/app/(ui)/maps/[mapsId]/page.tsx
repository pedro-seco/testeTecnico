import { searchMapWithPOIs } from "@/src/app/api/maps/[mapsId]/service";
import NavBar from "@/src/components/layouts/NavBar";
import { notFound } from "next/navigation";
import { MapWindow } from "@/src/components/features/MapWindow/MapWindow";
import ListPOIs from "../../../../components/features/ListPOIs/ListPOIs";

export default async function MapPage(
    context: {params: Promise<{mapsId:string}>}){

    const {mapsId} = await context.params;
    const id = Number(mapsId);
    const mapWithPOIs = await searchMapWithPOIs(id);
    
    if (!mapWithPOIs){
        notFound(); /* Configurar página do not found */
    }
    
    return (
        <div className="h-screen grid grid-rows-[auto_1fr] p-6 gap-4">
            <NavBar/>
            <main className="grid grid-cols-[1fr_3fr] gap-6 min-h-0">
                <div className="min-h-0">
                    <ListPOIs map={mapWithPOIs} />
                </div>
                <section className="relative min-h-0">
                    <h2 className="absolute -top-5 left-8 bg-[#232121] px-2 text-3xl">
                       {mapWithPOIs.name}
                    </h2>
                    <div className="h-full border border-white p-5">
                        <MapWindow map={mapWithPOIs} />
                    </div>
                </section>
            </main>
        </div>
    );
    
}
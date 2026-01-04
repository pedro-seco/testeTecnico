import { searchMapWithPOIs } from "@/src/app/api/maps/[mapsId]/service";
import { notFound } from "next/navigation";
import { MapWindow } from "@/src/components/features/MapWindow/MapWindow";
import ListPOIs from "../../../../components/features/ListPOIs/ListPOIs";

export default async function MapPage(
    context: {params: Promise<{mapsId:string}>}){

    const {mapsId} = await context.params;
    const id = Number(mapsId);
    const mapWithPOIs = await searchMapWithPOIs(id);
    
    if (!mapWithPOIs){
        notFound();
    }
    
    return (
        <div className="h-full p-5">
            <main className="grid grid-cols-[1fr_3fr] gap-10 h-full">
                <div className="min-h-0 grow">
                    <ListPOIs map={mapWithPOIs} />
                </div>
                <section className="relative min-h-0">
                    <h2 className="absolute -top-5 left-8 txt-title">
                       {mapWithPOIs.name}
                    </h2>
                    <div className="h-full border p-5 grow">
                        <MapWindow map={mapWithPOIs} />
                    </div>
                </section>
            </main>
        </div>
    );
    
}
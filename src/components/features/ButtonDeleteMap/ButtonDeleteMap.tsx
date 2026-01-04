'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteMapAction } from "./deleteMapAction";


interface toDeleteMapProps{
    mapId:number;
}

export default function ButtonDeleteMap({mapId}:toDeleteMapProps){
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    //TODO - tercerizar a handleDelete()

    async function handleDelete() {
            const isConfirmed = confirm("Tem certeza que deseja excluir este mapa?")
    
            if (!isConfirmed){
                return;
            }
            setLoading(true);
    
            try {
                deleteMapAction(mapId)
                router.refresh();
            } catch(error) {console.error(error);
            } finally { setLoading(false);}
        }

    return (
        <button 
            onClick={handleDelete} disabled={loading}
            className="cursor-pointer">
                {loading ? "Deletando..." : "Excluir"}
        </button>
    )
}
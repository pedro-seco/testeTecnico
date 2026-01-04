'use client'

import { deleteAllPOIsOnMap } from "@/src/app/api/maps/[mapsId]/points/services";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteAllPointsAction } from "./actions";

interface DeletePOIsProps {
    mapsId: number;
}

export default function ButtonDeleteAllPOIs({mapsId}:DeletePOIsProps){
    const router = useRouter(); 
    const [loading, setLoading] = useState(false)
    
    async function handleDelete() {
        const isConfirmed = confirm("Tem certeza que deseja excluir este TODOS os pontos desse mapa?")

        if (!isConfirmed){
            return;
        }
        setLoading(true);

        try {
            await deleteAllPointsAction(mapsId);
            router.refresh();
        } catch(error) {console.error(error);
        } finally { setLoading(false);}
    }   
        

    return(
        <button 
            onClick={handleDelete} 
            disabled={loading} 
            className="cursor-pointer">
                {loading ? "Deletando..." : "Excluir TODOS os pontos"}
        </button>
    )
}

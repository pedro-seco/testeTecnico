'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeletePOIsProps {
    mapsId: number;
}

export default function ButtonDeleteAllPOIs({mapsId}:DeletePOIsProps){
    const router = useRouter(); 
    const [loading, setLoading] = useState(false)
    
    async function handleDelete() {
        const isConfirmed = confirm("Tem certeza que deseja excluir este todos os pontos desse mapa?")

        if (!isConfirmed){
            return;
        }
        setLoading(true);

        try {
            await fetch(`/api/maps/${mapsId}/points`,
                {method: "DELETE"},
            );
            router.refresh();
        } catch(error) {console.error(error);
        } finally { setLoading(false);}
    }   
        

    return(
        <button 
            onClick={handleDelete} 
            disabled={loading} 
            className="cursor-pointer">
                {loading ? "Deletando..." : "Excluir todos os pontos"}
        </button>
    )
}

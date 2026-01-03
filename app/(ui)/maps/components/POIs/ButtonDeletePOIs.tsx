'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeletePOIsProps {
    idPOIs: number;
}

export default function ButtonDeletePOIs({idPOIs}:DeletePOIsProps){
    const router = useRouter(); 
    const [loading, setLoading] = useState(false)
    
    async function handleDelete() {
        const isConfirmed = confirm("Tem certeza que deseja excluir este mapa?")

        if (!isConfirmed){
            return;
        }
        setLoading(true);

        try {
            await fetch(`/api/points/${idPOIs}`,
                {method: "DELETE"},
            );
            router.refresh();
        } catch(error) {console.error(error);
        } finally { setLoading(false);}
    }   
        
    return(
        <button 
            onClick={handleDelete} disabled={loading}
            className="cursor-pointer">
                {loading ? "Deletando..." : "Excluir"}
        </button>
        /* TODO - Adicionar confirm nesse botao ao deletar */
    )
}

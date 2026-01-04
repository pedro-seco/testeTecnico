'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deletePOIsAction } from "./actions";

interface DeletePOIsProps {
    idPOIs: number;
}

export default function ButtonDeletePOIs({idPOIs}:DeletePOIsProps){
    const router = useRouter(); 
    const [loading, setLoading] = useState(false);
    
    //TODO - tercerizar o handleDelete() (Como?)
    async function handleDelete() {
        const isConfirmed = confirm("Tem certeza que deseja excluir este ponto?")

        if (!isConfirmed){
            return;
        }
        setLoading(true);

        try {
            deletePOIsAction(idPOIs)
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
    )
}

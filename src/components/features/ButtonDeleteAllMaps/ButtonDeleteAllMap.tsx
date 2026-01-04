'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteAllMapAction } from "./deleteAllMapAction";


export default function ButtonDeleteAllMap(){
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    //TODO - tercerizar a handleDelete()

    async function handleDelete() {
            const isConfirmed = confirm("Tem certeza que deseja excluir TODOS os mapas, incluindo seus pontos?")
    
            if (!isConfirmed){
                return;
            }
            setLoading(true);
    
            try {
                deleteAllMapAction()
                router.refresh();
            } catch(error) {console.error(error);
            } finally { setLoading(false);}
        }

    return (
        <button 
            onClick={handleDelete} disabled={loading}
            className="cursor-pointer">
                {loading ? "Deletando..." : "Excluir TODOS os mapas"}
        </button>
    )
}
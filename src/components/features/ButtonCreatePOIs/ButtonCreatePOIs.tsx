'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

interface CreatePOIs {
    name:string;
    latitude: number;
    longitude: number;
    mapId: string
}

export default async function ButtonCreatePOIs({mapId}: CreatePOIs){
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleCreate() {
        const isConfirmed = confirm("Tem certeza que deseja criar esse ponto?");
        
        if (!isConfirmed){
            return;
        }

        setLoading(true);

/*      TODO - IMPLEMENTAR   
        try {
            await fetch(`/api/points/${mapId}`,{
                method: "POST",
                body:
                }
            );
            router.refresh();
        } catch(error) {console.error(error);
        } finally { setLoading(false);} */
    }
    
}
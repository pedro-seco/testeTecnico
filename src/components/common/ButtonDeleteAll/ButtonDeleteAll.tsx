'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ENTITIES } from "@/src/types/enums"
import { deleteAllMapAction, deleteAllPointsAction } from "./actions";
import { ButtonDeleteAllInputProps } from "@/src/types/types";



type deleteAllProp = {
    action: () => Promise<void>,
    msg: string,
    buttonMsg: string,
}

function getDeleteProp(entity:ENTITIES, id?:number):deleteAllProp{

    if(entity == ENTITIES.MAP){
        return {
            action: deleteAllMapAction,
            msg: "Tem certeza que deseja excluir TODOS os mapas?",
            buttonMsg: "Excluir TODOS os mapas"
        }
    }

    return {
        action: () => deleteAllPointsAction(id!),
        msg: "Tem certeza que deseja excluir TODOS os pontos?",
        buttonMsg: "Excluir TODOS os pontos"
    }
}

export default function ButtonDeleteAll({entity,id}: ButtonDeleteAllInputProps){
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const currDelProps = getDeleteProp(entity,id);


    
    async function handleDelete() {
            const isConfirmed = confirm(currDelProps.msg)
    
            if (!isConfirmed){
                return;
            }
            setLoading(true);
    
            try {
                currDelProps.action();
                router.refresh();
            } catch(error) {console.error(error);
            } finally { setLoading(false);}
        }

    return (
        <button
            onClick={handleDelete} disabled={loading}
            className={"btn-default border-b-0 border-l-0 border-r-0 py-3"}>
                {loading ? "Deletando..." : `${currDelProps.buttonMsg}`}
        </button>
    )
}
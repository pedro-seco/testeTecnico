'use client'

import Form from 'next/form'
import { useActionState } from "react";
import { createMapAction } from "./actions";
import { FormState } from '../../models/types';

const initialState: FormState = { ok: true };

export default function CreateMapPageBar() {

    const [state, formAction] = useActionState(createMapAction, initialState);

    return(
        <div className="min-h-screen bg-[#232121] text-white font-sans p-2 sm:p-6">
          <main className="grow flex items-center justify-center w-full">
            <Form action={formAction} className="flex w-full max-w-2xl h-13">
              <input 
                name="mapName" 
                type="text" 
                placeholder="Rio de Janeiro, RJ" 
                className="grow bg-[#D9D9D9] rounded-l-2xl text-black px-6 text-lg outline-none placeholder-gray-500"
              />
              <button 
                type="submit" 
                className="bg-[#A6A6A6] rounded-r-2xl text-white px-8 md:px-8 text-lg hover:bg-gray-400 transition-colors whitespace-nowrap"
              >
                + Criar Mapa
              </button>
            </Form>
          </main>
        </div>
    )
}
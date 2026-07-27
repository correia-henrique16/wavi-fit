'use client'

import { Dispatch, SetStateAction } from "react"
import apagarPeso from "@/utils/crud/apagarPeso"
import { useRouter } from "next/navigation"

export default function ConfirmarApagarPeso({setShowConfirm, idPeso}: {idPeso: number | undefined, setShowConfirm: Dispatch<SetStateAction<boolean>>}) {
    const router = useRouter()

    if (!idPeso) return null

    return(
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm bg-bg p-6 rounded-3xl border border-castanho/20 shadow-2xl flex flex-col items-center gap-5 text-center">
                <span className="text-lg font-bold text-bordeaux">Quer o registo deste peso?</span>

                <div className="flex items-center gap-3 w-full">
                    <button className="flex-1 py-2.5 bg-red-600! text-white font-bold rounded-xl hover:bg-red-700! transition-all cursor-pointer"
                     onClick={() => apagarPeso(idPeso, router)}>
                        Sim
                    </button>

                    <button className="flex-1 py-2.5 bg-rosa! text-bordeaux font-bold border border-bordeaux/20 rounded-xl hover:bg-rosa-escuro! hover:text-white transition-all cursor-pointer"
                     onClick={() => setShowConfirm(false)}>
                        Não
                    </button>
                </div>
            </div>
        </section>
    )
}
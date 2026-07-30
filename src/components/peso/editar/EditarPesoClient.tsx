'use client'

import { TipoPeso } from "@/models/db-types/TipoPeso"
import useApagarPeso from "@/hooks/peso/useApagarPeso"
import BtnVoltar from "@/components/refeicoes/ui/BtnVoltar"
import ConfirmarApagarPeso from "../Modals/ConfirmarApagarPeso"
import EditPeso from "./EditPeso"

interface ChildProps {
    peso: TipoPeso
}

export default function EditarPesoClient({peso}: ChildProps) {
    const {setShowConfirm, showConfirm} = useApagarPeso()

    return(
        <div>
            <nav>
                <div className="w-1/4 flex justify-baseline items-center">
                    <BtnVoltar caminho='/peso' />
                </div>

                <div className="w-2/4 flex full-centered-flex">
                    <h1>Editar Peso</h1>
                </div>

                <div className="w-1/4 flex justify-end items-center ">
                    <button onClick={() => setShowConfirm(true)}
                    className="flex items-center gap-1.5 py-1.5 px-3 bg-red-100! text-red-700 text-xs font-bold border border-red-300 rounded-xl hover:bg-red-200! active:scale-95 transition-all cursor-pointer">
                        <img src="/cesto-de-lixo.png" alt="Apagar" className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            <main className="main-nav max-w-md mx-auto p-4 flex flex-col gap-4 min-h-screen">

                <EditPeso peso={peso} />

                {showConfirm && <ConfirmarApagarPeso setShowConfirm={setShowConfirm} idPeso={peso.id}/>}

            </main>
        </div>
    )
}
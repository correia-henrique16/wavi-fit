'use client'

import useBuscarHistoricoPeso from "@/hooks/peso/useHistoricoPeso"
import Link from "next/link"

export default function ListarHistoricoPeso() {

    const {historicoPeso, loadingPesoHistorico} = useBuscarHistoricoPeso()

    if (loadingPesoHistorico) {
        return <p>Loadingg</p>
    }

    return(
        <div className="bg-white/50 backdrop-blur-sm p-5 rounded-3xl border border-castanho/10 shadow-xs flex flex-col gap-4 mx-5">
            <h2 className="text-sm font-semibold text-castanho border-b border-castanho/10 pb-2">
                Histórico Peso
            </h2>

            <ul className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
                {historicoPeso.map(peso => {
                    return(
                        <li key={peso.id}>
                            <Link href={`/peso/${peso.id}`}
                             className="flex justify-between items-center p-3 bg-white/60 hover:bg-white rounded-xl border border-castanho/10 transition-all">
                                <p className="font-bold text-bordeaux text-base">{peso.peso} Kg</p>
                                <p className="text-xs text-castanho font-medium">{peso.data_peso}</p>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
        
    )
}
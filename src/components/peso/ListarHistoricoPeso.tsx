'use client'

import useBuscarHistoricoPeso from "@/hooks/peso/useHistoricoPeso"
import Link from "next/link"

export default function ListarHistoricoPeso() {

    const {historicoPeso, loadingPesoHistorico} = useBuscarHistoricoPeso()

    if (loadingPesoHistorico) {
        return <p>Loadingg</p>
    }

    return(
        <div>
            <h2>Histórico Peso</h2>

            <ul>
                {historicoPeso.map(peso => {
                    return(
                        <li key={peso.id}>
                            <Link href={`/peso/${peso.id}`}>
                                <p>{peso.peso}</p>
                                <p>{peso.data_peso}</p>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
        
    )
}
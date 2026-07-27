'use client'

import useBuscarHistoricoPeso from "@/hooks/peso/useHistoricoPeso"
import Link from "next/link"

export default function PesoProgresso() {
    const {historicoPeso, loadingPesoHistorico} = useBuscarHistoricoPeso()

    if (loadingPesoHistorico) {
        return <p>Loadingsssss...</p>
    }

    return(
        <Link href={'/peso'}>
            {historicoPeso.map(pesagem => {
                const {peso, data_peso, id} = pesagem
                return(
                    <div key={id}>
                        <p>{peso} Kg</p>
                        <p>{data_peso}</p>
                    </div>
                )
            })}
        </Link>
    )
}
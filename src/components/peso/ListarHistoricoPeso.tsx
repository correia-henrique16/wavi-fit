'use client'

import useBuscarHistoricoPeso from "@/hooks/peso/useHistoricoPeso"

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
                            <button>
                                <p>{peso.peso}</p>
                                <p>{peso.data_peso}</p>
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
        
    )
}
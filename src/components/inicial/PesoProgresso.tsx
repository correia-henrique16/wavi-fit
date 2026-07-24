'use client'

import useBuscarPesoAtual from "@/hooks/userInfo/usePesoAtual"
import useBuscarHistoricoPeso from "@/hooks/userInfo/useHistoricoPeso"

export default function PesoProgresso() {
    const {historicoPeso, loadigPeso} = useBuscarHistoricoPeso()
    return(
        <div>
            
        </div>
    )
}
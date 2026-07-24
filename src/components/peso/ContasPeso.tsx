'use client'

import useBuscarPesoAtual from "@/hooks/userInfo/usePesoAtual"
import useBuscarUserInfo from "@/hooks/userInfo/useBuscarUserInfo"

export default function ContasPeso() {
    const {loadingPesoAtual, pesoAtual} = useBuscarPesoAtual()
    const {userInfo, loadigUserInfo} = useBuscarUserInfo()

    if (loadingPesoAtual || loadigUserInfo) {
        return <p>Loadinggg</p>
    }

    if (!pesoAtual || !userInfo) {
        return null
    }

    const {peso, data_peso} = pesoAtual
    const {peso_objetivo} = userInfo

    return(
        <div>
            <div>
                <h2>Peso atual</h2>
                <p>{peso} Kg</p>
            </div>
            

        </div>
    )
}
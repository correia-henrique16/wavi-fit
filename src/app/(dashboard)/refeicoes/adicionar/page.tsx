'use client'

import AddRefeicoes from "@/components/refeicoes/AddRefeicoes"
import useBuscarTipos from "@/hooks/refeicoes/useBuscarTipos"
import useBuscarAlimentos from "@/hooks/alimentos/useBuscarAlimentos"

export default function AdicionarRefeicaoPage() {

    const {loadingTipo, tipos} = useBuscarTipos()
    const {loadingAlimentos, alimentos} = useBuscarAlimentos()

    if (loadingTipo || loadingAlimentos) return (<p> waitssss</p>)

    return(
        <main>
            <h1>Adicionarr refeições</h1>
            <AddRefeicoes tipos={tipos} alimentos={alimentos}/>
        </main>
        
    )
}
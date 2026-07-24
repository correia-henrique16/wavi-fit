'use client'

import ListarRefeicoesUser from "@/components/refeicoes/listar/ListarRefeicoesUser"
import ListarData from "@/components/refeicoes/listar/ListarData"
import useDataListar from "@/hooks/refeicoes/useDataListar"
import BtnVoltar from "@/components/refeicoes/ui/BtnVoltar"
import useBuscarRefeicoes from "@/hooks/refeicoes/useBuscarRefeicoes"
import calculoMacrosDia from "@/utils/calculos/calculoMacrosDia"
import MacrosDiarias from "@/components/refeicoes/listar/MacrosDiarias"
import useBuscarTipos from "@/hooks/refeicoes/useBuscarTipos"
import BtnAdicionarRefeicao from "@/components/refeicoes/listar/BtnAdicionarRefeicao"
import datasDias from "@/utils/datas/datasDias"
import MetaDiaria from "@/components/inicial/MetaDiaria"
import useBuscarUserInfo from "@/hooks/userInfo/useBuscarUserInfo"
import useBuscarPesoAtual from "@/hooks/userInfo/usePesoAtual"
import { useState } from "react"


export default function RefeicoesPage() {

    const {date, setDate} = useDataListar()
    const {refeicoes, loading} = useBuscarRefeicoes(date)
    const {proteinaDia, carbohydratesDia, fatDia, kcalDia} = calculoMacrosDia(refeicoes)
    const {loadingTipo, tipos} = useBuscarTipos()
    const {loadigUserInfo, userInfo} = useBuscarUserInfo()
    const {loadingPesoAtual, pesoAtual} = useBuscarPesoAtual()

    const [refeicaoAberta, setRefeicaoAberta] = useState<number[]>([])

    const {anteriorDataString, dataSelecionada, proximaDataString, getLabel} = datasDias(date)  

    if (loadigUserInfo || loading || loadingTipo || loadingPesoAtual) {
        return <p>Loadingg</p>
    }

    return (
        
        <div className="">
            <nav>
                <div className="w-1/3 flex justify-baseline items-center">
                    <BtnVoltar caminho='/' />
                </div>

                <div className="w-1/3 flex full-centered-flex">
                    <h1>Refeições</h1>
                </div>

                <div className="w-1/3 flex justify-end items-center ">

                </div>
            </nav>

            <main className="main-nav">
                <MetaDiaria kcalDia={kcalDia} userInfo={userInfo} pesoAtual={pesoAtual}/>

                <ListarData setDate={setDate} anteriorDataString={anteriorDataString} dataSelecionada={dataSelecionada} 
                    proximaDataString={proximaDataString} getLabel={getLabel}
                />

                <ListarRefeicoesUser refeicoes={refeicoes} tipos={tipos} loading={loading} loadingTipo={loadingTipo} refeicaoAberta={refeicaoAberta} setRefeicaoAberta={setRefeicaoAberta} />

                <MacrosDiarias proteinaDia={proteinaDia} carbohydratesDia={carbohydratesDia} fatDia={fatDia} kcalDia={kcalDia} />
            
                <BtnAdicionarRefeicao dataSelecionada={dataSelecionada}/>
            </main>
            
        </div>
    )
}
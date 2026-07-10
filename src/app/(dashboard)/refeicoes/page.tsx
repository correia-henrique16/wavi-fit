'use client'

import ListarRefeicoesUser from "@/components/refeicoes/listar/ListarRefeicoesUser"
import ListarData from "@/components/refeicoes/listar/ListarData"
import useDataListar from "@/hooks/refeicoes/useDataListar"
import BtnVoltar from "@/components/refeicoes/ui/BtnVoltar"
import useBuscarRefeicoes from "@/hooks/refeicoes/useBuscarRefeicoes"
import calculoMacrosDia from "@/utils/calculos/calculoMacrosDia"
import MacrosDiarias from "@/components/refeicoes/listar/MacrosDiarias"
import useBuscarTipos from "@/hooks/refeicoes/useBuscarTipos"


export default function RefeicoesPage() {

    const {date, setDate} = useDataListar()
    const {refeicoes, loading} = useBuscarRefeicoes(date)
    const {proteinaDia, carbohydratesDia, fatDia, kcalDia} = calculoMacrosDia(refeicoes)
    const {loadingTipo, tipos} = useBuscarTipos()

    if (loading || loadingTipo) {
        return <p>A carregar...</p>
    }

    return (
        
        <div className="">
            <nav>
                <div className="w-1/3 flex justify-baseline items-center">
                    <BtnVoltar />
                </div>

                <div className="w-1/3 flex centered-flex">
                    <h1>Refeições</h1>
                </div>

                <div className="w-1/3 flex justify-end items-center ">

                </div>
            </nav>

            <main>
                <ListarData setDate={setDate} date={date}/>

                <ListarRefeicoesUser refeicoes={refeicoes} tipos={tipos}/>

                <MacrosDiarias proteinaDia={proteinaDia} carbohydratesDia={carbohydratesDia} fatDia={fatDia} kcalDia={kcalDia} />
            </main>
            
        </div>
    )
}
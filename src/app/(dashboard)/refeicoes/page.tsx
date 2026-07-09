'use client'

import ListarRefeicoesUser from "@/components/refeicoes/listar/ListarRefeicoesUser"
import ListarData from "@/components/refeicoes/listar/ListarData"
import useDataListar from "@/hooks/refeicoes/useDataListar"
import BtnVoltar from "@/components/refeicoes/ui/BtnVoltar"

export default function RefeicoesPage() {

    const {date, setDate} = useDataListar()

    return (
        
        <div className="div-nav">
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
            <h1>Refeicoes</h1>
            <ListarData setDate={setDate} date={date}/>
            <ListarRefeicoesUser date={date}/>
        </div>
    )
}
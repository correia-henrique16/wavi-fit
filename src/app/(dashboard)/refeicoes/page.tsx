'use client'

import ListarRefeicoesUser from "@/components/refeicoes/listar/ListarRefeicoesUser"
import ListarData from "@/components/refeicoes/listar/ListarData"
import useDataListar from "@/hooks/refeicoes/useDataListar"

export default function RefeicoesPage() {

    const {date, setDate} = useDataListar()

    return (
        <main>
            <h1>Refeicoes</h1>
            <ListarData setDate={setDate} date={date}/>
            <ListarRefeicoesUser date={date}/>
        </main>
    )
}
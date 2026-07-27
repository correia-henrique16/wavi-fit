'use client'

import MostrarCalendario from "../calendario/MostrarCalendario"
import { useState } from "react"
import useAdicionarPeso from "@/hooks/peso/useAdicionarPeso"

export default function AdicionarPeso() {

    const [mostrarCalendario, setMostrarCalendario] = useState(false)
    const [dataSelecionada, setDataSelecionada] = useState<Date | undefined>(new Date())
    const {errors, handleSubmit, loading, serverError, success} = useAdicionarPeso()

    const listaErros = [
        ...(errors?.data_peso?._errors || []),
        ...(errors?.peso?._errors || []),
        ...(serverError ? [serverError] : [])
    ]

    const handleMudarData = (dia: Date | undefined) => {
        if (dia) {
            setDataSelecionada(dia)
            setMostrarCalendario(false)
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <MostrarCalendario setMostrarCalendario={setMostrarCalendario} mostrarCalendario={mostrarCalendario} dataSelecionada={dataSelecionada} handleMudarData={handleMudarData} label={'Data Peso'} name={'data_peso'}/>

            <div className="flex flex-col gap-1">
                <label htmlFor="peso-input"
                    className="text-xs font-bold text-castanho uppercase tracking-wider">
                    Peso
                </label>

                <input type="number" name="peso" id="peso-input" min="2" max="500"
                    className="w-full p-3 rounded-xl text-bordeaux font-bold text-center"
                />
            </div> 


            <div className="text-center font-semibold text-sm"> 
                {listaErros.length > 0 && (
                    <p className="text-red-500 text-sm font-medium">
                        {listaErros[0]}
                    </p>
                )}

                {success != '' && (
                    <p className="text-green-500 text-sm font-medium">
                        {success}
                    </p>
                )}
            </div>
            
            <button type="submit" 
                className="w-full py-3.5 bg-bordeaux text-bg font-bold rounded-xl hover:opacity-95 active:scale-95 transition-all cursor-pointer text-center mt-2">
                {loading ? 'A adicionar...' : 'Adicionar'}
            </button>

        </form>
    )
}
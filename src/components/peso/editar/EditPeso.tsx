import { useState } from "react"
import { TipoPeso } from "@/models/db-types/TipoPeso"
import useEditarPeso from "@/hooks/peso/useEditarPeso"
import MostrarCalendario from "@/components/calendario/MostrarCalendario"

interface ChildProps {
    peso: TipoPeso
}

export default function EditPeso({peso}: ChildProps) {

    const {errors, formData, handleSubmit, loading, serverError, success} = useEditarPeso(peso)

    const [mostrarCalendario, setMostrarCalendario] = useState<boolean>(false)

    const [dataSelecionada, setDataSelecionada] = useState<Date | undefined>(
        formData.data_peso ? new Date(`${formData.data_peso}T00:00:00`) : new Date()
    )

    const handleMudarData = (dia: Date | undefined) => {
        if (dia) {
            setDataSelecionada(dia)
            setMostrarCalendario(false)
        }
    }

    const listaErros = [
        ...(errors?.data_peso?._errors || []),
        ...(errors?.peso?._errors || []),
        ...(serverError ? [serverError] : [])
    ]


    return(
        <form onSubmit={e => handleSubmit(e, peso.id!)}
        className="bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-castanho/10 shadow-xs flex flex-col gap-4">

            <MostrarCalendario setMostrarCalendario={setMostrarCalendario} mostrarCalendario={mostrarCalendario} dataSelecionada={dataSelecionada} handleMudarData={handleMudarData} label={'Data Peso'} name={'data_peso'}/>
            
            <div className="flex flex-col gap-1">
                <label htmlFor="peso-input"
                    className="text-xs font-bold text-castanho uppercase tracking-wider">
                    Peso
                </label>

                <input type="number" name="peso" id="peso-input" min="2" max="500" defaultValue={formData.peso}
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
                {loading ? 'A Confirmar...' : 'Confirmar'}
            </button>
        </form>
    )
}
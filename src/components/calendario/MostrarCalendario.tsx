import { DayPicker } from "react-day-picker"
import { format } from "date-fns"
import { Dispatch, SetStateAction } from "react"

interface ChildProps {
    setMostrarCalendario: Dispatch<SetStateAction<boolean>>,
    mostrarCalendario: boolean,
    dataSelecionada: Date | undefined,
    handleMudarData: (dia: Date | undefined) => void
}

export default function MostrarCalendario({setMostrarCalendario, mostrarCalendario, dataSelecionada, handleMudarData}: ChildProps) {
    
    return(
        <div className="flex flex-col gap-2 my-4">
            <label className="text-sm font-medium text-gray-600">Data da Refeição</label>
            

            <button 
                type="button"
                onClick={() => setMostrarCalendario(!mostrarCalendario)}
                className=""
            >
                <span className="font-semibold text-gray-800">
                    {dataSelecionada ? format(dataSelecionada, "dd/MM/yyyy") : "Selecionar data"}
                </span>
            </button>

            {mostrarCalendario && (
                <div className="absolute z-50 mt-2 p-4 bg-white border border-gray-200 shadow-xl rounded-2xl left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0">
                    <DayPicker 
                        mode="single"
                        selected={dataSelecionada}
                        onSelect={handleMudarData}
                    />
                </div>
            )}

            <input 
                type="hidden" 
                name="data_refeicao" 
                value={dataSelecionada ? format(dataSelecionada, "yyyy-MM-dd") : ''} 
            />
        </div>
    )
}
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
            <label className="text-bordeaux font-bold">Data da Refeição</label>
            

            <button 
                type="button"
                onClick={() => setMostrarCalendario(!mostrarCalendario)}
                className="p-3! w-full bg-white border border-bordeaux/30 rounded-xl text-center active:scale-[0.99] transition-all flex justify-center items-center"
            >
                <span className="text-bordeaux font-bold text-base">
                    {dataSelecionada ? format(dataSelecionada, "dd/MM/yyyy") : "Selecionar data"}
                </span>
            </button>

            {mostrarCalendario && (
                <div className="absolute z-50 mt-2 bg-white border-2 border-bordeaux/20 shadow-xl rounded-2xl p-4 text-bordeaux left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0"
                onClick={(e) => e.stopPropagation()}
                >
                    <DayPicker 
                        mode="single"
                        selected={dataSelecionada}
                        onDayClick={handleMudarData}
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
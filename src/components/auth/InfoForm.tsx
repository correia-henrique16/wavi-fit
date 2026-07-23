'use client'

import { useInfo } from "@/hooks/auth/useInfo"
import useBuscarObjetivos from "@/hooks/userInfo/useBuscarObjetivos"
import useBuscarAtividades from "@/hooks/userInfo/useBuscarAtividades"

export default function InfoForm() {
    const {errors, loading, serverError, handleSubmit } = useInfo()
    const {objetivos, loadingObjetivo} = useBuscarObjetivos()
    const {atividades, loadingAtividade} = useBuscarAtividades()


    const listaErros = [
        ...(errors?.peso?._errors || []),
        ...(errors?.altura?._errors || []),
        ...(errors?.peso_objetivo?._errors || []),
        ...(errors?.objetivo_id?._errors || []),
        ...(errors?.atividade_id?._errors || []),
        ...(serverError ? [serverError] : [])
    ]

    if (loadingObjetivo || loadingAtividade) {
        return(
            <p>Loading ze</p>
        )
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1">
                <label htmlFor="peso-atual-input"
                 className="text-xs font-bold text-castanho uppercase tracking-wider">
                    Peso Atual
                </label>
                <input type="number" name='peso' id="peso-atual-input" min='2' max='500' step="0.1"
                 className="w-full p-3 rounded-xl text-bordeaux font-medium"
                />
                
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="altura-input"
                 className="text-xs font-bold text-castanho uppercase tracking-wider">
                    Altura (cm)
                </label>
                <input type="number" name='altura' id="altura-input" min='100' max='280'
                 className="w-full p-3 rounded-xl text-bordeaux font-medium"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="peso-objetivo-input"
                 className="text-xs font-bold text-castanho uppercase tracking-wider">
                    Peso objetivo
                </label>
                <input type="number" name='peso_objetivo' id="peso-objetivo-input" min='30' max='300' step="0.1"
                 className="w-full p-3 rounded-xl text-bordeaux font-medium"
                />
                
            </div>

            <div>
                <label htmlFor="objetivo-select"
                 className="text-xs font-bold text-castanho uppercase tracking-wider">
                    Meta Semanal
                </label>
                <select name="objetivo_id" id="objetivo-select" required className="w-full p-3 rounded-xl bg-white border border-bordeaux/30 text-bordeaux font-bold focus:outline-none">
                    {objetivos.map(obj => {
                        return(
                            <option key={obj.id} value={obj.id}>{obj.objetivo}</option>
                        )
                    })}
                </select>
            </div>

            <div>
                <label htmlFor="nivel-atividade-select"
                 className="text-xs font-bold text-castanho uppercase tracking-wider">
                    Nível de atividade
                </label>
                <select name="atividade_id" id="nivel-atividade-select" required className="w-full p-3 rounded-xl bg-white border border-bordeaux/30 text-bordeaux font-bold focus:outline-none">
                    {atividades.map(ativ => {
                        return(
                            <option key={ativ.id} value={ativ.id}>{ativ.nivel}</option>
                        )
                    })}
                </select>
            </div>

            <div> 
                {listaErros.length > 0 && (
                <p className="text-red-500 text-sm font-medium">
                    {listaErros[0]} {/* Mostra apenas o primeiro erro da lista */}
                </p>
                )}
            </div>


            <button type="submit" disabled={loading}
             className="w-full py-3.5 bg-bordeaux text-bg font-bold rounded-xl hover:opacity-95 active:scale-95 transition-all cursor-pointer text-center mt-2 disabled:opacity-50">
                {loading ? 'A carregar...' : 'Concluir'}
            </button>
        </form>
    )
}
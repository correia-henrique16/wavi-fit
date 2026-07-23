'use client'

import { useInfo } from "@/hooks/auth/useInfo"

export default function InfoForm() {
    const {errors, loading, serverError, handleSubmit } = useInfo()

    const listaErros = [
        ...(errors?.name?._errors || []),
        ...(errors?.email?._errors || []),
        ...(errors?.password?._errors || []),
        ...(errors?.confirmPassword?._errors || []),
        ...(serverError ? [serverError] : [])
    ]

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
                <input type="number" name='peso_objetivo' id="peso-objetivo-input" min='302' max='300' step="0.1"
                 className="w-full p-3 rounded-xl text-bordeaux font-medium"
                />
                
            </div>

            

            <button type="submit" disabled={loading}
             className="w-full py-3.5 bg-bordeaux text-bg font-bold rounded-xl hover:opacity-95 active:scale-95 transition-all cursor-pointer text-center mt-2 disabled:opacity-50">
                {loading ? 'A carregar...' : 'Concluir'}
            </button>
        </form>
    )
}
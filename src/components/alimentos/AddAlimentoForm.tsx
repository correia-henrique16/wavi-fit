'use client'

import useAlimentos from "@/hooks/alimentos/useAlimentos"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function AddAlimentoForm() {

    const { errors, loading, serverError, success, handleSubmit } = useAlimentos()
    
    const listaErros = [
        ...(errors?.email?._errors || []),
        ...(errors?.password?._errors || []),
        ...(serverError ? [serverError] : [])
    ]

    const searchParams = useSearchParams()
    const voltar = searchParams.get('voltar')

    const destino = voltar ?? '/refeicoes/adicionar'

    return(
        <main className="main-nav max-w-md mx-auto p-4 flex flex-col gap-4 min-h-screen">
            <Link 
                href={`${destino}?modal=show`} 
                className="bg-transparent! self-baseline text-bordeaux text-base font-semibold"
                >
                ← Voltar
            </Link>

            <h1 className="text-2xl text-center my-1">Adicionar Alimentos</h1>

            <form onSubmit={handleSubmit}
             className="bg-white/50 backdrop-blur-sm p-5 rounded-3xl border border-castanho/10 shadow-xs flex flex-col gap-4">
                
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-castanho uppercase tracking-wider" htmlFor="name-input">
                        Nome
                    </label>
                    <input type="text" name="name" id="name-input"
                        className="w-full p-3 rounded-xl text-bordeaux font-medium"
                    />
                </div>
                
                <div className="grid grid-cols-2 gap-3">

                    <div className="flex flex-col gap-1">
                        <label htmlFor="kcal-input"
                         className="text-xs font-bold text-castanho uppercase tracking-wider">
                            Calorias
                        </label>

                        <input type="number" name="kcal" id="kcal-input" min="0"
                            className="w-full p-3 rounded-xl text-bordeaux font-bold text-center"
                        />
                    </div>                   
                    
                    <div className="flex flex-col gap-1">
                        <label htmlFor="hydrates-input"
                         className="text-xs font-bold text-castanho uppercase tracking-wider">
                            Hidratos
                        </label>

                        <input type="number" name="carbohydrates" id="hydrates-input" min="0"
                            className="w-full p-3 rounded-xl text-bordeaux font-bold text-center"
                        />
                    </div>
                                        
                    <div className="flex flex-col gap-1">
                        <label htmlFor="protein-input"
                         className="text-xs font-bold text-castanho uppercase tracking-wider">
                            Proteína
                        </label>

                        <input type="number" name="protein" id="protein-input" min="0"
                            className="w-full p-3 rounded-xl text-bordeaux font-bold text-center"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label htmlFor="fat-input"
                         className="text-xs font-bold text-castanho uppercase tracking-wider">
                            Gordura
                        </label>

                        <input type="number" name="fat" id="fat-input" min="0"
                            className="w-full p-3 rounded-xl text-bordeaux font-bold text-center"
                        />
                    </div>
    
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
        </main>
        
    )

}
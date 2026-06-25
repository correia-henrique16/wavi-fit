'use client'

import useAlimentos from "@/hooks/alimentos/useAlimentos"
import Link from "next/link"

export default function AddAlimentoForm() {

    const { errors, loading, serverError, success, handleSubmit } = useAlimentos()
    
        const listaErros = [
            ...(errors?.email?._errors || []),
            ...(errors?.password?._errors || []),
            ...(serverError ? [serverError] : [])
        ]

    return(
        <main>
            <Link href='/refeicoes/adicionar?modal=show'>Voltar</Link>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name-input">Nome</label>
                <input type="text" name="name" id="name-input"/>
                
                <label htmlFor="kcal-input">Calorias</label>
                <input type="number" name="kcal" id="kcal-input" min="0"/>
                
                <label htmlFor="hydrates-input">Hidratos</label>
                <input type="number" name="carbohydrates" id="hydrates-input" min="0"/>
                
                <label htmlFor="protein-input">Proteína</label>
                <input type="number" name="protein" id="protein-input" min="0"/>
                
                <label htmlFor="fat-input">Gordura</label>
                <input type="number" name="fat" id="fat-input" min="0"/>

                <div> 
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
                
                <button type="submit">
                    {loading ? 'A adicionar...' : 'Adicionar'}
                </button>
            </form>
        </main>
        
    )

}
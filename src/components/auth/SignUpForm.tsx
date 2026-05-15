'use client'

import { useSignUp } from "@/hooks/auth/useSignUp"

export default function SignUpForm() {
    const {errors, loading, serverError, handleSubmit } = useSignUp()

    const listaErros = [
        ...(errors?.name?._errors || []),
        ...(errors?.email?._errors || []),
        ...(errors?.password?._errors || []),
        ...(errors?.confirmPassword?._errors || []),
        ...(serverError ? [serverError] : [])
    ]

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name-input">Nome</label>
                <input type="text" name='name' id="name-input"
                />
                
            </div>

            <div>
                <label htmlFor="email-input">Email</label>
                <input type="email" name='email' id="email-input"
                />
            </div>

            <div>
                <label htmlFor="password-input">Password</label>
                <input type="password" name='password' id="password-input"
                />
            </div>

            <div>
                <label htmlFor="confirm-input">Confirm Password</label>
                <input type="password" name='confirmPassword' id="confirm-input"
                />
            </div>

            <div> 
                {listaErros.length > 0 && (
                <p className="text-red-500 text-sm font-medium">
                    {listaErros[0]} {/* Mostra apenas o primeiro erro da lista */}
                </p>
                )}
            </div>

            <button type="submit" disabled={loading}>
                {loading ? 'A carregar...' : 'Registar'}
            </button>
        </form>
    )
}
'use client'

import { useLogin } from "@/hooks/auth/useLogin"


export default function LoginForm() {

    const { errors, loading, serverError, handleSubmit } = useLogin()

    const listaErros = [
        ...(errors?.email?._errors || []),
        ...(errors?.password?._errors || []),
        ...(serverError ? [serverError] : [])
    ]

    return(
        <form onSubmit={handleSubmit}>
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
                {listaErros.length > 0 && (
                <p className="text-red-500 text-sm font-medium">
                    {listaErros[0]} {/* Mostra apenas o primeiro erro da lista */}
                </p>
                )}
            </div>

            <button type="submit" disabled={loading}>
                {loading ? 'A carregar...' : 'Entrar'}
            </button>

            
        </form>
    )
}
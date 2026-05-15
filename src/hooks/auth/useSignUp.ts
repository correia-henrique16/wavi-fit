import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignupSchema } from "@/models/User";

export function useSignUp() {
    const router = useRouter()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm: ''
    })

    const [errors, setErrors] = useState<any>({})
    const [serverError, setServerError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)


        //Captura todos os dados do formulário automaticamente
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())

        const validacao = SignupSchema.safeParse(data)

        if (!validacao.success) {
            setErrors(validacao.error.format());
            setLoading(false)
            return
        }

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify(validacao.data)
            })

            const respostaApi = await response.json()

            if (!response.ok) {
                const message = respostaApi.detalhes || respostaApi.error || ''

                if (message.includes('User already registered')){
                    setServerError('Email já registado')
                } else {
                    setServerError('Erro de servidor ao registar')
                }
                
            } else {
                router.push('/')
            }
        } catch (error) {
            setServerError('Erro de ligação')
        } finally {
            setLoading(false)
        }
    }

    return {
        formData,
        errors,
        loading,
        serverError,
        handleSubmit
    }
}


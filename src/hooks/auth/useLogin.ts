import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoginSchema } from "@/models/User"

export function useLogin() {

    const router = useRouter()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
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

        const validacao = LoginSchema.safeParse(data)

        if (!validacao.success) {
            setErrors(validacao.error.format());
            setLoading(false)
            return
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(validacao.data)
            })

            const respostaApi = await response.json()

            if (!response.ok) {
                const message = respostaApi.detalhes || respostaApi.error || ''

                if (message.includes('Invalid login credentials')) {
                    setServerError('Password errada. Tente Novamente')
                } else {
                    setServerError('Erro de servidor ao logar')
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
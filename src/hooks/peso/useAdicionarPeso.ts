import { useState } from "react";
import { useRouter } from "next/navigation";
import { PesoSchema } from "@/models/input/Peso";

export default function useAdicionarPeso() {
    const router = useRouter()

    const [formData, setFormData] = useState({
        data_peso: '',
        peso: ''
    })

    const [success, setSuccess] = useState('')
    const [errors, setErrors] = useState<any>({})
    const [serverError, setServerError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        
        // e.preventDefault()
        const form = e.currentTarget
        setLoading(true)

        //Captura todos os dados do formulário automaticamente
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())

        const validacao = PesoSchema.safeParse(data)

        if (!validacao.success) {
            setErrors(validacao.error.format());
            setLoading(false)
            return
        }

        try {
            const response = await fetch('/api/peso', {
                method: 'POST',
                body: JSON.stringify(validacao.data)
            })

            if (!response.ok) {
                setServerError('Erro no servidor')
            } else {
                form.reset();
                setErrors({});
                setServerError('');
                setSuccess('Peso adicionado!')
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
        success,
        handleSubmit
    }
}
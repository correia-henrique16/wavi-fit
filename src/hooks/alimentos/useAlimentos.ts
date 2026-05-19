import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlimentoSchema } from "@/models/Alimento";

export default function useAlimentos() {
    const router = useRouter()

    const [formData, setFormData] = useState({
        name: '',
        kcal: '',
        protein: '',
        carbohydrates: '',
        fat: ''
    })

    const [success, setSuccess] = useState('')
    const [errors, setErrors] = useState<any>({})
    const [serverError, setServerError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault()
        const form = e.currentTarget
        setLoading(true)

        //Captura todos os dados do formulário automaticamente
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())

        const validacao = AlimentoSchema.safeParse(data)

        if (!validacao.success) {
            setErrors(validacao.error.format());
            setLoading(false)
            return
        }

        try {
            const response = await fetch('/api/alimentos', {
                method: 'POST',
                body: JSON.stringify(validacao.data)
            })

            if (!response.ok) {
                setServerError('Erro no servidor')
            } else {
                form.reset();
                setErrors({});
                setServerError('');
                setSuccess('Alimento adicionado!')
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
import { useState } from "react";
import { TipoPeso } from "@/models/db-types/TipoPeso";
import { PesoSchema } from "@/models/input/Peso";

export default function useEditarPeso(peso: TipoPeso) {

    console.log(peso)

    const [formData, setFormData] = useState({
        data_peso: peso.data_peso,
        peso: peso.peso
    })

    const [success, setSuccess] = useState('')
    const [errors, setErrors] = useState<any>({})
    const [serverError, setServerError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, idPeso: number) => {
        e.preventDefault()
        const form = e.currentTarget
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())

        const validacao = PesoSchema.safeParse(data)

        if (!validacao.success) {
            setErrors(validacao.error.format());
            setLoading(false)
            return
        }

        try {
            const response = await fetch(`/api/peso/${idPeso}`, {
                method: 'PUT',
                body: JSON.stringify(validacao.data)
            })

            if (!response.ok) {
                setServerError('Erro no servidor')
            } else {
                form.reset();
                setErrors({});
                setServerError('');
                setSuccess('Peso editado!')
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
import { useState } from "react";
import { RefeicaoSchema } from "@/models/input/Refeicao";
import { AlimentoRefeicao } from "@/models/input/AlimentoRefeicao";
import { Refeicao } from "@/models/db-types/Refeicao";

export default function useEditarRefeicoes(refeicao: Refeicao) {

    const [formData, setFormData] = useState({
        name: refeicao.name,
        tipo_refeicao: refeicao.tipo_refeicao,
        data_refeicao: refeicao.data_refeicao
    })

    const [success, setSuccess] = useState('')
    const [errors, setErrors] = useState<any>({})
    const [serverError, setServerError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, alimentosRefeicao: AlimentoRefeicao[], idRefeicao: number) => {
        e.preventDefault()
        const form = e.currentTarget
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())

        const alimentos = alimentosRefeicao.map((item) => ({
            alimento_id: item.alimento?.id ,
            quantidade: item.quantidade
        }))

        const dataCompleted = {...data, alimentos}

        const validacao = RefeicaoSchema.safeParse(dataCompleted)

        if (!validacao.success) {
            setErrors(validacao.error.format());
            setLoading(false)
            return
        }

        try {
            const response = await fetch(`/api/refeicoes/${idRefeicao}`, {
                method: 'PUT',
                body: JSON.stringify(validacao.data)
            })

            if (!response.ok) {
                setServerError('Erro no servidor')
            } else {
                form.reset();
                setErrors({});
                setServerError('');
                setSuccess('Refeição editada!')
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
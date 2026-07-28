import { useState } from "react";
import { TipoUserInfo } from "@/models/db-types/TipoUserInfo";
import { UserInfoSchema } from "@/models/input/User";

export default function useEditarProfile(profile: TipoUserInfo, name: string) {


    const [formData, setFormData] = useState({
        name : name,
        nascimento : profile.data_nascimento,
        sexo : profile.sexo,
        peso_inicial : profile.peso_inicial,
        peso_objetivo : profile.peso_objetivo,
        altura: profile.altura,
        objetivo_id : profile.objetivo_id,
        atividade_id : profile.atividade_id,
    })

    const [success, setSuccess] = useState('')
    const [errors, setErrors] = useState<any>({})
    const [serverError, setServerError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())

        const dadosCompletos = {...data, name}

        const validacao = UserInfoSchema.safeParse(dadosCompletos)

        if (!validacao.success) {
            setErrors(validacao.error.format());
            console.log(validacao.error)
            setLoading(false)
            return
        }

        try {
            const response = await fetch(`/api/userInfo`, {
                method: 'PUT',
                body: JSON.stringify(validacao.data)
            })

            if (!response.ok) {
                setServerError('Erro no servidor')
            } else {
                form.reset();
                setErrors({});
                setServerError('');
                setSuccess('Perfil editado!')
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
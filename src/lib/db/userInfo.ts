import { createClient } from "../supabase/server";
import { getRequiredUser } from "../supabase/user";
import { TypeUserInfo } from "@/models/input/User";

export async function getUserInfo() {
    const supabase = await createClient()
    const user = await getRequiredUser()

    const {data, error } = await supabase
    .from('user_info')
    .select('altura, peso_objetivo, peso_inicial, objetivo_id(*), atividade_id(*), data_nascimento, sexo')
    .eq('user_id', user.id)
    .single()


    if (error) {
        console.error('Erro ao buscar info: ', error);
        return (error)
    } else {
        return data
    }
}

export async function editUserInfo(dados: TypeUserInfo) {
    const supabase = await createClient()
    const user= await getRequiredUser()

    const {altura, peso_inicial, peso_objetivo, atividade_id, objetivo_id, sexo, nascimento, name} = dados

    console.log(name)
    const { data, error } = await supabase.auth.updateUser({
        data: { full_name: name }
    })

    if (error) {
        throw new Error(error.message)
    } else {
        const { data, error } = await supabase
        .from('user_info')
        .update(([{
            altura: altura,
            peso_objetivo: peso_objetivo,
            peso_inicial: peso_inicial,
            objetivo_id: objetivo_id,
            atividade_id: atividade_id,
            user_id: user.id,
            data_nascimento: nascimento,
            sexo: sexo
        }]))
        .eq('user_id', user.id)
        .select()

        if (error) {
            throw new Error(error.message)
        } else {
            return data
        }
    }
}   
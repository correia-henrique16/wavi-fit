import { createClient } from "../supabase/server";
import { TypeAlimento } from "@/models/input/Alimento";
import { getRequiredUser } from "../supabase/user";

export async function getAlimentos() {
    const user = await getRequiredUser()
    const supabase = await createClient()

    const {data, error} = await supabase
    .from('alimentos')
    .select('id, name, kcal, protein, carbohydrates, fat, verified')
    .or(`verified.eq.true, user_id.eq.${user.id}`)
    .order('name', {ascending: true})

    if (error) {
        console.error('Erro ao buscar alimentos: ', error);
        return error
    } else {
        return data
    }
}

export async function addAlimento(novoAlimento: TypeAlimento) {
    const user = await getRequiredUser()

    const supabase = await createClient()
    
    const {data, error} = await supabase
    .from('alimentos')
    .insert ([{
        ...novoAlimento,
        verified: false,
        user_id: user.id
    }])
    .select()

    if (error) {
        throw new Error(error.message)
    } else {
        return data
    }
}

export async function delAlimento(idAlimento: number) {
    const supabase = await createClient()
    const user = await getRequiredUser()
    
    const { data, error } = await supabase
    .from('alimentos')
    .delete()
    .eq('id', idAlimento)
    .eq('user_id', user.id)
    .select()

    if (error) {
        throw new Error(error.message)
    } else {
        return (data)
    }
}

export async function editAlimento(idAlimento: number, novosDados: TypeAlimento) {
    const supabase = await createClient()
    const user = await getRequiredUser()

    const {data, error} = await supabase
    .from('alimentos')
    .update(novosDados)
    .eq('id', idAlimento)
    .eq('user_id', user.id)
    .select()


    if (error) {
        throw new Error(error.message)
    } else {
        return data
    }
}
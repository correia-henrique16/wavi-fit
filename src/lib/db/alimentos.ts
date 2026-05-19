import { createClient } from "../supabase/server";
import { TypeAlimento } from "@/models/Alimento";
import { getRequiredUser } from "../supabase/user";

export async function getAlimentos() {
    const supabase = await createClient()

    const {data, error} = await supabase
    .from('alimentos')
    .select('*')
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
        console.log('Adicionado : ', novoAlimento)
        return data
    }
}
import { createClient } from "../supabase/server";
import { getRequiredUser } from "../supabase/user";

export async function getUserInfo() {
    const supabase = await createClient()
    const user = await getRequiredUser()

    const {data, error } = await supabase
    .from('user_info')
    .select('altura, peso_objetivo, objetivo_id, atividade_id, data_nascimento, sexo')
    .eq('user_id', user.id)


    if (error) {
        console.error('Erro ao buscar info: ', error);
        return (error)
    } else {
        return data
    }
}
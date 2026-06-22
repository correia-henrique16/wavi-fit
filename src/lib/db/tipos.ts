import { createClient } from "../supabase/server";

export async function getTiposRefeicao() {
    const supabase = await createClient()

    const {data, error } = await supabase
    .from('tipo_refeicao')
    .select()


    if (error) {
        console.error('Erro ao buscar tipos: ', error);
        return (error)
    } else {
        return data
    }
}
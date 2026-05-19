import { createClient } from "../supabase/server";
import { TypeRefeicao } from "@/models/Refeicao";
import { getRequiredUser } from "../supabase/user";

export async function getRefeicoesUser() {
    const supabase = await createClient()
    const user = await getRequiredUser()

    const {data: refeicoes, error: erroRefeicoes} = await supabase
    .from('refeicoes')
    .select('*')
    .eq('user_id', user.id)
    .order('name', {ascending: true})

    if (erroRefeicoes) {
        console.error('Erro ao buscar refeições: ', erroRefeicoes);
        return (erroRefeicoes)
    }

    if (!refeicoes || refeicoes.length === 0) return [];

    const idsDasRefeicoes = refeicoes.map(r => r.id);

    const {data: alimentosRefeicao, error: erroAlimentosRefeicao} = await supabase
    .from('refeicao_alimentos')
    .select('*, alimentos(*)')
    .in('refeicao_id', idsDasRefeicoes)
    .order('id', {ascending: true})

    if (erroAlimentosRefeicao) {
        console.error('Erro ao buscar os alimentos das refeições: ', erroAlimentosRefeicao)
        return (erroAlimentosRefeicao)
    }

    const refeicoesFinal = refeicoes.map(refeicao => {
        return {
            ...refeicao, 
            alimentos: alimentosRefeicao.filter(alimento => alimento.refeicao_id == refeicao.id) 
        }
    }) 

    console.log(refeicoesFinal)

    return refeicoesFinal
}
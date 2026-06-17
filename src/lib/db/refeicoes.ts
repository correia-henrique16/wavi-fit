import { createClient } from "../supabase/server";
import { TypeRefeicao } from "@/models/Refeicao";
import { getRequiredUser } from "../supabase/user";

export async function getRefeicoesUser() {
    const supabase = await createClient()
    const user = await getRequiredUser()

    const {data: refeicoes, error: erroRefeicoes} = await supabase
    .from('refeicoes')
    .select('*, tipo_refeicao(tipo)')
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

export async function addRefeicao(novaRefeicao: TypeRefeicao) {
    const supabase = await createClient()
    const user = await getRequiredUser()

    const {alimentos, ...refeicao} = novaRefeicao


    const {data, error} = await supabase
    .from('refeicoes')
    .insert(([{
        ...refeicao,
        user_id: user.id
    }]))
    .select()

    if (error) {
        throw new Error(error.message)
    } else {
        
        const id = data[0].id
        const {error} = await supabase
        .from('refeicao_alimentos')
        .insert(alimentos.map(alimento => ({
            refeicao_id: id,
            alimento_id: alimento.alimento_id,
            quantidade: alimento.quantidade
        })))

        if(error) {
            throw new Error(error.message)
        } else {
            return (data)
        }
    }

}

export async function delRefeicao(idRefeicao: number) {
    const supabase = await createClient()
    const user = await getRequiredUser()
    
    const { data, error } = await supabase
    .from('refeicoes')
    .delete()
    .eq('id', idRefeicao)
    .eq('user_id', user.id)
    .select()

    if (error) {
        throw new Error(error.message)
    } else {
        return (data)
    }
}

export async function editRefeicao(idRefeicao: number, novosDados: TypeRefeicao) {
    const supabase = await createClient()
    const user = await getRequiredUser()

    const {alimentos, ...dadosRefeicao} = novosDados

    const {data, error} = await supabase
    .from('refeicoes')
    .update(dadosRefeicao)
    .eq('id', idRefeicao)
    .eq('user_id', user.id)
    .select()

    if (error) {
        throw new Error(error.message)
    } else {
        const responseDelete = await supabase
        .from('refeicao_alimentos')
        .delete()
        .eq('refeicao_id', data[0].id)

        const responseInsert = await supabase
        .from('refeicao_alimentos')
        .insert(alimentos.map(alimento => ({
            refeicao_id: data[0].id,
            alimento_id: alimento.alimento_id,
            quantidade: alimento.quantidade
        })))

        return data
    }
}
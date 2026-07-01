import { createClient } from "../supabase/server";
import { TypeRefeicao } from "@/models/input/Refeicao";
import { getRequiredUser } from "../supabase/user";

export async function getRefeicoesUser() {
    const supabase = await createClient()
    const user = await getRequiredUser()

    const {data, error} = await supabase
    .from('refeicoes')
    .select('*, tipo_refeicao(*), refeicao_alimentos(*, alimentos(*))')
    .eq('user_id', user.id)
    .order('id', {ascending: true})

    if (error) {
        console.error('Erro ao buscar os alimentos das refeições: ', error)
        return (error)
    }

    return data
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
            quantidade: alimento.quantidade,
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
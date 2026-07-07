import AddRefeicaoClient from "@/components/refeicoes/adicionar/AddRefeicaoClient"

interface ChildProps {
    searchParams: Promise<{modal?: string}>
}

export default async function AdicionarRefeicaoPage({searchParams}: ChildProps) {

    const {modal} = await searchParams

    return(
        <AddRefeicaoClient modal={modal}/>
    )
}
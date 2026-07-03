import { useRouter } from "next/navigation"

export default async function apagarRefeicao(idRefeicao: number, router: ReturnType<typeof useRouter>) {

    try {
        const response = await fetch(`/api/refeicoes/${idRefeicao}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            console.log('deu raia')
        } else {
            router.push('/refeicoes')
        }
    } catch (error) {
        throw error
    }
}
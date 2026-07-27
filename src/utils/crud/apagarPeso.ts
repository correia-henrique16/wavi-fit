import { useRouter } from "next/navigation"

export default async function apagarPeso(idPeso: number, router: ReturnType<typeof useRouter>) {

    try {
        const response = await fetch(`/api/peso/${idPeso}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            console.error('Erro ao apagar peso')
        } else {
            router.push('/peso')
        }
    } catch (error) {
        throw error
    }
}
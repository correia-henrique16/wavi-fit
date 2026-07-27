export async function logout() {
    // import { useRouter } from "next/navigation"
    
    // export default async function apagarPeso(idPeso: number, router: ReturnType<typeof useRouter>) {
    
    try {
        const response = await fetch(`/api/auth/logout`)

        if (!response.ok) {
            console.error('Erro ao dar logout')
        } else {
            window.location.href = '/'
        }
    } catch (error) {
        console.error('Erro no logout: ', error)
    }
}
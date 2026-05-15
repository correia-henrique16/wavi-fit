const fetchAlimentos = async () => {
    const response = await fetch('http://localhost:3000/api/alimentos')

    if(!response.ok) {
        throw new Error('Erro ao buscar alimentos')
    }

    return response.json()
}


export default async function AlimentosPage() {
    const alimentos = await fetchAlimentos()

    return (
        <ul>
            {alimentos.map((alimento : any) => (
                <li key={alimento.id}>
                    <h1>{alimento.name}</h1>
                    <p>{alimento.kcal}</p>
                </li>
            ))}
        </ul>
    )
}
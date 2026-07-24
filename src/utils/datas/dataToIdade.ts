export default function dataToIdade(data_nascimento: string) {
    const nascimento = new Date(data_nascimento)
    const hoje = new Date()
    let idade = hoje.getFullYear() - nascimento.getFullYear()
    const aniversarioPassou = (hoje.getMonth() >= nascimento.getMonth() && hoje.getDate() >= nascimento.getDate())

    if (!aniversarioPassou) idade--

    const aniversarioHoje = (hoje.getMonth() == nascimento.getMonth() && hoje.getDate() == nascimento.getDate())

    return {
        idade, aniversarioHoje
    }
}   
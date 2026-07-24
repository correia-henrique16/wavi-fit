export default function datasDias(date: string) {
    const [ano, mes, dia] = date.split('-').map(Number)
    const proximaData = new Date(ano, mes - 1, dia + 1)
    const anteriorData = new Date(ano, mes - 1, dia - 1)
    const dataSelecionada = date

    const proximaDataString = `${proximaData.getFullYear()}-${String(proximaData.getMonth() + 1).padStart(2, '0')}-${String(proximaData.getDate()).padStart(2, '0')}`
    const anteriorDataString = `${anteriorData.getFullYear()}-${String(anteriorData.getMonth() + 1).padStart(2, '0')}-${String(anteriorData.getDate()).padStart(2, '0')}`

    const hoje = new Date()
    const amanha = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 1)
    const ontem = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - 1)

    const hojeString = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`
    const ontemString = `${ontem.getFullYear()}-${String(ontem.getMonth() + 1).padStart(2, '0')}-${String(ontem.getDate()).padStart(2, '0')}`
    const amanhaString = `${amanha.getFullYear()}-${String(amanha.getMonth() + 1).padStart(2, '0')}-${String(amanha.getDate()).padStart(2, '0')}`

    const getLabel = (strData: string) => {
        if (strData === hojeString) return 'Hoje'
        if (strData === ontemString) return 'Ontem'
        if (strData === amanhaString) return 'Amanhã'

        const [ano, mes, dia] = strData.split('-').map(Number)
        return (`${dia}/${mes}`)
    }

    return {
        dataSelecionada, proximaDataString, anteriorDataString, getLabel, hojeString
    }
}
type PontoDTO = {
    id: number,
    titulo?: string,
    lat: number,
    long: number
}

type editarPontoBody = {
    titulo?: string,
}
import axios, { AxiosPromise } from "axios"
import { FoodData } from "../interface/FoodData"
import { useQuery } from "react-query"

const API_URL = 'http://localhost:8080'

const fetchData = async (): AxiosPromise<FoodData[]> => {//2 pontos para declaracao de retorno da arrow function, retornando algo do tipo AxiosPromise
    const response = axios.get(API_URL + '/food')
    return response
}

export function useFoodData(){
    const query = useQuery({
        queryFn: fetchData,         //funcao utilizada para fazer o fetch de dados
        queryKey: ['food-data'],    //identificacao unica da requisicao
        retry: 2                    //numero de tentativas de execucao
    })

    return { //retorna todo o query e renomear o DATA pq o proprio react query ja adiciona o dado vindo do backend dentro do obj data e o axios tb, e para n ficar duplicado. Cortamos caminho no obj de retorno
        ...query,
        data: query.data?.data
    }
}
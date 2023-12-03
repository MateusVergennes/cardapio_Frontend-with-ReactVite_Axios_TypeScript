//funcao para inserir dados no banco

import axios, { AxiosPromise } from "axios"
import { FoodData } from "../interface/FoodData"
import { useMutation, useQueryClient } from "react-query"

const API_URL = 'http://localhost:8080'

const postData = async (data: FoodData): AxiosPromise<any> => {//2 pontos para declaracao de retorno da arrow function, sem retorno, pois do tipo post, so precisamos saber se foi com sucesso (codigo: 200 ok)
    const response = axios.post(API_URL + '/food', data)
    return response
}

export function useFoodDataMutate(){
    const queryClient = useQueryClient()
    const mutate = useMutation({     //funcao para o POST
        mutationFn: postData,      //funcao utilizada para fazer o POST de dados
        retry: 2,                    //numero de tentativas de execucao em caso de erro
        onSuccess: () => {  //funcao callback
            queryClient.invalidateQueries(['food-data'])//to pegando o query Client que esta em volta de toda a aplicacao, quero que ele invalide as QUERYs que tenham a chave 'food-data'
                                                            //estou fazendo isso, pois invalidando os dados presentes na aplicacao, a mesma fara outro GET atualizando assim sua lista de dados
                                                            //assim a cada POST ele destauliza os dados da pagina para que ela possa atualizar os dados com outro GET
        }
    })

    return mutate
}
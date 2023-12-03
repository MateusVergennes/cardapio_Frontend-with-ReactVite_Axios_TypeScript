import { useEffect, useState } from 'react'
import { useFoodDataMutate } from '../../../hooks/useFoodDataMutate'
import { FoodData } from '../../../interface/FoodData'

import './modal.css'

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void//any pq pode ser string e outros tipods de valores, pois tem imagem, preco, id, titulo
}

const Input = ({label, value, updateValue} : InputProps) => {
    return(
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input> {/*updateValue so vai pegar o valor que esta dentro do input*/}
        </>
    )
}

interface ModalProps {
    closeModal(): void
}


export function CreateModal({ closeModal }: ModalProps){
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState("")

    const { mutate, isSuccess, isLoading } = useFoodDataMutate()//funcao que faz o submit dos dados

    const submit = () => {
        const foodData: FoodData = {
            title,
            price,
            image
        }
        mutate(foodData)
    }

    useEffect(() => {
        if(!isSuccess) return 
        
        closeModal()
    }, [isSuccess])


    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo item no Cardapio</h2>
                <form className="input-container">
                    <Input label="title" value={title} updateValue={setTitle} />
                    <Input label="price" value={price} updateValue={setPrice} />
                    <Input label="image" value={image} updateValue={setImage} />
                </form>
                <button onClick={submit} className='btn-secondary'>
                    {isLoading ? 'Postando...'  : 'Postar'}
                </button>
            </div>
        </div>
    )
}
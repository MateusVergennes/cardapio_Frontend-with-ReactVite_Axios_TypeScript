import { useState } from 'react'
import './App.css'
import { Card } from './components/card/card'
import { CreateModal } from './components/card/create-modal/create-modal'
import { useFoodData } from './hooks/useFoodData'

function App() {
  const { data } = useFoodData()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  return (
    <div className='container'>
      <h1>Cardapio</h1>
      <div className='card-grid'>
        {/*ponto de interrogacao para indicacao que pode ser undefined, se for undefined nao faz o retorno abaixo*/}
        {data?.map(foodData => 
          <Card 
            price={foodData.price} 
            title={foodData.title} 
            image={foodData.image} 
          />)}
      </div>
      {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
      <button onClick={handleOpenModal}>Adicionar</button>
    </div>
  )
}

export default App

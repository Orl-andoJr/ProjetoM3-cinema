import React, { useEffect, useState } from 'react'
import { RequisitionAxios } from '../service/connection'

function CombosInfo() {
  const [data, setData] = useState(undefined)

  useEffect(() => {
    async function requistinData() {
      try {
        const connection = await RequisitionAxios.Get(window.location.pathname)
        setData(connection.data)
      } catch (error) {
        console.log(error)
      }
    }
    requistinData()
  }, [])

  console.log(data)
  return (
    <main className='text-white bg-dark'>
      {data ? (
        <div>
          <img src={data.banner} alt="cartaz" />
          <p>Nome: {data.nome}</p>
          <p>Preço: {data.preco}</p>
          <p>descrição: {data.descricao}</p>

        </div>
      ) : (
        <div>

        </div>
      )}
    </main>
  )
}

export default CombosInfo
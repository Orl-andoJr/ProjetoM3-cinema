import React, { useEffect, useState } from 'react'
import { RequisitionAxios } from '../service/connection'

function MovieInfo() {
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
          <p>Nome da Série: {data.nome}</p>
          <p>Descrição: {data.descricao}</p>
          <p>Duração: {data.duracao}</p>
          <p>Genero: {data.genero}</p>
        </div>
      ) : (
        <div>

        </div>
      )}
    </main>
  )
}

export default MovieInfo
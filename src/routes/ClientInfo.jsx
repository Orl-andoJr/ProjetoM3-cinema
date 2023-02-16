import React, { useEffect, useState } from 'react'
import { RequisitionAxios } from '../service/connection'
import { useNavigate } from 'react-router-dom'
import { User } from '../entities/User'

function MovieInfo() {
  const navigate = useNavigate()
  const [data, setData] = useState(undefined)
  const [isEditing, setIsEditing] = useState(false)
  const [deleteUser, setDeleteUser] = useState(false)
const [editableValues, setEditableValues] = useState({
  name: "",
  email: "",
  password: ""
})

  useEffect(() => {
    async function requistinData() {
      try {
        const connection = await RequisitionAxios.Get(window.location.pathname)
        setData(connection.data)
        if(data) {
          setEditableValues({name: data.nome, email: data.email, password: data.password})
        }
      } catch (error) {
        console.log(error)
      }
    }
    requistinData()
  }, [isEditing])

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (event) => {
    event.preventDefault();
    const editUser = new User(editableValues.name, editableValues.email, editableValues.password)
    const connection = await RequisitionAxios.Put(window.location.pathname, editUser)
    if(connection.status == 200) {
      setIsEditing(false)
    }

  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleDeleteUser = () => {
    setDeleteUser(true)

  }

  if (deleteUser) {
    return (
      <main className='bg-dark'>
        <h2>Certeza que deseja deletar o cadastro?</h2>
        <button className='btn btn-danger' onClick={handleDelete}>Deletar</button>
        <button className='btn btn-light ms-5' onClick={() => setDeleteUser(false)}>Cancelar</button>
      </main>
    )
  }

  async function handleDelete() {
    const connection = await RequisitionAxios.Delete(window.location.pathname)
    if (connection.status == 200) {
      sessionStorage.clear()
      alert("cadastro deletado.")
      return navigate('/')
    }
  }

  console.log(data)
  return (
    <main className='text-white bg-dark'>
      {!isEditing ? (
        <div>
          {data ? (
            <div>
              <p>{data.id}</p>
              <p>Nome completo: {data.nome}</p>
              <p>email: {data.email}</p>
              <input type="password" readOnly value={data.password} className="form-control w-25" />
              <div>
                <button className='btn btn-light mt-4 mx-2' onClick={handleEditClick}>Editar cadastro</button>

              </div>
              <div>
                <button className='btn btn-danger mt-4 mx-2' onClick={handleDeleteUser}>Deletar Cadastro</button>
              </div>

            </div>
          ) : (
            <div>
              <h5>Carregando informações...</h5>
            </div>
          )}
        </div>
      ) : (
        <div>
          <section>
            <input type="text" value={editableValues.name} onChange={(event) => setEditableValues((prevState) => ({ ...prevState, name: event.target.value }))} />
            <input type="text" value={editableValues.email} onChange={(event) => setEditableValues((prevState) => ({ ...prevState, email: event.target.value }))} />
            <input type="password" value={editableValues.password} onChange={(event) => setEditableValues((prevState) => ({ ...prevState, password: event.target.value }))} />
          </section>
          <div className='mt-5'>
            <button className='btn-success btn mx-5 mt-4' onClick={handleSaveClick}>Salvar</button>
            <button className='btn-light btn mx-5 mt-4' onClick={handleCancelClick}>Cancelar</button>
          </div>
        </div>
      )}

    </main >
  )
}

export default MovieInfo
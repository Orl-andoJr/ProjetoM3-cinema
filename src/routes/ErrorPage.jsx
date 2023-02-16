import React from 'react'
import { Link } from 'react-router-dom'
function ErrorPage() {
  return (
    <div>
        <h1>Página não encontrada.</h1>
        <Link to='/'>Voltar para Home</Link>
    </div>
  )
}

export default ErrorPage
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Authenticator() {
    const navigate = useNavigate()

    useEffect(() => {
        function CheckAuth() {
            const auth = sessionStorage.getItem('authenticated') || 0
            if (auth != 0) {
                navigate(`/clientes/${auth}`)
                console.log(auth)
            }
            else {
                navigate('/login')
            }
        }
CheckAuth()
    })

    return (
        <div>Carregando....</div>
    )
}

export default Authenticator
import Navbar from "./Navbar"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import LogedNavbar from "./LogedNavbar"
function Header() {
  const [session, setSession] = useState(false)
  const [handleRefresh, setHandleRefresh] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    function CheckAuth() {
      const auth = sessionStorage.getItem('authenticated') || 0
      if (auth != 0) {
        setSession(true)
      }
      else {
        setSession(false)
      }
    }
    CheckAuth()
  },)


  return (
    <header>
      {session ? (<div>
        <div>
          <LogedNavbar onClick={(e) => {
            sessionStorage.clear()
            navigate('/login')
            setHandleRefresh(handleRefresh + 1)
          }} />
        </div>
      </div >) : (<div>
        <div>
          <Navbar />
        </div>
      </div>)}
    </header>


  )

}

export default Header
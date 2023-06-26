
import { NavLink } from 'react-router-dom'
import "./error.scss"

const Error = () => {
  return (
  <>
    <div className="errorpage">
        <h2>404</h2>
        <p>PAGE ERROR!</p>
        <button><NavLink to="/admin">HOME</NavLink></button>
    </div>
  </>
  )
}

export default Error
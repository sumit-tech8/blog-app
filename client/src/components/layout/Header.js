import React from 'react'
import {NavLink,Link} from 'react-router-dom'
import SearchInput from '../form/SearchInput'
import {useAuth} from '../../context/auth'
import toast from 'react-hot-toast'


const Header = () => {
  const [auth,setAuth] = useAuth();

  const handlelogout = () => {
    setAuth({
      ...auth,
      user:null,
      token:"",
    })
    localStorage.removeItem('auth')
    toast.success('Logout Successfully')
  }
  return (
    <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to="" className="navbar-brand ml-3">YOUR-BLOGS</Link>
      <ul className="navbar-nav ms-auto mb-2 me-3 mb-lg-0">
        <SearchInput/>
        <li className="nav-item">
          <NavLink to="/" className="nav-link " aria-current="page">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about" className="nav-link" >About</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/policy" className="nav-link" href="#">Policy</NavLink>
        </li>
         {!auth.user ? (<>
        <li className="nav-item">
          <NavLink to="/register" className="nav-link" >Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/login" className="nav-link" >Login</NavLink>
        </li>
          </>) : 
          (<>
        <li className="nav-item dropdown me-5">
          <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {auth?.user?.name}
          </NavLink>
          <ul className="dropdown-menu">
            <li><NavLink to="/" className="dropdown-item">Dashboard</NavLink></li>
            <li><hr className="dropdown-divider" /></li>
            <li><NavLink onClick={handlelogout}  to="/login" className="dropdown-item" >Logout</NavLink>
           </li>
         </ul>
        </li>
          </>)
        }
      </ul>
      {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
    </div>
  </div>
</nav>

    </>
  )
}

export default Header

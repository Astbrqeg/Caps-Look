import style from './style.module.scss'
import { Link } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'
import { AiOutlineSetting } from 'react-icons/ai'
import api from '../../config'
import { getRole, isAuthorized } from '../../utils/useAuth'

const Sidebar = () => {
  const logToken = getRole(document.cookie.valueOf('userToken'))
  const logout = async () => {
    try {
      await fetch(`${api.apiRequest}/Logout`, {
        credentials: 'include'
      })
      window.location.href = '/'
    } catch (err) {}
  }

  if (
    isAuthorized(logToken, [
      'project_manager',
      'resource_manager',
      'scrum_master'
    ])
  ) {
    return (
      <div>
        <nav className={style.sidebar}>
          <Link to="/home" className={style.link}>
            Home
          </Link>
          <Link to="/Sites" className={style.link}>
            Sites
          </Link>
          <Link to="/Projects" className={style.link}>
            Projects
          </Link>

          <Link to="/Absence" className={style.link}>
            Absence
          </Link>

          <Link to="/Employes" className={style.link}>
            Employees
          </Link>

          <Link to="/Scrums" className={style.link}>
            Scrums
          </Link>
          <Link to="/Capacity" className={style.link}>
            Capacity
          </Link>
          <Link to="/cadence" className={style.link}>
            Cadence
          </Link>
          <hr className={style.cutter} />
          <Link to="/Settings" className={style.link}>
            Settings <AiOutlineSetting size="30px" />
          </Link>
          <a href="/" className={style.link} onClick={logout}>
            Logout
            <HiOutlineLogout color="white" size="30px" />
          </a>
        </nav>
      </div>
    )
  }
}

export default Sidebar

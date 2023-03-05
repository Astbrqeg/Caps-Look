import style from './style.module.scss'

const NavBar = () => {
  return (
    <div className={style.navbar}>
      <img
        className={style.amdocslogo}
        src="Images/amdocs.png"
        alt="caps-look"
      />
      <img
        className={style.capslooklogo}
        src="Images/logo.png"
        alt="caps-look"
      />
    </div>
  )
}

export default NavBar

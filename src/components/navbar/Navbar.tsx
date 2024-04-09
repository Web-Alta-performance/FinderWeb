import '../../css/main.css'
import './Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='flex navBar'>
      <h1 style={{ marginLeft: 20 }}>PetFinder</h1>
      <ul className='flex flex-end' style={{ gap: 10, marginRight: 20 }}>
        <li>
          <NavLink className='navButton'
            style={{
              // padding doesn't work on css in this specific case for some reason
              paddingInline: 12,
              paddingBlock: 7,
              borderRadius: 20,
            }}
            to="/">Home</NavLink>
        </li>
        <li>
          <NavLink className='navButton'
            style={{
              // padding doesn't work on css in this specific case for some reason
              paddingInline: 12,
              paddingBlock: 7,
              borderRadius: 20,
            }}
            to="/about">About</NavLink>
        </li>
      </ul>
    </nav >
  )
};

export default Navbar;
import { NavLink } from 'react-router';

const Navbar = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/projects'>Projects</NavLink>
                    </li>
                    <li>
                        <NavLink to='/qualifications'>Qualifications</NavLink>
                    </li>
                    <li>
                        <NavLink to='/contact'>Contact</NavLink>
                    </li>
                </ul>   
            </nav>
        </>
    )
}

export default Navbar;
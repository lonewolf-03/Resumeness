import { Link } from "react-router-dom";
import './NavBar.css';

function NavBar() {
    return (
        <div className='navbar'>
            <Link to='/'><h1>RESUMENESS</h1></Link>
            <div className='navbarOptions'>
                <Link to='/'>Home</Link>
                <Link to='/resume'>Resume</Link>
                <Link to='/coverletter'>Cover Letter</Link>
                <Link to='/about'>About</Link>
            </div>
        </div>
    );
}

export default NavBar;
import { Link } from 'react-router-dom';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    localStorage.removeItem('token'); // Simplify log out function
    setUser(null);
  }

  return (
    <nav>
      <span>Hi <strong>{user.name}</strong>!</span>
      <br />
      <br />
      <Link to="/notes">Add Notes</Link> 
      &nbsp; | &nbsp;
      <Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}

import "./Navbar.css";

const NavbarDropdown = (props) => {
  return (
    <>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#" style={{ color: "#000" }}>
              {props.name}
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavbarDropdown;

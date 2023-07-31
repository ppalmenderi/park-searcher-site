import NavbarMenu from "./NavbarMenu";

function Navbar() {
  return (
    <>
      {/* <header className='header'>
        <div>
          <img src={logo} alt="Logo" />;
        </div>
        <ul>
          <li><button className='btn'>About</button></li>
          <li><button className='btn'>What's new?</button></li>
        </ul>
      </header> */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container px-5">
          <a className="navbar-brand" href="#!">
            ParkSearcher
          </a>
          <NavbarMenu />
        </div>
      </nav>
    </>
  );
}

export default Navbar;

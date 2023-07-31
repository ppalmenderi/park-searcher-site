import NavbarMenu from "./NavbarMenu";

function Navbar() {
  return (
    <>
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

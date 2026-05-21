export function Nav() {
  return (
    <nav className="nav" id="nav">
      <div className="container nav-inner">
        <a href="#" className="nav-logo">
          Velttora<span>.</span>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#products">Products</a>
          </li>
          <li>
            <a href="#capabilities">Capabilities</a>
          </li>
          <li>
            <a href="#team">Team</a>
          </li>
          <li>
            <a href="#contact" className="nav-cta">
              Contact us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

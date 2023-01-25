import { Link, useLocation } from "react-router-dom"

const Navbar = () => {
    const activePage = useLocation().pathname

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Projetos", path: "/projects" },
        { name: "Empresa", path: "/about" },
        { name: "Contato", path: "/contact" },
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-4 px-4">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {navLinks.map((link, index) => (
                            <li className="nav-item" key={index}>
                                <Link className={`nav-link${activePage === link.path && " active" || ""}`} to={link.path}>{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
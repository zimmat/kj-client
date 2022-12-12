import Link from 'next/link';

const Header = () => {
    return (
        <nav className="main-header navbar navbar-expand bg-white navbar-light border-bottom">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#"><i className="fa fa-bars" /></a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <Link href="/"><a className="nav-link">Home</a></Link>
                </li>
            </ul>
        </nav>
    )
};

export default Header;
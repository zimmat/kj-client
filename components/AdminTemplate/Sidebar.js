import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

const Sidebar = () => {
    const router = useRouter()
    const pathname = router.pathname;

    return <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link href="/">
            <a className="brand-link">
                <span className="brand-text font-weight-light" style={{ fontSize: '16px', fontWeight: 500 }}>Dashboard</span>
            </a>
        </Link>

        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="info">
                <Link href="/">
                    <a className="d-block">Admin</a>
                </Link>
            </div>
        </div>

        <div className="sidebar">
            <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    <li className="nav-item">
                        <Link href="/">
                            <a className={['nav-link', pathname === '/' ? 'active' : ''].join(' ')}>
                                <i className="nav-icon fa fa-home" />
                                <p>Home</p>
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/users">
                            <a className={['nav-link', pathname.includes('users') ? 'active' : ''].join(' ')}>
                                <i className="nav-icon fas fa-users"></i>
                                <p> Users </p>
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={() => signOut()}>
                            <i className="nav-icon fas fa-sign-out-alt"></i>
                            <p> Logout </p>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </aside>
}

export default Sidebar
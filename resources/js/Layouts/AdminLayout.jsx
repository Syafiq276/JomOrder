import { Link, Head, usePage } from '@inertiajs/react';

/**
 * AdminLayout — Persistent sidebar navigation for management pages.
 * Maintains the warm earthy palette in a professional card-based structure.
 */
export default function AdminLayout({ children, title }) {
    const { url } = usePage();

    const navLinks = [
        { name: 'Dashboard', href: route('admin.dashboard'), icon: '📊' },
        { name: 'Urus Menu', href: route('admin.menu.index'), icon: '🍴' },
        { name: 'Vendor / Pembekal', href: route('admin.vendors.index'), icon: '🚚' },
        { name: 'Ke POS', href: route('pos.index'), icon: '🛒' },
    ];

    return (
        <div className="admin-layout">
            <Head title={title || 'Admin'} />
            
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-sidebar__brand">
                    <span className="admin-sidebar__logo">JomOrder</span>
                    <span className="admin-sidebar__role">ADMIN</span>
                </div>

                <nav className="admin-nav">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`admin-nav__link ${
                                url.startsWith(link.href) ? 'admin-nav__link--active' : ''
                            }`}
                        >
                            <span className="admin-nav__icon">{link.icon}</span>
                            <span className="admin-nav__text">{link.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="admin-sidebar__footer">
                    <Link href={route('logout')} method="post" as="button" className="admin-logout-btn">
                        Log Keluar
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-content">
                <header className="admin-content-header">
                    <h1 className="admin-page-title">{title}</h1>
                    <div className="admin-user-info">
                        Hi, {usePage().props.auth.user.name} ☕
                    </div>
                </header>
                
                <div className="admin-page-body">
                    {children}
                </div>
            </main>
        </div>
    );
}

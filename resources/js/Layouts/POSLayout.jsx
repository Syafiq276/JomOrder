import { Head } from '@inertiajs/react';

/**
 * Full-screen POS layout — no navigation bar, maximizes screen real estate.
 * Uses the warm earthy color palette.
 */
export default function POSLayout({ children, title }) {
    return (
        <div className="pos-layout">
            <Head title={title || 'POS'} />
            {children}
        </div>
    );
}

import { Head, useForm } from '@inertiajs/react';

/**
 * Custom Premium Login Page for JomOrder.
 */
export default function Login({ status, errors }) {
    const { data, setData, post, processing } = useForm({
        email: '',
        password: '',
        remember: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="login-screen">
            <Head title="Log In - JomOrder" />

            <div className="login-card">
                <div className="login-header">
                    <span className="login-logo">JomOrder</span>
                    <p className="login-welcome">Selamat Datang ke Café Kak Na</p>
                </div>

                {status && (
                    <div className="mb-4 text-center font-bold text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <div className="login-field">
                        <label className="login-label" htmlFor="email">Email Rasmi</label>
                        <input
                            id="email"
                            type="email"
                            className="login-input"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="username"
                        />
                        {errors.email && (
                            <div className="mt-1 text-xs text-red-600 font-bold">{errors.email}</div>
                        )}
                    </div>

                    <div className="login-field">
                        <label className="login-label" htmlFor="password">Kata Laluan</label>
                        <input
                            id="password"
                            type="password"
                            className="login-input"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                        {errors.password && (
                            <div className="mt-1 text-xs text-red-600 font-bold">{errors.password}</div>
                        )}
                    </div>

                    <button className="login-btn" disabled={processing}>
                        {processing ? 'Sedang Log Masuk...' : 'Log Masuk'}
                    </button>
                </form>

                <div className="login-footer">
                    &copy; {new Date().getFullYear()} JomOrder POS Ecosystem. All rights reserved.
                </div>
            </div>
        </div>
    );
}

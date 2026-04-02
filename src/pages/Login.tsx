/**
 * Login.tsx — Pre-login screen
 *
 * Landing page for unauthenticated users. Presents two paths:
 *   1. Sign in with an email address and password
 *   2. Continue as a guest (data saved to browser only)
 *
 * Matches the Figma "App (Pre-Login)" frame (node 170:1730).
 *
 * Route: /app/login
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, redirectTo } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Input from '../components/Input';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';

// ── Inline icons ──────────────────────────────────────────────────────────────
// Small SVG icons used inside the form inputs. Defined locally since they are
// specific to this page and not part of the shared icon library.

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3.333" width="12" height="9.334" rx="1.333" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 5.333 8 9.333l6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="7.333" width="10" height="7.334" rx="1.333" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.333 7.333V5.333a2.667 2.667 0 0 1 5.334 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Login() {
  const navigate = useNavigate();

  // ── Form state ──────────────────────────────────────────────────────────────
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  // ── Handlers ─────────────────────────────────────────────────────────────────

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/app');
    }
  }

  async function handleForgotPassword(e: React.MouseEvent) {
    e.preventDefault();
    if (!email) {
      setError('Enter your email address above, then click "Lost password?".');
      return;
    }
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setError('Password reset email sent — check your inbox.');
    }
  }

  function handleGuest() {
    navigate('/app');
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">

      {/* ── Navbar ────────────────────────────────────────────────────── */}
      <Navbar />

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center gap-2.5 p-3">

        {/* Card container — fills remaining space and centres the card */}
        <div className="flex-1 flex items-center justify-center w-full">

          {/* ── Login card ──────────────────────────────────────────────
              Two-column layout: Sign in form | OR divider | Guest signin
          ─────────────────────────────────────────────────────────────── */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-md flex overflow-hidden">

            {/* ── Left column: Sign in form ── */}
            <form
              className="w-[450px] p-5 flex flex-col gap-4"
              onSubmit={handleSignIn}
            >

              <h1 className="font-heading text-white text-[19.8px] leading-7 tracking-[-0.5px]">
                Sign in to BattleCards
              </h1>

              <Input
                label="Email"
                type="email"
                placeholder="name@battlecards.app"
                leftIcon={<EmailIcon />}
                value={email}
                onChange={e => setEmail(e.target.value)}
                state={error ? 'error' : 'default'}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                leftIcon={<LockIcon />}
                value={password}
                onChange={e => setPassword(e.target.value)}
                state={error ? 'error' : 'default'}
                helperText={error ?? undefined}
                required
              />

              {/* Remember me + Lost password row */}
              <div className="flex items-center justify-between w-full">
                <Checkbox label="Remember me" />
                <a
                  href="#"
                  className="font-body font-medium text-base text-blue-400 underline"
                  onClick={handleForgotPassword}
                >
                  Lost password?
                </a>
              </div>

              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? 'Signing in…' : 'Sign in'}
              </Button>

              {/* No account prompt */}
              <p className="font-body text-sm text-center text-[#d1d5dc]">
                No account?{' '}
                <a
                  href="#"
                  className="font-medium text-[#51a2ff] underline"
                >
                  Create one
                </a>
              </p>

            </form>

            {/* ── OR divider ── */}
            <div className="flex flex-col items-center justify-center gap-1.5 py-2.5 self-stretch">
              <div className="flex-1 w-px bg-gray-700" />
              <span className="font-body font-bold text-base text-gray-500 uppercase px-px shrink-0">
                OR
              </span>
              <div className="flex-1 w-px bg-gray-700" />
            </div>

            {/* ── Right column: Continue as guest ── */}
            <div className="w-[450px] p-5 flex flex-col gap-4 justify-center">

              <h2 className="font-heading text-white text-[19.8px] leading-7 tracking-[-0.5px]">
                Continue as guest
              </h2>

              <p className="font-body text-base text-gray-300 leading-6">
                Please note: As a guest, your content will be saved to your
                browser, but can often be lost and won't appear on other devices.
              </p>

              <Button className="w-full" onClick={handleGuest} type="button">
                Continue as guest
              </Button>

            </div>

          </div>
        </div>

        {/* ── Version footer ────────────────────────────────────────────
            Sits at the bottom of the body column. Very muted — intentional.
        ─────────────────────────────────────────────────────────────── */}
        <div className="shrink-0 flex items-center gap-3 font-body font-bold text-xs text-gray-800 tracking-[1.2px] uppercase">
          <div className="flex items-center gap-1">
            <span>BattleCards version</span>
            <span>0.10</span>
          </div>
          <span>-</span>
          <div className="flex items-center gap-1">
            <span>Build date</span>
            <span>31/03/2026</span>
          </div>
        </div>

      </div>
    </div>
  );
}

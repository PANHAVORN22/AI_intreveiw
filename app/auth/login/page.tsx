'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Mock authentication - in production, this would call an API
    if (email && password) {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push('/dashboard');
    } else {
      setError('Please fill in all fields');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ai-dark-bg via-ai-dark-bg to-ai-card-bg text-foreground flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/2 w-full h-full bg-gradient-to-r from-ai-violet/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-1/2 w-full h-full bg-gradient-to-l from-ai-cyan/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-ai-violet/30 to-ai-cyan/30 border border-ai-violet/50">
            <div className="text-2xl font-bold bg-gradient-to-r from-ai-violet to-ai-cyan bg-clip-text text-transparent">AI</div>
          </div>
          <h1 className="text-4xl font-bold text-ai-text-primary mb-3">Welcome Back</h1>
          <p className="text-ai-text-secondary text-lg">Sign in to conduct AI-powered interviews</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-start gap-3">
            <div className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-400">⚠️</div>
            <p>{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5 mb-6 bg-ai-card-bg/50 backdrop-blur-md p-8 rounded-2xl border border-ai-border/50">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ai-text-secondary mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-ai-text-muted pointer-events-none" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-ai-card-bg border border-ai-border text-ai-text-primary placeholder-ai-text-muted focus:border-ai-violet"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-ai-text-secondary mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-ai-text-muted pointer-events-none" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 bg-ai-card-bg border border-ai-border text-ai-text-primary placeholder-ai-text-muted focus:border-ai-violet"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ai-text-muted hover:text-ai-text-secondary transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border border-ai-border bg-ai-card-bg checked:bg-ai-violet checked:border-ai-violet cursor-pointer"
              />
              <span className="text-sm text-ai-text-secondary">Remember me</span>
            </label>
            <Link href="/auth/forgot-password" className="text-sm text-ai-violet hover:text-ai-cyan transition-colors">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-ai-violet hover:bg-ai-violet/90 text-white font-medium py-2.5 rounded-lg transition-all"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-ai-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-ai-text-muted">or continue with</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-ai-border bg-ai-card-bg/30 hover:bg-ai-card-bg/60 transition-colors text-ai-text-secondary font-medium text-sm"
          >
            <span>🐙</span>
            GitHub
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-ai-border bg-ai-card-bg/30 hover:bg-ai-card-bg/60 transition-colors text-ai-text-secondary font-medium text-sm"
          >
            <span>🔵</span>
            Google
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-ai-text-muted">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-ai-violet hover:text-ai-cyan transition-colors font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

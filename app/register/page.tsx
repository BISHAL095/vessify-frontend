'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [orgName, setOrgName]   = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleRegister() {
    setError('')
    setLoading(true)

    // Calls our custom Hono register endpoint — not Better Auth's built-in
    // sign-up, because we need org creation to happen atomically with the user
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password, orgName }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? 'Registration failed')
      setLoading(false)
      return
    }

    router.push('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alice@example.com"
            />
          </div>
          <div className="space-y-1">
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label>Organization name</Label>
            <Input
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Alice's Finance Team"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button onClick={handleRegister} disabled={loading} className="w-full">
            {loading ? 'Creating account...' : 'Create account'}
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Have an account?{' '}
            <a href="/login" className="underline">Sign in</a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

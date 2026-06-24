'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TransactionForm() {
  const [text, setText]       = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult]   = useState<string | null>(null)
  const [error, setError]     = useState<string | null>(null)

  async function handleSubmit() {
    if (!text.trim()) return
    setLoading(true)
    setResult(null)
    setError(null)

    const res = await fetch('/api/transactions/extract', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ text }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? 'Failed to parse')
    } else {
      setResult(`Saved! Confidence: ${(data.confidence * 100).toFixed(0)}%`)
      setText('')
      // Notify TransactionTable to refresh — siblings can't share props directly
      window.dispatchEvent(new Event('transaction-saved'))
    }

    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Paste bank statement text</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your bank statement text here..."
          rows={5}
        />
        {result && <p className="text-sm text-green-600">{result}</p>}
        {error  && <p className="text-sm text-red-500">{error}</p>}
        <Button onClick={handleSubmit} disabled={loading || !text.trim()}>
          {loading ? 'Parsing...' : 'Parse & Save'}
        </Button>
      </CardContent>
    </Card>
  )
}
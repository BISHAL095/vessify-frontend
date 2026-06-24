'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from '@/components/ui/table'

type Transaction = {
  id: string
  description: string
  amount: string
  date: string
  confidence: number
}

async function fetchPage(cursor?: string) {
  const url = new URL('/api/transactions', location.origin)
  if (cursor) url.searchParams.set('cursor', cursor)

  const res = await fetch(url.toString(), { credentials: 'include' })
  return res.json()
}

export default function TransactionTable() {
  const [rows, setRows]       = useState<Transaction[]>([])
  const [nextCursor, setNext] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tick, setTick]       = useState(0)  // incrementing this triggers a refresh

  // Runs on mount and whenever tick changes (new transaction saved)
  useEffect(() => {
    let cancelled = false  // prevent state updates if component unmounts mid-fetch

    async function load() {
      setLoading(true)
      const data = await fetchPage()
      if (!cancelled) {
        setRows(data.data)
        setNext(data.nextCursor)
        setHasMore(data.hasMore)
        setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [tick])

  // Listen for new transactions saved by TransactionForm
  useEffect(() => {
    const refresh = () => setTick(t => t + 1)  // state update in callback, not effect body
    window.addEventListener('transaction-saved', refresh)
    return () => window.removeEventListener('transaction-saved', refresh)
  }, [])

  async function loadMore() {
    if (!nextCursor) return
    setLoading(true)
    const data = await fetchPage(nextCursor)
    setRows(prev => [...prev, ...data.data])
    setNext(data.nextCursor)
    setHasMore(data.hasMore)
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Confidence</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 && !loading && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No transactions yet
              </TableCell>
            </TableRow>
          )}
          {rows.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>{tx.description}</TableCell>
              <TableCell>{tx.amount}</TableCell>
              <TableCell>
                {new Date(tx.date).toLocaleDateString('en-IN')}
              </TableCell>
              <TableCell>
                <span className={
                  tx.confidence >= 0.9 ? 'text-green-600' :
                  tx.confidence >= 0.6 ? 'text-yellow-600' : 'text-red-500'
                }>
                  {(tx.confidence * 100).toFixed(0)}%
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {hasMore && (
        <Button variant="outline" onClick={loadMore} disabled={loading} className="w-full">
          {loading ? 'Loading...' : 'Load more'}
        </Button>
      )}
    </div>
  )
}
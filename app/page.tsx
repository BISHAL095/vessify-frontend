import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import TransactionForm from '@/components/TransactionForm'
import TransactionTable from '@/components/TransactionTable'


export default async function HomePage() {
  const requestHeaders = await headers()
  const cookie = requestHeaders.get('cookie') ?? ''
  const host = requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host')
  const protocol = requestHeaders.get('x-forwarded-proto') ?? 'http'

  if (!host) {
    redirect('/login')
  }

  const res = await fetch(`${protocol}://${host}/api/auth/get-session`, {
    headers: {
      cookie,
    },
    cache: 'no-store',
  })

  const session = await res.json()

  if (!session?.user) {
    redirect('/login')
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        <a
          href="/api/auth/sign-out"
          className="text-sm text-muted-foreground underline"
        >
          Sign out
        </a>
      </div>
      <TransactionForm />
      <TransactionTable />
    </main>
  )
}

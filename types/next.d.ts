declare module 'next/navigation' {
  type AppRouter = {
    push(href: string): void
    replace(href: string): void
    refresh(): void
    back(): void
    forward(): void
    prefetch(href: string): void
  }

  export function useRouter(): AppRouter
  export function useSearchParams(): URLSearchParams
  export function usePathname(): string
  export function useParams<T = Record<string, string>>(): T
  export function redirect(url: string): never
}

declare module 'next/headers' {
  export function headers(): Promise<Headers>
  export function cookies(): Promise<{
    get(name: string): { name: string; value: string } | undefined
    getAll(): Array<{ name: string; value: string }>
  }>
}

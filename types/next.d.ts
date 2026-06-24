declare module 'next/navigation' {
  export function useRouter(): any
  export function useSearchParams(): any
  export function usePathname(): any
  export function useParams<T = Record<string, string>>(): T
  export function redirect(url: string): never
}

declare module 'next/headers' {
  export function headers(): any
  export function cookies(): any
}

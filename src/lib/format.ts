export function shortAddress(address: string, start = 4, end = 4): string {
  if (!address) return ''
  if (address.length <= start + end + 2) return address
  return `${address.slice(0, start)}...${address.slice(-end)}`
}

export function formatNumber(n: number | bigint | null | undefined): string {
  if (n == null) return '—'
  const num = typeof n === 'bigint' ? Number(n) : n
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(num)
}

export function formatTokenAmount(raw: bigint | number, decimals = 6): string {
  const n = typeof raw === 'bigint' ? Number(raw) / 10 ** decimals : raw / 10 ** decimals
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 })
}

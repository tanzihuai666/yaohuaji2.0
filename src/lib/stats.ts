import { useLiveQuery } from 'dexie-react-hooks'
import { db } from './db'
import { today } from './format'
export function useWalletStats() {
  return useLiveQuery(async () => {
    const t = await db.txns.toArray(); const ym = today().slice(0, 7)
    const net = (arr: typeof t) => arr.reduce((s, x) => s + (x.type === 'income' ? x.amount : -x.amount), 0)
    return { total: net(t), month: net(t.filter(x => x.date.startsWith(ym))), txns: t }
  }, []) || { total: 0, month: 0, txns: [] }
}

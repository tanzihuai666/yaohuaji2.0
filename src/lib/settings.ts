import { useLiveQuery } from 'dexie-react-hooks'
import { db } from './db'
export interface Settings { nickname: string; motto: string; avatar?: string; theme: string; bgImage?: string; dotGrid: boolean; bgOpacity: number; lastBackup?: number; onboarded?: boolean }
export const DEFAULT_SETTINGS: Settings = { nickname: '妖芝', motto: '一纸一笔，皆是山河', theme: 'paper', dotGrid: true, bgOpacity: 70 }
export async function getSettings(): Promise<Settings> { const r = await db.kv.get('settings'); return { ...DEFAULT_SETTINGS, ...(r?.value as Partial<Settings> || {}) } }
export async function saveSettings(patch: Partial<Settings>) { const cur = await getSettings(); await db.kv.put({ key: 'settings', value: { ...cur, ...patch } }) }
export function useSettings(): Settings { const r = useLiveQuery(() => db.kv.get('settings'), []); return { ...DEFAULT_SETTINGS, ...(r?.value as Partial<Settings> || {}) } }

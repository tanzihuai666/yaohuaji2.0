import Dexie, { type EntityTable } from 'dexie'

export type OrderStatus = 'pending' | 'progress' | 'review' | 'done'
export interface ImageRec { id: string; blob: Blob; thumb: Blob; w: number; h: number; size: number; name: string; createdAt: number }
export interface Order {
  id: string; no: string; client: string; platform: string; types: string[]; status: OrderStatus
  total: number; deposit: number; depositPaid: boolean; balancePaid: boolean
  canvas: string; canvasW: number; canvasH: number; license: string
  startDate: string; deadline: string; remind: boolean; remindRules: string[]
  requirement: string; tags: string[]; refImages: string[]; deliverImages: string[]
  characterId?: string; contact?: string; stageTimes?: Partial<Record<OrderStatus, number>>
  createdAt: number; updatedAt: number
}
export interface Character {
  id: string; name: string; no: string; avatar?: string; refImages: string[]; species: string[]
  gender: string; height: string; birthday: string; quote: string; background: string
  hair: string; eyes: string; warnings: string; folderId?: string; pinned: boolean; publicView: boolean
  createdAt: number; updatedAt: number
}
export interface CommissionRecord { id: string; characterId: string; groupId?: string; images: string[]; title: string; amount: number; date: string; note: string; createdAt: number }
export interface Group { id: string; characterId: string; name: string; createdAt: number }
export interface Folder { id: string; name: string; desc: string; cover?: string; color: string; scope: string; isPrivate: boolean; pinned: boolean; sort: string; createdAt: number; updatedAt: number }
export interface Artwork { id: string; folderId: string; image: string; title: string; tag: string; date: string; liked: boolean; createdAt: number }
export interface Txn { id: string; type: 'income' | 'expense'; kind: string; amount: number; date: string; title: string; note: string; orderId?: string; createdAt: number }
export interface PriceItem { id: string; title: string; subtitle: string; min: number; max: number; spec: string; samples: string[]; sampleLabels: string[]; sort: number; popular?: boolean }
export interface KV { key: string; value: unknown }

export class YhDB extends Dexie {
  images!: EntityTable<ImageRec, 'id'>
  orders!: EntityTable<Order, 'id'>
  characters!: EntityTable<Character, 'id'>
  records!: EntityTable<CommissionRecord, 'id'>
  groups!: EntityTable<Group, 'id'>
  folders!: EntityTable<Folder, 'id'>
  artworks!: EntityTable<Artwork, 'id'>
  txns!: EntityTable<Txn, 'id'>
  prices!: EntityTable<PriceItem, 'id'>
  kv!: EntityTable<KV, 'key'>
  constructor() {
    super('yaohuaji2')
    this.version(1).stores({
      images: 'id, createdAt',
      orders: 'id, status, deadline, startDate, createdAt, characterId',
      characters: 'id, name, folderId, createdAt',
      records: 'id, characterId, groupId, date',
      groups: 'id, characterId',
      folders: 'id, createdAt',
      artworks: 'id, folderId, createdAt',
      txns: 'id, type, date, orderId',
      prices: 'id, sort',
      kv: 'key',
    })
  }
}
export const db = new YhDB()
export const uid = () => (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now().toString(36))
export const TABLES = ['images', 'orders', 'characters', 'records', 'groups', 'folders', 'artworks', 'txns', 'prices', 'kv'] as const

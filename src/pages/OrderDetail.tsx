import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import Page from '../components/Page'
import Img from '../components/Img'
import Viewer from '../components/Viewer'
import BottomNav from '../components/BottomNav'
import { useUI } from '../components/ui'
import { db } from '../lib/db'
import { STATUS, advanceOrder, deleteOrder, nextStatus, saveOrder, statusLabel } from '../lib/orders'
import { cnDate, daysLeft, yuan } from '../lib/format'
import { pickImagesSafe } from '../lib/images'
import { copyText } from '../lib/share'

const SUB = ['', '绘制中', '线稿/色块', '终稿交付']
const md = (t?: number) => (t ? `${String(new Date(t).getMonth() + 1).padStart(2, '0')}/${String(new Date(t).getDate()).padStart(2, '0')}` : '')

export default function OrderDetail() {
  const { id } = useParams(); const nav = useNavigate(); const ui = useUI()
  const o = useLiveQuery(() => db.orders.get(id!), [id])
  const coop = useLiveQuery(async () => (o ? (await db.orders.where('createdAt').belowOrEqual(o.createdAt).toArray()).filter(x => x.client.trim() === o.client.trim()).length : 0), [o?.id, o?.client])
  const [view, setView] = useState<{ ids: string[]; i: number; del?: boolean } | null>(null)
  if (o === undefined) return <Page name="OrderDetail" />
  if (o === null || !o) return <Page name="OrderDetail"><div className="pt-40 text-center text-outline">稿单不存在或已删除</div></Page>
  const si = STATUS.findIndex(s => s.key === o.status); const nx = nextStatus(o.status); const left = daysLeft(o.deadline)
  const dep = Math.min(o.deposit, o.total), bal = Math.max(0, o.total - dep), pct = o.total ? Math.round((dep / o.total) * 100) : 0
  const advance = async () => {
    if (!nx) return
    const tip = nx === 'progress' ? `将标记定金 ${yuan(dep)} 已到账并记入钱包` : nx === 'done' ? `将标记尾款 ${yuan(bal)} 已付清并记入钱包` : '客户确认后即可进入下一步'
    if (!(await ui.confirm({ title: `推进到「${statusLabel(nx)}」？`, message: tip }))) return
    await advanceOrder(o); ui.toast(`已推进：${statusLabel(nx)}`)
  }
  const addDeliver = async () => { const ids = await pickImagesSafe(true, ui.toast); if (ids.length) { await saveOrder({ ...o, deliverImages: [...o.deliverImages, ...ids] }); ui.toast(`已上传 ${ids.length} 张`) } }
  const editNote = async () => { const v = await ui.prompt({ title: '客户沟通备注', defaultValue: o.contact, placeholder: '联系方式、沟通进展等', icon: 'chat' }); if (v !== null) await saveOrder({ ...o, contact: v }) }
  const remove = async () => {
    if (!(await ui.confirm({ title: '删除此稿单', message: '稿单、交付图与相关收支记录将一并删除，无法恢复。', danger: true, okText: '删除' }))) return
    await deleteOrder(o); ui.toast('稿单已删除'); nav('/orders', { replace: true })
  }
  const contact = async () => { await copyText(`${o.client}${o.contact ? '\n' + o.contact : ''}`); ui.toast(`已复制客户信息，前往${o.platform}联系 TA 吧`) }
  const sizeTag = `${o.canvasW} x ${o.canvasH} px${o.canvas.includes('300DPI') || o.canvasW >= 2400 ? ' · 300DPI' : ''}`

  return (
    <Page name="OrderDetail">
      <div className="w-full max-w-md mx-auto min-h-screen flex flex-col relative pb-32">
        <header className="fixed top-0 left-0 right-0 w-full z-50 flex justify-between items-center px-margin max-w-md mx-auto bg-surface shadow-sm h-14 header-safe">
          <button aria-label="返回" onClick={() => nav(-1)} className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low text-primary active:scale-95 transition-transform duration-150">
            <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
          </button>
          <h1 className="text-headline-md font-headline-md font-bold text-on-surface tracking-tight">稿单详情</h1>
          <button onClick={() => nav(`/orders/${o.id}/edit`)} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container-high text-primary hover:bg-surface-container active:scale-95 transition-transform duration-150">
            <span className="material-symbols-outlined text-[18px]">edit_note</span><span className="text-label-lg font-label-lg">编辑</span>
          </button>
        </header>
        <div className="h-14 header-safe" />
        <main className="px-margin pt-space-lg flex flex-col gap-space-lg">
          <section className="bg-surface-container-lowest rounded-xl p-space-lg card-shadow relative overflow-hidden">
            <div className="absolute -top-3 right-6 w-16 h-7 bg-primary-fixed/60 -rotate-3 rounded-sm pointer-events-none backdrop-blur-sm border-b border-surface-variant" />
            <div className="flex items-center justify-between mb-space-md">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                <span className="text-title-md font-title-md text-on-surface">制作流程节点</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-primary text-label-md font-label-md">{o.no} · {statusLabel(o.status)}</span>
            </div>
            <div className="py-space-md relative">
              <div className="absolute top-7 left-7 right-7 h-[2px] border-t-2 border-dashed border-outline-variant -z-0" />
              <div className="grid grid-cols-4 gap-1 relative z-10 text-center">
                {STATUS.map((s, i) => i < si || (i === si && o.status === 'done') ? (
                  <div key={s.key} className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-surface-container-high text-primary flex items-center justify-center text-label-md font-label-md border-2 border-primary-container/20">
                      <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                    </div>
                    <span className="text-label-md font-label-md mt-1.5 text-on-surface-variant">{s.label}</span>
                    <span className="text-[10px] text-outline mt-0.5">{md(o.stageTimes?.[s.key] || (i === 0 ? o.createdAt : undefined))}{i === 0 ? '已接' : '完成'}</span>
                  </div>
                ) : i === si ? (
                  <div key={s.key} className="flex flex-col items-center scale-105">
                    <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center text-label-md font-label-md stamp-badge ring-4 ring-primary-fixed/50">
                      <span className="material-symbols-outlined text-[18px]">{['inbox', 'brush', 'fact_check', 'task_alt'][i]}</span>
                    </div>
                    <span className="text-label-lg font-label-lg mt-1 text-primary font-bold">{s.label}</span>
                    <span className="text-[10px] font-bold text-primary-container mt-0.5 bg-primary-fixed/60 px-1.5 rounded-full">{i === 0 ? '等待确认' : SUB[i]}</span>
                  </div>
                ) : (
                  <div key={s.key} className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-surface-container-lowest border-2 border-outline-variant text-outline flex items-center justify-center text-label-md font-label-md">{i + 1}</div>
                    <span className="text-label-md font-label-md mt-1.5 text-outline">{s.label}</span>
                    <span className="text-[10px] text-outline mt-0.5">{SUB[i]}</span>
                  </div>
                ))}
              </div>
            </div>
            {nx ? (
              <button onClick={advance} className="mt-space-sm w-full py-2.5 px-space-md bg-primary-container hover:bg-primary text-on-primary rounded-full flex items-center justify-center gap-2 active:scale-95 transition-transform duration-150 shadow-sm">
                <span className="text-label-lg font-label-lg">推进工序：{statusLabel(nx)}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            ) : (
              <div className="mt-space-sm w-full py-2.5 px-space-md bg-primary-fixed text-primary rounded-full flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="text-label-lg font-label-lg">已完结 · 稿费已全部入账</span>
              </div>
            )}
          </section>
          <section className="bg-surface-container-lowest rounded-xl p-space-lg card-shadow flex flex-col gap-space-md">
            <div className="p-space-md rounded-xl bg-surface-container-low border border-primary-fixed flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[22px]">calendar_clock</span>
                </div>
                <div>
                  <p className="text-label-lg font-label-lg text-primary">截稿日：{cnDate(o.deadline)}</p>
                  <p className="text-body-md font-body-md text-on-surface-variant">{o.status === 'done' ? '已完结 · 准时交稿印章' : left < 0 ? '已逾期 · 抓紧和客户沟通' : left <= 3 ? '临近截稿 · 冲刺阶段' : '剩余周期充足 · 准时交稿印章'}</p>
                </div>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-lg font-label-lg font-bold whitespace-nowrap">
                {o.status === 'done' ? '已交付' : !o.deadline ? '未设置' : left >= 0 ? `剩 ${left} 天` : `逾期 ${-left} 天`}
              </div>
            </div>
            <div>
              <h2 className="text-label-lg font-label-lg text-outline mb-2">规格与授权</h2>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-label-md font-label-md flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">face</span>{o.types.join(' · ') || '未分类'}</span>
                <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-label-md font-label-md flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">aspect_ratio</span>{sizeTag}</span>
                <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-label-md font-label-md flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">verified_user</span>{o.license}</span>
              </div>
            </div>
          </section>
          <section className="bg-surface-container-lowest rounded-xl p-space-lg card-shadow">
            <div className="flex items-center justify-between mb-space-md pb-2 border-b border-surface-container-high">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[20px]">payments</span>
                <h2 className="text-title-md font-title-md text-on-surface">稿费结算清单</h2>
              </div>
              <div className="text-right">
                <span className="text-label-md font-label-md text-outline">总计酬劳</span>
                <span className="text-stat-counter font-stat-counter text-primary ml-1 font-bold">{yuan(o.total)}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-gutter">
              <div className={`p-3 bg-surface-container-low rounded-xl border flex flex-col justify-between ${o.depositPaid ? 'border-primary-fixed' : 'border-outline-variant'}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-label-md font-label-md font-bold ${o.depositPaid ? 'text-primary' : 'text-on-surface-variant'}`}>{o.depositPaid ? '已收定金' : '待收定金'}</span>
                  <span className={`material-symbols-outlined text-[18px] ${o.depositPaid ? 'text-primary' : 'text-outline'}`} style={o.depositPaid ? { fontVariationSettings: "'FILL' 1" } : undefined}>{o.depositPaid ? 'task_alt' : 'pending'}</span>
                </div>
                <div className="mt-2">
                  <p className={`text-headline-md font-headline-md font-bold ${o.depositPaid ? 'text-primary' : 'text-on-surface'}`}>{yuan(dep)}</p>
                  <p className={`text-[11px] mt-0.5 ${o.depositPaid ? 'text-on-surface-variant' : 'text-outline'}`}>{o.depositPaid ? `${pct}% 定金已到账 (${md(o.stageTimes?.progress || o.updatedAt)})` : '接单后记入钱包'}</p>
                </div>
              </div>
              <div className={`p-3 bg-surface-container-low rounded-xl border flex flex-col justify-between ${o.balancePaid ? 'border-primary-fixed' : 'border-outline-variant'}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-label-md font-label-md font-bold ${o.balancePaid ? 'text-primary' : 'text-on-surface-variant'}`}>{o.balancePaid ? '已收尾款' : '待收尾款'}</span>
                  <span className={`material-symbols-outlined text-[18px] ${o.balancePaid ? 'text-primary' : 'text-outline'}`} style={o.balancePaid ? { fontVariationSettings: "'FILL' 1" } : undefined}>{o.balancePaid ? 'task_alt' : 'pending'}</span>
                </div>
                <div className="mt-2">
                  <p className={`text-headline-md font-headline-md font-bold ${o.balancePaid ? 'text-primary' : 'text-on-surface'}`}>{yuan(bal)}</p>
                  <p className="text-[11px] text-outline mt-0.5">{o.balancePaid ? `尾款已付清 (${md(o.stageTimes?.done)})` : '待最终验收后付清'}</p>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-surface-container-lowest rounded-xl p-space-lg card-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 shrink-0 rounded-full ring-2 ring-primary-fixed bg-surface-container flex items-center justify-center overflow-hidden">
                  <Img id={o.refImages[0]} className="w-full h-full object-cover" fallback={<span className="text-title-md font-bold text-primary">{o.client.slice(0, 1) || '客'}</span>} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-title-md font-title-md text-on-surface truncate">{o.client || '未命名客户'}</span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold shrink-0">{(coop || 1) >= 2 ? '老客户' : '新客户'}</span>
                  </div>
                  <p className="text-body-md font-body-md text-outline mt-0.5">合作次数：第 {coop || 1} 次合作</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface text-label-md font-label-md flex items-center gap-1 shrink-0">
                <span className="material-symbols-outlined text-[14px]">storefront</span>{o.platform}
              </span>
            </div>
            <div className="mt-space-md p-3 rounded-xl bg-surface-container-low text-body-md font-body-md text-on-surface-variant flex items-center justify-between">
              <p className="truncate pr-2" onClick={editNote}>{o.contact || '点击添加客户联系方式 / 沟通备注'}</p>
              <button onClick={async () => { await copyText(o.contact || o.client); ui.toast('已复制') }} className="text-primary hover:text-primary-container flex items-center shrink-0" title="复制备注">
                <span className="material-symbols-outlined text-[18px]">content_copy</span>
              </button>
            </div>
          </section>
          <section className="bg-surface-container-lowest rounded-xl p-space-lg card-shadow">
            <div className="flex items-center justify-between mb-space-md">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[20px]">palette</span>
                <h2 className="text-title-md font-title-md text-on-surface">参考图与交付画作</h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-outline text-label-md font-label-md">{o.refImages.length}张参考图 · {o.deliverImages.length}张{o.status === 'done' ? '终稿' : '草稿'}</span>
            </div>
            {o.refImages.length + o.deliverImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2.5">
                {o.refImages.map((im, i) => (
                  <div key={im} className="flex flex-col" onClick={() => setView({ ids: o.refImages, i })}>
                    <div className="aspect-[3/4] rounded-lg overflow-hidden border border-outline-variant relative group bg-surface-container-low">
                      <Img id={im} className="w-full h-full object-cover" />
                      <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-on-surface/70 text-on-primary text-[10px] backdrop-blur-sm">{i === 0 ? '设定原画' : `参考 ${i + 1}`}</span>
                    </div>
                    <span className="text-[11px] text-center text-outline mt-1 truncate">参考图 {i + 1}</span>
                  </div>
                ))}
                {o.deliverImages.map((im, i) => (
                  <div key={im} className="flex flex-col" onClick={() => setView({ ids: o.deliverImages, i, del: true })}>
                    <div className="aspect-[3/4] rounded-lg overflow-hidden border-2 border-primary-container relative group bg-surface-container-low">
                      <Img id={im} className="w-full h-full object-cover opacity-90" />
                      <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-primary text-on-primary text-[10px]">{o.status === 'done' && i === o.deliverImages.length - 1 ? '终稿' : '阶段稿'}</span>
                    </div>
                    <span className="text-[11px] text-center text-primary font-bold mt-1 truncate">交付 v{i + 1}</span>
                  </div>
                ))}
              </div>
            )}
            <button onClick={addDeliver} className="mt-space-md w-full py-3 dashed-craft-border rounded-xl bg-surface-container-lowest text-primary hover:bg-surface-container-low flex items-center justify-center gap-1.5 active:scale-95 transition-transform duration-150">
              <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
              <span className="text-label-lg font-label-lg">+ 上传阶段草稿 / 终稿</span>
            </button>
          </section>
          <section className="bg-surface-container-lowest rounded-xl p-space-lg card-shadow relative">
            <div className="absolute -top-3 left-6 flex items-center text-outline pointer-events-none">
              <span className="material-symbols-outlined text-[24px] rotate-45 text-primary-container">attach_file</span>
            </div>
            <div className="flex items-center justify-between mb-space-sm pl-4">
              <h2 className="text-title-md font-title-md text-on-surface">企划详细要求与备忘</h2>
              <span className="material-symbols-outlined text-outline text-[18px]">push_pin</span>
            </div>
            <div className="p-3.5 bg-surface-container-low/80 rounded-xl border border-surface-variant font-body-lg text-body-lg text-on-surface leading-relaxed whitespace-pre-wrap">{o.requirement || '暂无详细要求'}</div>
            {o.tags.length > 0 && <div className="mt-space-md flex flex-wrap gap-2">
              {o.tags.map(t => <span key={t} className={t.includes('急') ? 'px-2.5 py-1 rounded-md bg-secondary-fixed text-on-secondary-fixed text-label-md font-label-md border border-secondary-container/40' : 'px-2.5 py-1 rounded-md bg-surface-container-high text-primary text-label-md font-label-md border border-outline-variant/60'}>{t}</span>)}
            </div>}
          </section>
          <section className="flex flex-col gap-space-sm pt-space-sm mb-4">
            <button onClick={contact} className="w-full py-3 rounded-full bg-primary-fixed text-on-primary-fixed font-title-md text-title-md flex items-center justify-center gap-2 hover:bg-primary-fixed-dim active:scale-95 transition-transform duration-150 shadow-sm">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>联系客户
            </button>
            <button onClick={remove} className="w-full py-2.5 rounded-full text-error hover:bg-error-container/30 flex items-center justify-center gap-1.5 active:scale-95 transition-transform duration-150 text-label-lg font-label-lg">
              <span className="material-symbols-outlined text-[18px]">delete</span>删除此稿单
            </button>
          </section>
        </main>
        <BottomNav />
      </div>
      {view && <Viewer ids={view.ids} index={view.i} onClose={() => setView(null)} onDelete={view.del ? async d => { await saveOrder({ ...o, deliverImages: o.deliverImages.filter(x => x !== d) }); await db.images.delete(d) } : undefined} />}
    </Page>
  )
}

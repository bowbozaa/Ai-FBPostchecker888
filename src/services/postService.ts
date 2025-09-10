/** 
 * postService.ts - จัดการโพสต์ในระบบ: Draft/Schedule/Publish + การเชื่อมต่อเพจ
 * เก็บข้อมูลใน localStorage
 */

import axios from 'axios'
import { analyzeRisk, RiskResult } from '@/utils/risk'

/** โครงเพจที่เชื่อมต่อ */
export interface PageConnection {
  id: string
  name: string
  accessToken: string
}

/** ผลลัพธ์โพสต์ต่อเพจ */
export interface PublishResult {
  pageId: string
  pageName: string
  success: boolean
  error?: string
  postId?: string
}

/** โครงโพสต์ */
export interface PostItem {
  id: string
  content: string
  imageUrl?: string
  pages: PageConnection[]
  selectedPageIds: string[]
  status: 'draft' | 'scheduled' | 'posted' | 'failed'
  risk: RiskResult
  createdAt: string
  updatedAt: string
  scheduleAt?: string
  publishedAt?: string
  results?: PublishResult[]
}

/** storage keys */
const LS_POSTS = 'fbpc_posts'
const LS_PAGES = 'fbpc_pages'

/** อ่านทั้งหมด */
function readPosts(): PostItem[] {
  try {
    const raw = localStorage.getItem(LS_POSTS)
    const arr = raw ? JSON.parse(raw) as PostItem[] : []
    return arr
  } catch { return [] }
}

/** เขียนทั้งหมด */
function writePosts(list: PostItem[]) {
  localStorage.setItem(LS_POSTS, JSON.stringify(list))
}

/** อ่านเพจ */
function readPages(): PageConnection[] {
  try {
    const raw = localStorage.getItem(LS_PAGES)
    return raw ? JSON.parse(raw) as PageConnection[] : []
  } catch { return [] }
}

/** เขียนเพจ */
function writePages(list: PageConnection[]) {
  localStorage.setItem(LS_PAGES, JSON.stringify(list))
}

export const postService = {
  /** ได้รายการเพจทั้งหมด */
  listPages(): PageConnection[] {
    return readPages()
  },

  /** เพิ่มเพจแบบ Manual */
  addPage(page: PageConnection) {
    const pages = readPages()
    const existed = pages.find(p => p.id === page.id)
    if (existed) {
      existed.name = page.name
      existed.accessToken = page.accessToken
      writePages(pages)
    } else {
      writePages([...pages, page])
    }
  },

  /** ลบเพจ */
  removePage(id: string) {
    writePages(readPages().filter(p => p.id !== id))
  },

  /** เชื่อมต่อด้วย token: ดึงรายชื่อเพจผู้ใช้ (อาจติด CORS) */
  async connectFacebook(userAccessToken: string) {
    try {
      const url = `https://graph.facebook.com/v20.0/me/accounts?access_token=${encodeURIComponent(userAccessToken)}`
      const res = await axios.get(url)
      const data = res.data
      if (data && Array.isArray(data.data)) {
        const pages = readPages()
        const merged = [...pages]
        for (const item of data.data) {
          if (item.id && item.name && item.access_token) {
            const found = merged.find(p => p.id === item.id)
            if (found) {
              found.name = item.name
              found.accessToken = item.access_token
            } else {
              merged.push({ id: item.id, name: item.name, accessToken: item.access_token })
            }
          }
        }
        writePages(merged)
      }
    } catch (e: any) {
      // โยน error เพื่อให้ UI แจ้ง
      throw e
    }
  },

  /** อ่านโพสต์ทั้งหมด */
  getPosts(): PostItem[] {
    return readPosts().sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt))
  },

  /** อ่านโพสต์เดียว */
  getPost(id: string): PostItem | undefined {
    return readPosts().find(p => p.id === id)
  },

  /** สร้าง/อัปเดต Draft (กรณีแก้ไข) */
  createOrUpdateDraft(data: { content: string; imageUrl?: string; selectedPageIds: string[]; risk?: RiskResult; scheduleAt?: string }): PostItem | null {
    if (!data.content.trim()) return null
    const pages = readPages()
    const now = new Date().toISOString()
    const list = readPosts()

    // try find same content pending draft to update (simple heuristic)
    const idx = list.findIndex(p => p.status !== 'posted' && p.content === data.content)
    const risk = data.risk || analyzeRisk(data.content)
    if (idx >= 0) {
      const p = list[idx]
      p.imageUrl = data.imageUrl
      p.selectedPageIds = data.selectedPageIds
      p.pages = pages.filter(pg => data.selectedPageIds.includes(pg.id))
      p.updatedAt = now
      p.risk = risk
      p.scheduleAt = data.scheduleAt
      writePosts(list)
      return p
    }

    const item: PostItem = {
      id: Date.now().toString(36),
      content: data.content,
      imageUrl: data.imageUrl,
      selectedPageIds: data.selectedPageIds,
      pages: pages.filter(pg => data.selectedPageIds.includes(pg.id)),
      status: 'draft',
      risk,
      createdAt: now,
      updatedAt: now,
      scheduleAt: data.scheduleAt
    }
    writePosts([item, ...list])
    return item
  },

  /** ตั้งเวลาโพสต์ (สร้าง/อัปเดตเป็น scheduled) */
  schedulePost(data: { content: string; imageUrl?: string; selectedPageIds: string[]; risk?: RiskResult; scheduleAt: string }): boolean {
    const item = this.createOrUpdateDraft(data)
    if (!item) return false
    const list = readPosts()
    const target = list.find(p => p.id === item.id)!
    target.status = 'scheduled'
    target.scheduleAt = data.scheduleAt
    target.updatedAt = new Date().toISOString()
    writePosts(list)
    return true
  },

  /** ลบโพสต์ */
  deletePost(id: string) {
    writePosts(readPosts().filter(p => p.id !== id))
  },

  /** โพสต์ทันที ไปยังหลายเพจ */
  async postNow(id: string): Promise<{ success: boolean; results: PublishResult[] }> {
    const list = readPosts()
    const item = list.find(p => p.id === id)
    if (!item) throw new Error('not found')

    const results: PublishResult[] = []
    for (const page of item.pages) {
      try {
        if (!page.accessToken) throw new Error('missing page token')

        // โพสต์รูป + ข้อความ: ใช้ /{page-id}/photos
        if (item.imageUrl) {
          const url = `https://graph.facebook.com/v20.0/${encodeURIComponent(page.id)}/photos`
          const params = new URLSearchParams()
          params.set('url', item.imageUrl)
          if (item.content) params.set('caption', item.content)
          params.set('access_token', page.accessToken)

          const r = await axios.post(url, params)
          results.push({ pageId: page.id, pageName: page.name, success: !!(r.data && r.data.id), postId: r.data?.id })
        } else {
          // โพสต์ข้อความอย่างเดียว: /{page-id}/feed
          const url = `https://graph.facebook.com/v20.0/${encodeURIComponent(page.id)}/feed`
          const params = new URLSearchParams()
          params.set('message', item.content)
          params.set('access_token', page.accessToken)
          const r = await axios.post(url, params)
          results.push({ pageId: page.id, pageName: page.name, success: !!(r.data && r.data.id), postId: r.data?.id })
        }
      } catch (e: any) {
        results.push({ pageId: page.id, pageName: page.name, success: false, error: e?.message || 'error' })
      }
    }

    item.results = results
    item.publishedAt = new Date().toISOString()
    item.updatedAt = item.publishedAt

    // ถ้าอย่างน้อยหนึ่งเพจสำเร็จ ให้เป็น posted ไม่เช่นนั้น failed
    item.status = results.some(r => r.success) ? 'posted' : 'failed'
    writePosts(list)

    return { success: item.status === 'posted', results }
  },

  /** ตรวจโพสต์ที่ถึงเวลา (เมื่อหน้าเปิด) */
  async checkDuePosts(): Promise<void> {
    const list = readPosts()
    const now = Date.now()
    const due = list.filter(p => p.status === 'scheduled' && !!p.scheduleAt && new Date(p.scheduleAt).getTime() <= now)
    for (const item of due) {
      try {
        await this.postNow(item.id)
      } catch {
        // ignore
      }
    }
  }
}

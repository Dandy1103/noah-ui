export interface CatalogSystem {
  repo: string;
  name?: string;
  url: string;
  localUrl?: string;
  online: boolean;
}

export interface CatalogLink {
  label: string;
  app: string | null;
  path: string;
}

export interface CatalogSection {
  title: string;
  links: CatalogLink[];
}

export interface CatalogGroup {
  label: string;
  app: string | null;
  sections: CatalogSection[];
}

export interface NavCatalog {
  systems: CatalogSystem[];
  groups: CatalogGroup[];
}

export interface NavLink {
  label: string;
  href: string | null;
}

export interface NavSection {
  title: string;
  links: NavLink[];
}

export interface NavGroup {
  label: string;
  sections: NavSection[];
}

const LOCAL_ORIGINS: Record<string, string> = {
  'noah-portal': 'http://localhost:4200/',
  'noah-hrm': 'http://localhost:4201/',
  'noah-apps': 'http://localhost:4202/',
  'noah-notice': 'http://localhost:4203/',
};

const FALLBACK: NavCatalog = {
  systems: [
    { repo: 'noah-portal', name: '入口', url: 'https://noahportal.dandy-cheng.com/', online: true },
    { repo: 'noah-hrm', name: '人資管理', url: 'https://noahhrm.dandy-cheng.com/', online: true },
    { repo: 'noah-notice', name: '公告', url: '', online: false },
    { repo: 'noah-notify', name: '通知', url: '', online: false },
    { repo: 'noah-docs', name: '文件', url: '', online: false },
    { repo: 'noah-calendar', name: '行事曆', url: '', online: false },
    { repo: 'noah-account', name: '帳號管理', url: '', online: false },
    { repo: 'noah-apps', name: '應用管理', url: 'https://noahapps.dandy-cheng.com/', online: true },
    { repo: 'noah-crm', name: '客戶關係', url: '', online: false },
    { repo: 'noah-erp', name: '財務會計', url: '', online: false },
    { repo: 'noah-itsm', name: '資訊服務', url: '', online: false },
    { repo: 'noah-lms', name: '教育訓練', url: '', online: false },
    { repo: 'noah-approval', name: '簽核', url: '', online: false },
    { repo: 'noah-affairs', name: '總務行政', url: '', online: false },
    { repo: 'noah-payroll', name: '薪資', url: '', online: false },
    { repo: 'noah-project', name: '專案管理', url: '', online: false },
  ],
  groups: [
    { label: '公告', app: 'noah-notice', sections: [{ title: '公告', links: [{ label: '營運公告', app: 'noah-notice', path: 'operations' }, { label: '活動', app: 'noah-notice', path: 'events' }, { label: '人事', app: 'noah-notice', path: 'people' }, { label: '制度', app: 'noah-notice', path: 'policy' }, { label: '公告管理', app: 'noah-notice', path: 'manage' }, { label: '公告發布', app: 'noah-notice', path: 'publish' }] }] },
    { label: '通知', app: 'noah-notify', sections: [{ title: '通知', links: [{ label: '我的通知', app: 'noah-notify', path: '' }, { label: '發送通知', app: 'noah-notify', path: '' }] }] },
    { label: '文件', app: 'noah-docs', sections: [{ title: '文件', links: [{ label: '文件庫', app: 'noah-docs', path: '' }, { label: '分類', app: 'noah-docs', path: '' }] }] },
    { label: '行事曆', app: 'noah-calendar', sections: [{ title: '行事曆', links: [{ label: '公司行事曆', app: 'noah-calendar', path: '' }, { label: '活動', app: 'noah-calendar', path: '' }] }] },
    { label: '帳號管理', app: 'noah-account', sections: [{ title: '帳號', links: [{ label: '帳號列表', app: 'noah-account', path: '' }, { label: '帳號申請', app: 'noah-account', path: '' }] }, { title: '權限', links: [{ label: '權限設定', app: 'noah-account', path: '' }] }] },
    { label: '應用管理', app: 'noah-apps', sections: [{ title: '應用', links: [{ label: '系統清單', app: 'noah-apps', path: 'systems' }, { label: '導覽', app: 'noah-apps', path: 'navigation' }] }] },
    { label: '人資管理', app: 'noah-hrm', sections: [{ title: '人員', links: [{ label: '員工資料', app: 'noah-hrm', path: 'employees' }, { label: '組織', app: 'noah-hrm', path: 'organization' }] }, { title: '出勤', links: [{ label: '出勤紀錄', app: 'noah-hrm', path: 'attendance' }, { label: '加班', app: 'noah-hrm', path: 'overtime' }] }, { title: '假勤', links: [{ label: '請假', app: 'noah-hrm', path: 'leave' }, { label: '出差', app: 'noah-hrm', path: 'trip' }] }] },
    { label: '客戶關係', app: 'noah-crm', sections: [{ title: '客戶', links: [{ label: '客戶資料', app: 'noah-crm', path: '' }, { label: '聯絡人', app: 'noah-crm', path: '' }] }, { title: '銷售', links: [{ label: '商機', app: 'noah-crm', path: '' }, { label: '報價', app: 'noah-crm', path: '' }, { label: '合約', app: 'noah-crm', path: '' }] }] },
    { label: '財務會計', app: 'noah-erp', sections: [{ title: '請款', links: [{ label: '費用報銷', app: 'noah-erp', path: '' }, { label: '付款', app: 'noah-erp', path: '' }] }, { title: '採購', links: [{ label: '採購單', app: 'noah-erp', path: '' }, { label: '供應商', app: 'noah-erp', path: '' }] }, { title: '庫存', links: [{ label: '庫存查詢', app: 'noah-erp', path: '' }] }] },
    { label: '資訊服務', app: 'noah-itsm', sections: [{ title: '服務', links: [{ label: '報修', app: 'noah-itsm', path: '' }, { label: '需求單', app: 'noah-itsm', path: '' }] }] },
    { label: '教育訓練', app: 'noah-lms', sections: [{ title: '課程', links: [{ label: '課程目錄', app: 'noah-lms', path: '' }, { label: '我的課程', app: 'noah-lms', path: '' }] }, { title: '報名', links: [{ label: '開課報名', app: 'noah-lms', path: '' }, { label: '學習紀錄', app: 'noah-lms', path: '' }] }] },
    { label: '簽核', app: 'noah-approval', sections: [{ title: '流程', links: [{ label: '待我簽核', app: 'noah-approval', path: '' }, { label: '我送出的', app: 'noah-approval', path: '' }, { label: '表單', app: 'noah-approval', path: '' }] }] },
    { label: '總務行政', app: 'noah-affairs', sections: [{ title: '場地', links: [{ label: '會議室', app: 'noah-affairs', path: '' }, { label: '訪客', app: 'noah-affairs', path: '' }] }, { title: '庶務', links: [{ label: '備品', app: 'noah-affairs', path: '' }, { label: '公務車', app: 'noah-affairs', path: '' }, { label: '修繕', app: 'noah-affairs', path: '' }] }] },
    { label: '薪資', app: 'noah-payroll', sections: [{ title: '薪資', links: [{ label: '薪資單', app: 'noah-payroll', path: '' }, { label: '投保', app: 'noah-payroll', path: '' }] }, { title: '稅務', links: [{ label: '所得扣繳', app: 'noah-payroll', path: '' }] }] },
    { label: '專案管理', app: 'noah-project', sections: [{ title: '案子', links: [{ label: '專案', app: 'noah-project', path: '' }, { label: '成員', app: 'noah-project', path: '' }, { label: '進度', app: 'noah-project', path: '' }] }, { title: '工時', links: [{ label: '工時填報', app: 'noah-project', path: '' }] }] },
  ],
};

export function catalogUrl(): string {
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
  if (local) return 'http://localhost:3002/api/apps/catalog';
  if (location.hostname === 'noahapps.dandy-cheng.com') return '/api/apps/catalog';
  return 'https://noahapps.dandy-cheng.com/api/apps/catalog';
}

export function fallbackGroups(self: string): NavGroup[] {
  return applyNav(FALLBACK, self);
}

export function loadCatalog(signal: AbortSignal): Promise<NavCatalog | null> {
  return fetch(catalogUrl(), { signal })
    .then(async (response) => {
      if (!response.ok) return null;
      const body: unknown = await response.json();
      return isNavCatalog(body) ? body : null;
    })
    .catch(() => null);
}

export function applyNav(catalog: NavCatalog, self: string): NavGroup[] {
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
  const systems = new Map<string, CatalogSystem>();
  for (const system of catalog.systems) {
    if (!system || typeof system.repo !== 'string') continue;
    systems.set(system.repo, system);
  }
  const groups: NavGroup[] = [];
  for (const group of catalog.groups) {
    if (!group || typeof group.label !== 'string' || !Array.isArray(group.sections)) continue;
    const sections: NavSection[] = [];
    for (const section of group.sections) {
      if (!section || typeof section.title !== 'string' || !Array.isArray(section.links)) continue;
      const links: NavLink[] = [];
      for (const link of section.links) {
        if (!link || typeof link.label !== 'string') continue;
        links.push({ label: link.label, href: hrefFor(link, systems, self, local) });
      }
      sections.push({ title: section.title, links });
    }
    const named = typeof group.app === 'string' ? systems.get(group.app) : undefined;
    const label = named && typeof named.name === 'string' && named.name.trim() ? named.name.trim() : group.label;
    groups.push({ label, sections });
  }
  return groups;
}

function hrefFor(
  link: CatalogLink,
  systems: Map<string, CatalogSystem>,
  self: string,
  local: boolean,
): string | null {
  const app = typeof link.app === 'string' ? link.app : '';
  const path = typeof link.path === 'string' ? link.path : '';
  if (!app) return null;
  if (app === self) return new URL(path, document.baseURI).pathname;
  const system = systems.get(app);
  if (local) {
    const localHref = localTarget(app, path, system);
    if (localHref) return localHref;
  }
  if (!system || system.online !== true || !system.url) return null;
  return joinUrl(path, system.url);
}

function localTarget(repo: string, path: string, system: CatalogSystem | undefined): string | null {
  const localUrl = system && typeof system.localUrl === 'string' ? system.localUrl.trim() : '';
  if (localUrl) return joinUrl(path, localUrl);
  if (LOCAL_ORIGINS[repo]) return new URL(path, LOCAL_ORIGINS[repo]).toString();
  return null;
}

function joinUrl(path: string, base: string): string | null {
  try {
    const root = new URL(base, location.origin);
    const folder = root.pathname.endsWith('/') ? root.pathname : `${root.pathname}/`;
    return new URL(path, `${root.origin}${folder}`).toString();
  } catch {
    return null;
  }
}

function isNavCatalog(value: unknown): value is NavCatalog {
  if (!value || typeof value !== 'object') return false;
  const record = value as { systems?: unknown; groups?: unknown };
  return Array.isArray(record.systems) && Array.isArray(record.groups);
}

export interface CatalogSystem {
  repo: string;
  name?: string;
  url: string;
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

export interface Thematique {
  _id: string;
  titre: string;
  slug: { current: string };
  descriptionSeo?: string;
  ordre?: number;
}

export interface Metier {
  _id: string;
  libelle: string;
  slug: { current: string };
  formeEpicene: boolean;
  codeRome?: string;
}

export interface ThematiqueFilter {
  _id: string;
  titre: string;
  slug: string;
}

export interface MetierFilter {
  _id: string;
  libelle: string;
  slug: string;
}

export interface ExperienceFiche {
  _id: string;
  titre: string;
  slug: string;
  sousTitre?: string;
  descriptionCourte?: string;
  descriptionLongue?: string;
  codeAcces: string;
  dateSortie: string;
  vignetteUrl?: string;
  vignetteAlt?: string;
  thematiques: ThematiqueFilter[];
  metiers: MetierFilter[];
}

export interface ExperienceListItem {
  _id: string;
  titre: string;
  slug: string;
  sousTitre?: string;
  descriptionCourte?: string;
  descriptionLongue?: string;
  codeAcces: string;
  dateSortie: string;
  vignetteUrl?: string;
  vignetteAlt?: string;
  thematiques: ThematiqueFilter[];
  metiers: MetierFilter[];
}

export interface Experience {
  _id: string;
  titre: string;
  slug: { current: string };
  sousTitre?: string;
  descriptionCourte?: string;
  descriptionLongue?: string;
  statut: 'publie' | 'brouillon' | 'retire';
  vignette?: {
    asset: { _ref: string };
    alt?: string;
  };
  thematiques?: Thematique[];
  metiers?: Metier[];
  codeAcces: string;
  dateSortie: string;
  dateMiseEnLigne?: string;
  externalId: string;
  legacyId?: number;
}

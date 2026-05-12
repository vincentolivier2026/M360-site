import { sanityClient } from './sanity';
import type { ExperienceListItem, ExperienceFiche, ThematiqueFilter, MetierFilter } from '../types/catalogue';

export async function countExperiencesPubliees(): Promise<number> {
  return sanityClient.fetch<number>(
    `count(*[_type == "experience" && statut == "publie"])`
  );
}

export async function getAllExperiences(): Promise<ExperienceListItem[]> {
  return sanityClient.fetch<ExperienceListItem[]>(`
    *[_type == "experience" && statut == "publie"] | order(dateSortie desc) {
      _id,
      titre,
      "slug": slug.current,
      sousTitre,
      descriptionCourte,
      descriptionLongue,
      codeAcces,
      dateSortie,
      "vignetteUrl": vignette.asset->url,
      "vignetteAlt": vignette.alt,
      "thematiques": thematiques[]-> {
        _id,
        titre,
        "slug": slug.current
      },
      "metiers": metiers[]-> {
        _id,
        libelle,
        "slug": slug.current
      }
    }
  `);
}

export async function getExperienceBySlug(slug: string): Promise<ExperienceFiche | null> {
  return sanityClient.fetch<ExperienceFiche | null>(`
    *[_type == "experience" && slug.current == $slug && statut == "publie"][0] {
      _id,
      titre,
      "slug": slug.current,
      sousTitre,
      descriptionCourte,
      descriptionLongue,
      codeAcces,
      dateSortie,
      "vignetteUrl": vignette.asset->url,
      "vignetteAlt": vignette.alt,
      "thematiques": thematiques[]-> {
        _id,
        titre,
        "slug": slug.current
      },
      "metiers": metiers[]-> {
        _id,
        libelle,
        "slug": slug.current
      }
    }
  `, { slug });
}

export async function getAllThematiques(): Promise<ThematiqueFilter[]> {
  return sanityClient.fetch<ThematiqueFilter[]>(`
    *[_type == "thematique"] | order(coalesce(ordre, 999) asc, titre asc) {
      _id,
      titre,
      "slug": slug.current
    }
  `);
}

export async function getAllMetiers(): Promise<MetierFilter[]> {
  return sanityClient.fetch<MetierFilter[]>(`
    *[_type == "metier"] | order(libelle asc) {
      _id,
      libelle,
      "slug": slug.current
    }
  `);
}

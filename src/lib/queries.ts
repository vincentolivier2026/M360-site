import { sanityClient } from './sanity';
import type {
  ExperienceListItem, ExperienceFiche, ThematiqueFilter, MetierFilter,
  SupportCategorie, SupportArticleFiche, SupportArticleListItem,
  BlogCategorie, BlogPostListItem, BlogPostFiche,
} from '../types/catalogue';

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

// ─── Support / FAQ ────────────────────────────────────────────────────────────

export async function getAllSupportCategories(): Promise<SupportCategorie[]> {
  return sanityClient.fetch<SupportCategorie[]>(`
    *[_type == "supportCategorie"] | order(ordre asc) {
      _id,
      titre,
      "slug": slug.current,
      description,
      ordre,
      "dossiers": *[_type == "supportDossier" && references(^._id)] | order(ordre asc) {
        _id,
        titre,
        "slug": slug.current,
        description,
        "articles": *[_type == "supportArticle" && references(^._id) && statut == "publie"] | order(ordre asc) {
          _id,
          titre,
          "slug": slug.current,
          "dossierId": dossier._ref,
          "dossierTitre": ^.titre,
          "dossierSlug": ^.slug.current,
          "categorieId": ^.^._id,
          "categorieTitre": ^.^.titre
        }
      }
    }
  `);
}

export async function getAllSupportArticles(): Promise<SupportArticleListItem[]> {
  return sanityClient.fetch<SupportArticleListItem[]>(`
    *[_type == "supportArticle" && statut == "publie"] {
      _id,
      titre,
      "slug": slug.current,
      "dossierId": dossier._ref,
      "dossierTitre": dossier->titre,
      "dossierSlug": dossier->slug.current,
      "categorieId": dossier->categorie._ref,
      "categorieTitre": dossier->categorie->titre
    }
  `);
}

export async function getSupportArticleBySlug(slug: string): Promise<SupportArticleFiche | null> {
  return sanityClient.fetch<SupportArticleFiche | null>(`
    *[_type == "supportArticle" && slug.current == $slug && statut == "publie"][0] {
      _id,
      titre,
      "slug": slug.current,
      contenu,
      ordre,
      "dossierId": dossier._ref,
      "dossierTitre": dossier->titre,
      "dossierSlug": dossier->slug.current,
      "categorieId": dossier->categorie._ref,
      "categorieTitre": dossier->categorie->titre
    }
  `, { slug });
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export async function getAllBlogCategories(): Promise<BlogCategorie[]> {
  return sanityClient.fetch<BlogCategorie[]>(`
    *[_type == "blogCategorie"] | order(ordre asc) {
      _id,
      titre,
      "slug": slug.current,
      description,
      ordre
    }
  `);
}

export async function getAllBlogPosts(): Promise<BlogPostListItem[]> {
  return sanityClient.fetch<BlogPostListItem[]>(`
    *[_type == "blogPost" && statut == "publie"] | order(datePublication desc) {
      _id,
      titre,
      "slug": slug.current,
      extrait,
      "imageUrl": coalesce(imageCouverture.asset->url, imageUrl),
      "imageAlt": coalesce(imageCouverture.alt, titre),
      "categorieTitre": categorie->titre,
      "categorieSlug": categorie->slug.current,
      datePublication,
      tags
    }
  `);
}

export async function getBlogPostsByCategory(categorieSlug: string): Promise<BlogPostListItem[]> {
  return sanityClient.fetch<BlogPostListItem[]>(`
    *[_type == "blogPost" && statut == "publie" && categorie->slug.current == $categorieSlug]
    | order(datePublication desc) {
      _id,
      titre,
      "slug": slug.current,
      extrait,
      "imageUrl": coalesce(imageCouverture.asset->url, imageUrl),
      "imageAlt": coalesce(imageCouverture.alt, titre),
      "categorieTitre": categorie->titre,
      "categorieSlug": categorie->slug.current,
      datePublication,
      tags
    }
  `, { categorieSlug });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostFiche | null> {
  return sanityClient.fetch<BlogPostFiche | null>(`
    *[_type == "blogPost" && slug.current == $slug && statut == "publie"][0] {
      _id,
      titre,
      "slug": slug.current,
      extrait,
      contenu,
      contenuRiche,
      "imageUrl": coalesce(imageCouverture.asset->url, imageUrl),
      "imageAlt": coalesce(imageCouverture.alt, titre),
      "categorieTitre": categorie->titre,
      "categorieSlug": categorie->slug.current,
      datePublication,
      tags
    }
  `, { slug });
}

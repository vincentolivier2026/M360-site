# M360-site

Site web Métiers 360 — refonte 2026.

## Stack

- **Framework** : [Astro](https://astro.build) (SSG hybride)
- **CMS headless** : [Sanity](https://www.sanity.io) (catalogue, blog, support)
- **CRM / formulaires** : Pipedrive Web Forms
- **Analytics** : [Plausible](https://plausible.io) (RGPD-friendly)
- **Cookies** : Tarteaucitron (stylé navy)
- **Hébergement** : [Netlify](https://www.netlify.com) (compte M360)

## État du projet

Pré-production en cours de construction. Voir le [récap jalon 1 V3] et le [Design System V0.12] dans le projet Claude pour les détails de cadrage.

### Jalons

- [x] Jalon 1 — Cadrage (V3)
- [x] Jalon 2 — Schémas Sanity (validés)
- [x] Jalon 3 — Design System (V0.12)
- [ ] **Jalon 4 — Schémas Sanity en TypeScript** (en cours)
- [ ] **Jalon 5 — Implémentation Astro** (en cours)
- [ ] Jalon 6 — Recette
- [ ] Jalon 7 — Migration des contenus
- [ ] Jalon 8 — Mise en ligne (redirections, DPA, audit RGAA)

## Structure des dossiers

```
src/
  styles/
    tokens.css        Couche fondamentale (V0.9)
    global.css        Reset + base typo + import des tokens
  layouts/
    BaseLayout.astro  Squelette HTML commun
  components/         Composants Astro (V0.6 → V0.12)
  pages/              Pages statiques + routes dynamiques Sanity
public/
  fonts/
  logos/
  favicon.svg
```

## Décisions techniques actées

- **Repo neuf** : ce dépôt remplace le prototype Mac (utilisé comme référence uniquement).
- **Hébergement Netlify** : intégration native Astro + deploy previews + webhook Sanity.
- **TypeScript activé** : strictness par défaut, schémas Sanity typés.
- **Tokens DS V0.9** : tous les composants doivent utiliser les variables CSS, jamais de valeurs littérales.

## Développement local

```bash
npm install
npm run dev    # http://localhost:4321
npm run build  # build vers ./dist
```

## Déploiement

Auto-deploy via Netlify sur chaque push vers `main`. URL de pré-prod : à compléter une fois la connexion Netlify validée.

---

*Dernière mise à jour : étape 2 — pose des tokens systémiques.*

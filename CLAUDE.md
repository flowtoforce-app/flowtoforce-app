# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projet

Landing page de vente pour **FlowToForce** — programme de musculation féminin (V1 salle, V2 maison, Bundle). Fondatrice : Lisa, débutante en code. Expliquer simplement, préférer GitHub Desktop au terminal pour les pushs.

## Commandes

```bash
npm run dev      # Développement local → http://localhost:3000
npm run build    # Build production
npm run lint     # Lint
```

Variable d'environnement requise en local : créer `.env.local` avec :
```
STRIPE_SECRET_KEY=sk_test_...
```

## Architecture

Next.js **Pages Router** (pas App Router). Une seule page publique.

```
pages/
  index.js              ← landing page unique (hero + 3 offres + footer)
  _document.js          ← Google Fonts (Playfair Display)
  api/create-checkout.js ← API route Stripe Checkout
styles/
  landing.module.css    ← tout le style (CSS Modules, pas Tailwind)
components/
  Button.tsx            ← composant legacy Tailwind, non utilisé dans la page principale
```

## Stripe

`pages/api/create-checkout.js` crée une session Stripe Checkout à la volée (pas de produits pré-créés dans le dashboard Stripe). Les prix sont définis directement dans le code :
- V1 : 29,99 € (`2999` centimes)
- V2 : 29,99 € (`2999` centimes)
- Bundle : 39,99 € (`3999` centimes)

En production, la variable `STRIPE_SECRET_KEY` est dans Vercel → Settings → Environment Variables (nom exact en majuscules, sensible à la casse).

## Design

- **Logo** : texte CSS pur (Playfair Display 300), "flow" aligné à gauche, "force" aligné à droite, trait centré — pas d'image SVG
- **Fond** : dégradé multi-couches bleu ciel → beige rosé avec radial-gradients pour effet gloss
- **Cartes** : glassmorphism (`backdrop-filter: blur`)
- **Mobile** : carousel horizontal CSS scroll-snap sur les 3 cartes, dots indicateurs en JS
- **Bouton S'inscrire** : blanc mat (`rgba(255,255,255,0.88)`) avec texte bleu, pill shape

## Déploiement

Push sur `main` → Vercel redéploie automatiquement → `www.flowtoforce.com`

Branche `test-couleurs` : expérimentation design (navy `#000055` + Bebas Neue) — ne pas fusionner sur main sans validation.

## Roadmap (future app)

Le fichier `MVP_FEATURE_SUMMARY.md` décrit une future application complète (auth Supabase, programmes V1/V2 avec séances et exercices, timer, planning, communauté). Cette app n'existe pas encore dans ce repo — seule la landing page est en production.

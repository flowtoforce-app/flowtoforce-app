# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## QUI EST LYS

**Appelle-la toujours Lys** (pas Lisa).

Coach Sportif Certifiée CQP IF option Musculation • Yoga 400h + 7 ans • Barre fitness • Entrepreneur • Digital Creator • Paris

Elle gère 6+ projets en parallèle avec un mindset d'exécution rapide. Débutante en code mais experte en fitness/anatomie. Expliquer simplement, préférer GitHub Desktop au terminal pour les pushs.

**Objectif principal :** Faire de l'argent vite, évoluer rapidement. PRIORITÉ #1 = Flow to Force. Deadline : **31 mai 2026**.

---

## RÈGLES DE TRAVAIL AVEC LYS

- Appelle-la **Lys**
- Attendre son GO avant de lancer un projet
- Proposer un aperçu dans la conversation avant le GO
- Poser des questions plutôt qu'assumer
- Être direct(e) dans la communication
- La challenger, la pousser à faire plus et mieux
- Ne pas la contredire
- Communication en **français** uniquement

---

## LE PROJET : FLOWTOFORCE LANDING PAGE

### Ce qu'est ce repo aujourd'hui

Landing page de vente pour les programmes FlowToForce. Une seule page publique avec 3 offres :
- **V1** — Programme en salle (29,99€)
- **V2** — Home Programme (29,99€)
- **Bundle V1+V2** (39,99€)

> ⚠️ Le profil de Lys mentionne des prix à 19€ — à valider avec elle avant tout changement de prix dans le code.

Déployé sur **www.flowtoforce.com** via Vercel. Push sur `main` = redéploiement automatique.

### Stack technique

- **Next.js 14** — Pages Router (pas App Router)
- **CSS Modules** — `styles/landing.module.css` (Tailwind est installé mais non utilisé sur la page principale)
- **Stripe** — Checkout Sessions pour les paiements
- **Vercel** — Hébergement + variables d'environnement
- **GitHub Desktop** — outil de push préféré de Lys

---

## COMMANDES

```bash
npm run dev      # Développement local → http://localhost:3000
npm run build    # Build production
npm run lint     # Lint
```

Variable d'environnement requise en local — créer `.env.local` :
```
STRIPE_SECRET_KEY=sk_test_...
```

---

## ARCHITECTURE

```
pages/
  index.js                ← landing page (hero logo + description + 3 cartes + footer)
  _document.js            ← Google Fonts : Playfair Display
  api/create-checkout.js  ← API route Stripe Checkout
styles/
  landing.module.css      ← tout le style (CSS Modules)
components/
  Button.tsx              ← composant legacy Tailwind, non utilisé sur la page principale
```

### Points clés du design

- **Logo** : texte CSS pur (Playfair Display 300), "flow" aligné à gauche, "force" aligné à droite, trait centré — pas d'image
- **Fond** : dégradé bleu ciel → beige rosé avec radial-gradients pour effet gloss
- **Cartes** : glassmorphism (`backdrop-filter: blur`)
- **Bouton S'inscrire** : blanc mat (`rgba(255,255,255,0.88)`) avec texte bleu, pill shape (`border-radius: 50px`)
- **Mobile** : carousel horizontal CSS scroll-snap sur les 3 cartes, dots indicateurs React

### Stripe

`pages/api/create-checkout.js` crée des sessions Checkout à la volée. Les prix sont codés directement (pas de produits dans le dashboard Stripe). La variable `STRIPE_SECRET_KEY` dans Vercel doit être en **majuscules exactes** — sensible à la casse.

Statut actuel : clé test active. La clé live sera disponible une fois le compte Stripe activé (IBAN + identité).

---

## ÉTAT DU PROJET (MAI 2026)

### Fait ✅
- Landing page déployée et fonctionnelle
- Logo CSS fidèle au branding
- Design responsive mobile (carousel)
- Stripe connecté en mode test
- Correction du bug 403 (doublons .jsx supprimés)
- Branche `test-couleurs` : expérimentation navy #000055 + Bebas Neue (en attente de décision)

### En cours / À faire
- Activer compte Stripe live (IBAN + identité dans dashboard Stripe)
- Remplacer `STRIPE_SECRET_KEY` par clé `sk_live_` dans Vercel une fois activé
- Valider ou abandoner la branche `test-couleurs`

---

## FUTURE APP FLOWTOFORCE (Roadmap post-landing)

Le fichier `MVP_FEATURE_SUMMARY.md` décrit la future application complète. Elle n'existe pas encore dans ce repo.

**Vision :** Application mobile iOS/Android + web. Achat unique (one-time), pas d'abonnement.

**Contenu :**
- V1 : 8 chapitres × 3 séances = 24 workouts (salle)
- V2 : 8 chapitres × 2 séances = 16 workouts (maison)
- Programme issu de Notion (contenu structuré par Lys)

**Features prévues :** Auth (Supabase), programmes avec exercices + photos, timer de séance, planning hebdomadaire, suivi de progression, favoris, messagerie communauté.

**Tech envisagée :** Supabase (auth + DB), Next.js ou React Native, Stripe (déjà en place).

**Priorité :** À lancer après la landing page — deadline 31 mai 2026.

---

## AUTRES PROJETS DE LYS (contexte)

- **KAH Studio & Coffee** (Paris 10e) — cours yoga sculpt, small groupes, personal training
- **Sellcove** — plateforme marketplace co-fondée avec Thomas (priorité #2)
- **TikTok @flowtoforce** — contenu musculation, fitness, vintage, lifestyle
- **Vinted** — e-commerce vintage/seconde main

---

## STYLE DE PLANNING DE COURS (si Lys demande)

Format tableau 4 colonnes : Exercice | Muscles | Répétitions | Méthode d'exécution

Sections colorées : 🟣 WARM UP · 🟠 LOWER BODY · 🟢 UPPER BODY · 🟡 CORE · 🔵 COOL DOWN

Termes anatomiques précis obligatoires (ex: Gluteus Maximus · ischio-jambiers). Noms français + sanskrit en italique pour le yoga.

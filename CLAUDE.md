# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## QUI EST LYS

**Appelle-la toujours Lys** (pas Lisa).

Coach Sportif Certifiée CQP IF option Musculation • Yoga 400h + 7 ans • Barre fitness • Entrepreneur • Digital Creator • Photographe • Paris

Elle gère 6+ projets en parallèle avec un mindset d'exécution rapide. Débutante en code mais experte en fitness/anatomie. Expliquer simplement, préférer GitHub Desktop au terminal pour les pushs.

**Objectif principal :** Faire de l'argent vite, évoluer rapidement. Bosse sur son premier projet **FlowToForce** pour en faire une application complète — étape par étape, pour la faire évoluer et générer des revenus. En parallèle, bosse sur **Sellcove** depuis 1 mois avec Thomas. Deadline FlowToForce : **31 mai 2026**.

### Projets & activités en cours

- **FlowToForce** — Application de coaching en ligne (ce repo). Shooting photos des exercices à organiser rapidement avec Thomas, en studio KAH et en salle de sport. Besoin d'un visuel/présentation du programme pour définir la tenue des photos avant le shoot.
- **Sellcove** — Site/app co-fondé avec Thomas pour contrer les arnaques sur les plateformes de vente. En développement depuis 1 mois. Site : sellcov.com
- **Cours KAH** — Donne des cours à KAH Studio & Coffee (Paris 10e) pour faire rentrer de l'argent régulièrement
- **Photographie** — Fait de la photo, est contactée pour des missions. Adore la mode.
- **Vinted** — Vend des pièces vintage/seconde main pour compléter les revenus (loyer). À booster régulièrement.

### Personnalité & centres d'intérêt

Fan de vintage, voyage, sport, animaux. Créative, toujours en train de trouver de nouvelles idées de startups. Aime l'ordre, l'organisation et la planification.

### Systèmes à mettre en place (en attente)

- **Bullet journal quotidien** sur Mac — à structurer (process + fichier local)
- **Organisation photos & documents** — Bureau Mac + disque dur externe à ranger et classer

---

## RÈGLES DE TRAVAIL AVEC LYS

- Appelle-la **Lys**
- Attendre son GO avant de lancer un projet
- Proposer un aperçu dans la conversation avant le GO
- Poser des questions plutôt qu'assumer
- Être direct(e) dans la communication
- La challenger, la pousser à faire plus et mieux
- Ne pas la contredire
- Toujours donner les pour et les contre avant de décider
- Toujours proposer la solution la plus économique, rapide et simple
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
- Landing page déployée et fonctionnelle sur www.flowtoforce.com
- Logo CSS fidèle au branding
- Design responsive mobile (carousel)
- Stripe connecté et opérationnel (live + test)
- Correction du bug 403 (doublons .jsx supprimés)

### En réflexion
- Mise en page et couleurs de la landing — branche `test-couleurs` (navy #000055 + Bebas Neue) en attente de décision de Lys

### Prochaine grande étape : l'APPLICATION
- Contenu du programme **prêt sur Notion** (V1 + V2)
- Photos manquantes — shooting à organiser avec Thomas (KAH studio + salle)
- Structure de l'app : Lys a la vision en tête + un exemple de référence → à formaliser par écrit avant de coder
- Processus de création de l'app à définir ensemble étape par étape

---

## VISION DE L'APPLICATION FLOWTOFORCE

Application mobile iOS/Android. Achat unique (one-time), pas d'abonnement. Contenu prêt sur Notion. Photos manquantes — shooting avec Thomas à organiser (KAH studio + salle). Palette couleurs : Pantone Cloud Dancer + Ice Melt (blanc cassé + bleu très clair).

---

### ONGLET ACCUEIL *(inspiration Elevate home screen, ne pas copier)*

- **"Hello [Prénom]"** en grand/gras en haut
- Icône badge récompense + photo de profil (en haut à droite)
- **Calendrier semaine** : vue horizontale L M M J V S D, jour actif en surligné
- Texte sous le calendrier : *"Planifie une séance..."* + bouton **"Planifier"** (plein, couleur)
- Section **"Programmes en cours"** → cartes horizontales scrollables
  - Grande photo du programme + **titre** en overlay + **barre de progression** (% complété)
- Navigation bottom : **Workout · Accueil · Social · Profil**

---

### ONGLET WORKOUT — Programmes & Séances

**Slide 1 — Vue programme** *(inspiration Elevate "PREMIERS PAS À LA SALLE", ne pas copier)*
- Grande photo plein écran en haut avec **badge durée** en overlay (ex: "12 semaines")
- **Titre programme** en grand + gras par-dessus la photo
- Tagline courte sous le titre
- Bouton **"TRAILER"** (optionnel — vidéo de présentation du programme)
- Bouton principal **"Commencer Programme"** (plein, couleur, en bas)
- Section **DESCRIPTION** — texte du programme
- **Objectif** — ex: Force, Tonification
- **Muscles sollicités** — icônes schéma corps (style illustrations roses/épurées)
- **Matériel requis** — icônes avec label + mention "(optionnel)" si besoin
- Espace photo `(photo)` — placeholder en attendant le shooting

**Slide 2 — Liste des exercices d'une séance** (ex: Chapitre 1 Séance 1A)
- Titre de la séance en haut
- Icônes discrets : calendrier (planifier) + cœur (favoris)
- Section **Échauffement** → liste texte uniquement, **sans photo/miniature**
- Section **Corps principal** → miniature photo à gauche + nom exercice + tags séries/reps
- Section **Retour au calme** → liste texte uniquement, **sans photo/miniature**
- Boutons bas de l'écran séance :
  - **"Lancer la séance"** — bouton principal (plein, couleur)
  - **"Séance validée ✓"** — bouton secondaire (contour)
  - **❤️ Favoris** — ajouter la séance aux favoris
  - **Partage vers Social** — partager la séance dans l'onglet Social
- ⚠️ Inspiration visuelle : Elevate app — **ne pas copier**, s'en inspirer uniquement pour la structure

**Slide 3 — Détail d'un exercice** (clic sur l'exo → la photo apparaît)
- Grande photo plein écran en haut (fond sombre, photo de Lys)
- Nom de l'exercice en gras/majuscules
- Instructions numérotées (1. 2. 3. 4.)
- **Objectif** (ex: Mobilité)
- **Muscles sollicités** avec icônes schéma corps
- **Matériel requis** avec icônes (ex: tapis, mur, haltères...)
- ⚠️ Pas de photo pour échauffement et retour au calme — uniquement pour les exercices du corps principal

**Slide 6 — Exercice étendu pendant la séance**
- Grande photo de l'exercice
- Comment exécuter le mouvement
- Muscles sollicités + nom

**Slide 7 — Navigation séances/sous-séances**
- Clic par séances et sous-séances
- Photo d'un des exercices par séance

**Slide 8 — Présentation programme** *(s'inspirer sans copier)*

**Slide 9 — Déroulement du programme**
- Titres des chapitres
- Présentation chapitre V1 ou V2
- Vue d'ensemble du parcours

**Séance en cours**
- Toutes les infos de la séance + durée
- Bouton "Lancer la séance"
- Bouton fin de séance (rond blanc)

---

### ONGLET PROFIL *(inspiration Elevate "MON PROFIL", ne pas copier — style Instagram chic, à l'image de Lys)*

**En-tête**
- Grande **photo de profil ronde** (à gauche ou centrée)
- **Prénom + nom** en gras sous la photo
- Âge + ville (discret, gris clair)
- **Badges programmes** en cours — pills rose/nude (ex: "FlowToForce V1", "FlowToForce V2")
- **Followers + Suivies** (chiffres en gras + label fin)
- Boutons : **"Modifier le profil"** + **"Paramètres"** (pills gris/discrets)
- Icônes notification (cloche) + partage (avion) en haut à droite

**Menu profil** *(liste avec icônes rondes rose/nude + chevron →)*
- Mes posts
- Mes progrès
- Mes badges *(récompenses séances complétées)*
- Mes favoris *(séances et exos mis en favoris)*
- Mon planning *(accès rapide au calendrier séances)*
- Mon journal *(journaling privé : pensées, ressentis, objectifs)*

**Planning des séances** *(inspiration screenshot Elevate "calendrier", ne pas copier)*
- Vue semaine horizontale (L M M J V S D) — jour actif en surligné
- Fréquence : **2 séances par semaine** à planifier librement
- Bouton **"Planifier"** (plein, couleur) — clic pour choisir la séance et le jour
- **Rappel push la veille** — notification automatique, ton chic :
  *"Prépare tes affaires, tu as ta séance demain 🤍"*
- Rappel optionnel désactivable dans Paramètres (icône cloche)

**Photos progression**
- Jour 1 (face / profil / dos) + optionnel en salle ou pendant exos — choix privé/public

**Journaling** *(privé par défaut)*
- Écrire librement : pensées du jour, ressenti de la séance, objectifs

**Paramètres**
- Modifier mot de passe
- Gérer les notifications
- Contacter le support
- Conditions générales + mentions légales + politique de confidentialité
- Supprimer le compte

---

### ONGLET SOCIAL

Feed communauté — accessible uniquement aux acheteuses du programme.

**Canaux de discussion** *(inspiration Elevate "CANAUX DE DISCUSSION — Une thématique, un feed", ne pas copier)*
- Organisation par **canaux thématiques** — ex: Salle, Home, Motivation, Before/After, Questions
- Chaque canal a une cover image + nom
- Filtres en haut du feed : **Tout** / **Personnes suivies** / **Posts privés**

**Feed posts**
- Photo de profil ronde + @pseudo + horodatage (il y a X h) + menu ···
- Texte du post (photos optionnelles)
- **Réactions** : emoji réaction + commentaire (icônes rose/discrets)
- Bouton flottant **"+ Publier"** (en bas à droite, couleur de la marque)
- Follow automatique sans demande — on voit ce que la personne met en public

**Modération & coach**
- Compte coach **@Lys** présente dans le feed, répond aux filles
- Mention **@** pour citer quelqu'un → notification à la personne
- Badge numéroté coloré pour les notifications
- Lys modère les posts irrespectueux/agressifs/insultants

**Types de contenus**
- Photos before (jour 1) + pendant les séances + fin de programme
- Séances complétées partagées depuis l'onglet Workout
- Chaque post : choix privé ou public par la fille

---

### CONTENU
- V1 : 8 chapitres × 3 séances = 24 workouts (salle, avec matériel)
- V2 : 8 chapitres × 2 séances = 16 workouts (maison, poids du corps)
- Contenu structuré par Lys sur Notion — prêt à intégrer
- Photos manquantes — shooting à planifier avec Thomas

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

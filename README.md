# FlowToForce Landing Page

Landing page Next.js avec intégration Stripe.

## Setup

1. Installer les dépendances:
```bash
npm install
```

2. Créer fichier `.env.local` basé sur `.env.local.example`:
```bash
cp .env.local.example .env.local
```

3. Ajouter tes clés Stripe dans `.env.local`:
- STRIPE_SECRET_KEY (clé secrète Stripe)
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (clé publique Stripe)

## Développement local

```bash
npm run dev
```

L'app ouvre sur `http://localhost:3000`

## Build pour production

```bash
npm run build
npm start
```

## Déploiement Vercel

1. Commit et push sur GitHub
2. Import du repo dans Vercel
3. Ajouter les variables d'environnement Stripe dans Vercel settings
4. Deploy

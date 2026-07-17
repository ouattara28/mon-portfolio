# Portfolio — Ouattara Ismael Ali

Version corrigée et optimisée du portfolio (HTML/CSS/JS pur).

## 🐞 Bugs corrigés

- **Lien GitHub cassé** : `github.com/@ouattara28` → `github.com/ouattara28` (le `@` n'existe pas dans les URLs GitHub).
- **Lien Instagram cassé** : l'URL contenait le pseudo en double et générait une 404.
- **Images introuvables** : le HTML pointait vers `images/...` mais les fichiers étaient à la racine. Les images sont maintenant rangées dans `/images`.
- **CV introuvable** : le lien pointait vers `cv/mon%20cv%20ismael.pdf`, un fichier qui n'existait pas. Le CV est maintenant dans `/cv/mon-cv-ismael.pdf`.
- **Numéro de téléphone invalide** : `tel:+225 05 0576956529` (espaces et chiffres mal placés) → `tel:+2250576956529`.
- **Fichier avec espace dans le nom** : `projet profesionnel.html` → renommé `projet-professionnel.html` (les espaces dans les URLs causent des bugs sur certains hébergeurs/serveurs et cassent le copier-coller de lien).
- **Pages vides** : `formation.html` et `competence.html` n'avaient aucun contenu après le menu. Du contenu basé sur ton CV a été ajouté.
- **Formulaire de contact qui n'envoyait rien** : `<form action="">` ne fait rien en HTML pur. Voir section sécurité ci-dessous.

## ⚡ Optimisations

- **Image avatar compressée : 5,4 Mo → 32 Ko** (redimensionnée à 500×500px, qualité 80, métadonnées EXIF supprimées). C'était de loin le plus gros frein à la vitesse de chargement.
- **Attributs `width`/`height`** ajoutés sur les images pour éviter les sauts de mise en page (CLS).
- **`loading="lazy"`** sur les icônes de réseaux sociaux (hors écran initial), `loading="eager"` sur l'avatar (visible immédiatement).
- **`rel="noopener noreferrer"`** sur tous les liens `target="_blank"` (évite qu'un onglet ouvert puisse manipuler la page d'origine — faille classique *tabnabbing*).
- **Balises `<meta name="description">`** ajoutées sur chaque page pour le SEO et le partage sur réseaux sociaux.
- **Titres `<title>` uniques par page** (avant : "Portfolio de ismael" partout, mauvais pour le SEO).
- **CSS dédupliqué** : la règle `ul{...}` était définie deux fois et se marchait dessus.
- **Footer + script.js** : année automatique, mise en surbrillance du lien de navigation actif.

## 🔒 Sécurité

### Le formulaire de contact
Un site 100% statique (HTML/CSS/JS sans serveur) **ne peut pas envoyer d'email directement** — il n'y a rien côté serveur pour traiter les données, et exposer une clé d'API d'envoi de mail dans le JS du navigateur la rendrait visible par n'importe qui (faille de sécurité directe).

La solution standard et sûre : utiliser un service tiers comme **Formspree** ou **Web3Forms** (gratuits pour un usage perso) qui reçoit le formulaire et te le transfère par email, sans exposer de clé secrète.

**Pour activer le formulaire :**
1. Crée un compte sur https://formspree.io
2. Récupère ton ID de formulaire
3. Remplace `REMPLACER_PAR_VOTRE_ID` dans `contact.html` (attribut `action` du `<form>`)

Un champ honeypot (`_gotcha`) a été ajouté pour limiter le spam automatisé.

### En-têtes HTTP (`_headers`)
Le fichier `_headers` (format Netlify) configure :
- `X-Frame-Options: DENY` — empêche que ton site soit affiché dans une `<iframe>` ailleurs (anti-clickjacking).
- `X-Content-Type-Options: nosniff` — empêche le navigateur de deviner le type d'un fichier.
- `Content-Security-Policy` — limite les scripts/styles/images qui peuvent s'exécuter sur ton site, ce qui réduit fortement le risque d'injection de code malveillant si jamais une dépendance externe est compromise.
- `Referrer-Policy` et `Permissions-Policy` — limitent les fuites d'information vers des sites tiers.

⚠️ Ce fichier ne fonctionne que sur **Netlify**. Si tu héberges sur GitHub Pages, ces en-têtes ne s'appliquent pas nativement (GitHub Pages ne permet pas de configurer les headers) — héberger sur Netlify ou Cloudflare Pages est recommandé si la sécurité des en-têtes t'importe.

### Bonnes pratiques déjà respectées
- Pas de base de données ni de backend = pas de risque d'injection SQL ou de faille serveur classique.
- HTTPS automatique si hébergé sur GitHub Pages / Netlify / Vercel.

## 📁 Structure

```
portfolio/
├── index.html
├── competence.html
├── formation.html
├── projet-professionnel.html
├── contact.html
├── design.css
├── script.js
├── robots.txt
├── _headers
├── images/
│   ├── avatar.jpg
│   ├── gitthub.jpg
│   ├── insta.jpg
│   └── tiktok.png
└── cv/
    └── mon-cv-ismael.pdf
```

## ✅ Prochaines étapes recommandées

1. Activer Formspree pour le formulaire de contact (voir ci-dessus).
2. Vérifier que tous les liens internes utilisent bien `projet-professionnel.html` (renommé, sans espace).
3. Si hébergement GitHub Pages : ajouter un fichier `404.html` personnalisé.
4. Optionnel : ajouter Google Lighthouse (audit gratuit dans Chrome DevTools) pour vérifier le score de perf/SEO/accessibilité après déploiement.

# Event App

Ce projet est une mini application web permettant de créer, afficher et gérer des évènements, ainsi que de gérer les inscriptions des utilisateurs à ces évènements.

L’objectif principal est de mettre en pratique TypeScript, la programmation orientée objet (POO) et l’organisation d’un projet web sans utiliser de framework.

## fonctionnalités développées

-Création d’évènements
-Affichage de la liste des évènements
-Filtre par catégorie
-Filtre par date
-liste des évènement 
-affichage des évènements terminés
-Page détail d’un évènement
-Inscription d’un utilisateur
-Vérification des doublons
-Gestion de la capacité maximale
-Blocage des évènements passés
-Interface moderne et responsive

## Structure du project
event_apt/
├── index.html               # Page principale de l’application
├── styles/
│   └── main.css             # Feuille de styles (design moderne et responsive)
├── dist/
│   └── main.js              # Fichier JavaScript compilé depuis TypeScript
├── src/
│   ├── models/
│   │   ├── Event.ts         # Classe Event (gestion des évènements)
│   │   ├── User.ts          # Classe User (gestion des utilisateurs)
│   │   └── Registration.ts  # Classe Registration (gestion des inscriptions)
│   └── main.ts              # Point d’entrée de l’application
├── types/
│   └── modules.d.ts         # Déclarations de types TypeScript
├── tsconfig.json            # Configuration du compilateur TypeScript
├── package.json             # Dépendances et scripts du projet
├── .gitignore               # Fichiers ignorés par Git
└── README.md                # Documentation du projet

-src/ : contient tout le code TypeScript
-dist/ : contient le JavaScript généré automatiquement
-models/ : classes de l’application (évènement, utilisateur, inscription)
-main.ts : point d’entrée de l’application
-index.html : interface utilisateur
-main.css : style de l’application

## Instalation et lancement

### Prérequis
- Node.js (v14+)
- npm (v6+)
- Un navigateur moderne

 # Installer les dépendances
```bash
npm install
```
# Compiler le TypeScript
```bash
npm run build
```
# Lancer l'application
Deux options :

Option A : Ouvrir manuellement
- Ouvrir `index.html` directement dans un navigateur

Option B : Utiliser Live Server 
- Installer l'extension VS Code "Live Server"
- Clic droit sur `index.html` → "Open with Live Server"
- L'app se recharge automatiquement à chaque modification

Mode d'utilisation

###Comment créer un événement ?

1. Remplir le formulaire "Créer un événement" :
   - Titre : Nom de l'événement
   - Description : Détails sur l'événement
   - Date: Jour de l'événement
   - Lieu : Adresse ou localisation
   - Catégorie : Conférence / Sport / Atelier / Autre
   - Capacité*: Nombre de places disponibles

2. Cliquer sur le bouton "Créer"
3. L'événement apparaît immédiatement dans la liste

## Comment filtrer ou rechercher ?

  Par Catégorie :
- Sélectionner une catégorie dans le menu déroulant "Catégorie"
- La liste se met à jour automatiquement

  Par Date :
- Cliquer sur le champ date et sélectionner une date
- Seuls les événements de ce jour s'affichent

  Afficher les événements terminés :
- Cocher la case "Afficher terminés"
- Une section dédiée apparaît en bas

## Comment s'inscrire ?

1. Cliquer sur le bouton "S'inscrire" sur un événement
2. Remplir le formulaire d'inscription :
   - Nom : Votre nom complet
   - Email : Votre email institutionnel (doit finir par @saintjeaningenieur.org)
3. Cliquer sur "S'inscrire"
4.  Confirmation d'inscription affichée

### Que se passe-t-il si l'événement est plein ?

- Le bouton "S'inscrire" est désactivé (grisé)
- Message : "Places restantes : 0"
- Impossible de s'inscrire
- Vous pouvez voir les détails mais pas vous inscrire

## Autres actions

  Voir les détails d'un événement :
- Cliquer sur "Détails" → Une modal affiche toutes les infos

  Supprimer un événement :
- Cliquer sur "Supprimer" → Demande de confirmation

  Marquer comme terminé :
- Cocher la case "Terminé" → L'événement passe dans la section "Événements terminés"

## capture d'écran


### Page d’accueil
![Page d'acceuil](<capture d'ecran/acceuil.png>)
## liste d’un évènement
![Liste évènement](<capture d'ecran/liste_évènement.png>)
###  Détails d’un évènement
![Détail](<capture d'ecran/Detail_évènement.png>)
## vue Mobile 
!(![vue mobile](<capture d'ecran/vueMobile.png>))

## s'inscrire 
![S'inscrire](<capture d'ecran/S'inscrire_évènement.png>)
## Responsive
![Responsive](<capture d'ecran/responsive.png>)


### conclusion & limites 
Ce projet de mini application web de gestion d’évènements a permis de mettre en pratique les notions fondamentales de TypeScript, notamment la programmation orientée objet, la manipulation des tableaux et l’organisation d’un projet en modules. Les fonctionnalités principales comme la création d’évènements, l’affichage, le filtrage et l’inscription des utilisateurs fonctionnent correctement. L’interface est claire, moderne et responsive, ce qui rend l’application facile à utiliser sur ordinateur comme sur mobile.

La principale difficulté rencontrée a été la liaison entre le TypeScript et le HTML, ainsi que la gestion des imports et de la compilation vers JavaScript. La mise en place des règles de validation (évènement complet, doublons d’inscription, évènement passé) a également demandé une attention particulière.

Avec plus de temps, il serait possible d’améliorer l’application en ajoutant un système de persistance des données (localStorage), une authentification utilisateur, une recherche avancée, ainsi qu’un design encore plus poussé avec des animations supplémentaires. Une version avec backend et base de données pourrait aussi être envisagée.

### Information auteur 
  nom : ALE SONLA NATHANAEL
  matrucule : 2425l100
  email : nathanael.ale@saintjeaningenieur.org


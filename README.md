# TODO List API – Documentation

## Présentation

Ce projet est une API RESTful de gestion de tâches (TODO) réalisée avec **Node.js**, **Express**, **TypeScript** et **Prisma** (MySQL).  
Elle permet la gestion des utilisateurs, des tâches, des permissions, de l’historique des modifications et l’upload d’images.

---

## Fonctionnalités principales

1. **Authentification**
   - Connexion utilisateur avec JWT.
   - Middleware pour sécuriser les routes.

2. **Gestion des utilisateurs**
   - Création et gestion des utilisateurs (via seed ou extension).

3. **Gestion des tâches**
   - CRUD complet : création, lecture, modification, suppression.
   - Recherche, pagination et tri.
   - Association d’une tâche à un utilisateur.

4. **Upload d’images**
   - Ajout d’une image à une tâche via Multer.
   - Stockage des fichiers dans le dossier `uploads` à la racine du projet.

5. **Permissions**
   - Attribution de permissions (GET, PATCH, DELETE) à des utilisateurs sur des tâches.
   - Contrôle d’accès via middleware.

6. **Historique des modifications**
   - Enregistrement de chaque action (lecture, modification, suppression) sur une tâche.
   - Consultation de l’historique par tâche.

7. **Gestion des statuts**
   - Marquer une tâche comme terminée ou en cours.

8. **Gestion des erreurs**
   - Middleware global pour le formatage des erreurs et des réponses.

---

## Structure du projet

- `/src`
  - `controllers/` : Logique métier des routes
  - `services/` : Accès aux données et logique métier
  - `routes/` : Définition des endpoints
  - `models/` : Schémas Zod pour validation
  - `middlewaares/` : Middlewares d’authentification, permissions, erreurs, etc.
  - `enum/` : Codes et messages d’erreur/succès
  - `types/` : Types TypeScript personnalisés
  - `config/` : Configuration Prisma et environnement

- `/prisma`
  - `schema.prisma` : Modèle de la base de données

- `/uploads`
  - Dossier de stockage des images uploadées

---

## Installation & Lancement

1. **Installer les dépendances**
   ```sh
   npm install
   ```

2. **Configurer la base de données**
   - Modifier le fichier `.env` avec votre URL MySQL.

3. **Migrer la base**
   ```sh
   npx prisma migrate dev --name init
   ```

4. **Lancer le serveur**
   ```sh
   npm run build
   npm run dev
   ```

---

## Endpoints principaux

- `POST /api/auth/login` : Connexion utilisateur
- `GET /api/tasks` : Liste des tâches (pagination, recherche, tri)
- `POST /api/tasks` : Création d’une tâche (avec ou sans image)
- `PATCH /api/tasks/:id` : Modification d’une tâche
- `DELETE /api/tasks/:id` : Suppression d’une tâche
- `PATCH /api/tasks/:id/markDone` : Marquer comme terminée
- `PATCH /api/tasks/:id/markUndone` : Marquer comme en cours
- `GET /api/tasks/:id/historique` : Historique des modifications
- `POST /api/grantpermission/:id` : Accorder une permission sur une tâche
- `DELETE /api/grantpermission/:userId/:tacheId/:permission` : Retirer une permission

---

## Remarques

- Les images sont accessibles via `/uploads/<nom_du_fichier>`.
- Toutes les routes (sauf `/api/auth/login`) nécessitent un token JWT dans l’en-tête `Authorization`.
- Les permissions sont strictement contrôlées : un utilisateur ne peut modifier/supprimer une tâche que s’il en est propriétaire ou s’il a reçu la permission.

---



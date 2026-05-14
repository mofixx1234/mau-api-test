# Express TypeScript API

API Express en TypeScript organisee avec une architecture inspiree de NestJS : modules, controllers, services, DTO et middlewares communs.

## Installation

```bash
npm install
```

## Demarrage

```bash
npm run dev
```

L'API ecoute par defaut sur `http://localhost:6060`.

## Scripts

- `npm run dev` : lance le serveur en mode watch.
- `npm run build` : compile le projet TypeScript dans `dist`.
- `npm start` : lance la version compilee.
- `npm test` : verifie les types TypeScript, utile pour CircleCI.
- `npm run typecheck` : verifie les types sans generer de fichiers.

## Docker

Construire l'image :

```bash
docker build -t votre-user-dockerhub/express-ts-nest-like-api:latest .
```

Tester l'image en local :

```bash
docker run --rm -p 6060:6060 votre-user-dockerhub/express-ts-nest-like-api:latest
```

Publier sur Docker Hub :

```bash
docker login
docker push votre-user-dockerhub/express-ts-nest-like-api:latest
```

L'API sera disponible sur `http://localhost:6060/api/health`.

## CircleCI

Le workflow CircleCI teste le projet, construit l'image Docker, puis la publie sur Docker Hub quand un commit arrive sur `main` ou `master`.

Variables a creer dans CircleCI :

- `DOCKERHUB_USERNAME` : votre nom d'utilisateur Docker Hub.
- `DOCKERHUB_TOKEN` : un access token Docker Hub.

Images publiees :

- `votre-user-dockerhub/express-ts-nest-like-api:latest`
- `votre-user-dockerhub/express-ts-nest-like-api:<commit-sha>`

## Endpoints

- `GET /api/health` : page HTML de status.
- `GET /api/health/status` : status JSON.
- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `PATCH /api/users/:id`
- `DELETE /api/users/:id`

Exemple de payload :

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com"
}
```

## Structure

```text
src/
  app.module.ts
  main.ts
  common/
    errors/
    middlewares/
    types/
    validators/
  config/
  core/
  modules/
    health/
    users/
```

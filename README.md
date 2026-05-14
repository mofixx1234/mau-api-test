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

L'API ecoute par defaut sur `http://localhost:3000`.

## Scripts

- `npm run dev` : lance le serveur en mode watch.
- `npm run build` : compile le projet TypeScript dans `dist`.
- `npm start` : lance la version compilee.
- `npm run typecheck` : verifie les types sans generer de fichiers.

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

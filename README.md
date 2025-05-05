<p align="right">
  <a href="README.ru.md"><img src="https://img.shields.io/badge/Русский-red?style=for-the-badge&logo=github" alt="Русский"></a>
</p>

# Nest Trello Demo API

A backend API for a Trello-like task management application, built with NestJS and Prisma.  


![License](https://img.shields.io/badge/license-MIT-blue)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Node](https://img.shields.io/badge/node-%3E=18.0.0-blue)
![Docker](https://img.shields.io/badge/docker-ready-blue)

## Table of Contents

- [About](#about)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [FAQ](#faq)
- [Roadmap](#roadmap)
- [Acknowledgements](#acknowledgements)
- [Changelog](#changelog)

## About

Nest Trello Demo API is a backend service that provides RESTful endpoints for managing boards, columns, cards, users, and comments, similar to Trello.  
It is designed for learning, prototyping, or as a foundation for a full-featured task management system.

**Features:**
- User authentication (JWT)
- CRUD for boards, columns, cards, comments
- Modular architecture (NestJS)
- Database migrations with Prisma
- Docker support for easy deployment

## Requirements

- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker & Docker Compose (optional, for containerized setup)
- PostgreSQL (if running without Docker)

## Installation

```bash
git clone https://github.com/your-username/nest-trello-demo-api.git
cd nest-trello-demo-api
npm install
```

If you want to run with Docker:

```bash
docker-compose up --build
```

Or, to run locally (requires PostgreSQL running):

1. Configure your database in `.env`
2. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```
3. Start the server:
   ```bash
   npm run start:dev
   ```

## Usage

After starting the server, the API will be available at `http://localhost:3000`.

Example: Create a new card (using [app.rest](app.rest) or any REST client):

```http
POST /cards
Content-Type: application/json

{
  "title": "New Task",
  "description": "Description here",
  "columnId": 1
}
```

For authentication, obtain a JWT token via `/auth/login` and include it in the `Authorization` header.

## License

This project is licensed under the [MIT](LICENSE) license.

---

## FAQ

**Q:** How do I run migrations?  
**A:** Use `npx prisma migrate deploy` or `npx prisma migrate dev`.

**Q:** How do I change the database?  
**A:** Edit the `DATABASE_URL` in your `.env` file.

## Roadmap

- Add board sharing and permissions
- WebSocket support for real-time updates
- Integration tests

## Acknowledgements

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [shields.io](https://shields.io)
- [PurpleBooth README Template](https://github.com/PurpleBooth/a-good-readme-template)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

---

**Keep this README up to date. For translations, use separate files (e.g., `README.ru.md`).**

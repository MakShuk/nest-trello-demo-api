<p align="right">
  <a href="README.md"><img src="https://img.shields.io/badge/English-blue?style=for-the-badge&logo=github" alt="English"></a>
</p>

# Nest Trello Demo API

Бэкенд API для приложения управления задачами в стиле Trello, построенный на NestJS и Prisma.  


![Лицензия](https://img.shields.io/badge/license-MIT-blue)
![Сборка](https://img.shields.io/badge/build-passing-brightgreen)
![Node](https://img.shields.io/badge/node-%3E=18.0.0-blue)
![Docker](https://img.shields.io/badge/docker-ready-blue)

## Оглавление

- [Описание](#описание)
- [Требования](#требования)
- [Установка](#установка)
- [Использование](#использование)
- [Лицензия](#лицензия)
- [FAQ](#faq)
- [Дорожная карта](#дорожная-карта)
- [Благодарности](#благодарности)
- [Changelog](#changelog)

## Описание

Nest Trello Demo API — это серверное приложение, предоставляющее REST API для управления досками, колонками, карточками, пользователями и комментариями, аналогично Trello.  
Подходит для обучения, прототипирования или как основа для полноценной системы управления задачами.

**Возможности:**
- Аутентификация пользователей (JWT)
- CRUD для досок, колонок, карточек, комментариев
- Модульная архитектура (NestJS)
- Миграции базы данных с помощью Prisma
- Поддержка Docker для быстрой развертки

## Требования

- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker и Docker Compose (опционально, для контейнеризации)
- PostgreSQL (если запускать без Docker)

## Установка

```bash
git clone https://github.com/your-username/nest-trello-demo-api.git
cd nest-trello-demo-api
npm install
```

Для запуска в Docker:

```bash
docker-compose up --build
```

Или для локального запуска (требуется запущенный PostgreSQL):

1. Настройте подключение к базе данных в `.env`
2. Примените миграции:
   ```bash
   npx prisma migrate deploy
   ```
3. Запустите сервер:
   ```bash
   npm run start:dev
   ```

## Использование

После запуска сервера API будет доступен по адресу `http://localhost:3000`.

Пример: создание новой карточки (через [app.rest](app.rest) или любой REST-клиент):

```http
POST /cards
Content-Type: application/json

{
  "title": "Новая задача",
  "description": "Описание здесь",
  "columnId": 1
}
```

Для аутентификации получите JWT-токен через `/auth/login` и передавайте его в заголовке `Authorization`.

## Лицензия

Проект распространяется под лицензией [MIT](LICENSE).

---

## FAQ

**В:** Как применить миграции?  
**О:** Используйте `npx prisma migrate deploy` или `npx prisma migrate dev`.

**В:** Как изменить базу данных?  
**О:** Измените переменную `DATABASE_URL` в файле `.env`.

## Дорожная карта

- Добавить совместное использование досок и права доступа
- Поддержка WebSocket для обновлений в реальном времени
- Интеграционные тесты

## Благодарности

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [shields.io](https://shields.io)
- [Шаблон PurpleBooth README](https://github.com/PurpleBooth/a-good-readme-template)

## Changelog

Смотрите [CHANGELOG.md](CHANGELOG.md) для истории изменений.

---

**Поддерживайте README в актуальном состоянии. Для переводов используйте отдельные файлы (например, `README.ru.md`).**
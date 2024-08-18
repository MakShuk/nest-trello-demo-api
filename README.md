## Описание

Этот проект построен на основе фреймворка [NestJS](https://nestjs.com/). Для управления и взаимодействия с базой данных используется [PrismaJS](https://www.prisma.io/). База данных PostgreSQL развертывается в контейнере с использованием [Docker Compose](https://docs.docker.com/compose/). Дополнительно, схема базы данных визуализирована с помощью dbdiagram.io (<https://dbdiagram.io/d/66bddb6c8b4bb5230e32bcab>).

## Требования

Перед запуском проекта убедитесь, что у вас установлены следующие инструменты:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Yarn](https://yarnpkg.com/) или [NPM](https://www.npmjs.com/)

## Установка

1. Клонируйте репозиторий:

   ```sh
   git clone https://github.com/MakShuk/nest-trello-demo-api

   ```

2. Установите зависимости:

   ```sh
   yarn install
   # или
   npm install
   ```

## Запуск базы данных

1. Запустите PostgreSQL с помощью Docker Compose:

   ```sh
   docker-compose up -d
   ```

2. Проверьте, что контейнер работает:

   ```sh
   docker-compose ps
   ```

## Настройка Prisma

1. Генерируйте Prisma Client:

   ```sh
   npx prisma generate
   ```

2. Выполните миграции, чтобы создать необходимые таблицы в базе данных:

   ```sh
   npx prisma migrate dev --name init
   ```

## Запуск проекта

Запустите сервер разработки:

```sh
yarn start:dev
# или
npm run start:dev
```

## Структура проекта

Описание структуры проекта:

- `src/` - исходные файлы приложения
- `prisma/` - схемы и миграции базы данных
- `docker-compose.yml` - файл конфигурации Docker Compose

## Лицензия

Этот проект лицензируется на условиях лицензии MIT.

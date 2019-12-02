# news-api
[![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/risesk/news-api?label=version)]

##### Сcылка на сервер: 
https://api.mestoapp.site   

#### Описание
API сервиса News-explorer, позволяющего регистрировать пользователей и сохранять в личном кабинете новости.

#### Возможности API
1. GET-запрос ```/users/me``` возвращает информацию о текущем пользователе;
2. GET-запрос ```/articles``` возвращает все сохранённые пользователем статьи;
3. POST-запрос ```/articles``` создаёт статью с переданными в теле; данными
4. DELETE-запрос на адрес вида ```/articles/articleId``` удаляет сохранённую статью по ```_id```;
5. POST-запрос ```//signup``` создаёт статью с переданными в теле данными;
6. POST-запрос ```/signin``` возвращает JWT, если в теле запроса переданы правильные почта и пароль;
7. Запрос на несуществующий адрес вовзращает код ошибки.

#### Установка
1. Скачать репозиторий:
```git clone git@github.com:risesk/news-api.git```
2. Установить npm-зависимости:
```npm i```
3. Запустить проект на локальном сервере:
```npm run start```

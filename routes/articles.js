const articles = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

articles.get('/', getArticles);

articles.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().uri(),
    image: Joi.string().required().uri(),
  }),
}), createArticle);

articles.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().alphanum(),
  }),
}), deleteArticle);

module.exports = articles;

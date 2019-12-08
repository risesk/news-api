const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const UnauthorizedError = require('../errors/unauthorized-error');


const getArticles = (req, res, next) => {
  const owner = req.user._id;
  Article.find({ owner })
    .then((articles) => {
      if (articles.length === 0) {
        throw new NotFoundError('Ещё нет ни одной статьи');
      }
      res.send(articles);
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  const owner = req.user._id;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => res.send(article))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  Article.findById(articleId)
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Такой статьи не существует');
      } else if (article.owner.toString() !== req.user._id) {
        throw new UnauthorizedError('Недостаточно прав');
      } else {
        return Article.findByIdAndDelete(articleId)
          .then((articleToDelete) => res.send(articleToDelete))
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};

const errorMessages = {

  NO_USER_ERROR: 'Пользователя с таким id не существует',
  NON_UNIQUE_USER_ERROR: 'Такой пользователь уже есть',

  NO_ARTICLE_ERROR: 'Такой статьи не существует',
  NO_ARTICLES_ERROR: 'Ещё нет ни одной статьи',

  FORBIDDEN_ERR: 'Недостаточно прав',
  NOT_FOUND_ERR: 'Запрашиваемый ресурс не найден',

  NOT_AUTH_ERR: 'Необходима авторизация',
  WRONG_AUTH_DATA_ERR: 'Неправильные почта или пароль',

  NOT_LINK_ERR: 'Ссылка имеет неверный формат',
  NOT_EMAIL_ERR: 'E-mail имеет неверный формат',

  SERVER_ERR: 'На сервере произошла ошибка',

};

module.exports = errorMessages;

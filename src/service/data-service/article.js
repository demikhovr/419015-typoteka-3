'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  create(article) {
    const newArticle = {
      comments: [],
      id: nanoid(MAX_ID_LENGTH),
      ...article,
    };

    this._articles.push(newArticle);
    return newArticle;
  }

  drop(id) {
    const index = this._articles.findIndex((article) => article.id === id);

    if (index === -1) {
      return null;
    }

    return this._articles.splice(index, 1)[0];
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((article) => article.id === id);
  }

  update(id, newArticle) {
    const index = this._articles.findIndex((article) => article.id === id);

    if (index === -1) {
      return null;
    }

    const updatedArticle = {
      ...this._articles[index],
      ...newArticle,
    };

    this._articles[index] = updatedArticle;
    return updatedArticle;
  }
}

module.exports = ArticleService;

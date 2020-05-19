'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const articleValidator = require(`../middlewares/article-validator`);
const commentValidator = require(`../middlewares/comment-validator`);
const articleExists = require(`../middlewares/article-exists`);

const router = new Router();

module.exports = (app, articleService, commentService) => {
  app.use(`/articles`, router);

  router.get(`/`, (req, res) => {
    const articles = articleService.findAll();
    res.status(HttpCode.OK).json(articles);
  });

  router.get(`/:articleId`, articleExists(articleService), (req, res) => {
    const {article} = res.locals;
    return res.status(HttpCode.OK).json(article);
  });

  router.post(`/`, articleValidator, (req, res) => {
    const article = articleService.create(req.body);
    return res.status(HttpCode.CREATED).json(article);
  });

  router.put(`/:articleId`, articleValidator, (req, res) => {
    const {articleId} = req.params;
    const updatedArticle = articleService.update(articleId, req.body);

    if (!updatedArticle) {
      return res.status(HttpCode.NOT_FOUND).json({
        error: `Not found article with id: ${articleId}`,
      });
    }

    return res.status(HttpCode.OK).json(updatedArticle);
  });

  router.delete(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const deletedArticle = articleService.drop(articleId);

    if (!deletedArticle) {
      return res.status(HttpCode.NOT_FOUND).json({
        error: `Not found article with id: ${articleId}`,
      });
    }

    return res.status(HttpCode.OK).json(deletedArticle);
  });

  router.get(`/:articleId/comments`, articleExists(articleService), (req, res) => {
    const {article} = res.locals;
    const comments = commentService.findAll(article);
    res.status(HttpCode.OK).json(comments);
  });

  router.delete(`/:articleId/comments/:commentId`, articleExists(articleService), (req, res) => {
    const {article} = res.locals;
    const {commentId} = req.params;
    const deletedComment = commentService.drop(article, commentId);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND).json({
        error: `Not found`,
      });
    }

    return res.status(HttpCode.OK).json(deletedComment);
  });

  router.post(`/:articleId/comments`, [articleExists(articleService), commentValidator], (req, res) => {
    const {article} = res.locals;
    const comment = commentService.create(article, req.body);
    res.status(HttpCode.OK).json(comment);
  });
};

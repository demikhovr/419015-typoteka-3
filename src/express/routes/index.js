'use strict';

const {Router} = require(`express`);
const mainRouter = require(`./main`);
const myRouter = require(`./my`);
const articlesRouter = require(`./articles`);
const {HttpCode} = require(`../../constants`);

const router = new Router();

router.use(`/`, mainRouter);
router.use(`/my(.index.html)?`, myRouter);
router.use(`/articles(.index.html)?`, articlesRouter);

router.use((req, res) => {
  res.status(HttpCode.NOT_FOUND);
  res.render(`pages/404`);
});

router.use((req, res) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR);
  res.render(`pages/500`);
});

module.exports = router;

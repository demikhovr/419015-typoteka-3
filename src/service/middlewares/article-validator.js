'use strict';

const {HttpCode} = require(`../../constants`);

const articleKeys = [`announce`, `createdDate`, `category`, `title`];

module.exports = (req, res, next) => {
  const article = req.body;
  const keys = Object.keys(article);
  const keysExist = articleKeys.every((key) => keys.includes(key));

  if (!keysExist) {
    return res.status(HttpCode.BAD_REQUEST).json({
      error: `Bad request`,
    });
  }

  return next();
};

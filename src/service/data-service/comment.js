'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class CommentService {
  create(article, comment) {
    const newComment = {
      id: nanoid(MAX_ID_LENGTH),
      ...comment,
    };

    article.comments.push(newComment);
    return newComment;
  }

  drop(article, id) {
    const index = article.comments.findIndex((comment) => comment.id === id);

    if (index === -1) {
      return null;
    }

    return article.comments.splice(index, 1)[0];
  }

  findAll(article) {
    return article.comments;
  }
}

module.exports = CommentService;

'use strict';

const {Router} = require(`express`);
const previewsMock = require(`../../mocks/previews`);
const themesMock = require(`../../mocks/themes`);

const articlesRouter = new Router();

articlesRouter.get(`/add`, (req, res) => {
  res.render(`pages/new-post`);
});

articlesRouter.get(`/:id`, (req, res) => {
  const pageContent = {
    comments: [],
    datetime: `2019-03-21T20:33`,
    formattedDatetime: `21.03.2019, 20:33`,
    image: `/img/sea-fullsize@1x.jpg`,
    imageAlt: `пейзаж море, скалы, пляж`,
    themes: [
      {
        amount: 88,
        name: `Автомобили`,
      },
      {
        amount: 13,
        name: `Удаленная работа`,
      },
      {
        amount: 88,
        name: `Бизнес`,
      },
    ],
    title: `AirPods в один клик`,
  };

  res.render(`pages/post`, pageContent);
});

articlesRouter.get(`/edit/:id`, (req, res) => {
  const pageContent = {
    announce: `Материнский холдинг возглавит гендиректор Google Сундар Пичаи. При этом больше половины голосов в компании останется у Пейджа и Брина.`,
    categories: [`Автомобили`],
    date: `21.03.2019`,
    image: `moya_mashinka.jpg`,
    postTitle: `Основатели Google Ларри Пейдж и Сергей Брин отойдут от руководства материнским холдингом Alphabet, сказано в сообщении компании. Пейдж занимал пост гендиректора, а Брин — президента Alphabet. Alphabet возглавит гендиректор Google Сундар Пичаи, он также продолжит руководить Google. Должность президента холдинга будет упразднена.`,
    title: `Как правильно заводить машину`,
  };

  res.render(`pages/new-post`, pageContent);
});

articlesRouter.get(`/category/:id`, (req, res) => {
  const pageContent = {
    activeIndex: 2,
    previews: previewsMock,
    themes: themesMock,
  };

  res.render(`pages/articles-by-category`, pageContent);
});

module.exports = articlesRouter;

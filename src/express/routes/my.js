'use strict';

const {Router} = require(`express`);

const myRouter = new Router();

myRouter.get([`/`, `/index(.html)?`], (req, res) => {
  const pageContent = {
    publications: [
      {
        datetime: `2019-03-21T20:33`,
        formattedDatetime: `21.03.2019, 20:33`,
        title: `Huawei открыла в России предзаказ на смартфон Mate 30 Pro без сервисов Google`,
      },
      {
        datetime: `2019-03-21T20:33`,
        formattedDatetime: `21.03.2019, 20:33`,
        title: `Facebook разрешит пользователям копировать фотографии из соцсети в «Google Фото»`,
      },
      {
        datetime: `2019-03-21T20:33`,
        formattedDatetime: `21.03.2019, 20:33`,
        title: `Huawei открыла в России предзаказ на смартфон Mate 30 Pro без сервисов Google`,
      },
      {
        datetime: `2019-03-21T20:33`,
        formattedDatetime: `21.03.2019, 20:33`,
        title: `Facebook разрешит пользователям копировать фотографии из соцсети в «Google Фото»`,
      },
      {
        datetime: `2019-03-21T20:33`,
        formattedDatetime: `21.03.2019, 20:33`,
        title: `Facebook разрешит пользователям копировать фотографии из соцсети в «Google Фото»`,
      },
    ],
  };

  res.render(`pages/my`, pageContent);
});

myRouter.get(`/categories(.html)?`, (req, res) => {
  const pageContent = {
    categories: [
      `Жизнь и путешествия`,
      `Путешествия`,
      `Дизайн и программирование`,
      `Другое`,
      `Личное`,
    ],
  };

  res.render(`pages/all-categories`, pageContent);
});

myRouter.get(`/comments(.html)?`, (req, res) => {
  const pageContent = {
    comments: [
      {
        author: `Александр Петров`,
        datetime: `2019-03-21T20:33`,
        description: `«Яндекс.Метрика» запустила бесплатный сервис для оценки эффективности баннеров и видеорекламы в реальном времени`,
        formattedDatetime: `21.03.2019, 20:33`,
        image: `/img/avatar-small-2.png`,
        title: `Главреды «Дождя», Forbes и других СМИ попросили Роскомнадзор разъяснить штрафы за ссылки на сайты.`,
      },
      {
        author: `Александр Петров`,
        datetime: `2019-03-21T20:33`,
        description: `Игровая студия Playrix из Вологды потратила более $100 млн на покупку конкурентов в 2018 году`,
        image: `/img/avatar-small-2.png`,
        formattedDatetime: `21.03.2019, 20:33`,
        title: `Главреды «Дождя», Forbes и других СМИ попросили Роскомнадзор разъяснить штрафы за ссылки на сайты.`,
      },
      {
        author: `Александр Петров`,
        datetime: `2019-03-21T20:33`,
        description: `«Яндекс.Метрика» запустила бесплатный сервис для оценки эффективности баннеров и видеорекламы в реальном времени`,
        formattedDatetime: `21.03.2019, 20:33`,
        image: `/img/avatar-small-2.png`,
        title: `Главреды «Дождя», Forbes и других СМИ попросили Роскомнадзор разъяснить штрафы за ссылки на сайты.`,
      },
      {
        author: `Александр Петров`,
        datetime: `2019-03-21T20:33`,
        description: `Игровая студия Playrix из Вологды потратила более $100 млн на покупку конкурентов в 2018 году`,
        image: `/img/avatar-small-2.png`,
        formattedDatetime: `21.03.2019, 20:33`,
        title: `Главреды «Дождя», Forbes и других СМИ попросили Роскомнадзор разъяснить штрафы за ссылки на сайты.`,
      }
    ],
  };

  res.render(`pages/comments`, pageContent);
});

module.exports = myRouter;

'use strict';

const {Router} = require(`express`);
const previewsMock = require(`../../mocks/previews`);
const themesMocks = require(`../../mocks/themes`);

const mainRouter = new Router();

mainRouter.get([`/`, `/index(.html)?`, `/main(.html)?`], (req, res) => {
  const pageContent = {
    comments: [
      {
        image: `img/avatar-small-1.png`,
        href: `#`,
        name: `Анна Артамонова`,
        text: `Сервис аренды жилья Airbnb стал глобальным партнером Международного олимпийского комитета (МОК) на девять лет, в течение которых пройдет пять Олимпиад, в том числе в Токио в 2020 году.`,
      },
      {
        image: `img/avatar-small-2.png`,
        href: `#`,
        name: `Александр Петров`,
        text: `Главреды «Дождя», Forbes и других СМИ попросили Роскомнадзор разъяснить штрафы за ссылки на сайты с матом`,
      },
      {
        image: `img/avatar-small-3.png`,
        href: `#`,
        name: `Игорь Шманский`,
        text: `Что-то все электрокары в последнее время все на одно лицо делаются))`,
      },
    ],
    hots: [
      {
        amount: 12,
        href: `#`,
        title: `Билл Гейтс впервые за два года возглавил рейтинг самых богатых людей мира по версии Bloomberg`,
      },
      {
        amount: 15,
        href: `#`,
        title: `Сервис для аналитики Telegram-чатов Combot попал под блокировку из-за информации на служебной`,
      },
      {
        amount: 12,
        href: `#`,
        title: `Модель Кайли Дженнер продаст 51% своей компании Kylie Cosmetics владельцу Factor за $600 млн`,
      },
      {
        amount: 153,
        href: `#`,
        title: `Tesla получила 146 тысяч предзаказов на электрический пикап Cybertruck за двое суток`,
      },
    ],
    isAdmin: false,
    previews: previewsMock,
    themes: themesMocks,
  };

  res.render(`pages/main`, pageContent);
});

mainRouter.get(`/register(.html)?`, (req, res) => {
  const pageContent = {
    validation: {
      type: `registration`,
      errors: [
        `Пароль не может состоять из двух букв`,
        `Фамилия не должна быть смешной`,
      ],
    }
  };

  res.render(`pages/sign-up`, pageContent);
});

mainRouter.get(`/login(.html)?`, (req, res) => {
  const pageContent = {
    validation: {
      type: `login`,
      errors: {
        email: `Некоторая ошибка произошла, беда!`,
        password: `Некоторая ошибка произошла, беда!`,
      }
    }
  };

  res.render(`pages/login`, pageContent);
});

mainRouter.get(`/search(.html)?`, (req, res) => {
  const pageContent = {
    string: `путешествия`,
    results: [
      {
        content: `Huawei открыла в России путешествия на смартфон Mate 30 Pro без сервисов Google`,
        datetime: `2019-03-21T20:33`,
        formattedDatetime: `21.03.2019, 20:33`,
      },
      {
        content: `«Яндекс.Метрика» запустила путешествия сервис для оценки эффективности баннеров и видеорекламы в реальном времени`,
        datetime: `2019-03-21T20:33`,
        formattedDatetime: `21.03.2019, 20:33`,
      }
    ],
  };

  res.render(`pages/search`, pageContent);
});

module.exports = mainRouter;

'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const {getRandomInt, shuffle} = require(`../../util`);
const {ExitCode, MAX_ID_LENGTH} = require(`../../constants`);

const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;
const FILE_OUTPUT_PATH = `mocks.json`;

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const MAX_ANNOUNCES = 5;
const MONTH_RANGE = 3;
const MAX_COMMENTS = 4;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trimEnd().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateCreatedDate = () => {
  const prevDate = new Date();
  prevDate.setMonth(prevDate.getMonth() - MONTH_RANGE);
  const randomTimestamp = getRandomInt(prevDate, Date.now());
  const randomDate = new Date(randomTimestamp).toISOString();
  const [date, time] = `${randomDate}`.split(`T`);
  return `${date} ${time.split(`.`)[0]}`;
};

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments).slice(0, getRandomInt(1, 3)).join(` `),
  }))
);

const generatePublications = ({count, titles, sentences, categories, comments}) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    createdData: generateCreatedDate(),
    announce: shuffle(sentences).slice(0, MAX_ANNOUNCES).join(` `),
    fullText: shuffle(sentences).slice(0, getRandomInt(1, sentences.length - 1)).join(` `),
    category: shuffle(categories).slice(0, getRandomInt(1, categories.length - 1)),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
    id: nanoid(MAX_ID_LENGTH),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const promises = [
      FILE_TITLES_PATH,
      FILE_SENTENCES_PATH,
      FILE_CATEGORIES_PATH,
      FILE_COMMENTS_PATH,
    ].map(readContent);

    const [
      titles,
      sentences,
      categories,
      comments,
    ] = await Promise.all(promises);

    const [countArg] = args;
    const count = Number.parseInt(countArg, 10) || DEFAULT_COUNT;

    if (count > MAX_COUNT) {
      console.error(chalk.red(`Не больше 1000 публикаций`));
      process.exit(ExitCode.ERROR);
    }

    const publications = generatePublications({
      count,
      titles,
      sentences,
      categories,
      comments,
    });

    const content = JSON.stringify(publications);

    try {
      await fs.writeFile(FILE_OUTPUT_PATH, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};

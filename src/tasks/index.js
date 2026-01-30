const fs = require('fs');

const basePath = './src/tasks';
const postfix = '.task.js';

const entries = fs
    .readdirSync(basePath)
    .filter((fileName) => fileName.endsWith(postfix));

const taskMap = entries.reduce((obj, fileName) => {
    return {
        ...obj,
        [fileName.replace(postfix, '')]: require(`./${fileName}`),
    };
}, {});

// console.log('🚀 ~ entries:', entries);
// console.log('🚀 ~ taskMap:', taskMap);

module.exports = taskMap;

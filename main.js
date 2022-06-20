const { errorMonitor } = require('events');
const fs = require('fs');

const { resourcesAmount, resourceCreationIntervalInMS, resourceCreationPath } = require('./config.json');

let resourcesCount = 0;

const createResource = () => {
    fs.mkdir(`${__dirname}/${resourceCreationPath}/resource_${resourcesCount}`, (err) => {
        if (err) throw new Error('Maybe is the "resourceCreationPath" invalid, please check the path.');
        fs.writeFile(`${__dirname}/${resourceCreationPath}/resource_${resourcesCount}/__resource.lua`, `-- resource_${resourcesCount}`, (err) => {
            if (err) throw new Error(err);
            console.log(`'resource_${resourcesCount}' created!`);
            resourcesCount++;
        });
    });
};

let interval = setInterval(() => {
    if (resourcesCount <= resourcesAmount) {
        createResource();
    } else {
        clearInterval(interval);
    }
}, resourceCreationIntervalInMS);

console.log("\x1b[32mThe Resource Generator is ready!\x1b[0m"); 
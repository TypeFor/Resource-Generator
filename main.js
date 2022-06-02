const fs = require('fs');

const { resourcesAmount, resourceCreationIntervalInMS, resourceCreationPath } = require('./config.json');

let resourcesCount = 0;

const createResource = () => {
    fs.mkdir(`${__dirname}/${resourceCreationPath}/resource_${resourcesCount}`, (err) => {
        if (err) {
            console.log("\x1b[31mError: Maybe is the 'resourceCreationPath' invalid, please check the path.\x1b[0m");
            process.exit();
        }
        fs.writeFile(`${__dirname}/resources/resource_${resourcesCount}/__resource.lua`, `-- resource_${resourcesCount}`, (err) => {
            if (err) {
                console.log(err);
                process.exit();
            }
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
const fs = require("fs");

/**
 * @param fn: Async function which last parameter is callback
 * @return The same function that we pass as parameter but now it works with promises
 */
const promisify = (fn) => {
    const functionThatWorksWithPromise = (...args) => {
        return new Promise((resolve, reject) => {
            fn(...args, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        });
    }

    return functionThatWorksWithPromise;
};

const access = promisify(fs.access);
const exists = (filePath) => access(filePath, fs.constants.F_OK);
const isWritable = (filePath) => access(filePath, fs.constants.W_OK);
const findFile = promisify(fs.readFile);

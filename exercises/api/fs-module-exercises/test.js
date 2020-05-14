const fs = require("fs");
const path = require("path");

const findFile = (name) => {
    const filePath = path.join(__dirname, name); // how to create the path if you don't know the file location? ../assets
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, { encoding: "utf-8" }, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  };

const copyFile = (fileName) => {
  const sourcePath = path.join(__dirname, "../assets", fileName);

  return new Promise((resolve, reject) => {
    const destinationPath = path.join(__dirname, fileName);
    fs.copyFile(sourcePath, destinationPath, (error) => {
      if(error) {
        reject(error);
      } else {
        resolve();
      }
    })
  })
} 

const exists = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.access(filePath, fs.constants.F_OK, (error) => {
      if(error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

const writeFile = (filePath, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, (error) => {
      if(error) {
        reject(error)
      } else {
        resolve();
      }
    });
  });
}

// const writenFile = writeFile(path.join(__dirname, "text.txt"), "Hello");
// writenFile.then(() => {
//   console.log('The file is writen');
// }).catch((error) => {
//   console.log('There was an error', error);
// })

const file = path.join(__dirname, "text.txt");

// Case 1:
// exists(file).then(() => {
//   console.log('The file exists.');
//   findFile("text.txt").then((data) => {
//     console.log('The content of the file in the moment is:', data, typeof data);

//     writeFile(file, data + "\nAuthor: Emilija").then(() => {
//       console.log('The operation is done.');
//     });
//   }).catch(() => {
//     console.log('File not found');
//   })
// }).catch(error => console.log(error))

// Case 2:
const updateData = (data) => {
  const newData = data + "\nAuthor: Emilija";
  return writeFile(file, newData);
}

const logResult = () => {
  console.log('The operation is done.');
}

exists(file)
.then(() => {
  return findFile("text.txt");
})
.then(data => updateData(data))
.then(() => logResult()) // === .then(logResult)
.catch(error => console.log(error))















// exists(path.join(__dirname, "test.js")).then(fileExists => {
//   if(fileExists) {
//     console.log('DA');
//   } else {
//     console.log('NE');
//   }
// });

/**
 * 
 * State(PENDING) - resolve -> State(Fullfilled)
 * ||
 * State(PENDIONG) - reject -> State(Rejected)
 * 
 * resolve(args) -> .then(args)
 * 
 * reject(err) -> .catch(err)
 * 
*/

// findFile("index.html").then(result => {
//   console.log('The content of the file', result);
// });

// copyFile("index.html").then(() => {
//   console.log("file copied");
// }).catch(() => {
//   console.log("copying failed")
// });

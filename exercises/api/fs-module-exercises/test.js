/*
 * 
 * State(PENDING) - resolve -> State(Fullfilled)
 * ||
 * State(PENDING) - reject -> State(Rejected)
 * 
 * resolve(args) -> .then(args)
 * 
 * reject(err) -> .catch(err)
 * 
*/

const fs = require("fs");
const path = require("path");

const fileName = "text.txt"; 
const file = path.join(__dirname, fileName);

const newDirectoryName = "test-directory";
const newFileName = "test-file.html";
const newFilePath = path.join(__dirname, newDirectoryName, newFileName);

const findFile = (name) => {
    const filePath = path.join(__dirname, newDirectoryName, name); // filePath needs to be manually changed, this works for the newly created directory 
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

const changePermission = (filePath, mode) => {
  return new Promise((resolve, reject) => {
    fs.chmod(file, mode, (error) => {
      if(error) {
        reject(error);
      } else {
        resolve();
      }
    })
  })
}

const isWritable = (filePath) => {
   return new Promise((resolve, reject) => {
     fs.access(filePath, fs.constants.W_OK, (error) => {
      if(error) {
        reject(error);
      } else {
        resolve(true);
      }
     })
   })
}

const createDirectory = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(filePath, {recursive: true}, (error) => {
      if(error) {
        reject(error);
      } else {
        resolve();
      }
    })
  })
}

// Creates new directory and creates new file in that directory. The content in the file is added from the html-template file
const newDirectory = createDirectory(path.join(__dirname, newDirectoryName));

newDirectory
.then(() => { 
  console.log("New directory created: ", newDirectoryName);
  return findFile("html-template.html")
}).then((data) => {
  return writeFile(newFilePath, "<!-- Create your HTML here -->" + "\n" + data)
}).then(() => {
    console.log("New file created: ", newFileName);
}).catch((error) => {
  console.log("Error: ", error.message);
})

// Changes permission mode e.g..(RW, R, W ..).
// const changeMode = changePermission(file, 0o765);
// changeMode.then(() => {
//   console.log("Permission changed.");
// }).catch((error) => {
//   console.log("An error had occured: ", + error.message);
// })

// Checks if the file is writable.
// const writableFile = isWritable(file);
// writableFile.then((result) => {
//   console.log(result);
// });

// If the file exists, checks if it is writable, and if that returns true then writes "New line" in it.
// exists(file)
// .then(() => {
//   return isWritable(file);
// })
// .then(() => {
//   return findFile(fileName);
// }).then((data) => {
//   writeFile(file, data + "\nNew line");
// }).catch((error) => {
//   console.log("An error has occured: ", error.message);
// })


// const writenFile = writeFile(path.join(__dirname, "text.txt"), "Hello");
// writenFile.then(() => {
//   console.log('The file is writen');
// }).catch((error) => {
//   console.log('There was an error', error);
// })

//Checks if a file exists, finds the file and adds some new content in it. 
//Case 1: (hard to read)
// exists(file).then(() => {
//   console.log('The file exists.');
//   findFile("text.txt").then((data) => {          // findFile needs adjustment in the: const filePath = path.join(__dirname, name);
//     console.log('The content of the file in the moment is:', data, typeof data);
//     writeFile(file, data + "\nAuthor: Emilija").then(() => {
//       console.log('The operation is done.');
//     });
//   }).catch(() => {
//     console.log('File not found');
//   })
// }).catch(error => console.log(error))

// Case 2: (more organised)
// const updateData = (data) => {
//   const newData = data + "\nAuthor: Emilija";
//   return writeFile(file, newData);
// }

// const logResult = () => {
//   console.log('The operation is done.');
// }

// exists(file)
// .then(() => {
  // return findFile("text.txt");     // findFile needs adjustment in the: const filePath = path.join(__dirname, name);
// })
// .then(data => updateData(data))
// .then(() => logResult()) // === .then(logResult)
// .catch(error => console.log(error))

// Logs out message depending on the existence of the file
// exists(path.join(__dirname, "test.js")).then(fileExists => {
//   if(fileExists) {
//     console.log('YES, the file exists/');
//   } else {
//     console.log('NO, the file does not exist.');
//   }
// });

// Copies file
// copyFile("index.html").then(() => {
//   console.log("file copied");
// }).catch(() => {
//   console.log("copying failed")
// });

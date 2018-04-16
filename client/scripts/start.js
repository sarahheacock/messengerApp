const { spawn } = require('child_process');

const createProcess = (command) => {
  const arr = command.trim().split(' ');
  const first = arr[0];
  arr.splice(0, 1);

  return new Promise((resolve, reject) => {
    const deploy = spawn(first, arr);

    deploy.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    deploy.stderr.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    deploy.stdout.on('close', (data) => {
      console.log(`close: ${data}`);
      resolve(data);
    })
  })
}

// 'nodemon ./staticServer/index.js'
const promises = ['webpack --watch'].map(command => {
  return createProcess(command);
});

Promise.all(promises).then(res => {
  console.log("DONE!");
})

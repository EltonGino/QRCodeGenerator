import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
        message: "Digite a sua URL:",
        name: "URL",
    }
  ])
  .then((answers) => {
    const url = answers.URL;
    const timestamp = Date.now(); // Timestamp unico
    const qr_svg = qr.image(url, {size: 10});
    const qr_filename = `qr_img_${timestamp}.png`; // Gera um nome de arquivo unico as novas imagens

    qr_svg.pipe(fs.createWriteStream(qr_filename));

    fs.appendFile("URL.txt", url + '\n', (err) => { // Append  URL.txt
        if (err) throw err;
        console.log("The URL has been appended!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

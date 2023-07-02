/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import fs from 'fs';
import qr from 'qr-image';

inquirer.prompt([
    {
        message:"Type In the Url to create the QR : ",
        name:"URL"
    }
]).then((answer)=> {
    const url = answer.URL;
    var qr_img = qr.image(url);

    qr_img.pipe(fs.createWriteStream('url_image.png'));

    fs.writeFile("urlText.txt", url,(er)=> {
        if(er) {
            throw er;
        }
        else {
            console.log("Data has been saved successfully!");
        }
    });

    fs.readFile('urlText.txt', "utf-8", (er, data)=> {
        if(er) throw er;
        console.log(`You entered ${data}`);
    })
}).catch((er)=> {
    console.log(er);
})
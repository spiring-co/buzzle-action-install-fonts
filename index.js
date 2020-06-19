const { exec } = require("child_process");
const fs = require("fs");
const path = require("path")
const https = require("https");
module.exports = (job, settings, { fonts }) => {
    return new Promise((onSuccess, onError) => {
        if (fonts.length === 0) {
            onSuccess("No Fonts Supplied")
        }

        Promise.all(fonts.map(({ src, name }) => new Promise((resolve, reject) => {
            try {
                // checks if font Exist 
                exec(
                    ` reg query "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts" /f ${
                    '"' + name + '"'
                    }`,
                    { shell: "powershell.exe" },
                    (error, stdout, stderr) => {
                        if (error || stderr) {

                            getFileFromUrl(src).then(({ filePath, fileName }) => {
                                exec(
                                    `reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts" /v ${
                                    '"' + name + '"'
                                    } /t REG_SZ /d ${fileName} /f`,
                                    { shell: "powershell.exe" },
                                    (error, stdout, stderr) => {
                                        if (error || stderr) {
                                            console.log("error Occured", error || stderr)
                                            reject(error || stderr);
                                        }

                                        console.log("installed")

                                        resolve("Installed")

                                    }

                                );


                            })
                        }
                        else {
                            console.log("already Installed")
                            resolve("Already Installed")
                        }
                    }
                );
            } catch (error) {
                console.log(error)
                reject(error);
            }
        }))).then(() => onSuccess("Done Pre Render")).catch((e) => onError(e))

    })
}

const getFileFromUrl = (src) => new Promise((resolve, reject) => {
    const filePath = "C:\\windows\\fonts\\" + src.substring(src.lastIndexOf("/") + 1)
    const file = fs.createWriteStream(`${filePath}`);
    https.get(src, response => {
        var stream = response.pipe(file);

        stream.on("finish", function () {
            resolve({ filePath, fileName: src.substring(src.lastIndexOf("/") + 1) })
        });
    });
})


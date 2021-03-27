const { exec, execSync } = require("child_process");
const fs = require("fs");
const https = require("https");

const FONT_DIRECTORY = "C:\\windows\\fonts\\";
const FONTS_KEY =
  "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts";

module.exports = async (job, settings, { fonts, onStart, onComplete }) => {
  onStart()
  settings.logger.log(
    `[${job.uid}] [buzzle-action-font-install] Started!`
  );
  return new Promise((resolve, reject) => {
    if (!fonts.length) return resolve("No Fonts Supplied")
    const promises = fonts.map(async ({ src, name }) => {
      const extension = src.substr(src.lastIndexOf("."))
      await getFileFromUrl(src, name + extension);
      try {
        execSync(`REG QUERY "${FONTS_KEY}" /v "${name}"`);
        settings.logger.log(
          `[${job.uid}] [buzzle-action-font-install] Font already Installed ${name}`
        );
        return "Already Installed";
      } catch (err) {
        try {
          execSync(
            `REG ADD "${FONTS_KEY}" /v "${name}" /t REG_SZ /d ${name}${extension} /f`
          );
          settings.logger.log(
            `[${job.uid}] [buzzle-action-font-install] Installed complete - ${name}`
          );
          return "Installed";
        } catch (err) {
          settings.logger.log(
            `[${job.uid}] [buzzle-action-font-install] Failed to install ${name}`, err.message
          );
        }
      }
    });
    Promise.all(promises).then(() => {
      onComplete()
      settings.logger.log(
        `[${job.uid}] [buzzle-action-font-install] Complete`
      );
      resolve("Installed Successfully")
    })
  })
};

const getFileFromUrl = (src, name) => {
  return new Promise((resolve, reject) => {
    const filePath = `${FONT_DIRECTORY}${name}`;
    if (fs.existsSync(filePath)) {
      console.log("Font file exist!")
      resolve(true)
    } else {
      const file = fs.createWriteStream(filePath);

      https.get(src, (response) => {
        const stream = response.pipe(file);

        stream.on("finish", function () {
          resolve(true);
        });
        stream.on("error", reject);
      });
    }
  });
};

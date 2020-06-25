const { exec, execSync } = require("child_process");
const fs = require("fs");
const https = require("https");

const FONT_DIRECTORY = "C:\\windows\\fonts\\";
const FONTS_KEY =
  "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts";

module.exports = async (job, settings, { fonts }) => {
  if (!fonts.length) return "No Fonts Supplied";

  const promises = fonts.map(async ({ src, name }) => {
    await getFileFromUrl(src);
    const fileName = src.split("/").pop();

    try {
      execSync(`REG QUERY "${FONTS_KEY}" /v "${name}"`);
      return "Already Installed";
    } catch (err) {
      try {
        execSync(
          `REG ADD "${FONTS_KEY}" /v "${name}" /t REG_SZ /d ${fileName} /f`
        );
        return "Installed";
      } catch (err) {
        throw new Error(err);
      }
    }
  });
  return Promise.all(promises);
};

const getFileFromUrl = (src) => {
  return new Promise((resolve, reject) => {
    const fileName = src.split("/").pop();
    const filePath = `${FONT_DIRECTORY}${fileName}`;
    const file = fs.createWriteStream(filePath);

    https.get(src, (response) => {
      const stream = response.pipe(file);

      stream.on("finish", function () {
        resolve({ filePath, fileName });
      });
      stream.on("error", reject);
    });
  });
};

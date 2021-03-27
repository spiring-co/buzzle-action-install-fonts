//  import should be like
//const fontInstaller= require("action-install-fonts")

// remove this as it is imported locally
const fontInstaller = require("./index");

// To Install fonts without the context of nexrender job use as below
fontInstaller({ output: "C:\\Users\\Utkarsh\\Desktop", workpath: "C:\\Users\\Utkarsh\\Desktop" },
  { logger: { log: console.log }, workpath: "C:\\Users\\Utkarsh\\Desktop" }, {
  onStart: () => console.log("Started Action font install"),
  onComplete: () => console.log("finished Action font install"),
  fonts: [
    {
      name: "Inconsolata-Regular",
      src:
        "https://spiring-creator.s3.amazonaws.com/thumbnails/1616836126551.ttf",
    },
    {
      name: "MetalMania-Regular",
      src:
        "https://spiring-creator.s3.amazonaws.com/fonts/MetalMania-Regular.ttf",
    },
  ],
}).catch(console.error);

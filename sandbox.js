//  import should be like
//const fontInstaller= require("action-install-fonts")

// remove this as it is imported locally
const fontInstaller = require("./index");

// To Install fonts without the context of nexrender job use as below
fontInstaller(null, null, {
  fonts: [
    {
      name: "MetalMania-Regular",
      src:
        "https://spiring-creator.s3.amazonaws.com/fonts/MetalMania-Regular.ttf",
    }, {
      name: "Inconsolata-Regular",
      src:
        "https://spiring-creator.s3.amazonaws.com/outputs/1616826776379.ttf",
    },
  ],
}).catch(console.error);

//  import should be like 
//var fontInstaller= require("install-fonts")

// remove this as it is imported locally
var fontInstaller = require("./index")

// To Install fonts without the context of nexrender job use as below 
fontInstaller(null, null, {
    fonts: [
        {
            "name": "MetalMania-Regular",
            "src": "MetalMania-Regular file url"
        }
    ],
})
const jsdoc2md = require("jsdoc-to-markdown");
const fs = require("fs");

// For every file in the EpiJS folder, generate a markdown file
fs.readdirSync("./EpiJS").forEach((file) => {
  if (file.endsWith(".js") && !file.includes("index")) {
    jsdoc2md.render({ files: "./EpiJS/" + file }).then((result) => {
      let content = `---
  title: EpiJS - ${file.replace(".js", "").replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); // Title Case
  })} Module
---\n\n # ${file.replace(".js", "").replace(/\w\S*/g, function (txt) {
  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); // Title Case
})} Module\n\n`+ result;

      fs.writeFileSync("./docs/" + file.replace(".js", ".md"), content);
      console.log("Generated " + file.replace(".js", ".md"));
    });
  }
});

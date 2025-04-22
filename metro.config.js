const { getDefaultConfig } = require("@expo/metro-config");
// const fs = require("fs");
// const path = require("path");

const config = getDefaultConfig(__dirname);

// Custom function to get all JSON files in the templates directory
// const templatesDir = path.join(__dirname, "templates");
// const jsonFiles = fs
//   .readdirSync(templatesDir)
//   .filter((file) => file.endsWith(".json"))
//   .map((file) => `./templates/${file}`);

// config.transformer.assetPlugins = jsonFiles;

module.exports = config;

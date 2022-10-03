// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  const { transformer, resolver } = config;

  const  { sourceExts, assetExts } = resolver;


  config.resolver = {
    ...resolver, 
    assetExts: assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"],
    sourceExts: ['js', 'json', 'ts', 'tsx', 'cjs'],
  };

  return config;
})();
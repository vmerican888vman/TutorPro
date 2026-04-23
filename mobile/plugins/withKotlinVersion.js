const { withProjectBuildGradle } = require('expo/config-plugins');

module.exports = function withKotlinVersion(config, version) {
  return withProjectBuildGradle(config, (config) => {
    if (config.modResults.contents.includes('kotlinVersion')) {
      config.modResults.contents = config.modResults.contents.replace(
        /kotlinVersion\s*=\s*['"][^'"]+['"]/,
        `kotlinVersion = '${version}'`
      );
    }
    return config;
  });
};

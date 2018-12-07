const RegexSupport = require('../support/regex.handler.ts');
const styleRegex = new RegexSupport(/(.*){((.|\n|\s)*?)}/gm);

module.exports = (source) => {
  const result = {};

  styleRegex.exec(source, (full, key, styles) => {
    if (!result[key]) {
      result[key] = {}
    }

    styles.trim().split('\n').forEach(style => {
      const [name, value] = style.split(':');
      result[key][name] = value;
    });
  });

  return Object.keys(result).map(key => {
    return `${key.trim()} {
${Object.keys(result[key]).sort().filter(styleKey => !!styleKey && styleKey !== '').map(styleKey => `    ${styleKey}:${result[key][styleKey]}`).join('\n')}
}\n\n`
  }).join('').trim().concat('\n');
};


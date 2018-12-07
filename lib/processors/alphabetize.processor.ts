const RegexSupport = require('../support/regex.handler.ts');

const cssSelectorRegex = /(.*)\s{0,}{/g;
const segmentRegex = /(?<=^|\s)(.*?)(?=\s|$)/g;
const pathRegex = new RegexSupport(/(\.|#|^)(\S*?)(?=#|\.|$)/g);

const CLASS = '.';
const ID = '#';

function alphabetizer(_, path) {
  return path.replace(segmentRegex, createSortedSegment).concat('{');
}

function createSortedSegment(_, path) {
  const result = {
    classes: [],
    id: undefined,
    tag: undefined
  };

  pathRegex.exec(path, (__, type, value) => {
    if (type === CLASS) result.classes.push(value);
    else result[type === ID ? 'id' : 'tag'] = value;
  });

  return [
    (result.tag ? result.tag : ''),
    (result.id ? '#' + result.id : ''),
    (result.classes.length > 0 ? '.' + result.classes.sort().join('.') : '')
  ].join('');
}

module.exports = (source) => {
  return source.replace(cssSelectorRegex, alphabetizer);
};

module.exports = function mutationPipeline(source, processors) {
  processors.forEach(processor => source = processor(source));
  return source;
};

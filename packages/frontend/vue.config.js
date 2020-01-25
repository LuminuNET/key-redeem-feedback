module.exports = {
  configureWebpack: {
    node: {
      dns: 'mock',
      net: 'mock',
    },
  },
};

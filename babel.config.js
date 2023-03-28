module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    'module:metro-react-native-babel-preset',
  ],
  plugins: [
    ['@babel/plugin-syntax-decorators', {legacy: true}],
    ['@babel/plugin-proposal-decorators', {version: 'legacy'}],
    ['@babel/plugin-transform-flow-strip-types', { loose: true }],
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    'react-native-reanimated/plugin'
  ],
};

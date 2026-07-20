const plugins = [
   [
      'module-resolver',
      {
         root: ['./src'],
         alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@core': './src/core',
            '@layout': './src/layout',
            '@pages': './src/pages',
            '@routes': './src/routes',
            '@types': './src/types',
         },
      },
   ],
];

module.exports = {
   presets: [
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/preset-typescript',
   ],
   plugins,
};

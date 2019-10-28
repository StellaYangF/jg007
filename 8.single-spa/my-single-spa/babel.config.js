module.export = api => {
  api.cache(true);
  // api.cache.forever();
  return {
    presets: [
      ["@babel/preset-env", { module: false }]
    ],
    plugins: ["@babel/plugin-syntax-dynamic-import"]
  }
}
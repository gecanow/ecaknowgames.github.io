
/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 | [reset by: https://auth0.com/blog/create-a-simple-and-stylish-node-express-app/#Add-Live-Reload-to-Express-Using-Browsersync]
 |
 */
module.exports = {
    proxy: "localhost:8000",
    files: ["**/*.css", "**/*.pug", "**/*.js"],
    ignore: ["node_modules"],
    reloadDelay: 10,
    ui: false,
    notify: false,
    port: 3000,
  };
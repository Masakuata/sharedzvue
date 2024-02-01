module.exports = {
    pwa: {
        name: 'PetLove',
        themeColor: '#054F7E',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        workboxPluginMode: "InjectManifest",
        workboxOptions: {
            swSrc: "./service-worker.js",
            exclude: [/_redirect/, /\.map$/, /_headers/],
        },
    },
    configureWebpack: {
        devtool: 'source-map'
    }
}
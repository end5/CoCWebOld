module.exports = {
    entry: "./Build/Loader.js",
    output: {
        filename: "./main.js"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".js", ".json"]
    },
}
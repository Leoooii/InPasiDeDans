module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
            "nativewind/babel",
        ],
        plugins: [
            ["module:react-native-dotenv", {
                "moduleName": "@env",  // Aliază variabilele de mediu la '@env'
                "path": ".env",         // Calea către fișierul .env
                "allowlist": null,      // Specifică variabilele permise sau lasă null pentru toate
                "safe": false,          // Setează true dacă vrei să folosești un fișier .env.example
                "allowUndefined": false // True pentru a permite variabile neconfigurate
            }]
        ]
    };
};

import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

export default {
    entry: 'src/client/main.js',
    dest: 'public/main.js',
    format: 'cjs',
    plugins: [
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            plugins: ['external-helpers'],
            "presets": [
                "react",
                [
                    "es2015",
                    {
                        "modules": false
                    }
                ],
                "stage-0"
            ]
        })
    ]
};
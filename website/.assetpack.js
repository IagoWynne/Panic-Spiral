import {pixiPipes} from '@assetpack/core/pixi'

export default {
    entry: './src/app/game/raw-assets',
    output: './public/assets',
    pipes: [
        ...pixiPipes({
            texturePacker: {
                texturePacker: {
                    removeFileExtension: true
                }
            },
            manifest: {
                output: './src/manifest.json'
            }
        })
    ]
};
import{defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import { plugins } from './webpack.config';

export default defineConfig({
    plugins: [react()],
    build: {
        assetsInlineLimit: 0,
        // set this to 0 to make sure video files are not inclined
        rollupOptions:{
            output:{
                assetFileNames: (asssetInfo) => {
                    if(/\.mp4|webm|ogg|mp3|wav|flac|aac|/.test(asssetInfo.name))
                    {
                        return'assets/media/[name] [extname]';
                    }
                    return 'asset/pastor.mp4';
                },
            },
        },
    },
});
declare module 'gif-encoder-2' {
    export default class GifEncoder {
        constructor(width: number, height: number, algorithm?: string, useOptimizer?: boolean, totalMemory?: number);
        setDelay(delay: number): void;
        setRepeat(repeat: number): void;
        setQuality(quality: number): void;
        start(): void;
        addFrame(ctx: CanvasRenderingContext2D): void;
        finish(): void;
        out: {
            getData(): Buffer;
        };
    }
}

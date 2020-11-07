namespace JiksaaEngine {
    export class Ngine {
        private _count: number;

        public constructor(count: number) {
            this._count = count;
        }

        public start() : void {
            this.loop();
        }

        public loop(): void {
            // this._count++;
            document.title = this._count.toString();
            requestAnimationFrame(this.loop.bind(this));
        }
    }
}

window.onload = function() {
    let app = new JiksaaEngine.Ngine(0);
    app.start();
}
namespace JiksaaEngine {
    export class TestClass {
        private _count: number;

        public constructor(count: number) {
            this._count = count;
        }

        public get Count(): number {
            return this._count;
        }
    }
}

window.onload = function() {
    let test = new JiksaaEngine.TestClass(1);
    console.log(`Instance value : ${test.Count}`);
}
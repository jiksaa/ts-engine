import { Entity } from './ecs'

export class Game extends Entity {
    private _last_elapsed_time = 0

    public start(): void {
        this.update()
    }

    public update(): void {
        const dt  = (Date.now() - this._last_elapsed_time) / 1000
        super.update(dt)
        this._last_elapsed_time = Date.now()
        requestAnimationFrame(this.update.bind(this))
    }
}
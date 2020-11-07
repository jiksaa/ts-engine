namespace JiksaaEngine {
    export abstract class Entity {
        private _components : IComponent[]

        public constructor(components?: Array<IComponent>) {
            if (components == undefined) {
                this._components = []
            }
            else {
                this._components = components
            }
        }

        public addComponent(component: IComponent) : void {
            this._components.push(component);
            component.Entity = this
        }

        public getComponent<C extends IComponent>(component_class : Utils.Newable<C>) : C {
            for (const component of this._components) {
                if (component instanceof component_class) {
                    return component as C
                }
            }
            throw new Error(`Component ${component_class} not found for entity`)
        }

        public RemoveComponent<C extends IComponent>(component_class: Utils.Newable<C>): void {
            let toRemove: IComponent | undefined
            let index: number | undefined
          
            for (let i = 0; i < this._components.length; i++) {
                const component = this._components[i]
                if (component instanceof component_class) {
                    toRemove = component
                    index = i
                    break
                }
            }
          
            if (toRemove && index) {
              toRemove.Entity = null
              this._components.splice(index, 1)
            }
          }
    }
}
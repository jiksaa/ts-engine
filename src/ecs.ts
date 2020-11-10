import { Newable } from "./utils"

/**
 * This module define basic Entiy Component System classes
 */

export interface IComponent {
    /**
     * Component interface
     * 
     * A typical concrete component has a link to an Entity
     */
    Entity: Entity | null
}

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

    public get components() : IComponent[] {
        return this._components
    }

    public addComponent(component: IComponent) : void {
        this._components.push(component);
        component.Entity = this
    }

    public getComponent<C extends IComponent>(component_class: Newable<C>): C {
        for (const component of this._components) {
            if (component instanceof component_class) {
                return component as C
            }
        }
        throw new Error(`Component ${component_class} not found for entity`)
    }

    public hasComponent<C extends IComponent>(component_class: Newable<C>): boolean {
        try {
            this.getComponent(component_class)
            return true
        }
        catch (e) {
            return false
        }
    }

    public removeComponent<C extends IComponent>(component_class: Newable<C>): void {
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
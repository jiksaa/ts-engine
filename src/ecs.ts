import { Newable } from "./utils"


export interface IUpdatable {
    update(deltatime: number): void
}

/**
 * This module define basic Entiy Component System classes
 */

export interface IComponent extends IUpdatable{
    /**
     * Component interface
     * 
     * A typical concrete component has a link to an Entity
     */
    Entity: Entity | null
}

export abstract class Entity implements IUpdatable{
    private _components : IComponent[]

    public constructor(components?: Array<IComponent>) {
        if (components == undefined) {
            this._components = []
        }
        else {
            this._components = components
        }
    }

    /**
     * Get Entity Component array
     */
    public get components() : IComponent[] {
        return this._components
    }

    /**
     * Add the given component to the entity component list
     * 
     * @param component component to add in this.components
     */
    public addComponent(component: IComponent) : void {
        this._components.push(component);
        component.Entity = this
    }

    /**
     * Get the linked component instance belonging to the given class
     * 
     * @param component_class Component class to retrieve
     */
    public getComponent<C extends IComponent>(component_class: Newable<C>): C {
        for (const component of this._components) {
            if (component instanceof component_class) {
                return component as C
            }
        }
        throw new Error(`Component ${component_class} not found for entity`)
    }

    /**
     * Check if a given component instance is linked to the component
     * 
     * @param component_class Component class of which a component instance is linked to the Entity
     */
    public hasComponent<C extends IComponent>(component_class: Newable<C>): boolean {
        try {
            this.getComponent(component_class)
            return true
        }
        catch (e) {
            return false
        }
    }

    /**
     * Remove a given component class instance from the entity components collection
     * 
     * @param component_class Component class to remove the instance
     */
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

    /**
     * Update the entity for the given elapsed time
     * 
     * @param deltatime elapsed time
     */
    public update(deltatime: number): void {
        this._components.forEach(component => {
            component.update(deltatime)
        })
    }
}
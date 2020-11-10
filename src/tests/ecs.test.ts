import { Entity, IComponent } from "../ecs"

class ConcreteEntity extends Entity { }

class Component1 implements IComponent {
    public Entity: ConcreteEntity
}

class Component2 implements IComponent {
    public Entity: ConcreteEntity
}

class Component3 implements IComponent {
    public Entity: ConcreteEntity
}

describe('>>> Entity', () => {
    let e: ConcreteEntity
    const c1 = new Component1()
    const c2 = new Component2()
    const c3 = new Component3()
    
    beforeEach(() => {
        e = new ConcreteEntity()
    })

    it('should add, remove, get, and check components', () => {
        // --- ADD --- //
        expect(e.components.length).toBe(0)
        e.addComponent(c1)
        e.addComponent(c2)
        e.addComponent(c3)
    
        expect(e.components.length).toBe(3)
        expect(e.components[0]).toBe(c1)
        expect(e.components[1]).toBe(c2)
        expect(e.components[2]).toBe(c3)
    
        e.removeComponent(Component2)
        expect(e.components.length).toBe(2)
        expect(e.components[0]).toBe(c1)
        expect(e.components[1]).toBe(c3)
    
        expect(e.getComponent(Component1)).toBe(c1)
        expect(e.getComponent(Component3)).toBe(c3)
    
        expect(e.hasComponent(Component1)).toBeTruthy()
        expect(e.hasComponent(Component3)).toBeTruthy()
    })

    it('should throw error if component not found', () => {
        expect(e.hasComponent(Component1)).toBeFalsy()
        expect(() => e.getComponent(Component1)).toThrow()
    })
})


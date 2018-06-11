import { Store } from 'vuex'

export class VuexyState {

}

// mutation decorator 先保留，暂时没啥用
export function Mutation(target:any, propertyKey: string, descriptor: PropertyDescriptor) {
  // console.log('M E');
}

// 先保留，暂时没啥用
export function Action(target:any, propertyKey: string, descriptor: PropertyDescriptor) {
  // console.log('A E')
}

// 先保留，暂时没啥用
export function Getter(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  // console.log('G E');
}

export abstract class VuexyModule extends Object {
  public static Instance<U extends VuexyModule>(c: new () => U): U {
    let m = Vuexy.getModule<U>(c)
    if (!m) m = new c()
    Vuexy.registerModule<U>(m)
    return m
  }
}


export class Vuexy  {
  private static modules: VuexyModule[] = []
  private static $_store: Store<any> = null
  public static init(store: Store<any>) {
    this.$_store = store
  }
  public static registerModule<U extends VuexyModule>(m: U) {
    this.modules.push(m)
    let proto = Object.getPrototypeOf(m)
    let states = Object.getOwnPropertyNames(m)
    let funcs = Object.getOwnPropertyNames(proto)
    funcs.splice(funcs.indexOf('constructor'), 1)
  }
  public static getModule<U extends VuexyModule>(c: new () => U):U | null {
    this.modules.forEach(m => {
      if (m instanceof c) return m as U
    })
    return null
  }
}
import { VuexyModule, Mutation, Action, Getter } from '../index'

class StoreCart extends VuexyModule {
  public count: number = 0
  
  @Mutation
  ddd(payload?: any):void {
    console.log(payload)
    this.count++
  }

  @Action
  async eee():Promise<any> {
    setTimeout(() => {
      this.ddd()
    }, 1000);
  }

  @Getter
  fff() { }
}

export default StoreCart.Instance<StoreCart>(StoreCart)
import { VuexyModule, Mutation, Action, Getter } from '../index'

class StoreCart extends VuexyModule {
  public count: number = 0
  
  @Mutation
  add(payload?: any):void {
    console.log(payload)
    this.count++
  }

  @Action
  async deferAdd():Promise<any> {
    setTimeout(() => {
      this.add()
    }, 1000);
  }

  @Getter
  getCount() { 
    return this.count
  }
}

export default StoreCart.Instance<StoreCart>(StoreCart)
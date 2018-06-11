# vuexy
An static typed wrapper for vuex.
It's still a proof of concept, bugs are where, do not use in production

## Usage

In main.ts

``` typescript
import Vuex from 'vuex'
import { Vuexy } from 'vuexy'

const store = new Vuex.Store({
  // ... initialize your vuex store
})

Vuexy.init(store)
```

Define you vuexy module.
``` typescript
// StoreCart.ts
import { VuexyModule, Mutation, Action, Getter } from '../index'

class StoreCart extends VuexyModule {
  
  // memeber variables become states
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

// this is IMPORTANT! export a singleton via parent's factory function
export default StoreCart.Instance<StoreCart>(StoreCart)
```

Use your module
``` typescript
// MyComponent.vue
<template>
// use your module states directly in template
{{StoreCart.count}}
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import StoreCart from './StoreCart.ts'
@Component
export default class MyComponent extends Vue {
  private StoreCart: any = StoreCart

  // use mutation or actions in functions
  myFunc () {
    this.StoreCart.deferAdd()
      .then(this.StoreCart.add)
  }

  // can also assign member variable to StoreCart's state
  count = StoreCart.count
  deferAdd = StoreCart.deferAdd
  add = StoreCart.add
}
</script>






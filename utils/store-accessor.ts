/* eslint-disable import/no-mutable-exports */
import { getModule } from 'vuex-module-decorators'
import { Store } from 'vuex'
import TaskModule from '@/store/task'

let routerStore: Store<any>
let taskStore: TaskModule

function initializeStores(store: Store<any>): void {
  routerStore = store
  taskStore = getModule(TaskModule, store)
}

export { initializeStores, routerStore, taskStore }

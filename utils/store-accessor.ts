/* eslint-disable import/no-mutable-exports */
import { getModule } from 'vuex-module-decorators'
import { Store } from 'vuex'
import TaskModule from '../store/task'
import TaskAddDialogModule from '../store/taskAddDialog'

let routerStore: Store<any>
let taskStore: TaskModule
let taskAddDialogStore: TaskAddDialogModule

function initializeStores(store: Store<any>): void {
  routerStore = store
  taskStore = getModule(TaskModule, store)
  taskAddDialogStore = getModule(TaskAddDialogModule, store)
}

export { initializeStores, routerStore, taskStore, taskAddDialogStore }

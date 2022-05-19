import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({
  name: 'taskAddDialog',
  stateFactory: true,
  namespaced: true,
})
export default class extends VuexModule {
  isVisibleDialog: boolean = false

  @Mutation
  SET_IS_VISIBLE_DIALOG(data: boolean) {
    this.isVisibleDialog = data
  }

  @Action
  openDialog() {
    this.SET_IS_VISIBLE_DIALOG(true)
  }

  @Action
  closeDialog() {
    this.SET_IS_VISIBLE_DIALOG(false)
  }
}

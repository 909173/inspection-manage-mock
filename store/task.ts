import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Task, Status } from '../types/task'

@Module({
  name: 'task',
  stateFactory: true,
  namespaced: true,
})
export default class extends VuexModule {
  tasks: Task[] = []

  @Mutation
  SET_TASK(data: { title: string; comment: string }) {
    const newId = this.tasks.length
    const newTask: Task = {
      id: newId,
      title: data.title,
      comment: data.comment,
      status: 'waiting',
    }
    this.tasks.push(newTask)
  }

  @Mutation
  CHANGE_STATUS(data: { id: number; status: Status }) {
    this.tasks = this.tasks.map((x) =>
      x.id === data.id ? { ...x, status: data.status } : x
    )
  }

  @Action
  setTask(data: { title: string; comment: string }) {
    this.SET_TASK(data)
  }

  @Action
  changeStatus(data: { id: number; status: Status }) {
    this.CHANGE_STATUS(data)
  }
}

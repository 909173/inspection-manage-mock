import { VueConstructor } from "vue"
import AsyncConfirmDialog from "../components/AsyncConfirmDialog.vue"


declare module "vue/types/vue" {
  interface Vue {
    $confirm(message?: string): Promise<boolean>
  }
}

export default class {
  static install(Vue: VueConstructor) {
    Vue.mixin({
      methods: {
        $confirm:(message?: string) => {
          return new Promise((resolve) => {
            return new AsyncConfirmDialog({
              propsData: {
                message,
                success: () => resolve(true),
                failure:() => resolve(false)
              }
            })
          })
        }
      }
    })
  }
}

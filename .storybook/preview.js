import { withVuetify } from '@socheatsok78/storybook-addon-vuetify/dist/decorators'

export const decorators = [
  withVuetify
]

export const parameters = {
  actions: {},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

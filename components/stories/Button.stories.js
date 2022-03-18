import Button from '../Button.vue';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    buttonColorProp: {
      control: { type: 'select' },
      options: ["primary", "secondary"],
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { Button },
  props: Object.keys(argTypes),
  template: '<Button v-bind="$props"/>',
});

export const Add = Template.bind({});
Add.args = {
  buttonColorProp: "primary",
  buttonLabelProp: '追加',
  buttonOutlinedProp: false
};

export const Cancel = Template.bind({});
Cancel.args = {
  buttonLabelProp: 'キャンセル',
  buttonOutlinedProp: true,
};

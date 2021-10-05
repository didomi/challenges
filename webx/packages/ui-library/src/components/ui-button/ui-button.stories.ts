export default {
  title: 'UI Button',
  component: 'ui-button',
  args: {
    disabled: false,
  },
  argTypes: {
    disabled: {
      name: 'Disabled',
      type: {
        name: 'boolean',
        required: false,
      },
      table: {
        category: 'Props',
      },
      control: {
        type: 'boolean',
      },
    },
  }
};

export const UIButton = ({ disabled }) => {
  return `<ui-button disabled=${disabled}>Test</ui-button>`
}

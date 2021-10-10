export default {
  title: 'UI Library/Form elements/UI Input',
  component: 'ui-input',
  args: {
    disabled: false,
    error: '',
    label: 'Input text title',
    placeholder: 'Lorem ipsum dolor',
    type: 'text',
  },
  argTypes: {
    disabled: {
      type: {
        name: 'boolean',
        required: false,
      },
      control: 'boolean',
      table: {
        category: 'Props',
      },
    },
    error: {
      options: ['', 'email', 'required'],
      control: {
        type: 'select',
        required: false,
      },
      table: {
        category: 'Props',
      },
    },
    label: {
      table: {
        category: 'Props',
      },
    },
    placeholder: {
      table: {
        category: 'Props',
      },
    },
    type: {
      options: ['email', 'password', 'text', 'number'],
      control: {
        type: 'select',
      },
      table: {
        category: 'Props',
      },
    },
  },
};

export const UIInput = ({ disabled, error, label, placeholder, type }) => {
  return `
    <ui-input
      disabled="${disabled}"
      error="${error}"
      label="${label}"
      placeholder="${placeholder}"
      type="${type}">
    </ui-input>`;
};

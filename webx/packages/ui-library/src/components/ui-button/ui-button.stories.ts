import { ButtonSize } from './ui-button-size.type';
import { ButtonTheme } from './ui-button-theme.type';
import { ButtonType } from './ui-button-type.type';

export default {
  title: 'UI Library/Form elements/UI Button',
  component: 'ui-button',
  args: {
    disabled: false,
    size: 'big',
    theme: 'primary',
    type: 'button',
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
    size: {
      name: 'Size',
      options: ['big', 'small'],
      control: 'select',
      table: {
        category: 'Props',
      },
    },
    theme: {
      name: 'Theme',
      options: ['primary', 'secondary'],
      default: 'primary',
      control: 'select',
      table: {
        category: 'Props',
      },
    },
    type: {
      name: 'Type',
      options: ['button', 'submit', 'reset'],
      control: 'select',
      table: {
        category: 'Props'
      }
    }
  },
};

interface UiButtonArgs {
  disabled: boolean;
  size: ButtonSize;
  theme: ButtonTheme;
  type: ButtonType;
}

const themeName = (theme: string): string => theme.charAt(0).toUpperCase() + theme.slice(1);

const UiButton = ({ disabled, size, type, theme }) => {
  return `
    <ui-button
      disabled="${disabled}"
      size="${size}"
      theme="${theme}"
      type="${type}">
      ${themeName(theme)} ${size} button
    </ui-button>`;
};

export const Primary = (args: UiButtonArgs) => UiButton(args);

export const Secondary = Primary.bind({});

Secondary.args = {
  theme: 'secondary',
};

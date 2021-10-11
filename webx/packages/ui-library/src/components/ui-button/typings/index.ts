export type ButtonSize = 'big' | 'small';

export type ButtonTheme = 'primary' | 'secondary';

export type ButtonType = 'button' | 'submit' | 'reset';

export interface UiButtonArgs {
  disabled: boolean;
  size: ButtonSize;
  theme: ButtonTheme;
  type: ButtonType;
}

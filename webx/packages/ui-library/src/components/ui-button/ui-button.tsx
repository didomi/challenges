import { Component, Event, Host, h, Prop, EventEmitter } from '@stencil/core';
import { ButtonSize } from './ui-button-size.type';
import { ButtonTheme } from './ui-button-theme.type';
import { ButtonType } from './ui-button-type.type';

@Component({
  tag: 'ui-button',
  styleUrl: 'ui-button.css',
})
export class UiButton {
  /**
   * Whether button should be disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * Type of the button
   */
  @Prop() type?: ButtonType = 'button';

  /**
   * Whether the button theme is primary or not
   */
  @Prop() theme: ButtonTheme = 'primary';

  /**
   * Whether the button size is big or small
   */
  @Prop() size: ButtonSize = 'big';

  /**
   * Emit event to parent component on click
   */
  @Event() clickEvent!: EventEmitter<void>;

  /**
   * Handle event on click
   */
  private handleClick = (e: Event): void => {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.clickEvent.emit();
  }

  render() {
    return (
      <Host class="ui-button">
        <button
          class={`ui-button-el ui-button-el__${this.theme} ui-button-el__${this.size}`}
          type={this.type}
          disabled={this.disabled}
          onClick={this.handleClick}
        >
          <slot></slot>
        </button>
      </Host>
    );
  }
}

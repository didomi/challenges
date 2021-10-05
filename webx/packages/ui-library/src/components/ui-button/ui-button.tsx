import { Component, Host, h, Prop } from '@stencil/core';
import { ButtonType } from './ui-button-types';

@Component({
  tag: 'ui-button',
  styleUrl: 'ui-button.css',
})
export class UiButton {
  /**
   * Whether button should be disabled
   */
  @Prop() disabled = false;

  /**
   * Type of the button
   */
  @Prop() type?: ButtonType = 'button';

  private handleClick = (e: Event) => {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  render() {
    return (
      <Host class="ui-button">
        <button
          class="ui-button-el"
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

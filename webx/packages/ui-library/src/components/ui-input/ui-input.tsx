import { Component, Event, Host, h, Prop, EventEmitter } from '@stencil/core';
import { InputChangedEvent } from './interfaces';
import { InputType } from './ui-input-type.type';

const ERROR_LABELS = {
  email: 'Sorry, email seems wrong',
  required: 'This field is mandatory'
}

@Component({
  tag: 'ui-input',
  styleUrl: 'ui-input.css',
  shadow: true,
})
export class UiInput {
  /**
   * Input field value
   */
  @Prop({ reflect: true, mutable: true }) value?: string;

  /**
   * Input type
   */
  @Prop() type: InputType = 'email';

  /**
   * Input disable state
   */
  @Prop() disabled: boolean = false;

  /**
   * Input error state
   */
  @Prop() error?: string | null = null;

  /**
   * Input label or title
   */
  @Prop() label: string = 'Input text title';

  /**
   * Input placeholder text
   */
  @Prop() placeholder?: string;

  /**
   * Emit event to parent component on click
   */
   @Event() inputEvent!: EventEmitter<InputChangedEvent>;

   /**
   * Emit an event when input changes
   */
  private handleInput = (event: InputEvent & InputChangedEvent): void => {
    this.value = event.target.value;
    this.inputEvent.emit(event);
  }

  render() {
    return (
      <Host class="ui-input">
        <label>
          <span class={this.disabled ? 'ui-input-el-disabled' : ''}>{this.label}</span>
          <input
            class={`ui-input-el ${this.error ? 'ui-input-el-error' : ''}`}
            disabled={this.disabled}
            type={this.type}
            value={this.value}
            placeholder={this.placeholder}
            onInput={this.handleInput}
            required
          />
        </label>
        <p class={`ui-input-error ${this.error ? 'ui-input-error-active' : ''}`}>{ errorLabel(this.error) }</p>
      </Host>
    );
  }
}

const errorLabel = (error: string): string => ERROR_LABELS[error] ?? '';

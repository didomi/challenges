/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from 'ui-library';

export declare interface UiButton extends Components.UiButton {}
@ProxyCmp({
  inputs: ['disabled', 'size', 'theme', 'type']
})
@Component({
  selector: 'ui-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['disabled', 'size', 'theme', 'type'],
  outputs: ['clickEvent']
})
export class UiButton {
  /** Emit event to parent component on click */
  clickEvent!: this['clickEvent'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['clickEvent']);
  }
}

export declare interface UiInput extends Components.UiInput {}
@ProxyCmp({
  inputs: ['disabled', 'error', 'label', 'placeholder', 'type', 'value']
})
@Component({
  selector: 'ui-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['disabled', 'error', 'label', 'placeholder', 'type', 'value'],
  outputs: ['inputEvent']
})
export class UiInput {
  /** Emit event to parent component on click */
  inputEvent!: this['inputEvent'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['inputEvent']);
  }
}

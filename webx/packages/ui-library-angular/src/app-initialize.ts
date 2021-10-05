import { NgZone } from '@angular/core';
import { defineCustomElements } from 'ui-library/loader';

let didInitialize = false;

export const appInitialize = (doc: Document, zone: NgZone) => {
  return (): any => {
    const win: Window | undefined = doc.defaultView as any;
    if (win && typeof (window as any) !== 'undefined') {
      if (didInitialize) {
        return;
      }
      didInitialize = true;

      const aelFn = '__zone_symbol__addEventListener' in (doc.body as any) ? '__zone_symbol__addEventListener' : 'addEventListener';

      return defineCustomElements(win, {
        exclude: [],
        syncQueue: true,
        jmp: (h: any) => zone.runOutsideAngular(h),
        ael(elm: any, eventName: string, cb: () => void, opts: any) {
          (elm as any)[aelFn](eventName, cb, opts);
        },
        rel(elm: any, eventName: string, cb: () => void, opts: any) {
          elm.removeEventListener(eventName, cb, opts);
        },
      } as any);
    }
  };
};

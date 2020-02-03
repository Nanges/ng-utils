import { Component, InjectionToken, Inject } from '@angular/core';

export const ERROR_DATA = new InjectionToken('Error data');

@Component({
    template: `
        <div>Error:</div>
        <pre>{{ data | json }}</pre>
    `,
})
export class DefaultErrorComponent {
    /**
     *
     */
    constructor(@Inject(ERROR_DATA) public data) {}
}

@Component({
    template: `
        Loading...
    `,
})
export class DefaultLoadingComponent {}

export const ERROR_COMPONENT = new InjectionToken<any>('Error component', {
    factory: () => DefaultErrorComponent,
});

export const LOADING_COMPONENT = new InjectionToken<any>('Loading component', {
    factory: () => DefaultLoadingComponent,
});

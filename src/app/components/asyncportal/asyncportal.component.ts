import { Component, Input, ViewChild, OnChanges, Inject, Type, Optional, Injector } from '@angular/core';
import { CdkPortal, TemplatePortal, Portal, ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Observable, NEVER, BehaviorSubject, merge, of } from 'rxjs';
import { map, catchError, distinctUntilChanged } from 'rxjs/operators';
import { LOADING_COMPONENT, ERROR_COMPONENT, ERROR_DATA } from './tokens';

@Component({
    selector: 'app-asyncportal',
    template: `
        <ng-template [cdkPortalOutlet]="portal$ | async"></ng-template>
        <ng-content *cdkPortal></ng-content>
    `,
})
export class AsyncPortalComponent implements OnChanges {
    @ViewChild(CdkPortal, { static: true })
    successPortal: TemplatePortal<any>;

    @Input()
    source$: Observable<any>;

    // tslint:disable-next-line: variable-name
    private _portal$: Observable<Portal<any>> = NEVER;
    get portal$() {
        return this._portal$;
    }

    readonly triggerLoad: BehaviorSubject<any>;
    private readonly loadingPortal: Portal<any>;

    constructor(
        @Optional() @Inject(LOADING_COMPONENT) private loadingCtor: Type<any>,
        @Optional() @Inject(ERROR_COMPONENT) private errorCtor: Type<any>,
        private injector: Injector
    ) {
        this.triggerLoad = new BehaviorSubject(null);
        this.loadingPortal = new ComponentPortal(this.loadingCtor);
    }

    ngOnChanges(): void {
        this._portal$ = merge(
            this.triggerLoad.pipe(map(() => this.loadingPortal)),
            this.source$.pipe(
                map(() => this.successPortal),
                catchError(e => of(this.makeErrorPortal(e)))
            )
        ).pipe(distinctUntilChanged());
    }

    private makeErrorPortal(errorObj: any) {
        const wMap = new WeakMap();
        wMap.set(ERROR_DATA, errorObj);
        const injector = new PortalInjector(this.injector, wMap);
        return new ComponentPortal(this.errorCtor, null, injector);
    }
}

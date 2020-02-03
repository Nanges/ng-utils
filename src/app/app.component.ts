import { Component } from '@angular/core';
import { timeout, delay } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'ng-utils';

    // tslint:disable-next-line: deprecation
    mySource$ = throwError('Foo').pipe(delay(2500));
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPortalComponent } from '../asyncportal/asyncportal.component';
import { PortalModule } from '@angular/cdk/portal';
import { DefaultErrorComponent, DefaultLoadingComponent } from './tokens';

@NgModule({
    declarations: [AsyncPortalComponent, DefaultErrorComponent, DefaultLoadingComponent],
    imports: [CommonModule, PortalModule],
    entryComponents: [DefaultErrorComponent, DefaultLoadingComponent],
    exports: [AsyncPortalComponent],
})
export class AsyncPortalModule {}

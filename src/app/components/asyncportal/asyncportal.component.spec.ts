import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncPortalComponent } from './asyncportal.component';

describe('AsyncportalComponent', () => {
    let component: AsyncPortalComponent;
    let fixture: ComponentFixture<AsyncPortalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AsyncPortalComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AsyncPortalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

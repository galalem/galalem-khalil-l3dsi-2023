import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDialog } from './dialog.component';

describe('AppDialog', () => {
  let component: AppDialog;
  let fixture: ComponentFixture<AppDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AppDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have dialog element', () => {
    expect(component.dialog).not.toBeNull();
  })
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCoreComponent } from './ngx-core.component';

describe('NgxCoreComponent', () => {
  let component: NgxCoreComponent;
  let fixture: ComponentFixture<NgxCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxCoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

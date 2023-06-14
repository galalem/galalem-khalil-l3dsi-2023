import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageComponent } from './page.component';

interface TestObject { }

describe('PageComponent', () => {
  let component: PageComponent<TestObject>;
  let fixture: ComponentFixture<PageComponent<TestObject>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageComponent<TestObject> ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageComponent<TestObject>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

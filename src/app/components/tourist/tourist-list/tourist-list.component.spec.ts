import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristListComponent } from './tourist-list.component';

describe('TouristListComponent', () => {
  let component: TouristListComponent;
  let fixture: ComponentFixture<TouristListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TouristListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TouristListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

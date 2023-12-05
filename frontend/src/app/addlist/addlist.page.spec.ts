import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddlistPage } from './addlist.page';

describe('AddlistPage', () => {
  let component: AddlistPage;
  let fixture: ComponentFixture<AddlistPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WritesubjectComponent } from './writesubject.component';

describe('WritesubjectComponent', () => {
  let component: WritesubjectComponent;
  let fixture: ComponentFixture<WritesubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritesubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WritesubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

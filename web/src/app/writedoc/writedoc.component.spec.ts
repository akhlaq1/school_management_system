/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WritedocComponent } from './writedoc.component';

describe('WritedocComponent', () => {
  let component: WritedocComponent;
  let fixture: ComponentFixture<WritedocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritedocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WritedocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

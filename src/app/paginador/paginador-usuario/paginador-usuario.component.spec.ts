import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorUsuarioComponent } from './paginador-usuario.component';

describe('PaginadorUsuarioComponent', () => {
  let component: PaginadorUsuarioComponent;
  let fixture: ComponentFixture<PaginadorUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginadorUsuarioComponent]
    });
    fixture = TestBed.createComponent(PaginadorUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

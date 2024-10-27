import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmarCompraPage } from './confirmar-compra.page';

describe('ConfirmarCompraPage', () => {
  let component: ConfirmarCompraPage;
  let fixture: ComponentFixture<ConfirmarCompraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarCompraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

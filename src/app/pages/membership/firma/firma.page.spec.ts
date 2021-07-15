import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FirmaPage } from './firma.page';

describe('FirmaPage', () => {
  let component: FirmaPage;
  let fixture: ComponentFixture<FirmaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FirmaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MainFormPage } from './main-form.page';

describe('MainFormPage', () => {
  let component: MainFormPage;
  let fixture: ComponentFixture<MainFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MainFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

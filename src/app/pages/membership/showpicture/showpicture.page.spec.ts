import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowpicturePage } from './showpicture.page';

describe('ShowpicturePage', () => {
  let component: ShowpicturePage;
  let fixture: ComponentFixture<ShowpicturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowpicturePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowpicturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

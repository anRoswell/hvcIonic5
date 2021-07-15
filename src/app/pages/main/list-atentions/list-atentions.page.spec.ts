import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListAtentionsPage } from './list-atentions.page';

describe('ListAtentionsPage', () => {
  let component: ListAtentionsPage;
  let fixture: ComponentFixture<ListAtentionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAtentionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListAtentionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'

import { SlidesComponent } from './slides/slides.component'
import { StartButtonComponent } from './start-button/start-button.component'
import { PopoverComponent } from './popover/popover.component'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
@NgModule({
	declarations: [SlidesComponent, StartButtonComponent, PopoverComponent, HeaderComponent, FooterComponent],
	imports: [CommonModule, FormsModule, IonicModule],
	exports: [SlidesComponent, StartButtonComponent, PopoverComponent, HeaderComponent, FooterComponent],
})
export class ComponentsModule {}

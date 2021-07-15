import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ModalController, NavParams } from '@ionic/angular'

@Component({
	selector: 'app-showpicture',
	templateUrl: './showpicture.page.html',
	styleUrls: ['./showpicture.page.scss'],
})
export class ShowpicturePage implements OnInit {
	@ViewChild('slider', { read: ElementRef }) slider: ElementRef
	public img: string
	public sliderOpts = {
		zoom: {
			maxRatio: 3,
		},
	}
	constructor(private navParams: NavParams, private modalController: ModalController) {}

	ngOnInit() {
		this.img = this.navParams.get('sign')
	}

	zoom(zoomIn: boolean) {
		const zoom = this.slider.nativeElement.swiper.zoom
		if (zoomIn) {
			zoom.in()
		} else {
			zoom.out()
		}
	}

	close() {
		this.modalController.dismiss()
	}
}

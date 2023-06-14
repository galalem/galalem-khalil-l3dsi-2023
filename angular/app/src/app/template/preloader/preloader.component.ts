import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { PageCommonService as CommonService } from '../page/page-common.service';

import {
	trigger,
	state,
	animate,
	transition,
	style,
	AnimationEvent
} from "@angular/animations";

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  animations: [
		trigger('preload', [
			state('open', style({
				height: '100vh'
			})),
			state('closed', style({
				height: '0px'
			})),
			transition('open => closed', [
				animate('300ms ease-in')
			]),
			transition('closed => open', [
				animate('300ms ease-out')
			]),
		]),
	],
})
export class PreloaderComponent implements OnInit, OnDestroy {

	private subscription:any;
	constructor(private service: CommonService, private cdref: ChangeDetectorRef){}

	ngOnInit(){
		this.subscription = this.service.loading.subscribe((isLoading) => {
			let target = isLoading ? 'open' : 'closed';
			if (target != this.preloader){
				this.preloader = target;				
				this.cdref.detectChanges();
			}
		});
	}

	preloader = 'open';
	preloaderChildrenVisible = true;
	onPreloaderDone(event: AnimationEvent) {
		if (event.toState == 'closed') this.preloaderChildrenVisible = false;
	}
	onPreloaderStart(event: AnimationEvent) {
		if (event.toState == 'open') this.preloaderChildrenVisible = true;
	}
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}

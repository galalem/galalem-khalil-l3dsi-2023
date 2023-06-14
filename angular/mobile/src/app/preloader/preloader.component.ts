import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AppCommonService as CommonService } from '../app.service';

import {
	trigger,
	state,
	animate,
	transition,
	style,
	AnimationEvent
} from "@angular/animations";
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-preloader',
  template: `
<div class="preloader flex-column justify-content-center align-items-center" [@preload]="preloader" (@preload.done)="onPreloaderDone($event)" (@preload.start)="onPreloaderStart($event)">
  <img *ngIf="preloaderChildrenVisible" class="animation__shake" src="assets/img/logo/logo.png" alt="Logo" height="60" width="60" style="animation-iteration-count: infinite;">
</div>
  `,
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
export class PreloaderComponent implements OnDestroy, OnInit {

	private subscription:Subscription;
	constructor(private service: CommonService, private cdref: ChangeDetectorRef){
	}

	preloader = 'open';
	preloaderChildrenVisible = true;
	onPreloaderDone(event: AnimationEvent) {
		if (event.toState == 'closed') {
			this.preloaderChildrenVisible = false;			
			this.cdref.detectChanges();
		}
	}
	onPreloaderStart(event: AnimationEvent) {
		if (event.toState == 'open') {
			this.preloaderChildrenVisible = true;			
			this.cdref.detectChanges();
		}
	}
	ngOnInit(): void {
		this.subscription = this.service.loading.subscribe((isLoading) => {
			let target = isLoading ? 'open' : 'closed';
			if (target != this.preloader){
				this.preloader = target;				
				this.cdref.detectChanges();
			}
		});
	}
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}

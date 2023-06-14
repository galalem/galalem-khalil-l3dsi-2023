import { Component } from '@angular/core';
import { Page } from 'src/app/page/page.component';
import { Person } from 'ngx-core';

@Component({
  selector: 'person-details',
  template: '<p>Can not use this directly</p>',
})
export abstract class PersonDetails<T extends Person> extends Page<T> {

  entity: T;
  protected abstract get ref():string;
  protected abstract get listSelector():string;

  override ngOnInit() {  
    this.init('human-resources/' + this.ref, 'human-resources/' + this.ref, this.listSelector);
    this.default().read(this.getRouteParam('id'), (response:T) => this.copy(this.entity, response));
    super.ngOnInit();
  }

  abstract copy(destination:T, original:T):void;
}

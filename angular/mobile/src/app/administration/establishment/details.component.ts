import { Component } from '@angular/core';
import { DateUtils, StringUtils } from 'ngx-core';
import { Establishment } from './establishment.entity';
import { Page } from 'src/app/page/page.component';

@Component({
  selector: 'establishment-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent extends Page<Establishment> {

  entity: Establishment = new Establishment();

  override ngOnInit() { 
    this.init('administration/establishment', 'administration/establishment', 'establishment-details');  
    this.read('').subscribe((response) => {
      if (response) {
        this.entity = Establishment.copy(response);
        this.entity.updatedAt = DateUtils.format(this.entity.updatedAt, "dddd D MMMM YYYY à HH:mm");
      }
    });
    super.ngOnInit();
  }

  isBlank = StringUtils.isBlank;
}

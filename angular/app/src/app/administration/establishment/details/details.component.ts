import { Component } from '@angular/core';
import { DateUtils, StringUtils } from 'ngx-core';
import { Establishment } from '../establishment.entity';
import { PageComponent } from 'src/app/template/page/page.component';
import { faEnvelope, faImage, faLocationCrosshairs, faMapLocationDot, faNoteSticky, faPenToSquare, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'establishment-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent extends PageComponent<Establishment> {

  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faNoteSticky = faNoteSticky;
  faPenToSquare = faPenToSquare;
  faImage = faImage;
  faMapLocationDot = faMapLocationDot;
  faLocationCrosshairs = faLocationCrosshairs;

  entity: Establishment = new Establishment();
  canEdit = false;


  override ngOnInit() { 
    this.init('administration/establishment', 'administration/establishment', 'establishment-details');  
    this.read('').subscribe((response) => {
      if (response) {
        this.entity = Establishment.copy(response);
        this.entity.updatedAt = DateUtils.format(this.entity.updatedAt, "dddd Do MMMM YYYY à HH:mm");
        console.log(response.address);
        console.log(this.entity.address);
      }
    });
    this.service.userinfo.subscribe(info => this.canEdit = info.roleRaw == 'ADMIN');
    super.ngOnInit();
  }

  isBlank = StringUtils.isBlank;
}

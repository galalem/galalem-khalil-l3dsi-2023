import { Component } from '@angular/core';
import { PageComponent } from 'src/app/template/page/page.component';
import { 
  DateUtils, 
  nationalities, 
  DeleteDialogComponent as DeleteDialog, 
  StringUtils,
  Person,
  Gender
} from 'ngx-core';


@Component({
  selector: 'person-details',
  template: '<p>Can not use this directly</p>',
})
export abstract class DetailsComponent<T extends Person> extends PageComponent<T> {

  FEMALE = Gender.FEMALE;

  entity: T;
  ref:string;
  subject:string;
  isBlank = StringUtils.isBlank;

  before:any[] = [];
  after:any[] = [];

  initialize(ref:string, listSelector:string, subject:string) {
    this.ref = ref;
    this.subject = subject;
    this.init('human-resources/' + this.ref, 'human-resources/' + this.ref, listSelector);
  } 

  get editLink() {
    return ['human-resources/' + this.ref + '/' + this.entity.id + '/edit'];
  }

  override ngOnInit() {  
    this.default().read(this.getRouteParam('id'), (response:T) => {
      response.nationality = response.nationality.toUpperCase();
      this.copy(response);
    });
    super.ngOnInit();
  }

  abstract copy(original:T):void;
  dateFormat(date:string, format:string):string {
    return DateUtils.format(date, format);
  }

  showDeleteDialog(): void {
    this.dialog.open(DeleteDialog, {
      data: {
        subject: this.subject,
        handler: () => this.default().delete(this.entity.id),
      },
    });
  }
}

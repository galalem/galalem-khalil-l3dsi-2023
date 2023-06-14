import { Component, ElementRef } from '@angular/core';
import { PageComponent } from '../template/page/page.component';
import { PageCommonService } from '../template/page/page-common.service';
import { BREADService, DataTableDialogComponent, dataTableColumnsFromDefault } from 'ngx-core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent extends PageComponent<any> {
  
  range = {
    start: new Date(),
    end: new Date()
  }
}

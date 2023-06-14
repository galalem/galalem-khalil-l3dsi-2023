import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';

@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  transform(url:any): Observable<SafeUrl> | undefined {
      if (!url)
        return undefined;

      return this.http
          .get(url, { responseType: 'blob' }).
          pipe(map((val:Blob) => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val))));
  }

}

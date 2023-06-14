import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HOST_URL, KEYCLOAK_URL } from 'src/application.properties';

@Injectable()
export class SecurityService {

    private ROLES = {
        ADMIN: "Administrateur", 
        TEACHER: "Enseignant", 
        STUDENT: "Élève", 
        PARENT: "Parent",
        undefined: ""
    }
    private BASE:string = KEYCLOAK_URL + "/realms/ngx/protocol/openid-connect/"
    constructor(private http: HttpClient) { }
    private url(path?:any):string{
        return this.BASE + path;
    }

    public userinfo():Observable<any> {
        return this.http.get<any>(this.url("userinfo")).pipe(catchError(this.handleError), map((value) => {            
            if (!value.role)
                value.role = [undefined];
            else
                value.role = value.role.filter((role:string) => Object.keys(this.ROLES).includes(role))
            return {
                id: value.ngx_id,
                uid: value.sub,
                address: "",
                email: value.email,
                first_name: value.given_name,
                last_name: value.family_name,
                full_name: value.name,
                username: value.preferred_username,
                role: this.ROLES[value.role[0] as keyof typeof this.ROLES] as string,
                roleRaw: value.role[0],
                picture: value.picture || `assets/img/default-avatar-${value.gender == "FEMALE" ? "female" : "male"}.png`
            }
        }));
    }
    public resetPasswordUrl():string {
        return this.url("auth?client_id=angular-web-app&redirect_uri="+HOST_URL+"&response_type=code&scope=openid&kc_action=UPDATE_PASSWORD");
    }
    public logoutUrl():string {
        return this.url("logout");
    }



    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        console.log(error);
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
    private handleEvent(event: HttpEvent<any>) {
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}
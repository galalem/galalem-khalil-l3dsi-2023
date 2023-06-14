import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, Observable, ObservableInput, OperatorFunction, map, retry, ObservedValueOf, timer, Subscription, MonoTypeOperatorFunction } from 'rxjs';

@Injectable()
export class BREADService<T> {

    static BASE_URL:string = "http://localhost:8100";

    private defaultRetryHandler = {
        count: 2, delay: (error: HttpErrorResponse) => {
            if ([401, 403, 404, 502, 503, 504].includes(error.status))
                return timer(1000);
            throw error;
        }
    };
    private defaultHandleError(error: HttpErrorResponse) {
        let message = `Error ${error.status}: ${error.statusText}`;
        if (error.status == 400 && error.error)
            message += ': ' + Object.values(error.error).join(', ');

        console.log(message);
        console.log(error);

        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    private _handleError: (err: any, caught: Observable<any>) => ObservableInput<any> = this.defaultHandleError;
    set handleError(value: (err: any, caught: Observable<any>) => ObservableInput<any>) {
        this._handleError = value;
    }

    private _loading: number = 0;
    private get loading(): boolean {
        return this._loading > 0;
    }



    public base: string = BREADService.BASE_URL;
    private res: string = "";
    constructor(private http: HttpClient) { 
        this.base = BREADService.BASE_URL;
    }
    public resource(res: string): BREADService<T> {
        this.res = res;
        return this;
    }

    private url(id?: any): string {
        return this.base + "/api/" + this.res + (id ? `/${id}` : '');
    }

    public raw(): HttpClient {
        return this.http;
    }
    public browse(): HttpObservable<T[]> {
        return this.wrapRequest(this.http.get<T[]>(this.url()));
    }
    public read(id: any): HttpObservable<T> {
        return this.wrapRequest(this.http.get<T>(this.url(id)));
    }
    public add(model: T | FormData): HttpObservable<any> {
        return this.wrapRequest(this.http.post(this.url(), model));
    }
    public edit(id: any, model: T | FormData): HttpObservable<any> {
        return this.wrapRequest(this.http.put(this.url(id), model));
    }
    public patch(id: any, model: T | FormData): HttpObservable<any> {
        return this.wrapRequest(this.http.patch<T>(this.url(id), model));
    }
    public delete(id: any): HttpObservable<any> {
        return this.wrapRequest(this.http.delete(this.url(id)));
    }
    private wrapRequest<T>(request:Observable<T>) {
        this.startHttpRequest();
        return new HttpObservable(request.pipe(this.retryRequest(), this.catchHttpErr()), () => this.endHttpRequest());
    }

    private retryRequest<S>(): MonoTypeOperatorFunction<S> {
        return retry(this.defaultRetryHandler);
    }
    private catchHttpErr<T, O extends ObservableInput<any>>(): OperatorFunction<T, T | ObservedValueOf<O>> {
        return catchError((err: any, caught: Observable<T>) => {
            this.endHttpRequest();
            return this._handleError(err, caught);
        });
    }
    private startHttpRequest(): void {
        this._loading++;
        this.notifyStatusChange();
    }
    private endHttpRequest(): void {
        this._loading--;
        this.notifyStatusChange();
    }
    private notifyStatusChange(): void {
        this.onStatusChange?.call(this, this.loading);
    }
    private onStatusChange?:Function;
    public setOnStatusChangeListener(onStatusChange:Function){
        this.onStatusChange = onStatusChange;
    }
}

export class HttpObservable<T> {

    private subscription?:Subscription;
    private $done:boolean = false;
    public get done():boolean {return this.$done};
    constructor(private httpcall:Observable<T>, private afterRequest:() => void){}

    public subscribe(callback: (res:T) => void) {
        this.subscription = this.httpcall.subscribe((response:T) => {
            callback(response);
            this.unsubscribe();
        })
    }

    public unsubscribe() {
        if (this.subscription)
            this.subscription.unsubscribe();
        this.afterRequest();
        this.$done = true;
    }
}
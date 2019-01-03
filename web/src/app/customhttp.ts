    import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, ConnectionBackend, RequestOptions, Request } from '@angular/http';
import { Observable } from 'rxjs'


@Injectable()
export class CustomHttp extends Http {

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        console.log('request...');
        return super.request(url, options)
            .map(res => res.json())
            .catch(res => {
                return Observable.throw(res.json());
            });

    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        console.log('get...');
        return super.get(url, options)
            .map(res => res.json())
            .catch(res => {
                return Observable.throw(res.json());
            });
    }

}
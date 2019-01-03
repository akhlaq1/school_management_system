import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, ConnectionBackend, RequestOptions, Request } from '@angular/http';
import { Observable } from 'rxjs'


@Injectable()
export class appService {

    constructor(private http: Http) {

    }
    authentication(name, email, password, type, uid): Observable<any> {
        return this.http
            .post('/SaveAuthentication',
            {
                data: { username: name, password: password, email: email, roll: type, uid: uid }
            })
            .retry(3)
            .map((r: Response) => r.json().data);
    }
    isauthenticate(email, pass): Observable<any> {
        return this.http
            .post('/FindAuthentication', {
                data: {
                    email: email,
                    password: pass
                }
            })
            .first()
            .map((r: Response) => r.json().data);
    }
    sendTokenToServer(token, email): Observable<any> {
        return this.http.post('/UpdateToken', {
            data: { token: token, email: email }
        })
            .map((r: Response) => r.json().data);
    }

}




@Injectable()
export class CustomHttp extends Http {
    uid;
    _id;
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }
    /*request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        console.log('request...');
        return super.request(url, options)
            
            .catch(res => {
                return Observable.throw(res.json());
            });

    }*/
    post(url: string, options?: RequestOptionsArgs): Observable<Response> {
        console.log('get...');

        if (localStorage.getItem('status')) {
            this.uid = JSON.parse(localStorage.getItem('status'))['uid']
            this._id = localStorage.getItem('_id')
        }

        return super.post(url + '/?uid=' + this.uid + '&_id='+this._id, options)

            .catch(res => {
                return Observable.throw(res.json());
            });
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        console.log('get...');

        if (localStorage.getItem('status')) {
            this.uid = JSON.parse(localStorage.getItem('status'))['uid']
            this._id = localStorage.getItem('_id')
        }

        return super.get(url + '/?uid=' + this.uid + '&_id='+this._id, options)

            .catch(res => {
                return Observable.throw(res.json());
            });
    }

}

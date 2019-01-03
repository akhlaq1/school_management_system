import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs'




@Injectable()
export class parentService {
    constructor(private http: Http) {

    }

    getAllParents(): Observable<any> {

        return this.http.get('/FindAllParent')
            .map((r: Response) => r.json().data);
    }

    // saveParents(data):Observable<any>{
    //     this.http.post('/',data:{ gardian:data.gardian, })
    // }

    saveParents(gardian,address,houseNo,studentId,emailid,vanId): Observable<any> {

        console.log(studentId);
        return this.http
            .post('/SaveParent', { data: { gardian: gardian, address: address , houseNo:houseNo ,studentId :studentId,emailid : emailid ,vanId: vanId} })
            .map((r: Response) => r.json().data);
    }

    edithParent(ParentEditId,gardian,address,houseNo,studentId,vanId): Observable<any>{

           return this.http
            .post('/EditParent', { data: { _id : ParentEditId , gardian: gardian, address: address , houseNo:houseNo ,studentId :studentId ,vanId: vanId} })
            .map((r: Response) => r.json().data);

    }
}

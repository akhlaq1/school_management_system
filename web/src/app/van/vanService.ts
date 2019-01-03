
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs'

import { Van } from './van'

@Injectable() 
export class vanService {
    constructor(private http : Http){

    }
    SaveVan(selectedAreaObj, selectedDriverObj, vanname, lisence, nic, servicelocation, noOfSeats ,groupOfStudents,routeId) : Observable<Van>{
                               
         return this.http
                    .post('/SaveVanRegistration' , {data : 
                        { areaId :  selectedAreaObj,
                        driverId :  selectedDriverObj._id,
                        driverUid : selectedDriverObj.uid,
                        routeId:routeId,
                         name : vanname, lisence :lisence,nic :nic, servicelocation: servicelocation, noOfSeats : noOfSeats , groupOfStudents : groupOfStudents } } )
                    .map((r:Response) => r.json().data );
    }
    getAllVan()  : Observable<Van>{
         return this.http
                    .get('/FindVanRegistration' )
                    .map((r:Response) => r.json().data );
    } 
    AssignStudent(vanregId,students):Observable<any>{
        return this.http.post('/AssignVan',{data : { vanregId : vanregId._id ,   groupOfStudents :  students  } })
          .map((r:Response) => r.json().data);
    }
    AssignDriver(vanregId,driverId):Observable<any>{
        return this.http.post('/AssignDriver',{data : { vanregId : vanregId , driverId :  driverId._id , driveruid : driverId.uid  } })
          .map((r:Response) => r.json().data);
    }
    
     
}
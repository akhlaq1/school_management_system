import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2'
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-reputation',
  templateUrl: './reputation.component.html',
  styleUrls: ['./reputation.component.css']
})
export class ReputationComponent implements OnInit {

  constructor(private af: AngularFire, private _http: Http, ) { }

  tuid = [];
  tsubject = [{
    questions: 0,
    answers: 0,


  }];

  teachersR = [];

  teacherRepo = [];

  ngOnInit() {

    this._http.post('/FindAllEmails', {
      data: {
        roll: 'teacher'
      }
    })
      .map((res: Response) => {
        return res.json().data;
      })
      .subscribe((teacherres: Array<any>) => {


        this.af.database.list('/subjects/')
          .subscribe((subjectRes) => {

            console.log(subjectRes)

            subjectRes.forEach((item, ii) => {


              this.af.database.list('/users', {
                query: {
                  orderByChild: 'uid',
                  equalTo: item[Object.keys(item)[0]]['tuid'],
                }
              }).subscribe((res) => {

                console.log(res[0])

                //  this.teacherRepo[i].profile = res[0]['photoURL']
                this.teacherRepo.push({ profile: res[0]['photoURL'] })

              })
              this._http.get('https://school-web-7d8e8.firebaseio.com/answers/' + item['$key'] + '.json?shallow=true')
                .map((res: Response) => res.json())
                .subscribe((i) => {
                  if (i) {
                    this.teacherRepo[ii].answers = Object.keys(i).length;
                  }
                  //
                })

              this._http.get('https://school-web-7d8e8.firebaseio.com/questions/' + item['$key'] + '.json?shallow=true')
                .map((res: Response) => res.json())
                .subscribe((i) => {
                  if (i) {
                    this.teacherRepo[ii].questions = Object.keys(i).length;
                  }
                })




              console.log(item['$key'])
              console.log(item[Object.keys(item)[0]]['tuid'])

              console.log(this.teacherRepo)




            })
            /*            subjectRes.forEach(item =>{
            
                            console.log(subjectRes[Object.keys(subjectRes)[0]]['tuid']== )
            
            
                        })*/









          })






        teacherres.forEach(item => {

          this.af.database.list('/users', {
            query: {
              orderByChild: 'uid',
              equalTo: item.uid,
            }
          }).subscribe((res) => {

            console.log(res[0].photoURL)

          })

        })


        /*        let cuser = this.af.database.list('/users', {
                  query: {
                    orderByChild: 'uid',
                    equalTo: teacherres[Object.keys(item)[0]]['tuid'],
                  }
                }).subscribe((res) => {
        
        
                })*/
      })
  }
}

/*

    let subjects = this.af.database.list('/subjects/')

      .subscribe(res => {

        res.forEach((item, ii) => {

          console.log(item, ii, res[Object.keys(item)[0]]['tuid'])*/

          /*              let cuser = this.af.database.list('/users', {
                          query: {
                            orderByChild: 'uid',
                            equalTo: item[Object.keys(item)[0]]['tuid'],
                          }
                        }).subscribe((res) => {
          
                          console.log(res[0]['photoURL'])
          
                          if (res && res[0]['photoURL']) {
                            this.teacherRepo[ii].profile = res[0]['photoURL'];
                            
                          }
          
                        })*/

     //   })

        /*
        
                      this._http.get('https://school-web-7d8e8.firebaseio.com/answers/' + item['$key'] + '.json?shallow=true')
                        .map((res: Response) => res.json())
                        .subscribe((i) => {
                          if (i) {
                            this.teacherRepo[ii].answers = Object.keys(i).length;
                          }
                          //
                        })
        
                      this._http.get('https://school-web-7d8e8.firebaseio.com/questions/' + item['$key'] + '.json?shallow=true')
                        .map((res: Response) => res.json())
                        .subscribe((i) => {
                          if (i) {
                            this.teacherRepo[ii].questions = Object.keys(i).length;
                          }
                        })
        
                    })*/

     /* })
  })
}
}*/
import { Component, OnInit } from '@angular/core';
import { parentService } from './parentService'
import { studentService } from './../student/studentService'
import { firebaseService } from './../app.firebaseService'
import { appService } from './../app.Service'
import { vanService } from './../van/vanService'
import { MdSnackBar } from '@angular/material';
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
  providers: [parentService, studentService, vanService, appService]
})
export class ParentComponent implements OnInit {

  constructor(private snackBar: MdSnackBar, private _appService: appService, private _vanService: vanService, private _firebaseService: firebaseService, private _parentService: parentService, private _studentService: studentService) { }

  public students;
  public vans;

  editMode : boolean = false;

  allParents;
  vanId;
  ParentEditId;


  
  parentData ={
    gardian : '',
    address : '',
   
    houseNo:''
  }

  data;

  ngOnInit() {
    this._parentService.getAllParents().subscribe((data) => {
      console.log(data);
        this.data = data;
       this.allParents = data;
      

        this.allParents.forEach((item)=>{
            let date  = new Date(item.date)
            item.date = date.toDateString();

            item.VanName = item.vanId['name'];
            item.NoOfStudents = item.studentId['name']

            item.VanId = item.vanId['_id']
        
           
            item.Edit = '<a class="action-btn edit">Edit<i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>';
            item.Delete = '<a class="action-btn edit">Delete<i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>';
        })


        this.length = this.allParents.length;
        this.rows = this.allParents;

   
        console.log(this.rows)
      








    });
    this._studentService.getAllStudent().subscribe((data) => {
      console.log(data)
      this.students = data;
    })
    this._vanService.getAllVan().subscribe((data) => {
      this.vans = data
    })

  }
  logout(){
    this._firebaseService.Logout();
    localStorage.clear();
  }

  editParants(gardian,address,houseNo,studentId ,vanId){
    this._parentService.edithParent(this.ParentEditId,gardian,address.value,houseNo.value,studentId ,vanId)
      .subscribe((data)=>{
 
        console.log(data);

      })
      this.editMode = true;


  }

  saveParents(name, a, h, id, email, password, vanId) {

    this._firebaseService.CreateUser(email, password)
      .then((res) => {

        this._appService.authentication(name, email, password, 'parent', res['uid'])
          .subscribe((res) => {
            this.snackBar.open(name, 'Parents Save', {
              duration: 2000
            })
          })

        this._parentService.saveParents(name, a, h, id, email, vanId).subscribe((data) => {
          console.log(data)
        })
      })

  }










  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'gardian', name: 'gardian', filtering: { filterString: '', placeholder: 'Filter by name' } },
    
    { title: 'houseNo', name: 'houseNo', filtering: { filterString: '', placeholder: 'Filter by date' } },
    { title: 'VanName', name: 'VanName', filtering: { filterString: '', placeholder: 'Filter by date' } },
    { title: 'NoOfStudents', name: 'NoOfStudents', filtering: { filterString: '', placeholder: 'Filter by date' } },

   
    { title: 'Edit', name: 'Edit' },
    { title: 'Delete', name: 'Delete' },

  ];
  public page: number = 1;
  public itemsPerPage: number = 10;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  public config: any = {
    paging: true,
    sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-striped', 'table-bordered']
  };

  //= [{ driverName  : 'hasan siidiqui'}];




  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    console.log(data);
    if(data['column'] == 'Edit'){
      this.parentData.address = data['row'].address;
      this.parentData.gardian = data['row'].gardian;
      this.parentData.houseNo = data['row'].houseNo;

      this.ParentEditId = data['row']._id;
       
      let d =  this.vans.filter((item)=>{
          return data['row']['VanId']  ==    item['_id'] ? item : false
      })

      console.log(d);

       this.vanId = d[0]

  

    }

  }

}

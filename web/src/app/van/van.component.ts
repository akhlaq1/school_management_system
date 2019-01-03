import { Component, OnInit } from '@angular/core';
import { areaService } from './../area/areaService';
import { driverService } from './../driver/driverService';
import { vanService } from './vanService';
import { firebaseService } from './../app.firebaseService'
import { studentService } from './../student/studentService'
import { MdSnackBar } from '@angular/material';
import {routesService} from './../routes/routesService'

@Component({
  selector: 'app-van',
  templateUrl: './van.component.html',
  styleUrls: ['./van.component.css'],
  providers: [areaService, vanService, driverService, studentService,routesService]
})
export class VanComponent implements OnInit {

  private areas;
  selectedAreaObj;
  selectedDriverObj;
  private drivers;
  private allVans;
  private selectedVanObj;

  private selectRoute ;
  private routes ;

  selectedStudent: Array<any> = [];


  private VanData: Array<any> = [];
  data;

  object = {
    selected: false
  }


  selectedRow;

  constructor(
    private _firebaseService: firebaseService,
    private _areaService: areaService,
    private _vanService: vanService,
    private _driverService: driverService,
    private _studentService: studentService,
    private snackBar: MdSnackBar,
    private _routeService : routesService

  ) { }



  ngOnInit() {

    this._vanService.getAllVan().subscribe((data) => {
  
      this.allVans = data;
      

        this.allVans.forEach((item)=>{
            let date  = new Date(item.date)
            item.date = date.toDateString();

             item.groupOfStudents = item.groupOfStudents.length;
             item.area = item.areaId.area ;

              item.title = item.routeId.title ;

               item.Vanname = item.name ;

     
           
 /*           item.Edit = '<a class="action-btn edit">Edit<i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>';
            item.Delete = '<a class="action-btn edit">Delete<i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>';
 */       })


        this.length = this.allVans.length;
        this.rows = this.allVans;

   
        console.log(this.rows)
      




    })

    this._areaService.getAllAreas().subscribe((data) => {
      this.areas = data;
    })
    this._driverService.FindAllDriver().subscribe((data) => {
      this.drivers = data;
    })
    this._studentService.getAllStudent()
      .subscribe((data) => {
        this.data = data;
        console.log(data)
      })

      this._routeService.FindRoutes()
      .subscribe((data)=>{
        this.routes = data;
      })
       

  }

  onChangeRoute(route){
    this.selectRoute = route ;
  }
  onChangeArea(deviceValue) {
    console.log(deviceValue);
    this.selectedAreaObj = deviceValue;
  }
  onChangeDriver(deviceValue) {
    console.log(deviceValue);
    this.selectedDriverObj = deviceValue;
  }
  onChangeVan(vanValue) {

    console.log(vanValue);

    this.selectedVanObj = vanValue;

  }

  saveVan(selectedAreaObj, selectedDriverObj, vanname, lisence, nic, servicelocation, noOfSeats,routeId) {
    // this._firebaseService.CreateUser(email, password)
    //   .then((res) => {
    //     console.log(res);
    //     // this._vanService.SaveVan(g, a, h, id).subscribe((data) => {
    //     //   console.log(data)
    //     // })
    // })

    this._vanService.SaveVan(selectedAreaObj, selectedDriverObj, vanname,
     lisence, nic, servicelocation, noOfSeats, this.selectedStudent,routeId)
      .subscribe((res) => {
        this.snackBar.open(vanname, 'Vane Save', {
          duration: 2000
        })
      })

  }


  SelectedStudent(data) {

    let o = { _id: data['_id'] }
    this.selectedStudent.push(o);

  }
  AssignStudent() {
    this._vanService.AssignStudent(this.selectedVanObj, this.selectedStudent)
      .subscribe(res => console.log(res))
  }

  AssignDriver(vanId, driverId) {
    this._vanService.AssignDriver(vanId, driverId)
      .subscribe(res => console.log(res))
  }








  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'area', name: 'area', filtering: { filterString: '', placeholder: 'Filter by name' } },
    
    { title: 'groupOfStudents', name: 'groupOfStudents', filtering: { filterString: '', placeholder: 'Filter by date' } },
    { title: 'title', name: 'title', filtering: { filterString: '', placeholder: 'Filter by date' } },

    { title: 'Vanname', name: ' Vanname', filtering: { filterString: '', placeholder: 'Filter by phone' } },
   
  /*  { title: 'Edit', name: 'Edit' },
    { title: 'Delete', name: 'Delete' },*/

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
  }

}

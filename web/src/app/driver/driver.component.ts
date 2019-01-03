import { Component, OnInit } from '@angular/core';
import { firebaseService } from './../app.firebaseService'
import { driverService } from './driverService'
import { appService } from './../app.Service'
import { MdSnackBar } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs'


@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
  providers: [driverService, appService]
})
export class DriverComponent implements OnInit {


  private data: Array<any> = [];
  constructor(
    private snackBar: MdSnackBar,
    private _appService: appService,
    private _firebaseService: firebaseService,
    private _driverService: driverService) {
    this._driverService.FindAllDriver()
      .subscribe(data => {
        this.data = data;

        this.data.forEach((item)=>{
            let date  = new Date(item.date)
            item.date = date.toDateString();
            item.Edit = '<a class="action-btn edit">Edit<i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>';
            item.Delete = '<a class="action-btn edit">Delete<i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>';
        })

        console.log(this.data)
     
        this.length = this.data.length;
        this.rows = this.data;
      })
  }


  public ngOnInit(): void {


    this.findAllDriver();


    this.onChangeTable(this.config);
  }


  saveDriver(driverName, email, password, phone) {

    this._firebaseService.CreateUser(email, password)
      .then((res) => {

        let uid = res['uid']
        this._appService.authentication(driverName, email, password, 'driver', uid)
          .subscribe(res => {
            this.snackBar.open(driverName, 'Driver Saved', {
              duration: 2000
            })
          })

        this._driverService.SaveVan(uid, driverName, email, password, phone).subscribe((data) => {
          console.log(data)
        })
      })

  }
  findAllDriver() {

  }

  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'driverName', name: 'driverName', filtering: { filterString: '', placeholder: 'Filter by name' } },
    { title: 'phone', name: 'phone', filtering: { filterString: '', placeholder: 'Filter by phone' } },
    { title: 'date', name: 'date', filtering: { filterString: '', placeholder: 'Filter by date' } },
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
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
@Pipe({
  name: 'filterStudentStatus'
})
export class FilterStudentStatusPipe implements PipeTransform {

  transform(value: Array<any>, args?: any): any {
    return value.filter(a => a.VanAssign == true);
    
    
  }

}

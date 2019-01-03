import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchpipe'
})
export class SearchpipePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    
    if (args) {
      return value.filter(item => {
        return item.username == args
      })
    }
    return value
    
  }

}

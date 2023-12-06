import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(liftsList: any[], searchTerm: string): any[] {
    if (!liftsList || !searchTerm) {
      return liftsList;
    }

    searchTerm = searchTerm.toLowerCase();

    return liftsList.filter((lift) => {
      return lift.name.toLowerCase().includes(searchTerm);
    });
  }
}

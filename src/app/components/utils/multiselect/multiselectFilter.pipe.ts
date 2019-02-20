import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'multiselectFilter'
})
export class MultiselectFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) {

      return this.sortDataList(items);
    }
    searchText = searchText.toLowerCase();
    let tempList = [];
    items.filter(it => {
      if (it.value.name.toLowerCase().includes(searchText)) {
        tempList.push(it)
      }
    });
    return tempList;
  }

  sortDataList(items: any[]): any[] {
    return items.sort((a, b) => {
      if (a.value.checked) return -1;
      if (b.value.checked) return 1;
      return 0;
    });
  }
}

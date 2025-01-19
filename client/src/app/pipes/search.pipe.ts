import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})

// Filters an array of objects based on a search string
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item => { // Applies a filter to each item in the items array
      return Object.values(item).some(value => { // Extracts values from item and checks if atleast one of them satisfies the condition
        const stringValue = value?.toString().toLowerCase(); // Converts values to lowercase strings
        return stringValue?.includes(searchText); // Check if stringValue contains searchText
      });
    });
  }

}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StockItem, StockService } from '../../services/stock.service';
import { SearchPipe } from '../../pipes/search.pipe';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.css',
  imports: [CommonModule, RouterLink, SearchPipe],
  standalone: true,
})
export class StockListComponent {
  stockItems: any[] = [];
  searchTerm: string = '';
  errorMessage: string = '';
  idToDelete: number | null = null;
  sortDirection: 'asc' | 'desc' | null = null;

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.refreshStockItems();
  }

  refreshStockItems() {
    this.stockService.getAllStock().subscribe({
      next: (data) => {
        this.stockItems = data;
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  confirmDelete(id: number) {
    this.idToDelete = id;
  }

  deleteStock(id: number) {
    this.stockService.deleteStock(id).subscribe({
      next: () => {
        this.refreshStockItems();
      },
      error: (error) => {
        console.error('Error deleting stock:', error);
        this.errorMessage = 'Failed to delete stock.';
        this.idToDelete = null;

      },
      complete: () => {
        this.idToDelete = null;
      }
    });
  }

  sortBy(field: keyof StockItem) {
    this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc';

    this.stockItems.sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      const comparison =
        typeof aValue === 'string' && typeof bValue === 'string'
          ? aValue.localeCompare(bValue, undefined, { sensitivity: 'base' })
          : aValue > bValue ? 1 : aValue < bValue ? -1 : 0;

      return this.sortDirection === 'desc' ? -comparison : comparison;
    });
  }

  onKeyUp(event: any) {
    this.searchTerm = event.target.value;
  }
}

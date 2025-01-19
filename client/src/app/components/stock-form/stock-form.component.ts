import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StockItem, StockService } from '../../services/stock.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrl: './stock-form.component.css',
  imports: [CommonModule, FormsModule, RouterLink],
  standalone: true,
})


export class StockFormComponent {
  errorMessage: string | null = null;
  stockItem: StockItem = { id: undefined, quantity: 0, productNumber: '', location: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stockService: StockService
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.params['id'];
    const id = Number(idParam);
    if (id) {
      this.getStockById(id);
    }
  }

  getStockById(id: number) {
    this.stockService.getStockById(id).subscribe({
      next: (stock: StockItem) => {
        console.log("stock", stock);
        if (stock) {
          this.stockItem = stock;
          this.errorMessage = null;
        } else {
          this.errorMessage = "Stock not found.";
        }
      },
      error: (err) => {
        if (err.status === 404)
          this.errorMessage = "Stock not found.";
        else {
          this.errorMessage = "An error occurred while fetching stock data.";
          console.error(err);
        }
      }
    });
  }

  saveStock() {
    if (this.stockItem.id) {
      this.stockService.updateStock(this.stockItem.id, this.stockItem).subscribe({
        next: () => {
          this.router.navigate(['/stock-list']);
        },
        error: (error) => {
          console.error('Error updating stock:', error);
          this.errorMessage = "Failed to update stock. Please try again.";
        }
      });
    } else {
      this.stockService.createStock(this.stockItem).subscribe({
        next: () => {
          this.router.navigate(['/stock-list']);
        },
        error: (error) => {
          console.error("Create stock error:", error);
          this.errorMessage = "Failed to create stock. Please try again.";
        }
      });
    }
  }
}

import { Routes } from '@angular/router';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { StockFormComponent } from './components/stock-form/stock-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'stock-list', pathMatch: 'full' },
  { path: 'stock-list', component: StockListComponent },
  { path: 'stock-form', component: StockFormComponent },
  { path: 'stock-form/:id', component: StockFormComponent },
];

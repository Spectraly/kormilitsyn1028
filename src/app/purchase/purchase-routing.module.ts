import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseAddComponent } from './pages/purchase-add/purchase-add.component';
import { PurchaseListComponent } from './pages/purchase-list/purchase-list.component';
import { PurchaseLayoutComponent } from './shared/components/purchase-layout/purchase-layout.component';

const routes: Routes = [
  {
    path: '',
    component: PurchaseLayoutComponent,
    children: [
      {
        path: '', component: PurchaseListComponent
      },
      {
        path: 'add', component: PurchaseAddComponent
      },
      {
        path: 'add/:id', component: PurchaseAddComponent
      }
    ]
  }];

@NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    })
export class PurchaseRoutingModule { }

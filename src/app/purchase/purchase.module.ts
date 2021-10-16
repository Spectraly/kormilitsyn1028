import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseListComponent } from './pages/purchase-list/purchase-list.component';
import { PurchaseAddComponent } from './pages/purchase-add/purchase-add.component';
import { PurchaseLayoutComponent } from './shared/components/purchase-layout/purchase-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PurchaseListComponent,
    PurchaseAddComponent,
    PurchaseLayoutComponent
  ],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class PurchaseModule { }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseService } from 'src/app/shared/services/purchase.service';
import { Buy } from 'src/app/shared/interfaces/purchase.interface';


@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {

  purchases: Buy[] = [];
  

  constructor(
    private HttpDataService: PurchaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
   
  }

  async getData() {
    try {
      this.purchases = await this.HttpDataService.getPurchases() || [];
      this.purchases.sort((a,b)=>{return a.name < b.name ? -1:1})
    } catch (error) {
      console.log(error)
    }
  }


  async change(pur:Buy,id?:number ){
    try {
      if (pur.status == "Не куплено") {
        pur.status = "Куплено"
      }else
      {
        pur.status = "Не куплено"
      }
      await this.HttpDataService.editePurchase(pur,id!);
      this.getData();
    } catch (error) {
      console.log(error)
    }
  }

  linkToAdd(id?:number){
    if (id) {
      this.router.navigate([this.router.url,'add',id]);
    }
    else{
      this.router.navigate([this.router.url,'add']);
    }
  }

}



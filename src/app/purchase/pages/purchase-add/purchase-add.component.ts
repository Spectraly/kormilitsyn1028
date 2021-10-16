import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseService } from 'src/app/shared/services/purchase.service';
import { Buy } from 'src/app/shared/interfaces/purchase.interface';

@Component({
  selector: 'app-purchase-add',
  templateUrl: './purchase-add.component.html',
  styleUrls: ['./purchase-add.component.css']
})
export class PurchaseAddComponent implements OnInit {

  id: number | null = null;
  purchase!: Buy;

  PurchaseForm!: FormGroup;

 
  purchases!: Buy[];

  constructor(
    private fb: FormBuilder,
    private HttpDataService: PurchaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}


  ngOnInit() {

    this.activatedRoute.params.subscribe((params) => { this.id = params.id ? +params.id : null })
    this.getData();
  }

  async getData() {
    const controls = {
      name: [null, [Validators.required, Validators.maxLength(100)]],
      amount: [null, [Validators.required, Validators.maxLength(100)]],
      status: ["Не куплено"],
    };
    this.PurchaseForm = this.fb.group(controls);
    try {
      this.purchases = await this.HttpDataService.getPurchases() || [];
    }
    catch (error) { console.log(error) }
    if (this.id) {
      try {

        this.purchase = await this.HttpDataService.getPurchase(this.id);
      } catch (error) {
        console.log(error)
      }
      
      this.PurchaseForm.patchValue(this.purchase)
    }
    else {
      this.PurchaseForm.reset()
    }

  }
  async delete()
  {
    try {
      await this.HttpDataService.deletePurchase(this.id!);
      this.router.navigate(['purchase'])
      this.getData();
    } catch (error) {
      console.log(error)
    }
  }

  async create() {
    if (this.id) {
      try {
        const purchase = this.PurchaseForm.value;
        await this.HttpDataService.editePurchase(purchase,this.id );
      } catch (error) {
        console.log(error)
      }
    }
    else {
      try {
        const purchase = this.PurchaseForm.value
        if (purchase.status == null) {
          purchase.status = "Не куплено";
        }
        const result = await this.HttpDataService.postPurchase(purchase);
        this.router.navigate([this.router.url, result.id])

      } catch (error) {
        console.log(error)
      }
    }

  }


}

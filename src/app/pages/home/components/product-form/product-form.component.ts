import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/product.model';
import { FormControl, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css', '../../../../app.component.css']
})
export class ProductFormComponent implements OnInit {
  @ViewChild('categoryInput', { static: true }) categoryInput!: MatSelect;
  constructor(
    protected productService: ProductService, 
    private _snackBar: MatSnackBar, 
    private router: Router){
  }

  products: Product[] = [];  
  
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    while (this.products.length > 0)
      this.products.pop();
    this.productService.getProducts().subscribe(result=>
      {
        for(let i = 0; i < result.length; i++)
          this.products.push(result[i]);
      });
  }

  addProduct(nume: string, cost: string, categorie: string, imagine: string, descriere: string){
    if(nume && cost && categorie && imagine)
    {
      if(!descriere)
        descriere = "";
      let Id: number = 1;
      this.products.forEach(product => {
        if(Id == product.id)
          Id++;
      });
      let cost1: number = +cost;
      let newProduct = 
      {
        id: Id,
        title: nume,
        price: cost1,
        category: categorie,
        description: descriere,
        image: '../../../assets/' + imagine,
      };
      this.productService.addProduct(newProduct); 
    }
    else
      this._snackBar.open('Please fill in the values properly.', 'Ok', {duration: 3000});
  }
}

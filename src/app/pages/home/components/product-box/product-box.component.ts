import { Component, Input,  ElementRef, EventEmitter, Output, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Account } from 'src/app/model/account.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css', '../../../../app.component.css']
})
export class ProductBoxComponent implements OnInit {
  @Input() product!: Product;
  @Input() fullWidthMode = false;
  currentAccount: Account | undefined;

  constructor(
    private authenticationService: AuthenticationService, 
    private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void{
    this.authenticationService.currentAccountSubject$.subscribe(account => {
      this.currentAccount = account;
    });
  }
  @Output() addToCart = new EventEmitter<Product>();

  onAddToCart(): void {
    if(this.currentAccount)
      this.addToCart.emit(this.product);
    else
      this._snackBar.open('Please log in.', 'Ok', {duration: 3000});
  }
}
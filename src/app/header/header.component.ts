import { Component, Input, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/model/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { AuthenticationService } from '../services/authentication.service';
import { Account, Role } from '../model/account.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../app.component.css']
})
export class HeaderComponent implements OnInit {  
  @Input() loggedIn = false;
  private _cart: Cart = { items:[] };
  itemsQuantity = 0;
  currentAccount: Account | undefined;

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.items
      .map((item) => 1)
      .reduce((prev, current) => prev + current , 0);
  }

  constructor(
    private authenticationService: AuthenticationService,
    private cartService: CartService) {}

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  ngOnInit(): void {
    this.authenticationService.loggedInSubject$.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
    this.authenticationService.currentAccountSubject$.subscribe(account => {
      this.currentAccount = account;
    });
    console.log("asdf");
    console.log(this.currentAccount);
  }

  checkIfAdmin(): boolean{
    if(this.currentAccount)
      if(this.currentAccount.role == Role.ADMIN)
        return true;
    return false;
  }
}
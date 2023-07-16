import { Component } from '@angular/core';
import { Cart, CartItem } from 'src/app/model/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Account } from 'src/app/model/account.model';
import { Purchase } from 'src/app/model/purchase.model';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css', '../../app.component.css']
})
export class CartComponent {
  currentAccount: Account | undefined;
  cart: Cart = {items: []};
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'total',
    'action'
  ]
  purchase: Purchase = new Purchase;

  constructor(private purchaseService: PurchaseService, 
    private authenticationService: AuthenticationService, 
    private cartService: CartService,
    private router: Router){}

  ngOnInit(): void{
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
    this.authenticationService.currentAccountSubject$.subscribe(account => {
      this.currentAccount = account;
    });
  }

  getTotal(items: Array<CartItem>): number{
    console.log(this.cart);
    return this.cartService.getTotal(items);
  }

  onClearCart(): void{
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void{
    this.cartService.removeFromCart(item);
  }

  order(): void {
    if (this.currentAccount) {
      this.cart.items.forEach(item => {
        if (this.currentAccount) {
          const purchase: Purchase = {
            accountUsername: this.currentAccount.username,
            productId: item.id
          };
          console.log(purchase);
          this.purchaseService.addPurchase(purchase);
        }
      });
      this.onClearCart();
      this.router.navigateByUrl('/');
    }
  }
}

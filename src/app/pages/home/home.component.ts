import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../app.component.css']
})
export class HomeComponent implements OnInit {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  selectedCategory: string | null = null;
  filteredProducts: Product[] = [];

  products: Product[] = [];

  constructor(private cartService: CartService, protected productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
    this.filterProductsByCategory();
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

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  filterProductsByCategory(): void {
    if (!this.selectedCategory || this.selectedCategory == "") {
      console.log(this.selectedCategory)
      // No category selected, show all products
      this.filteredProducts = this.products;
    } else {
      // Filter products based on the selected category
      console.log(this.products);
      this.filteredProducts = [];
      this.products.forEach(product => {
        if (product.category === this.selectedCategory) {
          this.filteredProducts.push(product);
        }
      });
    }
  }

  onShowCategory(category: string): void {
    this.selectedCategory = category;
    this.filterProductsByCategory();
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      id: product.id
    });
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = this.selectedCategory === category ? null : category;
    this.filterProductsByCategory();
  }
}

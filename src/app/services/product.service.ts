import { Injectable } from '@angular/core';
import { Product } from 'src/app/model/product.model';

import { Observable } from 'rxjs';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private fs: Firestore) { }

  categories = ['Misc', 'Vegetation', 'Vehicles'];

  getProducts():Observable<Product[]>{
    const myCollection: any = collection(this.fs, 'products');
    return collectionData(myCollection);
  }

  addProduct(product:Product){
    const myCollection = collection(this.fs, 'products')
    addDoc(myCollection, product);
  }
}

import { Injectable } from '@angular/core';
import { Purchase } from '../model/purchase.model';

import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private fs: Firestore) { }

  addPurchase(purchase: Purchase) {
    const myCollection = collection(this.fs, 'purchases');
    addDoc(myCollection, { ...purchase }); // Convert purchase to a plain object using object spread syntax
  }
}

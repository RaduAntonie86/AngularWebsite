import { Injectable } from '@angular/core';
import { Account } from '../model/account.model';

import { Observable } from 'rxjs';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private fs: Firestore) { }

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  private currentAccountSubject = new BehaviorSubject<Account | undefined>(undefined);

  loggedInSubject$ = this.loggedInSubject.asObservable();
  currentAccountSubject$ = this.currentAccountSubject.asObservable();
  
  setLoggedIn(value: boolean): void {
    this.loggedInSubject.next(value);
  }

  getAccounts():Observable<Account[]>{
    const myCollection: any = collection(this.fs, 'accounts');
    return collectionData(myCollection);
  }

  createAccount(account:Account){
    const myCollection = collection(this.fs, 'accounts')
    addDoc(myCollection, account);
  }

  setCurrentAccount(account: Account): void {
    this.currentAccountSubject.next(account);
  }

  getCurrentAccount(): Account | undefined {
    return this.currentAccountSubject.value;
  }
}
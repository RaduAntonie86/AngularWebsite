import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Account } from 'src/app/model/account.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css', '../../../../app.component.css']
})
export class SignInComponent implements OnInit{
  private accountList: Account[] = [];
  loggedIn = false;

  hide = true;
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  login(username: string | null | undefined, password: string | null | undefined): void {
    const foundAccount = this.accountList.find(
      (account) => account.username === username && account.password === password
    );
  
    if (foundAccount) {
      this.authenticationService.setLoggedIn(true); // Update the loggedIn value via the shared service
      console.log(foundAccount);
      this.authenticationService.setCurrentAccount(foundAccount); // Set the current account in the AuthenticationService
      this.router.navigateByUrl('/');
    } else {
      this._snackBar.open('Invalid name or password.', 'Ok', {duration: 3000});
    }
  }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts(){
    for(let i = 0; i < this.accountList.length; i++)
      this.accountList.pop();
    this.authenticationService.getAccounts().subscribe(result=>
      {
        for(let i = 0; i < result.length; i++)
          this.accountList.push(result[i]);
      });
  }

  constructor(
    private authenticationService: AuthenticationService, 
    private router: Router,
    private _snackBar: MatSnackBar) {}
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Role } from '../../../../model/account.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../../../../app.component.css']
})
export class SignupComponent {
  hide = true;
  hide1 = true;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  createAccount(user: string, pw: string, pw1: string){
    if(pw==pw1)
    {
      let newAccount = {
        username: user,
        password: pw,
        role: Role.USER,
      }
      this.authenticationService.createAccount(newAccount);
      this.router.navigateByUrl('/');
    }
    else
      this._snackBar.open('Passwords do not match.', 'Ok', {duration: 3000});
  }
}

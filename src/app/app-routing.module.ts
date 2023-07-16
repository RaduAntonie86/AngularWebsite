import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { SignInComponent } from './pages/home/components/signin/signin.component';
import { SignupComponent } from './pages/home/components/signup/signup.component';
import { ProductFormComponent } from './pages/home/components/product-form/product-form.component';


const routes: Routes = [{
  path: 'home',
  component: HomeComponent
},
{
  path: 'cart',
  component: CartComponent
},
{
  path: 'signin',
  component: SignInComponent
},
{
  path: 'signup',
  component: SignupComponent
},
{
  path: 'product-form',
  component: ProductFormComponent
},
{
  path: '', 
  redirectTo: 'home', 
  pathMatch: 'full'
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

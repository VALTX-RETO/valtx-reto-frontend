import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'products',
        loadChildren: () =>
          import('./products/products.module').then(m => m.ProductsModule),
          canLoad: [ authGuard ],
          canActivate: [ authGuard ],
    },
    { path: '',   redirectTo: 'auth/login', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth/login' },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})
export class AppRoutingModule {}

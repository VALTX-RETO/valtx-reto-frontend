import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './pages/list/product-list/product-list.component';
import { ProductFormDialogComponent } from './pages/dialogs/product-form/product-form-dialog.component.ts';

import { MatTableModule }     from '@angular/material/table';
import { MatButtonModule }    from '@angular/material/button';
import { MatDialogModule }    from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { ProductImagesDialogComponent } from './pages/dialogs/product-images/product-images-dialog.component';

@NgModule({
    declarations: [
        ProductListComponent,
        ProductFormDialogComponent,
        ProductImagesDialogComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProductsRoutingModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
    ]
})
export class ProductsModule { }

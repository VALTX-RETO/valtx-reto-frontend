import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../../services/product/product.service';
import { Product, ProductDialogData } from '../../../interfaces/Product.interface';

@Component({
    selector: 'app-product-form-dialog',
    templateUrl: './product-form-dialog.component.html',
    styleUrls: ['./product-form-dialog.component.scss'],
})
export class ProductFormDialogComponent implements OnInit {
    form!: FormGroup;
    readonly!: boolean;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ProductFormDialogComponent, Product>,
        @Inject(MAT_DIALOG_DATA) public data: ProductDialogData,
        private productService: ProductService,
    ) {
        this.readonly = !!data.readonly;
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            sNombre: [{ value: this.data.product?.sNombre || '', disabled: this.readonly }, Validators.required],
            sCategoria: [{ value: this.data.product?.sCategoria || '', disabled: this.readonly }, Validators.required],
        });
    }

    save() {
        if (this.form.invalid) return;
        const dto = this.form.getRawValue();
        this.dialogRef.close(dto);
    }

    close() {
        this.dialogRef.close();
    }
}

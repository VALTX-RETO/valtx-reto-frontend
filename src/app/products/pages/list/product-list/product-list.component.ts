import { Component } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { ProductFormDialogComponent } from '../../dialogs/product-form/product-form-dialog.component.ts';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductImagesDialogComponent } from '../../dialogs/product-images/product-images-dialog.component';
import Swal from 'sweetalert2';
import { Product, ProductDialogData } from '../../../interfaces/Product.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth/auth.service';


@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.sass'
})
export class ProductListComponent {
    displayedColumns: string[] = ['sNombre', 'sCategoria', 'sUrl', 'actions'];
    dataSource = new MatTableDataSource<Product>([]);
    loading: boolean = false;

    constructor(
        private productsService: ProductService,
        private dialog: MatDialog,
        private auth: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadProduct();
    }

    loadProduct() {
        this.productsService.getAll().subscribe({
            next: prods => this.dataSource.data = prods,
            error: () => { }
        });
    }

    view(p: Product) {
        this.dialog.open(ProductFormDialogComponent, {
            width: '400px',
            data: { product: p, readonly: true } as ProductDialogData
        });
    }

    openForm(p?: Product) {
        const dialogRef = this.dialog.open<ProductFormDialogComponent, ProductDialogData, Partial<Product>>(
            ProductFormDialogComponent,
            {
                width: '400px',
                data: { product: p } as ProductDialogData
            }
        );

        dialogRef.afterClosed().subscribe(dto => {
            if (!dto) return;

            if (p) {
                // ———————————————— ACTUALIZAR ————————————————
                this.productsService.update(p.sIdProduct, dto).subscribe({
                    next: () => {
                        this.loadProduct();
                        Swal.fire({
                            icon: 'success',
                            title: '¡Actualizado!',
                            text: `"${dto.sNombre}" se guardó correctamente.`
                        });
                    },
                    error: () => Swal.fire('Error', 'No se pudo actualizar', 'error')
                });

            } else {
                // ———————————————— CREAR NUEVO ————————————————
                this.productsService.create(dto).subscribe({
                    next: newProd => {
                        this.loadProduct();
                        Swal.fire({
                            icon: 'success',
                            title: '¡Creado!',
                            text: `"${newProd.sNombre}" se creó correctamente.`
                        });
                    },
                    error: () => Swal.fire('Error', 'No se pudo crear el producto', 'error')
                });
            }
        });
    }


    viewImages(p: Product) {
        const dialogRef = this.dialog.open(ProductImagesDialogComponent, {
            width: '600px',
            data: { productId: p.sIdProduct }
        });

        dialogRef.afterClosed().subscribe(dto => {
            this.loadProduct();
        });
    }

    delete(p: Product) {
        Swal.fire({
            title: `¿Eliminar "${p.sNombre}"?`,
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(result => {
            if (result.isConfirmed) {
                this.productsService.delete(p.sIdProduct).subscribe({
                    next: () => {
                        this.dataSource.data = this.dataSource.data.filter(x => x.sIdProduct !== p.sIdProduct);
                        Swal.fire(
                            'Eliminado',
                            `"${p.sNombre}" ha sido eliminado.`,
                            'success'
                        );
                    },
                    error: () => {
                        Swal.fire(
                            'Error',
                            'No se pudo eliminar el producto.',
                            'error'
                        );
                    }
                });
            }
        });
    }

    logout() {
        this.auth.logout();
        this.router.navigate(['/auth/login']);
    }

}

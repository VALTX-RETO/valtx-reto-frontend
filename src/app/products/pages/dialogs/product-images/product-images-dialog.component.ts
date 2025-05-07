import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../../services/product/product.service';
import Swal from 'sweetalert2';
import { ImagesDialogData, ProductImage } from '../../../interfaces/Product.interface';


@Component({
    selector: 'app-product-images-dialog',
    templateUrl: './product-images-dialog.component.html',
    styleUrls: ['./product-images-dialog.component.scss'],
})
export class ProductImagesDialogComponent implements OnInit {
    images: ProductImage[] = [];
    loading = true;

    selectedFile?: File;
    selectedFileName = '';
    uploading = false;

    constructor(
        private dialogRef: MatDialogRef<ProductImagesDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ImagesDialogData,
        private productService: ProductService
    ) { }

    ngOnInit(): void {
        this.loadImages();
    }

    private loadImages() {
        this.loading = true;
        this.productService.getImages(this.data.productId).subscribe({
            next: resp => {
                this.images = resp.images;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
                Swal.fire('Error', 'No se pudieron cargar las imágenes', 'error');
            }
        });
    }

    onFileSelected(event: Event) {
        const inp = event.target as HTMLInputElement;
        if (inp.files && inp.files.length > 0) {
            this.selectedFile = inp.files[0];
            this.selectedFileName = this.selectedFile.name;
        }
    }

    uploadImage() {
        if (!this.selectedFile) return;
        this.uploading = true;

        this.productService.addImage(this.data.productId, this.selectedFile)
            .subscribe({
                next: () => {
                    Swal.fire('¡Listo!', 'Imagen subida correctamente', 'success');
                    this.selectedFile = undefined;
                    this.selectedFileName = '';
                    this.uploading = false;
                    this.loadImages();
                },
                error: () => {
                    this.uploading = false;
                    Swal.fire('Error', 'No se pudo subir la imagen', 'error');
                }
            });
    }
    

    close() {
        this.dialogRef.close();
    }
}

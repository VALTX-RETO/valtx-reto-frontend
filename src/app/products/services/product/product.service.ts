import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../environment';
import { Product, ProductImage } from '../../interfaces/Product.interface';


@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private base = `${environment.apiUrl}/products`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Product[]> {
        return this.http.get<Product[]>(this.base);
    }

    getById(id: string): Observable<Product> {
        return this.http.get<Product>(`${this.base}/${id}`);
    }

    create(dto: any) {
        return this.http.post<{ message: string; data: Product }>(`${this.base}`, dto)
          .pipe(map(resp => resp.data));
    }

    update(id: string, data: Partial<Product>): Observable<Product> {
        return this.http.put<Product>(`${this.base}/${id}`, data);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.base}/${id}`);
    }

    getImages(productId: string): Observable<{ images: ProductImage[] }> {
        return this.http.get<{ images: ProductImage[] }>(
            `${this.base}/${productId}/images`
        );
    }

    addImage(productId: string, file: File): Observable<{ message: string }> {
        const form = new FormData();
        form.append('file', file);
        return this.http.post<{ message: string }>(
            `${this.base}/${productId}/images`,
            form
        );
    }
}

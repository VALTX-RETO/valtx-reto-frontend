import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../../../environment';

interface AuthResponse { 
    user: any; 
    token: string;
}
interface Credentials { sEmail: string; sPassword: string; }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private base = `${environment.apiUrl}/auth`;

    constructor(private http: HttpClient) {}

    login(dto: Credentials) {
        return this.http.post<AuthResponse>(`${this.base}/login`, dto)
            .pipe(
                tap(res => localStorage.setItem('token', res.token))
        );
    }

    register(dto: Credentials) {
        return this.http.post<AuthResponse>(`${this.base}/register`, dto)
            .pipe(
                tap(res => localStorage.setItem('token', res.token))
            );
    }

    logout() {
        localStorage.removeItem('token');
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

}

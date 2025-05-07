import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { RegisterDialogComponent } from '../dialog/register-dialog/register-dialog.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router,
        private dialog: MatDialog,
    ) {
        this.form = this.fb.group({
            sEmail: ['', [Validators.required, Validators.email]],
            sPassword: ['', [Validators.required]],
        });
    }

    submit() {
        if (this.form.invalid) return;
        this.auth.login(this.form.value).subscribe({
            next: () => this.router.navigateByUrl('/products'),
            error: err => alert(err.error?.message || 'Login falló'),
        });
    }

    openRegisterDialog() {
        const ref = this.dialog.open(RegisterDialogComponent, { width: '400px' });
        ref.afterClosed().subscribe(dto => {
            if (!dto) return;
            this.auth.register(dto).subscribe({
                next: () => Swal.fire(
                    '¡Cuenta creada!',
                    `"${dto.sEmail}" se registró correctamente.`,
                    'success'
                ),
                error: err => {
                    const msgs = err.error?.message;
                    const text = Array.isArray(msgs) ? msgs.join('\n') : (msgs ?? 'No se pudo crear la cuenta');
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text,
                    });
                }
            });
        });
    }
}

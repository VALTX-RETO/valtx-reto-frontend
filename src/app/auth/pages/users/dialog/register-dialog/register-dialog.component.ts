import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-register-dialog',
    templateUrl: './register-dialog.component.html',
    styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {
    form!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<RegisterDialogComponent>,
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            sEmail: ['', [Validators.required, Validators.email]],
            sPassword: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    submit() {
        if (this.form.invalid) return;
        // cierra el diálogo devolviendo los datos
        this.dialogRef.close(this.form.value);
    }

    cancel() {
        this.dialogRef.close();
    }
}

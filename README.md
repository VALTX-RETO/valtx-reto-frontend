# VALTX Reto Frontend

Aplicación Angular 17 para la gestión de autenticación y productos con imágenes

---

## 🚀 Requisitos

- **Node.js** v16+  
- **npm** v8+  
- **Angular CLI** v17 (`npm install -g @angular/cli`)  
- Backend corriendo en `http://localhost:3000`

---

## 1. Clona el repositorio desde la terminal:

```bash
    git clone https://github.com/VALTX-RETO/valtx-reto-frontend.git
    cd valtx-reto-frontend
```

## 2. Instala dependencias:
```bash
npm install
```

## 3. Crea el enviroments.ts en base al enviroment.template.ts
```bash
export const environment = {
    production: false,
    apiUrl: 'http://localhost:3000/api'
};
```

## 4. Levanta la app
```bash
ng serve
```

## 5. Al levantar el frontend y backend, puede crear usuarios en la pantalla del login, desde el botón de crear usuario

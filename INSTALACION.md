# 🚀 GUÍA DE INSTALACIÓN RÁPIDA

## 📋 Contenido del Portfolio

Este portfolio incluye:

✅ **index.html** - Página principal con toda la estructura
✅ **styles.css** - Estilos completos con animaciones épicas
✅ **script.js** - JavaScript con todas las funcionalidades
✅ **README.md** - Documentación completa
✅ **assets/** - Carpeta para tus imágenes y documentos

---

## ⚡ Instalación en 3 Pasos

### Paso 1: Preparar tus Archivos

1. **Imagen de Perfil**
   - Coloca tu foto en: `assets/images/profile.jpg`
   - Formato: JPG o PNG
   - Recomendado: 500x500px mínimo

2. **Imágenes de Proyectos**
   - Coloca en: `assets/images/`
   - Nombres: `project1.jpg`, `project2.jpg`, etc.
   - Formato: JPG o PNG
   - Recomendado: 800x600px

3. **CV en PDF**
   - Coloca en: `assets/docs/cv.pdf`

### Paso 2: Personalizar Contenido

Abre `index.html` y busca/reemplaza:

```
"Tu Nombre" → Tu nombre real
"tu@email.com" → Tu email
"tuusuario" → Tu usuario GitHub/LinkedIn
```

**IMPORTANTE:** También actualiza:
- Descripción personal
- Lista de proyectos
- Habilidades
- Certificaciones
- Información de contacto

### Paso 3: Probar Localmente

**Opción A - Doble Click:**
- Haz doble click en `index.html`
- Se abrirá en tu navegador

**Opción B - Live Server (Recomendado):**
```bash
# Instalar (solo primera vez)
npm install -g live-server

# Ejecutar
live-server
```

**Opción C - Python Server:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

---

## 🎨 Personalización de Colores

Edita `styles.css` línea 8-12:

```css
:root {
    /* Cambia estos valores */
    --primary: #6366f1;        /* Tu color principal */
    --secondary: #ec4899;      /* Tu color secundario */
    --accent: #f59e0b;         /* Tu color de acento */
}
```

**Sugerencias de paletas:**
- Azul Tech: #2563eb, #3b82f6, #60a5fa
- Verde Data: #059669, #10b981, #34d399
- Púrpura ML: #7c3aed, #8b5cf6, #a78bfa
- Naranja Analytics: #ea580c, #f59e0b, #fbbf24

---

## 🚀 Publicar en Internet

### Opción 1: GitHub Pages (Gratis)

```bash
# 1. Crear repositorio en GitHub
# 2. Subir archivos:
git init
git add .
git commit -m "Mi Portfolio Épico"
git branch -M main
git remote add origin https://github.com/TUUSUARIO/portfolio.git
git push -u origin main

# 3. Activar GitHub Pages:
# GitHub → Settings → Pages → Source: main → Save
```

Tu sitio estará en: `https://TUUSUARIO.github.io/portfolio/`

### Opción 2: Netlify (Gratis - Más Fácil)

1. Ve a [Netlify](https://www.netlify.com/)
2. Arrastra la carpeta completa
3. ¡Listo! Te da una URL automáticamente

### Opción 3: Vercel (Gratis)

```bash
npm i -g vercel
vercel
```

---

## 🎯 Checklist de Personalización

Antes de publicar, verifica:

- [ ] Cambié "Tu Nombre" por mi nombre real
- [ ] Actualicé mi email y redes sociales
- [ ] Subí mi foto de perfil
- [ ] Subí imágenes de mis proyectos
- [ ] Actualicé la descripción personal
- [ ] Modifiqué los proyectos con mis datos
- [ ] Actualicé mis habilidades
- [ ] Añadí mis certificaciones reales
- [ ] Subí mi CV en PDF
- [ ] Probé todos los enlaces
- [ ] Probé en móvil
- [ ] Probé el formulario
- [ ] Encontré los easter eggs 🥚

---

## 🐛 Problemas Comunes

### ❌ Las imágenes no cargan
**Solución:** Verifica que las rutas sean correctas:
- `assets/images/profile.jpg`
- `assets/images/project1.jpg`

### ❌ El CV no descarga
**Solución:** Asegúrate que el archivo existe:
- `assets/docs/cv.pdf`

### ❌ Los enlaces sociales no funcionan
**Solución:** Reemplaza `tuusuario` con tus usuarios reales

### ❌ El tema no cambia
**Solución:** 
- Asegúrate que JavaScript esté habilitado
- Prueba en modo normal (no incógnito)

---

## 🎮 Easter Eggs Disponibles

1. **Botón ?** - Click en el botón misterioso del hero
2. **Modo Matrix** - Doble click en botón Matrix (navbar)
3. **Konami Code** - ↑↑↓↓←→←→BA
4. **Triple Click** - En el logo de navegación
5. **Link 🥚** - Click en el huevo del footer

---

## 📞 Soporte

¿Tienes problemas? 

1. Lee el README.md completo
2. Verifica la consola del navegador (F12)
3. Busca en Google el error específico
4. Pide ayuda en comunidades de desarrollo

---

## 🎓 Recursos Útiles

- [W3Schools HTML](https://www.w3schools.com/html/)
- [CSS-Tricks](https://css-tricks.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [Google Fonts](https://fonts.google.com/)

---

## ✨ Tips Finales

1. **Mantén Simple:** No sobrecargues con texto
2. **Imágenes de Calidad:** Usa fotos profesionales
3. **Actualiza Regular:** Mantén tu portfolio al día
4. **Test en Todo:** Prueba en diferentes navegadores
5. **SEO Básico:** Usa buenos títulos y descripciones
6. **Analytics:** Añade Google Analytics para métricas
7. **Share:** Comparte tu portfolio en redes

---

## 🚀 ¡Ya Estás Listo!

Tu portfolio está configurado y listo para impresionar. 

**¡Mucha suerte en tu búsqueda de empleo!** 🎯

---

<div align="center">

**Creado con ❤️ y ☕**

*Si tienes dudas, revisa el README.md completo*

</div>

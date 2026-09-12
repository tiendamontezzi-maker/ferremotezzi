# MONTEZZI — Detalles que definen lujo

Plataforma Web E-commerce y Sistema de Control Administrativo para **Montezzi**, marca de herrajes arquitectónicos y soluciones de organización de alta gama inspirada en la estética minimalista y de lujo sobrio de Westwing.

Desarrollada estrictamente según el **Manual de Marca & Branding 2026** y el **Contenido Maestro Oficial para Desarrollo Web**.

---

## 1. Identidad de Marca y Sistema de Diseño

### Paleta Cromática Oficial
- **Obsidian Black (`#11100F`)**: Fondo principal, contraste arquitectónico profundo.
- **Graphite (`#2C2A28`)**: Estructura, fondos intermedios, tarjetas de producto con efecto de piedra.
- **Montezzi Gold (`#B68A48`)**: Acentos, líneas sutiles (1-2px), iconos de beneficios y códigos KDJ.
- **Warm Ivory (`#F3EEE5`)**: Textos técnicos, respiro visual y tarjetas limpias.
- **Walnut (`#5A3927`)**: Color de apoyo visual y calidez fotográfica.

### Tipografías (Google Fonts)
- **Titulares y elementos editoriales**: `EB Garamond`
- **Textos técnicos, medidas, tablas, navegación y CTAs**: `Lato`

### Principio Rector
> *«Sofisticación visual + precisión técnica + utilidad real.»*  
> *«La estética nunca puede alterar la ingeniería.»*

---

## 2. Portafolio Oficial de 112 Referencias (KDJ-1 al KDJ-112)

El catálogo completo ha sido extraído de la matriz oficial y organizado en tres grandes colecciones:
1. **Colección Cocina**: Despensas extraíbles de 6 niveles (vidrio, varilla, carbono/MDF), esquineros mágicos reversibles, canastas elevables mecánicas y eléctricas táctiles, basureros integrados y organizadores de especias.
2. **Colección Clóset**: Joyeros en cuero italiano con amortiguación, pantaloneros extraíbles con cierre suave, elevadores de ropa abatibles, zapateros giratorios de 12 niveles, y cajones de seguridad biométricos con watch winder para relojes automáticos.
3. **Herrajes Especiales**: Bisagras invisibles de 180°, sistemas de puerta corrediza Magic Door, cerraduras de manija, tiraderas arquitectónicas, cantoneras y ruedas giratorias de alta resistencia.

---

## 3. Características y Módulos Desarrollados

### A. Sitio Público / Showroom Digital
- **Header Inteligente**: Logotipo oficial (Isotipo 'M' con serifa + tipografía editorial), navegación por colecciones, buscador en tiempo real por código KDJ, botón de carrito con contador interactivo y conmutador rápido de roles para pruebas.
- **Hero Westwing**: Estética arquitectónica cálida, eslogan oficial y accesos directos al catálogo y al canal profesional.
- **Filtros Avanzados**: Filtrado multifactorial por colección, categoría de la matriz, acabado (Negro, Satinado, Cromo, Vidrio, etc.) y rangos de precio en COP.
- **Ficha Técnica Oficial**: Tabla técnica estandarizada (Material, Acabado, Dimensiones W\*D\*H, Mecanismo, Capacidad), iconos de beneficios normalizados y el **módulo obligatorio desplegable** *"Información importante antes de comprar e instalar"*.
- **Carrito con Envío Gratuito**: Drawer lateral deslizante con barra de progreso interactiva hacia el umbral de **$500.000 COP** para envío gratuito nacional.
- **Páginas Institucionales y Políticas Oficiales**:
  - `Nosotros`: Historia, Manifiesto, Misión y Visión 2031.
  - `Política de Garantías y Cambios`: Término de 30 días, revisión en 24h por transporte y 10 causales de exclusión oficiales.
  - `Política de Envíos`: Medellín (1 día hábil), Resto del país (2-3 días hábiles) y gratuidad >= $500k.
  - `Preguntas Frecuentes (FAQ)`: 10 preguntas oficiales con acordeones y buscador.
  - `Ventas al por Mayor y Distribución`: Formulario especializado para arquitectos, diseñadores y carpinteros.

### B. Dashboard de Control Administrativo (`/admin`)
- **Autenticación por Roles**: Administrador (control total), Colaborador (gestión operativa) y Cliente.
- **Control de Inventario**:
  - Tabla completa con las 112 referencias.
  - Alerta de stock crítico (< 8 unidades).
  - **Edición rápida en tiempo real**: Actualización inline de precios y existencias.
- **Alta de Referencias**: Modal completo para agregar o editar productos con todas sus especificaciones técnicas.
- **Gestión de Pedidos Kanban**: Tablero visual con columnas por estado (*pendiente, aprobado, enviado, entregado, cancelado*) con actualización inmediata.

---

## 4. Base de Datos y Supabase

El esquema PostgreSQL y los datos semilla oficiales se encuentran en la carpeta `/supabase`:
- `supabase/schema.sql`: Estructura de tablas (`profiles`, `categories`, `products`, `orders`, `wholesale_leads`), Row Level Security (RLS) y trigger automático para nuevos usuarios.
- `supabase/seed.sql`: Inserción de las categorías, órdenes de muestra y las 112 referencias oficiales (KDJ-1 a KDJ-112).

### Variables de Entorno (Opcional)
Para conectar un proyecto remoto de Supabase, copia `.env.example` a `.env` y define:
```bash
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```
*Nota: La aplicación cuenta con un adaptador reactivo local sincronizado con `localStorage`, por lo que funciona plenamente sin necesidad de configurar Supabase en la nube para demostración o desarrollo.*

---

## 5. Instrucciones de Ejecución y Despliegue

### Modo Desarrollo
```bash
npm install
npm run dev
```
La aplicación iniciará en `http://localhost:5173`.

### Compilación para Producción
```bash
npm run build
```
Genera la carpeta `dist/` optimizada con code-splitting para Vercel.

### Despliegue en Vercel
El archivo `vercel.json` ya está incluido con reglas de redirección SPA y caché inmutable de assets. Simplemente ejecuta:
```bash
vercel
```
o conecta el repositorio en el panel de Vercel.

---
© 2026 Montezzi S.A.S. — *Diseñado para durar. Hecho para impresionar.*

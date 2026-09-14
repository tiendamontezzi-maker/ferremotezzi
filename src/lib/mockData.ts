import { Category, Product, Order, AbandonedCart, ProductClickAnalytics, SystemUser } from '../types/database';

export const OFFICIAL_CATEGORIES: Category[] = [
  {
    "id": "cat-1",
    "name": "Deslizadores y protectores",
    "slug": "deslizadores-y-protectores",
    "main_collection": "herrajes_especiales",
    "description": "Soluciones de diseño y arquitectura para deslizadores y protectores."
  },
  {
    "id": "cat-2",
    "name": "Cantoneras y escuadras",
    "slug": "cantoneras-y-escuadras",
    "main_collection": "herrajes_especiales",
    "description": "Soluciones de diseño y arquitectura para cantoneras y escuadras."
  },
  {
    "id": "cat-3",
    "name": "Bisagras para puertas y muebles",
    "slug": "bisagras-para-puertas-y-muebles",
    "main_collection": "herrajes_especiales",
    "description": "Soluciones de diseño y arquitectura para bisagras para puertas y muebles."
  },
  {
    "id": "cat-4",
    "name": "Percheros y ganchos",
    "slug": "percheros-y-ganchos",
    "main_collection": "closet",
    "description": "Soluciones de diseño y arquitectura para percheros y ganchos."
  },
  {
    "id": "cat-5",
    "name": "Puntas, avellanadores y guías",
    "slug": "puntas-avellanadores-y-guias",
    "main_collection": "herrajes_especiales",
    "description": "Soluciones de diseño y arquitectura para puntas, avellanadores y guías."
  },
  {
    "id": "cat-6",
    "name": "Cerraduras para muebles y puertas",
    "slug": "cerraduras-para-muebles-y-puertas",
    "main_collection": "herrajes_especiales",
    "description": "Soluciones de diseño y arquitectura para cerraduras para muebles y puertas."
  },
  {
    "id": "cat-7",
    "name": "Manijas, tiraderas y pomos",
    "slug": "manijas-tiraderas-y-pomos",
    "main_collection": "herrajes_especiales",
    "description": "Soluciones de diseño y arquitectura para manijas, tiraderas y pomos."
  },
  {
    "id": "cat-8",
    "name": "Sistemas para puertas corredizas",
    "slug": "sistemas-para-puertas-corredizas",
    "main_collection": "herrajes_especiales",
    "description": "Soluciones de diseño y arquitectura para sistemas para puertas corredizas."
  },
  {
    "id": "cat-9",
    "name": "Organizadores cocina",
    "slug": "organizadores-cocina",
    "main_collection": "cocina",
    "description": "Soluciones de diseño y arquitectura para organizadores cocina."
  },
  {
    "id": "cat-10",
    "name": "Organizadores closets",
    "slug": "organizadores-closets",
    "main_collection": "closet",
    "description": "Soluciones de diseño y arquitectura para organizadores closets."
  },
  {
    "id": "cat-11",
    "name": "Ruedas giratorias",
    "slug": "ruedas-giratorias",
    "main_collection": "herrajes_especiales",
    "description": "Soluciones de diseño y arquitectura para ruedas giratorias."
  }
];

export const OFFICIAL_PRODUCTS: Product[] = [
  {
    "id": "prod-kdj-1",
    "code": "KDJ-1",
    "name": "Deslizador con felpa de 17 mm",
    "category_id": "cat-1",
    "category_name": "Deslizadores y protectores",
    "main_collection": "herrajes_especiales",
    "short_description": "Deslizador con felpa de 17 mm diseñado para proteger pisos y facilitar el desplazamiento suave de muebles, con una superficie de felpa que reduce el roce y el ruido.",
    "technical_specs": {
      "material": "Base Termoplástica con Disco de Felpa de Alta Densidad",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Ø 17 mm x Alto 5 mm",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Base Termoplástica"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 15000,
    "stock": 25,
    "min_stock_alert": 8,
    "image_url": "/images/products/deslizador.jpg",
    "gallery_urls": [
      "/images/products/deslizador.jpg",
      "/images/products/cantonera.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-2",
    "code": "KDJ-2",
    "name": "Deslizador con puntilla de 18 × 5 mm",
    "category_id": "cat-1",
    "category_name": "Deslizadores y protectores",
    "main_collection": "herrajes_especiales",
    "short_description": "Deslizador con puntilla de 18 × 5 mm diseñado para facilitar el movimiento de muebles y elevar ligeramente su base mediante fijación por puntilla.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "18 x 5 mm",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 15000,
    "stock": 32,
    "min_stock_alert": 8,
    "image_url": "/images/products/deslizador.jpg",
    "gallery_urls": [
      "/images/products/deslizador.jpg",
      "/images/products/cantonera.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-3",
    "code": "KDJ-3",
    "name": "Deslizador con puntilla de 15 × 5 mm",
    "category_id": "cat-1",
    "category_name": "Deslizadores y protectores",
    "main_collection": "herrajes_especiales",
    "short_description": "Deslizador con puntilla de 15 × 5 mm diseñado para proteger la superficie de apoyo y mejorar el desplazamiento de muebles compactos mediante fijación por puntilla.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "15 x 5 mm",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 15000,
    "stock": 39,
    "min_stock_alert": 8,
    "image_url": "/images/products/deslizador.jpg",
    "gallery_urls": [
      "/images/products/deslizador.jpg",
      "/images/products/cantonera.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-4",
    "code": "KDJ-4",
    "name": "Deslizador de puntilla doble",
    "category_id": "cat-1",
    "category_name": "Deslizadores y protectores",
    "main_collection": "herrajes_especiales",
    "short_description": "Deslizador de puntilla doble diseñado para ofrecer una fijación más estable gracias a su configuración de puntilla doble.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 15000,
    "stock": 46,
    "min_stock_alert": 8,
    "image_url": "/images/products/deslizador.jpg",
    "gallery_urls": [
      "/images/products/deslizador.jpg",
      "/images/products/cantonera.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-5",
    "code": "KDJ-5",
    "name": "Deslizador de silicona transparente",
    "category_id": "cat-1",
    "category_name": "Deslizadores y protectores",
    "main_collection": "herrajes_especiales",
    "short_description": "Deslizador de silicona transparente diseñado para amortiguar el contacto del mueble con la superficie, reducir vibraciones y evitar marcas.",
    "technical_specs": {
      "material": "Silicona Elastómera de Grado Arquitectónico",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Silicona Elastómera"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 15000,
    "stock": 18,
    "min_stock_alert": 8,
    "image_url": "/images/products/deslizador.jpg",
    "gallery_urls": [
      "/images/products/deslizador.jpg",
      "/images/products/cantonera.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-6",
    "code": "KDJ-6",
    "name": "Cantonera metálica de 40 × 40 × 40 mm",
    "category_id": "cat-2",
    "category_name": "Cantoneras y escuadras",
    "main_collection": "herrajes_especiales",
    "short_description": "Cantonera metálica de 40 × 40 × 40 mm para reforzar uniones a 90° y aportar estabilidad en estructuras de muebles, gabinetes, repisas y trabajos de carpintería.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "40 x 40 x 40 mm",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 18000,
    "stock": 25,
    "min_stock_alert": 8,
    "image_url": "/images/products/cantonera.jpg",
    "gallery_urls": [
      "/images/products/cantonera.jpg",
      "/images/products/deslizador.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-7",
    "code": "KDJ-7",
    "name": "Cantonera negra de 25 mm con 2 perforaciones",
    "category_id": "cat-2",
    "category_name": "Cantoneras y escuadras",
    "main_collection": "herrajes_especiales",
    "short_description": "Cantonera negra de 25 mm con 2 perforaciones para reforzar uniones a 90° y aportar estabilidad en estructuras de muebles, gabinetes, repisas y trabajos de carpintería.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Negro Mate Texturizado Soft-Touch (Epoxi Horno)",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 18000,
    "stock": 32,
    "min_stock_alert": 8,
    "image_url": "/images/products/cantonera.jpg",
    "gallery_urls": [
      "/images/products/cantonera.jpg",
      "/images/products/deslizador.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-8",
    "code": "KDJ-8",
    "name": "Cantonera negra compacta con 1 perforación",
    "category_id": "cat-2",
    "category_name": "Cantoneras y escuadras",
    "main_collection": "herrajes_especiales",
    "short_description": "Cantonera negra compacta con 1 perforación para reforzar uniones a 90° y aportar estabilidad en estructuras de muebles, gabinetes, repisas y trabajos de carpintería.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Negro Mate Texturizado Soft-Touch (Epoxi Horno)",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 18000,
    "stock": 39,
    "min_stock_alert": 8,
    "image_url": "/images/products/cantonera.jpg",
    "gallery_urls": [
      "/images/products/cantonera.jpg",
      "/images/products/deslizador.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-9",
    "code": "KDJ-9",
    "name": "Cantonera esquinera en acero inoxidable",
    "category_id": "cat-2",
    "category_name": "Cantoneras y escuadras",
    "main_collection": "herrajes_especiales",
    "short_description": "Cantonera esquinera en acero inoxidable para reforzar uniones a 90° y aportar estabilidad en estructuras de muebles, gabinetes, repisas y trabajos de carpintería.",
    "technical_specs": {
      "material": "Acero Estructural de Alta Resistencia",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero Estructural"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 18000,
    "stock": 46,
    "min_stock_alert": 8,
    "image_url": "/images/products/cantonera.jpg",
    "gallery_urls": [
      "/images/products/cantonera.jpg",
      "/images/products/deslizador.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-10",
    "code": "KDJ-10",
    "name": "Cantonera cuadrada galvanizada de 15 mm",
    "category_id": "cat-2",
    "category_name": "Cantoneras y escuadras",
    "main_collection": "herrajes_especiales",
    "short_description": "Cantonera cuadrada galvanizada de 15 mm para reforzar uniones a 90° y aportar estabilidad en estructuras de muebles, gabinetes, repisas y trabajos de carpintería.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Galvanizado Zincado Brillante Anticorrosión",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 18000,
    "stock": 18,
    "min_stock_alert": 8,
    "image_url": "/images/products/cantonera.jpg",
    "gallery_urls": [
      "/images/products/cantonera.jpg",
      "/images/products/deslizador.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-11",
    "code": "KDJ-11",
    "name": "Cantonera redonda galvanizada de 15 mm",
    "category_id": "cat-2",
    "category_name": "Cantoneras y escuadras",
    "main_collection": "herrajes_especiales",
    "short_description": "Cantonera redonda galvanizada de 15 mm para reforzar uniones a 90° y aportar estabilidad en estructuras de muebles, gabinetes, repisas y trabajos de carpintería.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Galvanizado Zincado Brillante Anticorrosión",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 18000,
    "stock": 25,
    "min_stock_alert": 8,
    "image_url": "/images/products/cantonera.jpg",
    "gallery_urls": [
      "/images/products/cantonera.jpg",
      "/images/products/deslizador.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-12",
    "code": "KDJ-12",
    "name": "Bisagra de nudo 4 × 3 negra – modelo 1034X3NN",
    "category_id": "cat-3",
    "category_name": "Bisagras para puertas y muebles",
    "main_collection": "herrajes_especiales",
    "short_description": "Bisagra de nudo 4 × 3 negra – modelo 1034X3NN, concebida para la articulación firme de puertas y elementos de carpintería.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Negro Mate Texturizado Soft-Touch (Epoxi Horno)",
      "dimensiones": "4 x 3 mm",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "18 kg (juego de 2 unidades)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "18 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 24000,
    "stock": 32,
    "min_stock_alert": 8,
    "image_url": "/images/products/bisagra.jpg",
    "gallery_urls": [
      "/images/products/bisagra.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-13",
    "code": "KDJ-13",
    "name": "Bisagra de nudo 4 × 3 negra – modelo 1034X3NA",
    "category_id": "cat-3",
    "category_name": "Bisagras para puertas y muebles",
    "main_collection": "herrajes_especiales",
    "short_description": "Bisagra de nudo 4 × 3 negra – modelo 1034X3NA, concebida para la articulación firme de puertas y elementos de carpintería.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Negro Mate Texturizado Soft-Touch (Epoxi Horno)",
      "dimensiones": "4 x 3 mm",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "18 kg (juego de 2 unidades)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "18 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 24000,
    "stock": 39,
    "min_stock_alert": 8,
    "image_url": "/images/products/bisagra.jpg",
    "gallery_urls": [
      "/images/products/bisagra.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-14",
    "code": "KDJ-14",
    "name": "Bisagra omega 4 × 3 acabado acero",
    "category_id": "cat-3",
    "category_name": "Bisagras para puertas y muebles",
    "main_collection": "herrajes_especiales",
    "short_description": "Bisagra omega 4 × 3 acabado acero, concebida para la articulación firme de puertas y elementos de carpintería.",
    "technical_specs": {
      "material": "Acero Estructural de Alta Resistencia",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "4 x 3 mm",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "18 kg (juego de 2 unidades)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero Estructural"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "18 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 24000,
    "stock": 46,
    "min_stock_alert": 8,
    "image_url": "/images/products/bisagra.jpg",
    "gallery_urls": [
      "/images/products/bisagra.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-15",
    "code": "KDJ-15",
    "name": "Bisagra omega 4 × 3 negra",
    "category_id": "cat-3",
    "category_name": "Bisagras para puertas y muebles",
    "main_collection": "herrajes_especiales",
    "short_description": "Bisagra omega 4 × 3 negra, concebida para la articulación firme de puertas y elementos de carpintería.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Negro Mate Texturizado Soft-Touch (Epoxi Horno)",
      "dimensiones": "4 x 3 mm",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "18 kg (juego de 2 unidades)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "18 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 24000,
    "stock": 18,
    "min_stock_alert": 8,
    "image_url": "/images/products/bisagra.jpg",
    "gallery_urls": [
      "/images/products/bisagra.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-16",
    "code": "KDJ-16",
    "name": "Bisagra de parche completo sin cierre suave",
    "category_id": "cat-3",
    "category_name": "Bisagras para puertas y muebles",
    "main_collection": "herrajes_especiales",
    "short_description": "Bisagra de parche completo sin cierre suave para gabinetes y muebles con configuración de parche completo.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Pistón hidráulico de cierre suave amortiguado (Soft-Close Silence Pro)",
      "capacidad_carga": "18 kg (juego de 2 unidades)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Soft-Close Pro"
      },
      {
        "label": "CARGA",
        "value": "18 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 24000,
    "stock": 25,
    "min_stock_alert": 8,
    "image_url": "/images/products/bisagra.jpg",
    "gallery_urls": [
      "/images/products/bisagra.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-17",
    "code": "KDJ-17",
    "name": "Bisagra de parche medio sin cierre suave",
    "category_id": "cat-3",
    "category_name": "Bisagras para puertas y muebles",
    "main_collection": "herrajes_especiales",
    "short_description": "Bisagra de parche medio sin cierre suave para gabinetes y muebles con configuración de parche medio.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Pistón hidráulico de cierre suave amortiguado (Soft-Close Silence Pro)",
      "capacidad_carga": "18 kg (juego de 2 unidades)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Soft-Close Pro"
      },
      {
        "label": "CARGA",
        "value": "18 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 24000,
    "stock": 32,
    "min_stock_alert": 8,
    "image_url": "/images/products/bisagra.jpg",
    "gallery_urls": [
      "/images/products/bisagra.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-18",
    "code": "KDJ-18",
    "name": "Bisagra interna sin cierre suave",
    "category_id": "cat-3",
    "category_name": "Bisagras para puertas y muebles",
    "main_collection": "herrajes_especiales",
    "short_description": "Bisagra interna sin cierre suave para gabinetes y muebles con configuración de puerta interna.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Pistón hidráulico de cierre suave amortiguado (Soft-Close Silence Pro)",
      "capacidad_carga": "18 kg (juego de 2 unidades)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Soft-Close Pro"
      },
      {
        "label": "CARGA",
        "value": "18 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 24000,
    "stock": 39,
    "min_stock_alert": 8,
    "image_url": "/images/products/bisagra.jpg",
    "gallery_urls": [
      "/images/products/bisagra.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-19",
    "code": "KDJ-19",
    "name": "Bisagra de parche completo con cierre suave",
    "category_id": "cat-3",
    "category_name": "Bisagras para puertas y muebles",
    "main_collection": "herrajes_especiales",
    "short_description": "Bisagra de parche completo con cierre suave para gabinetes y muebles con configuración de parche completo.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Pistón hidráulico de cierre suave amortiguado (Soft-Close Silence Pro)",
      "capacidad_carga": "18 kg (juego de 2 unidades)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Soft-Close Pro"
      },
      {
        "label": "CARGA",
        "value": "18 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 24000,
    "stock": 46,
    "min_stock_alert": 8,
    "image_url": "/images/products/bisagra.jpg",
    "gallery_urls": [
      "/images/products/bisagra.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-20",
    "code": "KDJ-20",
    "name": "Bisagra de parche medio con cierre suave",
    "category_id": "cat-3",
    "category_name": "Bisagras para puertas y muebles",
    "main_collection": "herrajes_especiales",
    "short_description": "Bisagra de parche medio con cierre suave para gabinetes y muebles con configuración de parche medio.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Pistón hidráulico de cierre suave amortiguado (Soft-Close Silence Pro)",
      "capacidad_carga": "18 kg (juego de 2 unidades)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Soft-Close Pro"
      },
      {
        "label": "CARGA",
        "value": "18 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 24000,
    "stock": 18,
    "min_stock_alert": 8,
    "image_url": "/images/products/bisagra.jpg",
    "gallery_urls": [
      "/images/products/bisagra.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-21",
    "code": "KDJ-21",
    "name": "Bisagra interna con cierre suave",
    "category_id": "cat-3",
    "category_name": "Bisagras para puertas y muebles",
    "main_collection": "herrajes_especiales",
    "short_description": "Bisagra interna con cierre suave para gabinetes y muebles con configuración de puerta interna.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Pistón hidráulico de cierre suave amortiguado (Soft-Close Silence Pro)",
      "capacidad_carga": "18 kg (juego de 2 unidades)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Soft-Close Pro"
      },
      {
        "label": "CARGA",
        "value": "18 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 24000,
    "stock": 25,
    "min_stock_alert": 8,
    "image_url": "/images/products/bisagra.jpg",
    "gallery_urls": [
      "/images/products/bisagra.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-22",
    "code": "KDJ-22",
    "name": "Bisagra de 165° sin cierre suave",
    "category_id": "cat-3",
    "category_name": "Bisagras para puertas y muebles",
    "main_collection": "herrajes_especiales",
    "short_description": "Bisagra de 165° sin cierre suave para gabinetes y muebles con configuración de apertura especial.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Pistón hidráulico de cierre suave amortiguado (Soft-Close Silence Pro)",
      "capacidad_carga": "18 kg (juego de 2 unidades)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Soft-Close Pro"
      },
      {
        "label": "CARGA",
        "value": "18 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 38000,
    "stock": 32,
    "min_stock_alert": 8,
    "image_url": "/images/products/bisagra.jpg",
    "gallery_urls": [
      "/images/products/bisagra.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-23",
    "code": "KDJ-23",
    "name": "Bisagra de 165° con cierre suave",
    "category_id": "cat-3",
    "category_name": "Bisagras para puertas y muebles",
    "main_collection": "herrajes_especiales",
    "short_description": "Bisagra de 165° con cierre suave para gabinetes y muebles con configuración de apertura especial.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Pistón hidráulico de cierre suave amortiguado (Soft-Close Silence Pro)",
      "capacidad_carga": "18 kg (juego de 2 unidades)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Soft-Close Pro"
      },
      {
        "label": "CARGA",
        "value": "18 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 38000,
    "stock": 39,
    "min_stock_alert": 8,
    "image_url": "/images/products/bisagra.jpg",
    "gallery_urls": [
      "/images/products/bisagra.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-24",
    "code": "KDJ-24",
    "name": "Bisagra de parche completo con cierre suave antracita",
    "category_id": "cat-3",
    "category_name": "Bisagras para puertas y muebles",
    "main_collection": "herrajes_especiales",
    "short_description": "Bisagra de parche completo con cierre suave antracita para gabinetes y muebles con configuración de parche completo.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Antracita Mate Electrostático Deep Space",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Pistón hidráulico de cierre suave amortiguado (Soft-Close Silence Pro)",
      "capacidad_carga": "18 kg (juego de 2 unidades)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Soft-Close Pro"
      },
      {
        "label": "CARGA",
        "value": "18 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 38000,
    "stock": 46,
    "min_stock_alert": 8,
    "image_url": "/images/products/bisagra.jpg",
    "gallery_urls": [
      "/images/products/bisagra.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-25",
    "code": "KDJ-25",
    "name": "Bisagra de parche medio con cierre suave antracita",
    "category_id": "cat-3",
    "category_name": "Bisagras para puertas y muebles",
    "main_collection": "herrajes_especiales",
    "short_description": "Bisagra de parche medio con cierre suave antracita para gabinetes y muebles con configuración de parche medio.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Antracita Mate Electrostático Deep Space",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Pistón hidráulico de cierre suave amortiguado (Soft-Close Silence Pro)",
      "capacidad_carga": "18 kg (juego de 2 unidades)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Soft-Close Pro"
      },
      {
        "label": "CARGA",
        "value": "18 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 38000,
    "stock": 18,
    "min_stock_alert": 8,
    "image_url": "/images/products/bisagra.jpg",
    "gallery_urls": [
      "/images/products/bisagra.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-26",
    "code": "KDJ-26",
    "name": "Bisagra interna con cierre suave antracita",
    "category_id": "cat-3",
    "category_name": "Bisagras para puertas y muebles",
    "main_collection": "herrajes_especiales",
    "short_description": "Bisagra interna con cierre suave antracita para gabinetes y muebles con configuración de puerta interna.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Antracita Mate Electrostático Deep Space",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Pistón hidráulico de cierre suave amortiguado (Soft-Close Silence Pro)",
      "capacidad_carga": "18 kg (juego de 2 unidades)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Soft-Close Pro"
      },
      {
        "label": "CARGA",
        "value": "18 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 38000,
    "stock": 25,
    "min_stock_alert": 8,
    "image_url": "/images/products/bisagra.jpg",
    "gallery_urls": [
      "/images/products/bisagra.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-27",
    "code": "KDJ-27",
    "name": "Bisagra de 90° con cierre suave negra",
    "category_id": "cat-3",
    "category_name": "Bisagras para puertas y muebles",
    "main_collection": "herrajes_especiales",
    "short_description": "Bisagra de 90° con cierre suave negra para gabinetes y muebles con configuración de apertura especial.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Negro Mate Texturizado Soft-Touch (Epoxi Horno)",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Pistón hidráulico de cierre suave amortiguado (Soft-Close Silence Pro)",
      "capacidad_carga": "18 kg (juego de 2 unidades)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Soft-Close Pro"
      },
      {
        "label": "CARGA",
        "value": "18 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 24000,
    "stock": 32,
    "min_stock_alert": 8,
    "image_url": "/images/products/bisagra.jpg",
    "gallery_urls": [
      "/images/products/bisagra.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-28",
    "code": "KDJ-28",
    "name": "Bisagra de parche completo SS201 con cierre suave",
    "category_id": "cat-3",
    "category_name": "Bisagras para puertas y muebles",
    "main_collection": "herrajes_especiales",
    "short_description": "Bisagra de parche completo SS201 con cierre suave para gabinetes y muebles con configuración de parche completo.",
    "technical_specs": {
      "material": "Acero Inoxidable Austenítico SS201",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Pistón hidráulico de cierre suave amortiguado (Soft-Close Silence Pro)",
      "capacidad_carga": "18 kg (juego de 2 unidades)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero Inoxidable"
      },
      {
        "label": "CIERRE",
        "value": "Soft-Close Pro"
      },
      {
        "label": "CARGA",
        "value": "18 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 38000,
    "stock": 39,
    "min_stock_alert": 8,
    "image_url": "/images/products/bisagra.jpg",
    "gallery_urls": [
      "/images/products/bisagra.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-29",
    "code": "KDJ-29",
    "name": "Bisagra de parche medio SS201 con cierre suave",
    "category_id": "cat-3",
    "category_name": "Bisagras para puertas y muebles",
    "main_collection": "herrajes_especiales",
    "short_description": "Bisagra de parche medio SS201 con cierre suave para gabinetes y muebles con configuración de parche medio.",
    "technical_specs": {
      "material": "Acero Inoxidable Austenítico SS201",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Pistón hidráulico de cierre suave amortiguado (Soft-Close Silence Pro)",
      "capacidad_carga": "18 kg (juego de 2 unidades)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero Inoxidable"
      },
      {
        "label": "CIERRE",
        "value": "Soft-Close Pro"
      },
      {
        "label": "CARGA",
        "value": "18 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 38000,
    "stock": 46,
    "min_stock_alert": 8,
    "image_url": "/images/products/bisagra.jpg",
    "gallery_urls": [
      "/images/products/bisagra.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-30",
    "code": "KDJ-30",
    "name": "Bisagra interna SS201 con cierre suave",
    "category_id": "cat-3",
    "category_name": "Bisagras para puertas y muebles",
    "main_collection": "herrajes_especiales",
    "short_description": "Bisagra interna SS201 con cierre suave para gabinetes y muebles con configuración de puerta interna.",
    "technical_specs": {
      "material": "Acero Inoxidable Austenítico SS201",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Pistón hidráulico de cierre suave amortiguado (Soft-Close Silence Pro)",
      "capacidad_carga": "18 kg (juego de 2 unidades)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero Inoxidable"
      },
      {
        "label": "CIERRE",
        "value": "Soft-Close Pro"
      },
      {
        "label": "CARGA",
        "value": "18 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 38000,
    "stock": 18,
    "min_stock_alert": 8,
    "image_url": "/images/products/bisagra.jpg",
    "gallery_urls": [
      "/images/products/bisagra.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-31",
    "code": "KDJ-31",
    "name": "Perchero sencillo satinado",
    "category_id": "cat-4",
    "category_name": "Percheros y ganchos",
    "main_collection": "closet",
    "short_description": "Perchero sencillo satinado para colgar prendas, accesorios, bolsos o elementos de uso cotidiano en clósets, vestidores, habitaciones y zonas auxiliares.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Níquel Satinado Pulido Satin Finish",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 38000,
    "stock": 25,
    "min_stock_alert": 8,
    "image_url": "/images/products/perchero.jpg",
    "gallery_urls": [
      "/images/products/perchero.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-32",
    "code": "KDJ-32",
    "name": "Perchero sencillo negro",
    "category_id": "cat-4",
    "category_name": "Percheros y ganchos",
    "main_collection": "closet",
    "short_description": "Perchero sencillo negro para colgar prendas, accesorios, bolsos o elementos de uso cotidiano en clósets, vestidores, habitaciones y zonas auxiliares.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Negro Mate Texturizado Soft-Touch (Epoxi Horno)",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 38000,
    "stock": 32,
    "min_stock_alert": 8,
    "image_url": "/images/products/perchero.jpg",
    "gallery_urls": [
      "/images/products/perchero.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-33",
    "code": "KDJ-33",
    "name": "Perchero Lux acabado cromo",
    "category_id": "cat-4",
    "category_name": "Percheros y ganchos",
    "main_collection": "closet",
    "short_description": "Perchero Lux acabado cromo para colgar prendas, accesorios, bolsos o elementos de uso cotidiano en clósets, vestidores, habitaciones y zonas auxiliares.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Cromo Espejo Multicapa Anticorrosión",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 68000,
    "stock": 39,
    "min_stock_alert": 8,
    "image_url": "/images/products/perchero.jpg",
    "gallery_urls": [
      "/images/products/perchero.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-34",
    "code": "KDJ-34",
    "name": "Perchero Lux negro",
    "category_id": "cat-4",
    "category_name": "Percheros y ganchos",
    "main_collection": "closet",
    "short_description": "Perchero Lux negro para colgar prendas, accesorios, bolsos o elementos de uso cotidiano en clósets, vestidores, habitaciones y zonas auxiliares.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Negro Mate Texturizado Soft-Touch (Epoxi Horno)",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 68000,
    "stock": 46,
    "min_stock_alert": 8,
    "image_url": "/images/products/perchero.jpg",
    "gallery_urls": [
      "/images/products/perchero.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-35",
    "code": "KDJ-35",
    "name": "Perchero doble acabado cromo",
    "category_id": "cat-4",
    "category_name": "Percheros y ganchos",
    "main_collection": "closet",
    "short_description": "Perchero doble acabado cromo para colgar prendas, accesorios, bolsos o elementos de uso cotidiano en clósets, vestidores, habitaciones y zonas auxiliares.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Cromo Espejo Multicapa Anticorrosión",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 68000,
    "stock": 18,
    "min_stock_alert": 8,
    "image_url": "/images/products/perchero.jpg",
    "gallery_urls": [
      "/images/products/perchero.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-36",
    "code": "KDJ-36",
    "name": "Perchero doble negro",
    "category_id": "cat-4",
    "category_name": "Percheros y ganchos",
    "main_collection": "closet",
    "short_description": "Perchero doble negro para colgar prendas, accesorios, bolsos o elementos de uso cotidiano en clósets, vestidores, habitaciones y zonas auxiliares.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Negro Mate Texturizado Soft-Touch (Epoxi Horno)",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 68000,
    "stock": 25,
    "min_stock_alert": 8,
    "image_url": "/images/products/perchero.jpg",
    "gallery_urls": [
      "/images/products/perchero.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-37",
    "code": "KDJ-37",
    "name": "Perchero de 5 puestos acabado acero",
    "category_id": "cat-4",
    "category_name": "Percheros y ganchos",
    "main_collection": "closet",
    "short_description": "Perchero de 5 puestos acabado acero para colgar prendas, accesorios, bolsos o elementos de uso cotidiano en clósets, vestidores, habitaciones y zonas auxiliares.",
    "technical_specs": {
      "material": "Acero Estructural de Alta Resistencia",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero Estructural"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 95000,
    "stock": 32,
    "min_stock_alert": 8,
    "image_url": "/images/products/perchero.jpg",
    "gallery_urls": [
      "/images/products/perchero.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-38",
    "code": "KDJ-38",
    "name": "Perchero de 5 puestos negro",
    "category_id": "cat-4",
    "category_name": "Percheros y ganchos",
    "main_collection": "closet",
    "short_description": "Perchero de 5 puestos negro para colgar prendas, accesorios, bolsos o elementos de uso cotidiano en clósets, vestidores, habitaciones y zonas auxiliares.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Negro Mate Texturizado Soft-Touch (Epoxi Horno)",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 95000,
    "stock": 39,
    "min_stock_alert": 8,
    "image_url": "/images/products/perchero.jpg",
    "gallery_urls": [
      "/images/products/perchero.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-39",
    "code": "KDJ-39",
    "name": "Juego de puntas imantadas para taladro",
    "category_id": "cat-5",
    "category_name": "Puntas, avellanadores y guías",
    "main_collection": "herrajes_especiales",
    "short_description": "Juego de cinco puntas imantadas para atornillador o taladro, diseñado para sujetar el tornillo durante la instalación y facilitar trabajos de armado de muebles, carpintería y montaje de herrajes.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 62000,
    "stock": 46,
    "min_stock_alert": 8,
    "image_url": "/images/products/punta_guia.jpg",
    "gallery_urls": [
      "/images/products/punta_guia.jpg",
      "/images/products/cantonera.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-40",
    "code": "KDJ-40",
    "name": "Avellanador con tope",
    "category_id": "cat-5",
    "category_name": "Puntas, avellanadores y guías",
    "main_collection": "herrajes_especiales",
    "short_description": "Accesorio de perforación con tope para realizar avellanados controlados y uniformes.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 62000,
    "stock": 18,
    "min_stock_alert": 8,
    "image_url": "/images/products/punta_guia.jpg",
    "gallery_urls": [
      "/images/products/punta_guia.jpg",
      "/images/products/cantonera.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-41",
    "code": "KDJ-41",
    "name": "Guía perforadora de canto de 8 mm",
    "category_id": "cat-5",
    "category_name": "Puntas, avellanadores y guías",
    "main_collection": "herrajes_especiales",
    "short_description": "Guía perforadora para cantos de 8 mm, concebida para alinear y repetir perforaciones con mayor precisión en tableros y piezas de carpintería.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 62000,
    "stock": 25,
    "min_stock_alert": 8,
    "image_url": "/images/products/punta_guia.jpg",
    "gallery_urls": [
      "/images/products/punta_guia.jpg",
      "/images/products/cantonera.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-42",
    "code": "KDJ-42",
    "name": "Cerradura para cajón de cilindro corto",
    "category_id": "cat-6",
    "category_name": "Cerraduras para muebles y puertas",
    "main_collection": "herrajes_especiales",
    "short_description": "Cerradura para cajón de cilindro corto para asegurar cajones, gabinetes y compartimentos de mobiliario.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 55000,
    "stock": 32,
    "min_stock_alert": 8,
    "image_url": "/images/products/cerradura.jpg",
    "gallery_urls": [
      "/images/products/cerradura.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-43",
    "code": "KDJ-43",
    "name": "Cerradura para cajón con placa en L",
    "category_id": "cat-6",
    "category_name": "Cerraduras para muebles y puertas",
    "main_collection": "herrajes_especiales",
    "short_description": "Cerradura para cajón con placa en L para asegurar cajones, gabinetes y compartimentos de mobiliario.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 55000,
    "stock": 39,
    "min_stock_alert": 8,
    "image_url": "/images/products/cerradura.jpg",
    "gallery_urls": [
      "/images/products/cerradura.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-44",
    "code": "KDJ-44",
    "name": "Manija LX de 96 mm satinada",
    "category_id": "cat-7",
    "category_name": "Manijas, tiraderas y pomos",
    "main_collection": "herrajes_especiales",
    "short_description": "Manija LX de 96 mm satinada para apertura de puertas y cajones de cocina, clóset, baño y mobiliario auxiliar.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Níquel Satinado Pulido Satin Finish",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Resistencia a tracción >500 N",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Resistencia a"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 42000,
    "stock": 46,
    "min_stock_alert": 8,
    "image_url": "/images/products/manija.jpg",
    "gallery_urls": [
      "/images/products/manija.jpg",
      "/images/products/perchero.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-45",
    "code": "KDJ-45",
    "name": "Manija LX de 128 mm satinada",
    "category_id": "cat-7",
    "category_name": "Manijas, tiraderas y pomos",
    "main_collection": "herrajes_especiales",
    "short_description": "Manija LX de 128 mm satinada para apertura de puertas y cajones de cocina, clóset, baño y mobiliario auxiliar.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Níquel Satinado Pulido Satin Finish",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Resistencia a tracción >500 N",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Resistencia a"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 42000,
    "stock": 18,
    "min_stock_alert": 8,
    "image_url": "/images/products/manija.jpg",
    "gallery_urls": [
      "/images/products/manija.jpg",
      "/images/products/perchero.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-46",
    "code": "KDJ-46",
    "name": "Manija LX de 96 mm negra",
    "category_id": "cat-7",
    "category_name": "Manijas, tiraderas y pomos",
    "main_collection": "herrajes_especiales",
    "short_description": "Manija LX de 96 mm negra para apertura de puertas y cajones de cocina, clóset, baño y mobiliario auxiliar.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Negro Mate Texturizado Soft-Touch (Epoxi Horno)",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Resistencia a tracción >500 N",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Resistencia a"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 42000,
    "stock": 25,
    "min_stock_alert": 8,
    "image_url": "/images/products/manija.jpg",
    "gallery_urls": [
      "/images/products/manija.jpg",
      "/images/products/perchero.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-47",
    "code": "KDJ-47",
    "name": "Manija LX de 128 mm negra",
    "category_id": "cat-7",
    "category_name": "Manijas, tiraderas y pomos",
    "main_collection": "herrajes_especiales",
    "short_description": "Manija LX de 128 mm negra para apertura de puertas y cajones de cocina, clóset, baño y mobiliario auxiliar.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Negro Mate Texturizado Soft-Touch (Epoxi Horno)",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Resistencia a tracción >500 N",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Resistencia a"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 42000,
    "stock": 32,
    "min_stock_alert": 8,
    "image_url": "/images/products/manija.jpg",
    "gallery_urls": [
      "/images/products/manija.jpg",
      "/images/products/perchero.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-48",
    "code": "KDJ-48",
    "name": "Botón Huella aluminio",
    "category_id": "cat-7",
    "category_name": "Manijas, tiraderas y pomos",
    "main_collection": "herrajes_especiales",
    "short_description": "Botón Huella aluminio para apertura de puertas y cajones de cocina, clóset, baño y mobiliario auxiliar.",
    "technical_specs": {
      "material": "Aluminio Anodizado Extruido de Alta Densidad",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Resistencia a tracción >500 N",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aluminio Anodizado"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Resistencia a"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 28000,
    "stock": 39,
    "min_stock_alert": 8,
    "image_url": "/images/products/manija.jpg",
    "gallery_urls": [
      "/images/products/manija.jpg",
      "/images/products/perchero.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-49",
    "code": "KDJ-49",
    "name": "Botón Huella negro mate",
    "category_id": "cat-7",
    "category_name": "Manijas, tiraderas y pomos",
    "main_collection": "herrajes_especiales",
    "short_description": "Botón Huella negro mate para apertura de puertas y cajones de cocina, clóset, baño y mobiliario auxiliar.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Negro Mate Texturizado Soft-Touch (Epoxi Horno)",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Resistencia a tracción >500 N",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Resistencia a"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 28000,
    "stock": 46,
    "min_stock_alert": 8,
    "image_url": "/images/products/manija.jpg",
    "gallery_urls": [
      "/images/products/manija.jpg",
      "/images/products/perchero.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-50",
    "code": "KDJ-50",
    "name": "Botón Lux plateado",
    "category_id": "cat-7",
    "category_name": "Manijas, tiraderas y pomos",
    "main_collection": "herrajes_especiales",
    "short_description": "Botón Lux plateado para apertura de puertas y cajones de cocina, clóset, baño y mobiliario auxiliar.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Cromo Espejo Multicapa Anticorrosión",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Resistencia a tracción >500 N",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Resistencia a"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 28000,
    "stock": 18,
    "min_stock_alert": 8,
    "image_url": "/images/products/manija.jpg",
    "gallery_urls": [
      "/images/products/manija.jpg",
      "/images/products/perchero.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-51",
    "code": "KDJ-51",
    "name": "Botón Lux negro mate",
    "category_id": "cat-7",
    "category_name": "Manijas, tiraderas y pomos",
    "main_collection": "herrajes_especiales",
    "short_description": "Botón Lux negro mate para apertura de puertas y cajones de cocina, clóset, baño y mobiliario auxiliar.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Negro Mate Texturizado Soft-Touch (Epoxi Horno)",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Resistencia a tracción >500 N",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Resistencia a"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 28000,
    "stock": 25,
    "min_stock_alert": 8,
    "image_url": "/images/products/manija.jpg",
    "gallery_urls": [
      "/images/products/manija.jpg",
      "/images/products/perchero.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-52",
    "code": "KDJ-52",
    "name": "Tiradera tubular cuadrada de 96 mm plateada",
    "category_id": "cat-7",
    "category_name": "Manijas, tiraderas y pomos",
    "main_collection": "herrajes_especiales",
    "short_description": "Tiradera tubular cuadrada de 96 mm plateada para apertura de puertas y cajones de cocina, clóset, baño y mobiliario auxiliar.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Cromo Espejo Multicapa Anticorrosión",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Resistencia a tracción >500 N",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Resistencia a"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 42000,
    "stock": 32,
    "min_stock_alert": 8,
    "image_url": "/images/products/manija.jpg",
    "gallery_urls": [
      "/images/products/manija.jpg",
      "/images/products/perchero.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-53",
    "code": "KDJ-53",
    "name": "Tiradera tubular cuadrada de 128 mm plateada",
    "category_id": "cat-7",
    "category_name": "Manijas, tiraderas y pomos",
    "main_collection": "herrajes_especiales",
    "short_description": "Tiradera tubular cuadrada de 128 mm plateada para apertura de puertas y cajones de cocina, clóset, baño y mobiliario auxiliar.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Cromo Espejo Multicapa Anticorrosión",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Resistencia a tracción >500 N",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Resistencia a"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 42000,
    "stock": 39,
    "min_stock_alert": 8,
    "image_url": "/images/products/manija.jpg",
    "gallery_urls": [
      "/images/products/manija.jpg",
      "/images/products/perchero.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-54",
    "code": "KDJ-54",
    "name": "Tiradera tubular cuadrada de 96 mm negra",
    "category_id": "cat-7",
    "category_name": "Manijas, tiraderas y pomos",
    "main_collection": "herrajes_especiales",
    "short_description": "Tiradera tubular cuadrada de 96 mm negra para apertura de puertas y cajones de cocina, clóset, baño y mobiliario auxiliar.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Negro Mate Texturizado Soft-Touch (Epoxi Horno)",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Resistencia a tracción >500 N",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Resistencia a"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 42000,
    "stock": 46,
    "min_stock_alert": 8,
    "image_url": "/images/products/manija.jpg",
    "gallery_urls": [
      "/images/products/manija.jpg",
      "/images/products/perchero.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-55",
    "code": "KDJ-55",
    "name": "Tiradera tubular cuadrada de 128 mm negra",
    "category_id": "cat-7",
    "category_name": "Manijas, tiraderas y pomos",
    "main_collection": "herrajes_especiales",
    "short_description": "Tiradera tubular cuadrada de 128 mm negra para apertura de puertas y cajones de cocina, clóset, baño y mobiliario auxiliar.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Negro Mate Texturizado Soft-Touch (Epoxi Horno)",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Resistencia a tracción >500 N",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Resistencia a"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 42000,
    "stock": 18,
    "min_stock_alert": 8,
    "image_url": "/images/products/manija.jpg",
    "gallery_urls": [
      "/images/products/manija.jpg",
      "/images/products/perchero.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-56",
    "code": "KDJ-56",
    "name": "Bisagra invisible cierrapuertas de 135 × 28 mm",
    "category_id": "cat-3",
    "category_name": "Bisagras para puertas y muebles",
    "main_collection": "herrajes_especiales",
    "short_description": "Bisagra invisible cierrapuertas de 135 × 28 mm para puertas interiores que requieren una solución oculta y una apariencia limpia.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "135 x 28 mm",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "18 kg (juego de 2 unidades)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "18 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 165000,
    "stock": 25,
    "min_stock_alert": 8,
    "image_url": "/images/products/bisagra.jpg",
    "gallery_urls": [
      "/images/products/bisagra.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-57",
    "code": "KDJ-57",
    "name": "Bisagra invisible cierrapuertas de 150 × 25 mm",
    "category_id": "cat-3",
    "category_name": "Bisagras para puertas y muebles",
    "main_collection": "herrajes_especiales",
    "short_description": "Bisagra invisible cierrapuertas de 150 × 25 mm para puertas interiores que requieren una solución oculta y una apariencia limpia.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "150 x 25 mm",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "18 kg (juego de 2 unidades)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "18 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 165000,
    "stock": 32,
    "min_stock_alert": 8,
    "image_url": "/images/products/bisagra.jpg",
    "gallery_urls": [
      "/images/products/bisagra.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-58",
    "code": "KDJ-58",
    "name": "Bisagra invisible cierrapuertas de 177 × 28 mm",
    "category_id": "cat-3",
    "category_name": "Bisagras para puertas y muebles",
    "main_collection": "herrajes_especiales",
    "short_description": "Bisagra invisible cierrapuertas de 177 × 28 mm para puertas interiores que requieren una solución oculta y una apariencia limpia.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "177 x 28 mm",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "18 kg (juego de 2 unidades)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "18 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 165000,
    "stock": 39,
    "min_stock_alert": 8,
    "image_url": "/images/products/bisagra.jpg",
    "gallery_urls": [
      "/images/products/bisagra.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-59",
    "code": "KDJ-59",
    "name": "Sistema Magic Door para puerta corrediza",
    "category_id": "cat-8",
    "category_name": "Sistemas para puertas corredizas",
    "main_collection": "herrajes_especiales",
    "short_description": "Sistema Magic Door para puerta corrediza, diseñado para permitir el desplazamiento lateral de la puerta y aprovechar el espacio sin giro de hoja.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Carros con rodamientos sellados de teflón y guía oculta de traslación lateral",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 650000,
    "stock": 46,
    "min_stock_alert": 8,
    "image_url": "/images/products/sistema_corredizo.jpg",
    "gallery_urls": [
      "/images/products/sistema_corredizo.jpg",
      "/images/products/bisagra.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-60",
    "code": "KDJ-60",
    "name": "Sistema corredizo de 2 m sin cierre suave",
    "category_id": "cat-8",
    "category_name": "Sistemas para puertas corredizas",
    "main_collection": "herrajes_especiales",
    "short_description": "Sistema corredizo de 2 m sin cierre suave, diseñado para permitir el desplazamiento lateral de la puerta y aprovechar el espacio sin giro de hoja.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Pistón hidráulico de cierre suave amortiguado (Soft-Close Silence Pro)",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Soft-Close Pro"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 320000,
    "stock": 18,
    "min_stock_alert": 8,
    "image_url": "/images/products/sistema_corredizo.jpg",
    "gallery_urls": [
      "/images/products/sistema_corredizo.jpg",
      "/images/products/bisagra.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-61",
    "code": "KDJ-61",
    "name": "Canasta lateral extraíble de 2 niveles con base en madera",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Canasta lateral extraíble de 2 niveles con base en madera, sistema de organización interior para módulos bajos o columnas angostas de cocina.",
    "technical_specs": {
      "material": "Nogal Seleccionado con Fondo Anti-humedad + Acero",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "145 x 480 x 540 mm",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Nogal Seleccionado"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 390000,
    "stock": 25,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-62",
    "code": "KDJ-62",
    "name": "Canasta lateral extraíble de 2 niveles en acero al carbono",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Canasta lateral extraíble de 2 niveles en acero al carbono, sistema de organización interior para módulos bajos o columnas angostas de cocina.",
    "technical_specs": {
      "material": "Acero Estructural de Alta Resistencia",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "145 x 480 x 540 mm",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero Estructural"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 390000,
    "stock": 32,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-63",
    "code": "KDJ-63",
    "name": "Canasta lateral extraíble de vidrio de 3 niveles",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Canasta lateral extraíble de vidrio de 3 niveles, sistema de organización interior para módulos bajos o columnas angostas de cocina.",
    "technical_specs": {
      "material": "Vidrio Templado Oscuro Fumé + Marco en Aluminio Negro",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "150 x 480 x 540 mm",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Vidrio Templado"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 480000,
    "stock": 39,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-64",
    "code": "KDJ-64",
    "name": "Canasta multifuncional para condimentos en vidrio",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Canasta multifuncional para condimentos en vidrio, sistema de organización interior para módulos bajos o columnas angostas de cocina.",
    "technical_specs": {
      "material": "Vidrio Templado Oscuro Fumé + Marco en Aluminio Negro",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Vidrio Templado"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 480000,
    "stock": 46,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-65",
    "code": "KDJ-65",
    "name": "Canasta angosta extraíble de 2 niveles – modelo A",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Canasta angosta extraíble de 2 niveles – modelo A, sistema de organización interior para módulos bajos o columnas angostas de cocina.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "145 x 480 x 540 mm",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 390000,
    "stock": 18,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-66",
    "code": "KDJ-66",
    "name": "Canasta angosta extraíble de 2 niveles – modelo B",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Canasta angosta extraíble de 2 niveles – modelo B, sistema de organización interior para módulos bajos o columnas angostas de cocina.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "145 x 480 x 540 mm",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 390000,
    "stock": 25,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-67",
    "code": "KDJ-67",
    "name": "Canasta angosta extraíble de 3 niveles – modelo C",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Canasta angosta extraíble de 3 niveles – modelo C, sistema de organización interior para módulos bajos o columnas angostas de cocina.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "150 x 480 x 540 mm",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 390000,
    "stock": 32,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-68",
    "code": "KDJ-68",
    "name": "Canasta para condimentos de 3 niveles en varilla redonda",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Canasta para condimentos de 3 niveles en varilla redonda, sistema de organización interior para módulos bajos o columnas angostas de cocina.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "150 x 480 x 540 mm",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 45000,
    "stock": 39,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-69",
    "code": "KDJ-69",
    "name": "Despensa extraíble de 6 niveles en varilla redonda",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Despensa extraíble de 6 niveles en varilla redonda, sistema de organización interior para módulos altos tipo despensa.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "385 x 500 x 1950-2200 mm (Columna Despensa)",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "70 kg distribuidos",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "70 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 1390000,
    "stock": 46,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-70",
    "code": "KDJ-70",
    "name": "Despensa extraíble de 6 niveles en acero al carbono y MDF",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Despensa extraíble de 6 niveles en acero al carbono y MDF, sistema de organización interior para módulos altos tipo despensa.",
    "technical_specs": {
      "material": "Acero Estructural de Alta Resistencia",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "385 x 500 x 1950-2200 mm (Columna Despensa)",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "70 kg distribuidos",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero Estructural"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "70 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 1390000,
    "stock": 18,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-71",
    "code": "KDJ-71",
    "name": "Despensa extraíble de 6 niveles en vidrio",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Despensa extraíble de 6 niveles en vidrio, sistema de organización interior para módulos altos tipo despensa.",
    "technical_specs": {
      "material": "Vidrio Templado Oscuro Fumé + Marco en Aluminio Negro",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "385 x 500 x 1950-2200 mm (Columna Despensa)",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "70 kg distribuidos",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Vidrio Templado"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "70 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 1750000,
    "stock": 4,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-72",
    "code": "KDJ-72",
    "name": "Columna extraíble angosta de 6 niveles en vidrio",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Columna extraíble angosta de 6 niveles en vidrio, sistema de organización interior para módulos altos tipo despensa.",
    "technical_specs": {
      "material": "Vidrio Templado Oscuro Fumé + Marco en Aluminio Negro",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "385 x 500 x 1950-2200 mm (Columna Despensa)",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "70 kg distribuidos",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Vidrio Templado"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "70 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 1750000,
    "stock": 32,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-73",
    "code": "KDJ-73",
    "name": "Columna extraíble angosta de 6 niveles en varilla redonda",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Columna extraíble angosta de 6 niveles en varilla redonda, sistema de organización interior para módulos altos tipo despensa.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "385 x 500 x 1950-2200 mm (Columna Despensa)",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "70 kg distribuidos",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "70 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 1390000,
    "stock": 39,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-74",
    "code": "KDJ-74",
    "name": "Columna extraíble de 6 niveles en acero al carbono y MDF",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Columna extraíble de 6 niveles en acero al carbono y MDF, sistema de organización interior para módulos altos tipo despensa.",
    "technical_specs": {
      "material": "Acero Estructural de Alta Resistencia",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "385 x 500 x 1950-2200 mm (Columna Despensa)",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "70 kg distribuidos",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero Estructural"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "70 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 1390000,
    "stock": 46,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-75",
    "code": "KDJ-75",
    "name": "Esquinero mágico universal en vidrio",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Esquinero mágico universal en vidrio, sistema de organización interior para esquinas de cocina.",
    "technical_specs": {
      "material": "Vidrio Templado Oscuro Fumé + Marco en Aluminio Negro",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "25 kg por nivel (50 kg total)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Vidrio Templado"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "25 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 1290000,
    "stock": 18,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-76",
    "code": "KDJ-76",
    "name": "Esquinero mágico universal en varilla redonda",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Esquinero mágico universal en varilla redonda, sistema de organización interior para esquinas de cocina.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "25 kg por nivel (50 kg total)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "25 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 1290000,
    "stock": 25,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-77",
    "code": "KDJ-77",
    "name": "Esquinero mágico universal en acero al carbono y MDF",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Esquinero mágico universal en acero al carbono y MDF, sistema de organización interior para esquinas de cocina.",
    "technical_specs": {
      "material": "Acero Estructural de Alta Resistencia",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "25 kg por nivel (50 kg total)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero Estructural"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "25 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 1290000,
    "stock": 32,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-78",
    "code": "KDJ-78",
    "name": "Esquinero mágico reversible en acero al carbono y MDF",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Esquinero mágico reversible en acero al carbono y MDF, sistema de organización interior para esquinas de cocina.",
    "technical_specs": {
      "material": "Acero Estructural de Alta Resistencia",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "25 kg por nivel (50 kg total)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero Estructural"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "25 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 1290000,
    "stock": 39,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-79",
    "code": "KDJ-79",
    "name": "Basurero extraíble doble de 20 + 20 L con tapa",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Basurero extraíble doble de 20 + 20 L con tapa para integrar la clasificación y disposición de residuos dentro del mueble de cocina.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "35 kg",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "35 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 380000,
    "stock": 46,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-80",
    "code": "KDJ-80",
    "name": "Basurero extraíble doble de 10 + 20 L",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Basurero extraíble doble de 10 + 20 L para integrar la clasificación y disposición de residuos dentro del mueble de cocina.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "35 kg",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "35 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 380000,
    "stock": 18,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-81",
    "code": "KDJ-81",
    "name": "Basurero extraíble doble de 20 + 20 L",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Basurero extraíble doble de 20 + 20 L para integrar la clasificación y disposición de residuos dentro del mueble de cocina.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "35 kg",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "35 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 380000,
    "stock": 25,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-82",
    "code": "KDJ-82",
    "name": "Basurero integrado de 14 L con acabado SS304",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Basurero integrado de 14 L con acabado SS304 para integrar la clasificación y disposición de residuos dentro del mueble de cocina.",
    "technical_specs": {
      "material": "Acero Inoxidable Quirúrgico AISI 304",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "35 kg",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero Inoxidable"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "35 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 380000,
    "stock": 32,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-83",
    "code": "KDJ-83",
    "name": "Basurero extraíble doble de 35 + 35 L",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Basurero extraíble doble de 35 + 35 L para integrar la clasificación y disposición de residuos dentro del mueble de cocina.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "35 kg",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "35 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 380000,
    "stock": 39,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-84",
    "code": "KDJ-84",
    "name": "Canasta elevable de vidrio para módulo de 600 mm",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Canasta elevable de vidrio para módulo de 600 mm, diseñada para acercar el contenido de los gabinetes altos a una altura cómoda de uso.",
    "technical_specs": {
      "material": "Vidrio Templado Oscuro Fumé + Marco en Aluminio Negro",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "564 x 480 x 550 mm (Gabinete 600 mm)",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "15 kg",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Vidrio Templado"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "15 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 890000,
    "stock": 46,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-85",
    "code": "KDJ-85",
    "name": "Canasta elevable de vidrio para módulo de 700 mm",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Canasta elevable de vidrio para módulo de 700 mm, diseñada para acercar el contenido de los gabinetes altos a una altura cómoda de uso.",
    "technical_specs": {
      "material": "Vidrio Templado Oscuro Fumé + Marco en Aluminio Negro",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "664 x 480 x 550 mm (Gabinete 700 mm)",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "15 kg",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Vidrio Templado"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "15 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 890000,
    "stock": 18,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-86",
    "code": "KDJ-86",
    "name": "Canasta elevable de vidrio para módulo de 800 mm",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Canasta elevable de vidrio para módulo de 800 mm, diseñada para acercar el contenido de los gabinetes altos a una altura cómoda de uso.",
    "technical_specs": {
      "material": "Vidrio Templado Oscuro Fumé + Marco en Aluminio Negro",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "764 x 480 x 550 mm (Gabinete 800 mm)",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "15 kg",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Vidrio Templado"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "15 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 890000,
    "stock": 25,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-87",
    "code": "KDJ-87",
    "name": "Canasta elevable para platos y vajilla de 600 mm",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Canasta elevable para platos y vajilla de 600 mm, diseñada para acercar el contenido de los gabinetes altos a una altura cómoda de uso.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "564 x 480 x 550 mm (Gabinete 600 mm)",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "15 kg",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "15 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 890000,
    "stock": 32,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-88",
    "code": "KDJ-88",
    "name": "Canasta elevable para platos y vajilla de 700 mm",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Canasta elevable para platos y vajilla de 700 mm, diseñada para acercar el contenido de los gabinetes altos a una altura cómoda de uso.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "664 x 480 x 550 mm (Gabinete 700 mm)",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "15 kg",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "15 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 890000,
    "stock": 39,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-89",
    "code": "KDJ-89",
    "name": "Canasta elevable para platos y vajilla de 800 mm",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Canasta elevable para platos y vajilla de 800 mm, diseñada para acercar el contenido de los gabinetes altos a una altura cómoda de uso.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "764 x 480 x 550 mm (Gabinete 800 mm)",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "15 kg",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "15 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 890000,
    "stock": 46,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-90",
    "code": "KDJ-90",
    "name": "Canasta elevable eléctrica en acero SS304",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Canasta elevable eléctrica en acero SS304 con accionamiento táctil para subir y bajar la canasta de forma controlada.",
    "technical_specs": {
      "material": "Acero Inoxidable Quirúrgico AISI 304",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Motor paso a paso silencioso <35dB con sensor táctil capacitivo y detección de obstáculos",
      "capacidad_carga": "15 kg",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero Inoxidable"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "15 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 2850000,
    "stock": 4,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-91",
    "code": "KDJ-91",
    "name": "Canasta elevable eléctrica en vidrio templado",
    "category_id": "cat-9",
    "category_name": "Organizadores cocina",
    "main_collection": "cocina",
    "short_description": "Canasta elevable eléctrica en vidrio templado con accionamiento táctil para subir y bajar la canasta de forma controlada.",
    "technical_specs": {
      "material": "Vidrio Templado Oscuro Fumé + Marco en Aluminio Negro",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Motor paso a paso silencioso <35dB con sensor táctil capacitivo y detección de obstáculos",
      "capacidad_carga": "15 kg",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Vidrio Templado"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "15 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 2850000,
    "stock": 25,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_cocina.jpg",
    "gallery_urls": [
      "/images/products/organizador_cocina.jpg",
      "/images/products/organizador_closet.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-92",
    "code": "KDJ-92",
    "name": "Joyero extraíble con amortiguación en aluminio y cuero – variante 1",
    "category_id": "cat-10",
    "category_name": "Organizadores closets",
    "main_collection": "closet",
    "short_description": "Joyero extraíble con amortiguación en aluminio y cuero – variante 1, pensado para organizar joyas, relojes y accesorios en el interior del clóset.",
    "technical_specs": {
      "material": "Aluminio Anodizado Extruido de Alta Densidad",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Pistón hidráulico de cierre suave amortiguado (Soft-Close Silence Pro)",
      "capacidad_carga": "30 kg (corredera sincronizada)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aluminio Anodizado"
      },
      {
        "label": "CIERRE",
        "value": "Soft-Close Pro"
      },
      {
        "label": "CARGA",
        "value": "30 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 420000,
    "stock": 32,
    "min_stock_alert": 8,
    "image_url": "/images/products/joyero_closet.jpg",
    "gallery_urls": [
      "/images/products/joyero_closet.jpg",
      "/images/products/hero_watch_winder.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-93",
    "code": "KDJ-93",
    "name": "Joyero extraíble con amortiguación en aluminio y cuero – variante 2",
    "category_id": "cat-10",
    "category_name": "Organizadores closets",
    "main_collection": "closet",
    "short_description": "Joyero extraíble con amortiguación en aluminio y cuero – variante 2, pensado para organizar joyas, relojes y accesorios en el interior del clóset.",
    "technical_specs": {
      "material": "Aluminio Anodizado Extruido de Alta Densidad",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Pistón hidráulico de cierre suave amortiguado (Soft-Close Silence Pro)",
      "capacidad_carga": "30 kg (corredera sincronizada)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aluminio Anodizado"
      },
      {
        "label": "CIERRE",
        "value": "Soft-Close Pro"
      },
      {
        "label": "CARGA",
        "value": "30 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 420000,
    "stock": 39,
    "min_stock_alert": 8,
    "image_url": "/images/products/joyero_closet.jpg",
    "gallery_urls": [
      "/images/products/joyero_closet.jpg",
      "/images/products/hero_watch_winder.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-94",
    "code": "KDJ-94",
    "name": "Pantalonero extraíble frontal con amortiguación",
    "category_id": "cat-10",
    "category_name": "Organizadores closets",
    "main_collection": "closet",
    "short_description": "Pantalonero extraíble frontal con amortiguación para organizar pantalones y prendas dobladas dentro del clóset.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Pistón hidráulico de cierre suave amortiguado (Soft-Close Silence Pro)",
      "capacidad_carga": "30 kg (corredera sincronizada)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Soft-Close Pro"
      },
      {
        "label": "CARGA",
        "value": "30 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 345000,
    "stock": 46,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_closet.jpg",
    "gallery_urls": [
      "/images/products/organizador_closet.jpg",
      "/images/products/joyero_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-95",
    "code": "KDJ-95",
    "name": "Pantalonero lateral derecho con amortiguación",
    "category_id": "cat-10",
    "category_name": "Organizadores closets",
    "main_collection": "closet",
    "short_description": "Pantalonero lateral derecho con amortiguación para organizar pantalones y prendas dobladas dentro del clóset.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Pistón hidráulico de cierre suave amortiguado (Soft-Close Silence Pro)",
      "capacidad_carga": "30 kg (corredera sincronizada)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Soft-Close Pro"
      },
      {
        "label": "CARGA",
        "value": "30 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 345000,
    "stock": 18,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_closet.jpg",
    "gallery_urls": [
      "/images/products/organizador_closet.jpg",
      "/images/products/joyero_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-96",
    "code": "KDJ-96",
    "name": "Pantalonero lateral izquierdo con amortiguación",
    "category_id": "cat-10",
    "category_name": "Organizadores closets",
    "main_collection": "closet",
    "short_description": "Pantalonero lateral izquierdo con amortiguación para organizar pantalones y prendas dobladas dentro del clóset.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Pistón hidráulico de cierre suave amortiguado (Soft-Close Silence Pro)",
      "capacidad_carga": "30 kg (corredera sincronizada)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Soft-Close Pro"
      },
      {
        "label": "CARGA",
        "value": "30 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 345000,
    "stock": 25,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_closet.jpg",
    "gallery_urls": [
      "/images/products/organizador_closet.jpg",
      "/images/products/joyero_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-97",
    "code": "KDJ-97",
    "name": "Pantalonero superior con amortiguación",
    "category_id": "cat-10",
    "category_name": "Organizadores closets",
    "main_collection": "closet",
    "short_description": "Pantalonero superior con amortiguación para organizar pantalones y prendas dobladas dentro del clóset.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Pistón hidráulico de cierre suave amortiguado (Soft-Close Silence Pro)",
      "capacidad_carga": "30 kg (corredera sincronizada)",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Soft-Close Pro"
      },
      {
        "label": "CARGA",
        "value": "30 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 345000,
    "stock": 32,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_closet.jpg",
    "gallery_urls": [
      "/images/products/organizador_closet.jpg",
      "/images/products/joyero_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-98",
    "code": "KDJ-98",
    "name": "Elevador de ropa con doble cierre suave",
    "category_id": "cat-10",
    "category_name": "Organizadores closets",
    "main_collection": "closet",
    "short_description": "Elevador de ropa con doble cierre suave, solución abatible para aprovechar la zona alta del clóset y acercar las prendas a una altura cómoda.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Pistón hidráulico de cierre suave amortiguado (Soft-Close Silence Pro)",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Soft-Close Pro"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 520000,
    "stock": 39,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_closet.jpg",
    "gallery_urls": [
      "/images/products/organizador_closet.jpg",
      "/images/products/joyero_closet.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-99",
    "code": "KDJ-99",
    "name": "Canasta extraíble en ratán con amortiguación",
    "category_id": "cat-10",
    "category_name": "Organizadores closets",
    "main_collection": "closet",
    "short_description": "Canasta extraíble en ratán con amortiguación para ropa, textiles o accesorios, fabricada en aluminio y ratán.",
    "technical_specs": {
      "material": "Aluminio Anodizado Extruido de Alta Densidad",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Pistón hidráulico de cierre suave amortiguado (Soft-Close Silence Pro)",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aluminio Anodizado"
      },
      {
        "label": "CIERRE",
        "value": "Soft-Close Pro"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Extracción Total 100%"
      }
    ],
    "price": 490000,
    "stock": 46,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_closet.jpg",
    "gallery_urls": [
      "/images/products/organizador_closet.jpg",
      "/images/products/joyero_closet.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-100",
    "code": "KDJ-100",
    "name": "Zapatero giratorio de 12 niveles",
    "category_id": "cat-10",
    "category_name": "Organizadores closets",
    "main_collection": "closet",
    "short_description": "Zapatero giratorio de 12 niveles, sistema vertical giratorio para organizar y visualizar múltiples pares dentro del clóset.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "700 x 360 x 1850-2150 mm (Ajustable)",
      "mecanismo": "Eje de rodamiento axial con rotación 360° fluida y tope progresivo",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 1950000,
    "stock": 18,
    "min_stock_alert": 8,
    "image_url": "/images/products/organizador_closet.jpg",
    "gallery_urls": [
      "/images/products/organizador_closet.jpg",
      "/images/products/joyero_closet.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-101",
    "code": "KDJ-101",
    "name": "Cajón de seguridad con clave revestido en cuero gris",
    "category_id": "cat-10",
    "category_name": "Organizadores closets",
    "main_collection": "closet",
    "short_description": "Cajón de seguridad con clave revestido en cuero gris para proteger documentos, joyas y objetos personales dentro del clóset.",
    "technical_specs": {
      "material": "Cuero Vegano Italiano + Estructura de Aluminio Texturizado",
      "acabado": "Cuero Gris Grafito con Costuras Invisibles",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Cerradura biométrica / teclado táctil motorizado con cerrojo de alta seguridad",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Cuero Vegano"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 1450000,
    "stock": 25,
    "min_stock_alert": 8,
    "image_url": "/images/products/joyero_closet.jpg",
    "gallery_urls": [
      "/images/products/joyero_closet.jpg",
      "/images/products/hero_watch_winder.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-102",
    "code": "KDJ-102",
    "name": "Cajón de seguridad con clave revestido en cuero blanco",
    "category_id": "cat-10",
    "category_name": "Organizadores closets",
    "main_collection": "closet",
    "short_description": "Cajón de seguridad con clave revestido en cuero blanco para proteger documentos, joyas y objetos personales dentro del clóset.",
    "technical_specs": {
      "material": "Cuero Vegano Italiano + Estructura de Aluminio Texturizado",
      "acabado": "Cuero Warm Ivory con Costuras Reforzadas",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Cerradura biométrica / teclado táctil motorizado con cerrojo de alta seguridad",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Cuero Vegano"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 1450000,
    "stock": 32,
    "min_stock_alert": 8,
    "image_url": "/images/products/joyero_closet.jpg",
    "gallery_urls": [
      "/images/products/joyero_closet.jpg",
      "/images/products/hero_watch_winder.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-103",
    "code": "KDJ-103",
    "name": "Cajón de seguridad con clave revestido en cuero naranja",
    "category_id": "cat-10",
    "category_name": "Organizadores closets",
    "main_collection": "closet",
    "short_description": "Cajón de seguridad con clave revestido en cuero naranja para proteger documentos, joyas y objetos personales dentro del clóset.",
    "technical_specs": {
      "material": "Cuero Vegano Italiano + Estructura de Aluminio Texturizado",
      "acabado": "Cuero Terracota Siena Noble",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Cerradura biométrica / teclado táctil motorizado con cerrojo de alta seguridad",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Cuero Vegano"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 1450000,
    "stock": 39,
    "min_stock_alert": 8,
    "image_url": "/images/products/joyero_closet.jpg",
    "gallery_urls": [
      "/images/products/joyero_closet.jpg",
      "/images/products/hero_watch_winder.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-104",
    "code": "KDJ-104",
    "name": "Cajón de seguridad doble con watch winder",
    "category_id": "cat-10",
    "category_name": "Organizadores closets",
    "main_collection": "closet",
    "short_description": "Cajón de seguridad doble con watch winder, compartimento de seguridad con clave e integración de sistema giratorio para mantener relojes automáticos en movimiento cuando no están en uso.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Rotor magnético bidireccional ultrasilencioso con ciclos programables TPD",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 2450000,
    "stock": 4,
    "min_stock_alert": 8,
    "image_url": "/images/products/joyero_closet.jpg",
    "gallery_urls": [
      "/images/products/joyero_closet.jpg",
      "/images/products/hero_watch_winder.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-105",
    "code": "KDJ-105",
    "name": "Cajón de seguridad individual con watch winder",
    "category_id": "cat-10",
    "category_name": "Organizadores closets",
    "main_collection": "closet",
    "short_description": "Cajón de seguridad individual con watch winder, compartimento de seguridad con clave e integración de sistema giratorio para mantener relojes automáticos en movimiento cuando no están en uso.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Rotor magnético bidireccional ultrasilencioso con ciclos programables TPD",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 1850000,
    "stock": 18,
    "min_stock_alert": 8,
    "image_url": "/images/products/joyero_closet.jpg",
    "gallery_urls": [
      "/images/products/joyero_closet.jpg",
      "/images/products/hero_watch_winder.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-106",
    "code": "KDJ-106",
    "name": "Cajón de seguridad con exterior en cuero e interior afelpado",
    "category_id": "cat-10",
    "category_name": "Organizadores closets",
    "main_collection": "closet",
    "short_description": "Cajón de seguridad con exterior en cuero e interior afelpado para resguardar joyas, relojes, documentos y objetos personales.",
    "technical_specs": {
      "material": "Cuero Vegano Italiano + Estructura de Aluminio Texturizado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Carga técnica garantizada según norma ANSI/BHMA",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Cuero Vegano"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Carga técnica"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 1450000,
    "stock": 25,
    "min_stock_alert": 8,
    "image_url": "/images/products/joyero_closet.jpg",
    "gallery_urls": [
      "/images/products/joyero_closet.jpg",
      "/images/products/hero_watch_winder.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-107",
    "code": "KDJ-107",
    "name": "Rueda giratoria de 1,5 pulgadas",
    "category_id": "cat-11",
    "category_name": "Ruedas giratorias",
    "main_collection": "herrajes_especiales",
    "short_description": "Rueda giratoria de 1,5 pulgadas para muebles móviles, carros auxiliares y estructuras livianas.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Rueda Ø 38 mm (1.5\") / Placa 46 x 38 mm",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "45 kg por rueda",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "45 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 32000,
    "stock": 32,
    "min_stock_alert": 8,
    "image_url": "/images/products/rueda_giratoria.jpg",
    "gallery_urls": [
      "/images/products/rueda_giratoria.jpg",
      "/images/products/deslizador.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-108",
    "code": "KDJ-108",
    "name": "Rueda giratoria de 2 pulgadas",
    "category_id": "cat-11",
    "category_name": "Ruedas giratorias",
    "main_collection": "herrajes_especiales",
    "short_description": "Rueda giratoria de 2 pulgadas para muebles móviles, carros auxiliares y estructuras livianas.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Rueda Ø 50 mm (2\") / Placa 58 x 46 mm",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "45 kg por rueda",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "45 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 32000,
    "stock": 39,
    "min_stock_alert": 8,
    "image_url": "/images/products/rueda_giratoria.jpg",
    "gallery_urls": [
      "/images/products/rueda_giratoria.jpg",
      "/images/products/deslizador.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-109",
    "code": "KDJ-109",
    "name": "Rueda giratoria con freno de 1,5 pulgadas",
    "category_id": "cat-11",
    "category_name": "Ruedas giratorias",
    "main_collection": "herrajes_especiales",
    "short_description": "Rueda giratoria con freno de 1,5 pulgadas para muebles móviles, carros auxiliares y estructuras livianas.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Rueda Ø 38 mm (1.5\") / Placa 46 x 38 mm",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "45 kg por rueda",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "45 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 32000,
    "stock": 46,
    "min_stock_alert": 8,
    "image_url": "/images/products/rueda_giratoria.jpg",
    "gallery_urls": [
      "/images/products/rueda_giratoria.jpg",
      "/images/products/deslizador.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-110",
    "code": "KDJ-110",
    "name": "Rueda giratoria con freno de 2 pulgadas",
    "category_id": "cat-11",
    "category_name": "Ruedas giratorias",
    "main_collection": "herrajes_especiales",
    "short_description": "Rueda giratoria con freno de 2 pulgadas para muebles móviles, carros auxiliares y estructuras livianas.",
    "technical_specs": {
      "material": "Aleación de Zinc Zamak 5 + Acero Templado",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Rueda Ø 50 mm (2\") / Placa 58 x 46 mm",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "45 kg por rueda",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aleación de"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "45 kg"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 32000,
    "stock": 18,
    "min_stock_alert": 8,
    "image_url": "/images/products/rueda_giratoria.jpg",
    "gallery_urls": [
      "/images/products/rueda_giratoria.jpg",
      "/images/products/deslizador.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-111",
    "code": "KDJ-111",
    "name": "Cerradura de manija en aluminio con cilindro y 5 llaves",
    "category_id": "cat-6",
    "category_name": "Cerraduras para muebles y puertas",
    "main_collection": "herrajes_especiales",
    "short_description": "Cerradura de manija para puerta, fabricada en aluminio y equipada con cilindro de latón.",
    "technical_specs": {
      "material": "Aluminio Anodizado Extruido de Alta Densidad",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Resistencia a tracción >500 N",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aluminio Anodizado"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Resistencia a"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 245000,
    "stock": 25,
    "min_stock_alert": 8,
    "image_url": "/images/products/cerradura.jpg",
    "gallery_urls": [
      "/images/products/cerradura.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  },
  {
    "id": "prod-kdj-112",
    "code": "KDJ-112",
    "name": "Cerradura de manija para baño sin llave",
    "category_id": "cat-6",
    "category_name": "Cerraduras para muebles y puertas",
    "main_collection": "herrajes_especiales",
    "short_description": "Cerradura de manija para baño, fabricada en aluminio y configurada para privacidad interior sin uso de llaves.",
    "technical_specs": {
      "material": "Aluminio Anodizado Extruido de Alta Densidad",
      "acabado": "Acabado Arquitectónico Premium con Sellado Nano",
      "dimensiones": "Estandarizada según plano técnico",
      "mecanismo": "Fijación de precisión y acople de tolerancia milimétrica",
      "capacidad_carga": "Resistencia a tracción >500 N",
      "compatibilidad": "Apta para tableros de 15 a 22 mm y herrajes estándar del mercado.",
      "unidades_empaque": "Unidad individual / Set con plantilla y tornillería técnica."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aluminio Anodizado"
      },
      {
        "label": "CIERRE",
        "value": "Mecánico Preciso"
      },
      {
        "label": "CARGA",
        "value": "Resistencia a"
      },
      {
        "label": "DURABILIDAD",
        "value": "50.000 Ciclos Certificados"
      },
      {
        "label": "ACCESO",
        "value": "Diseño Ergonómico"
      }
    ],
    "price": 245000,
    "stock": 32,
    "min_stock_alert": 8,
    "image_url": "/images/products/cerradura.jpg",
    "gallery_urls": [
      "/images/products/cerradura.jpg",
      "/images/products/manija.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-08-15T00:00:00.000Z"
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ORD-2026-001",
    customer_name: "Arq. Valentina Restrepo",
    customer_email: "valentina@estudioarquitectura.co",
    customer_phone: "+57 310 456 7890",
    shipping_address: "Carrera 43A # 1-50, Torre Sur Of. 902, El Poblado",
    city: "Medellín",
    department: "Antioquia",
    notes: "Entregar en portería con sello de arquitectura.",
    subtotal_amount: 3270000,
    shipping_cost: 0,
    total_amount: 3270000,
    status: "aprobado",
    payment_method: "transferencia",
    payment_status: "acreditado",
    tracking_number: "ENV-COL-98241",
    items: [
      {
        product_id: "prod-kdj-90",
        code: "KDJ-90",
        name: "Canasta elevable eléctrica en acero SS304",
        price: 2850000,
        quantity: 1,
        image_url: "/images/products/organizador_cocina.jpg",
        subtotal: 2850000
      },
      {
        product_id: "prod-kdj-92",
        code: "KDJ-92",
        name: "Joyero extraíble con amortiguación en aluminio y cuero",
        price: 420000,
        quantity: 1,
        image_url: "/images/products/joyero_closet.jpg",
        subtotal: 420000
      }
    ],
    created_at: "2026-09-08T14:32:00.000Z"
  },
  {
    id: "ORD-2026-002",
    customer_name: "Dis. Mateo Morales (Mobel Design)",
    customer_email: "mateo@mobel.design",
    customer_phone: "+57 301 234 5678",
    shipping_address: "Calle 85 # 11-53, Chapinero Alto",
    city: "Bogotá D.C.",
    department: "Cundinamarca",
    notes: "Urgente para instalación de showroom este viernes.",
    subtotal_amount: 2450000,
    shipping_cost: 0,
    total_amount: 2450000,
    status: "enviado",
    payment_method: "tarjeta",
    payment_status: "acreditado",
    tracking_number: "COORD-BOG-4410",
    items: [
      {
        product_id: "prod-kdj-104",
        code: "KDJ-104",
        name: "Cajón de seguridad doble con watch winder",
        price: 2450000,
        quantity: 1,
        image_url: "/images/products/joyero_closet.jpg",
        subtotal: 2450000
      }
    ],
    created_at: "2026-09-09T09:15:00.000Z"
  },
  {
    id: "ORD-2026-003",
    customer_name: "Ebanistería Moderna & Cía",
    customer_email: "compras@ebanisteriamoderna.com",
    customer_phone: "+57 315 789 0123",
    shipping_address: "Zona Industrial Los Álamos, Bodega 14",
    city: "Cali",
    department: "Valle del Cauca",
    notes: "Pedido por volumen de bisagras y correderas.",
    subtotal_amount: 380000,
    shipping_cost: 25000,
    total_amount: 405000,
    status: "pendiente",
    payment_method: "transferencia",
    payment_status: "pendiente_verificacion",
    items: [
      {
        product_id: "prod-kdj-24",
        code: "KDJ-24",
        name: "Bisagra de parche completo con cierre suave antracita",
        price: 38000,
        quantity: 10,
        image_url: "/images/products/bisagra.jpg",
        subtotal: 380000
      }
    ],
    created_at: "2026-09-11T16:45:00.000Z"
  }
];

export const INITIAL_ABANDONED_CARTS: AbandonedCart[] = [
  {
    id: "AB-CART-001",
    customer_name: "Arq. Camilo Restrepo",
    customer_email: "crestrepo@restrepoarquitectos.com",
    customer_phone: "+57 310 456 7890",
    city: "Bogotá D.C.",
    items: [
      {
        product_id: "prod-kdj-104",
        code: "KDJ-104",
        name: "Cajón de seguridad doble con watch winder",
        price: 2450000,
        quantity: 1,
        image_url: "/images/products/joyero_closet.jpg",
        subtotal: 2450000
      }
    ],
    total_amount: 2450000,
    created_at: "2026-09-13T14:30:00.000Z",
    last_activity: "Paso de checkout - Selección de método de pago",
    status: "abandonado",
    recovery_notes: "Cliente interesado en acabado nogal para penthouse en Rosales."
  },
  {
    id: "AB-CART-002",
    customer_name: "Diseñadora Laura Zuluaga",
    customer_email: "laura.zuluaga@estudiomadera.co",
    customer_phone: "+57 301 987 6543",
    city: "Medellín",
    items: [
      {
        product_id: "prod-kdj-90",
        code: "KDJ-90",
        name: "Organizador de cocina dos niveles acero inoxidable",
        price: 890000,
        quantity: 1,
        image_url: "/images/products/organizador_cocina.jpg",
        subtotal: 890000
      },
      {
        product_id: "prod-kdj-92",
        code: "KDJ-92",
        name: "Bandeja joyero para clóset en terciopelo y cuero",
        price: 840000,
        quantity: 1,
        image_url: "/images/products/joyero_closet.jpg",
        subtotal: 840000
      }
    ],
    total_amount: 1730000,
    created_at: "2026-09-13T11:15:00.000Z",
    last_activity: "Revisión de bolsa de compra",
    status: "contactado",
    recovery_notes: "Se envió cotización formal con descuento B2B del 10%."
  },
  {
    id: "AB-CART-003",
    customer_name: "Mobel Studio S.A.S.",
    customer_email: "proyectos@mobelstudio.com",
    customer_phone: "+57 320 112 3344",
    city: "Barranquilla",
    items: [
      {
        product_id: "prod-kdj-93",
        code: "KDJ-93",
        name: "Canasta elevable eléctrica para mueble alto de cocina",
        price: 1450000,
        quantity: 1,
        image_url: "/images/products/organizador_cocina.jpg",
        subtotal: 1450000
      }
    ],
    total_amount: 1450000,
    created_at: "2026-09-12T19:40:00.000Z",
    last_activity: "Ingreso de dirección de despacho",
    status: "abandonado"
  },
  {
    id: "AB-CART-004",
    customer_name: "Ebanistería Los Cedros",
    customer_email: "taller@loscedros.com.co",
    customer_phone: "+57 318 654 3210",
    city: "Pereira",
    items: [
      {
        product_id: "prod-kdj-22",
        code: "KDJ-22",
        name: "Bisagra oculta 3D para puertas de paso y gabinetes",
        price: 48000,
        quantity: 10,
        image_url: "/images/products/bisagra.jpg",
        subtotal: 480000
      }
    ],
    total_amount: 505000,
    created_at: "2026-09-12T08:20:00.000Z",
    last_activity: "Checkout completado vía asesor WhatsApp",
    status: "recuperado",
    recovery_notes: "Orden convertida a ORD-2026-002."
  }
];

export const INITIAL_PRODUCT_ANALYTICS: ProductClickAnalytics[] = [
  {
    product_id: "prod-kdj-104",
    code: "KDJ-104",
    name: "Cajón de seguridad con watch winder",
    category_name: "Clóset & Vestidores",
    main_collection: "closet",
    price: 2450000,
    clicks: 1420,
    add_to_cart_count: 184,
    orders_count: 42,
    image_url: "/images/products/hero_watch_winder.jpg"
  },
  {
    product_id: "prod-kdj-90",
    code: "KDJ-90",
    name: "Organizador de cocina extraíble 2 niveles",
    category_name: "Cocina Contemporánea",
    main_collection: "cocina",
    price: 890000,
    clicks: 1180,
    add_to_cart_count: 212,
    orders_count: 58,
    image_url: "/images/products/organizador_cocina.jpg"
  },
  {
    product_id: "prod-kdj-92",
    code: "KDJ-92",
    name: "Bandeja joyero en terciopelo y cuero",
    category_name: "Clóset & Vestidores",
    main_collection: "closet",
    price: 840000,
    clicks: 940,
    add_to_cart_count: 145,
    orders_count: 39,
    image_url: "/images/products/joyero_closet.jpg"
  },
  {
    product_id: "prod-kdj-22",
    code: "KDJ-22",
    name: "Bisagra invisible 3D regulable",
    category_name: "Herrajes Especiales",
    main_collection: "herrajes_especiales",
    price: 48000,
    clicks: 890,
    add_to_cart_count: 260,
    orders_count: 94,
    image_url: "/images/products/bisagra.jpg"
  },
  {
    product_id: "prod-kdj-93",
    code: "KDJ-93",
    name: "Canasta elevable eléctrica para cocina",
    category_name: "Cocina Contemporánea",
    main_collection: "cocina",
    price: 1450000,
    clicks: 760,
    add_to_cart_count: 98,
    orders_count: 24,
    image_url: "/images/products/organizador_cocina.jpg"
  },
  {
    product_id: "prod-kdj-14",
    code: "KDJ-14",
    name: "Corredera oculta sincronizada cierre suave",
    category_name: "Herrajes Especiales",
    main_collection: "herrajes_especiales",
    price: 52000,
    clicks: 710,
    add_to_cart_count: 230,
    orders_count: 88,
    image_url: "/images/products/corredera.jpg"
  },
  {
    product_id: "prod-kdj-70",
    code: "KDJ-70",
    name: "Tirador arquitectónico grafito mate",
    category_name: "Herrajes Especiales",
    main_collection: "herrajes_especiales",
    price: 42000,
    clicks: 640,
    add_to_cart_count: 180,
    orders_count: 72,
    image_url: "/images/products/manija.jpg"
  },
  {
    product_id: "prod-kdj-35",
    code: "KDJ-35",
    name: "Pistón a gas hidráulico amortiguado",
    category_name: "Herrajes Especiales",
    main_collection: "herrajes_especiales",
    price: 34000,
    clicks: 590,
    add_to_cart_count: 155,
    orders_count: 64,
    image_url: "/images/products/bisagra.jpg"
  }
];

export const INITIAL_SYSTEM_USERS: SystemUser[] = [
  {
    id: "usr-admin-01",
    user_id: "usr-admin-01",
    full_name: "Carlos Mendoza",
    email: "admin@montezzi.com",
    role: "admin",
    company: "Montezzi Luxury Hardware S.A.S.",
    phone: "+57 300 123 4567",
    city: "Medellín",
    total_orders: 14,
    total_spent: 12450000,
    status: "activo",
    created_at: "2026-01-01T00:00:00.000Z"
  },
  {
    id: "usr-colab-02",
    user_id: "usr-colab-02",
    full_name: "Santiago Arango",
    email: "operaciones@montezzi.com",
    role: "colaborador",
    company: "Montezzi Showroom Medellín",
    phone: "+57 311 234 5678",
    city: "Medellín",
    total_orders: 8,
    total_spent: 4890000,
    status: "activo",
    created_at: "2026-02-15T00:00:00.000Z"
  },
  {
    id: "usr-client-03",
    user_id: "usr-client-03",
    full_name: "Arq. Mariana Londoño",
    email: "mariana@arquitecturacontemporanea.com",
    role: "cliente",
    company: "Estudio Londoño Arquitectos",
    phone: "+57 315 987 6543",
    city: "Medellín",
    total_orders: 6,
    total_spent: 5920000,
    status: "activo",
    created_at: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "usr-client-04",
    user_id: "usr-client-04",
    full_name: "Ing. David Osorio",
    email: "david@mobeldesign.co",
    role: "cliente",
    company: "Mobel Design & Woodwork",
    phone: "+57 320 876 5432",
    city: "Bogotá D.C.",
    total_orders: 4,
    total_spent: 3410000,
    status: "activo",
    created_at: "2026-04-12T00:00:00.000Z"
  },
  {
    id: "usr-client-05",
    user_id: "usr-client-05",
    full_name: "Arq. Valentina Vélez",
    email: "valentina@vertice.com.co",
    role: "cliente",
    company: "Taller Vértice Arquitectura",
    phone: "+57 317 654 9871",
    city: "Cali",
    total_orders: 3,
    total_spent: 2180000,
    status: "activo",
    created_at: "2026-05-20T00:00:00.000Z"
  },
  {
    id: "usr-colab-06",
    user_id: "usr-colab-06",
    full_name: "Andrés Felipe Echeverri",
    email: "asesor1@montezzi.com",
    role: "colaborador",
    company: "Montezzi Ventas B2B",
    phone: "+57 304 333 4455",
    city: "Medellín",
    total_orders: 12,
    total_spent: 8900000,
    status: "activo",
    created_at: "2026-06-01T00:00:00.000Z"
  }
];


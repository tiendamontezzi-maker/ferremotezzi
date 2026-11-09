import { Category, Product, Order, AbandonedCart, ProductClickAnalytics, SystemUser, Coupon, ProductReview, Appointment, ActivityLog } from '../types/database';

export const OFFICIAL_CATEGORIES: Category[] = [
  {
    "id": "cat-cocina-condimenteros",
    "name": "Condimenteros & Portaplatos",
    "slug": "condimenteros",
    "main_collection": "cocina",
    "description": "Sistemas extraíbles de 2 y 3 niveles para condimenteros, especias y portaplatos en acero inoxidable SS201, vidrio y madera noble."
  },
  {
    "id": "cat-cocina-alacenas",
    "name": "Alacenas & Columnas",
    "slug": "alacenas",
    "main_collection": "cocina",
    "description": "Columnas despenseras de gran capacidad de 6 niveles con extracción suave en alambre, vidrio templado y acero al carbono con madera."
  },
  {
    "id": "cat-cocina-esquinas",
    "name": "Esquinas Mágicas",
    "slug": "esquinas-magicas",
    "main_collection": "cocina",
    "description": "Mecanismos articulados y giratorios universales para optimizar y acceder al 100% de los espacios ciegos en esquinas de cocina."
  },
  {
    "id": "cat-cocina-basureros",
    "name": "Basureros Ecológicos",
    "slug": "basureros",
    "main_collection": "cocina",
    "description": "Estaciones de reciclaje y cubos bajo mesón dobles e individuales en polímero técnico y acero inoxidable 304."
  },
  {
    "id": "cat-cocina-elevables",
    "name": "Sistemas Elevables & Loceros",
    "slug": "sistemas-elevables",
    "main_collection": "cocina",
    "description": "Canastas y loceros con descenso amortiguado manual y motorizados eléctricamente para muebles aéreos contemporáneos."
  },
  {
    "id": "cat-cocina-cuberteros",
    "name": "Cuberteros & Accesorios",
    "slug": "cuberteros",
    "main_collection": "cocina",
    "description": "Bandejas cuberteras termoformadas en ABS técnico plateado mate para gavetas de 600mm y 700mm."
  },
  {
    "id": "cat-closet-joyeros",
    "name": "Joyeros & Bandejas",
    "slug": "joyeros",
    "main_collection": "closet",
    "description": "Bandejas extraíbles de alta costura tapizadas en terciopelo y cuero con cierre suave para relojes, joyas y accesorios."
  },
  {
    "id": "cat-closet-pantaloneros",
    "name": "Pantaloneros & Percheros",
    "slug": "pantaloneros",
    "main_collection": "closet",
    "description": "Pantaloneros extraíbles laterales, frontales y superiores con varillas engomadas antideslizantes y amortiguación hidráulica."
  },
  {
    "id": "cat-closet-elevadores",
    "name": "Elevadores de Ropa",
    "slug": "elevadores-ropa",
    "main_collection": "closet",
    "description": "Mecanismos abatibles hidráulicos en tono moka para aprovechar la altura total de armarios y vestidores."
  },
  {
    "id": "cat-closet-organizadores",
    "name": "Organizadores & Canastas Clóset",
    "slug": "organizadores-closet",
    "main_collection": "closet",
    "description": "Canastas extraíbles en ratán sintético transpirable gris oscuro con marco estructural de aluminio."
  },
  {
    "id": "cat-closet-zapateros",
    "name": "Zapateros Giratorios",
    "slug": "zapateros",
    "main_collection": "closet",
    "description": "Columnas giratorias axiales 360° de 12 niveles para calzado con capacidad superior a 36 pares."
  },
  {
    "id": "cat-closet-seguridad",
    "name": "Cajones con Clave & Relojes",
    "slug": "cajones-clave-relojes",
    "main_collection": "closet",
    "description": "Cajones de seguridad con cerradura digital biométrica tapizados en cuero y sistemas con rotores Watch Winder para alta relojería."
  }
];

export const OFFICIAL_PRODUCTS: Product[] = [
  {
    "id": "prod-kdj-60",
    "code": "KDJ-60",
    "name": "Canasta lateral de 2 niveles con base de madera",
    "category_id": "cat-cocina-condimenteros",
    "category_name": "Condimenteros & Portaplatos",
    "main_collection": "cocina",
    "short_description": "Canasta lateral extraíble para módulo angosto, con base de madera/MDF y sistema amortiguado.",
    "full_description": "Canasta lateral extraíble para módulo angosto, con base de madera/MDF y sistema amortiguado.",
    "technical_specs": {
      "ref_fabricante": "04SW-01-200",
      "aplicacion": "Cocina",
      "modulo": "200mm",
      "dimensiones": "145 × 480 × 590 mm",
      "material": "Acero plano + base antideslizante + MDF; estructura en hierro",
      "acabado": "Estructura con pintura electrostática",
      "configuracion": "2 niveles",
      "mecanismo": "Correderas ocultas con amortiguación",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 200mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "2 niveles"
      },
      {
        "label": "MATERIAL",
        "value": "Acero plano + base antideslizante + MDF; estructura en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Correderas ocultas con amortiguación"
      }
    ],
    "price": 210928,
    "stock": 18,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-60.jpg",
    "gallery_urls": [
      "/images/products/kdj-60.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 10,
    "store_stock": 3,
    "web_stock": 5,
    "inventory_status": "in_stock",
    "sku": "04SW-01-200",
    "slug": "kdj-60-canasta-lateral-de-2-niveles-con-base-de-madera",
    "brand_collection": "Colección 2026",
    "category": "Condimenteros & Portaplatos",
    "materials": [
      "Acero plano + base antideslizante + MDF; estructura en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 185616,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true,
    "description": "Canasta lateral extraíble para módulo angosto, con base de madera/MDF y sistema amortiguado."
  },
  {
    "id": "prod-kdj-61",
    "code": "KDJ-61",
    "name": "Canasta lateral de 2 niveles en acero al carbono",
    "category_id": "cat-cocina-condimenteros",
    "category_name": "Condimenteros & Portaplatos",
    "main_collection": "cocina",
    "short_description": "Canasta lateral extraíble en acero al carbono para organización vertical de cocina.",
    "full_description": "Canasta lateral extraíble en acero al carbono para organización vertical de cocina.",
    "technical_specs": {
      "ref_fabricante": "04SB-01-300",
      "aplicacion": "Cocina",
      "modulo": "300mm",
      "dimensiones": "249 × 480 × 592 mm",
      "material": "Acero al carbono + base antideslizante + MDF; estructura en hierro",
      "acabado": "Estructura con pintura electrostática",
      "configuracion": "2 niveles",
      "mecanismo": "Correderas ocultas con amortiguación",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 300mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "2 niveles"
      },
      {
        "label": "MATERIAL",
        "value": "Acero al carbono + base antideslizante + MDF; estructura en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Correderas ocultas con amortiguación"
      }
    ],
    "price": 260650,
    "stock": 24,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-61.jpg",
    "gallery_urls": [
      "/images/products/kdj-61.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 14,
    "store_stock": 4,
    "web_stock": 6,
    "inventory_status": "in_stock",
    "sku": "04SB-01-300",
    "slug": "kdj-61-canasta-lateral-de-2-niveles-en-acero-al-carbono",
    "brand_collection": "Colección 2026",
    "category": "Condimenteros & Portaplatos",
    "materials": [
      "Acero al carbono + base antideslizante + MDF; estructura en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 229372,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Canasta lateral extraíble en acero al carbono para organización vertical de cocina."
  },
  {
    "id": "prod-kdj-62",
    "code": "KDJ-62",
    "name": "Canasta lateral de vidrio de 3 niveles",
    "category_id": "cat-cocina-condimenteros",
    "category_name": "Condimenteros & Portaplatos",
    "main_collection": "cocina",
    "short_description": "Sistema extraíble de vidrio para organización de botellas, especias y accesorios de cocina.",
    "full_description": "Sistema extraíble de vidrio para organización de botellas, especias y accesorios de cocina.",
    "technical_specs": {
      "ref_fabricante": "04SG-02-200",
      "aplicacion": "Cocina",
      "modulo": "200mm",
      "dimensiones": "149 × 480 × 672 mm",
      "material": "Vidrio templado + aluminio con borde oxidado + acero inoxidable 201 + base de madera; estructura en hierro",
      "acabado": "Estructura con pintura electrostática",
      "configuracion": "3 niveles",
      "mecanismo": "Correderas ocultas con amortiguación",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 200mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "3 niveles"
      },
      {
        "label": "MATERIAL",
        "value": "Vidrio templado + aluminio con borde oxidado + acero inoxidable 201 + base de madera; estructura en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Correderas ocultas con amortiguación"
      }
    ],
    "price": 273504,
    "stock": 15,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-62.jpg",
    "gallery_urls": [
      "/images/products/kdj-62.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 9,
    "store_stock": 3,
    "web_stock": 3,
    "inventory_status": "in_stock",
    "sku": "04SG-02-200",
    "slug": "kdj-62-canasta-lateral-de-vidrio-de-3-niveles",
    "brand_collection": "Colección 2026",
    "category": "Condimenteros & Portaplatos",
    "materials": [
      "Vidrio templado + aluminio con borde oxidado + acero inoxidable 201 + base de madera; estructura en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 240683,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Sistema extraíble de vidrio para organización de botellas, especias y accesorios de cocina."
  },
  {
    "id": "prod-kdj-63",
    "code": "KDJ-63",
    "name": "Especiero multifunción de vidrio de 3 niveles",
    "category_id": "cat-cocina-condimenteros",
    "category_name": "Condimenteros & Portaplatos",
    "main_collection": "cocina",
    "short_description": "Sistema extraíble de vidrio para organización de botellas, especias y accesorios de cocina.",
    "full_description": "Sistema extraíble de vidrio para organización de botellas, especias y accesorios de cocina.",
    "technical_specs": {
      "ref_fabricante": "03DG-350",
      "aplicacion": "Cocina",
      "modulo": "350mm",
      "dimensiones": "300 × 435 × 495 mm",
      "material": "Vidrio templado + aluminio con borde oxidado + acero inoxidable 201 + base de madera; estructura en hierro",
      "acabado": "Estructura con pintura electrostática",
      "configuracion": "3 niveles",
      "mecanismo": "Correderas ocultas con amortiguación",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 350mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "3 niveles"
      },
      {
        "label": "MATERIAL",
        "value": "Vidrio templado + aluminio con borde oxidado + acero inoxidable 201 + base de madera; estructura en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Correderas ocultas con amortiguación"
      }
    ],
    "price": 372676,
    "stock": 12,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-63.jpg",
    "gallery_urls": [
      "/images/products/kdj-63.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 7,
    "store_stock": 2,
    "web_stock": 3,
    "inventory_status": "in_stock",
    "sku": "03DG-350",
    "slug": "kdj-63-especiero-multifuncion-de-vidrio-de-3-niveles",
    "brand_collection": "Colección 2026",
    "category": "Condimenteros & Portaplatos",
    "materials": [
      "Vidrio templado + aluminio con borde oxidado + acero inoxidable 201 + base de madera; estructura en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 327954,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true,
    "description": "Sistema extraíble de vidrio para organización de botellas, especias y accesorios de cocina."
  },
  {
    "id": "prod-kdj-64",
    "code": "KDJ-64",
    "name": "Canasta estrecha tipo A de 2 niveles",
    "category_id": "cat-cocina-condimenteros",
    "category_name": "Condimenteros & Portaplatos",
    "main_collection": "cocina",
    "short_description": "Canasta estrecha extraíble tipo A para módulos de 150 mm.",
    "full_description": "Canasta estrecha extraíble tipo A para módulos de 150 mm.",
    "technical_specs": {
      "ref_fabricante": "08NA-150",
      "aplicacion": "Cocina",
      "modulo": "150mm",
      "dimensiones": "95 × 450 × 500 mm",
      "material": "Canasta en hierro",
      "acabado": "Cromado",
      "configuracion": "2 niveles",
      "mecanismo": "Correderas ocultas con amortiguación",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 150mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "2 niveles"
      },
      {
        "label": "MATERIAL",
        "value": "Canasta en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Correderas ocultas con amortiguación"
      }
    ],
    "price": 160006,
    "stock": 30,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-64.jpg",
    "gallery_urls": [
      "/images/products/kdj-64.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 18,
    "store_stock": 6,
    "web_stock": 6,
    "inventory_status": "in_stock",
    "sku": "08NA-150",
    "slug": "kdj-64-canasta-estrecha-tipo-a-de-2-niveles",
    "brand_collection": "Colección 2026",
    "category": "Condimenteros & Portaplatos",
    "materials": [
      "Canasta en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 140805,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Canasta estrecha extraíble tipo A para módulos de 150 mm."
  },
  {
    "id": "prod-kdj-65",
    "code": "KDJ-65",
    "name": "Canasta estrecha tipo B de 2 niveles",
    "category_id": "cat-cocina-condimenteros",
    "category_name": "Condimenteros & Portaplatos",
    "main_collection": "cocina",
    "short_description": "Canasta estrecha extraíble para módulos de 150 mm con cierre suave.",
    "full_description": "Canasta estrecha extraíble para módulos de 150 mm con cierre suave.",
    "technical_specs": {
      "ref_fabricante": "08NB-150",
      "aplicacion": "Cocina",
      "modulo": "150mm",
      "dimensiones": "108 × 460 × 480 mm",
      "material": "Canasta en hierro",
      "acabado": "Cromado",
      "configuracion": "2 niveles",
      "mecanismo": "Corredera de balineras con cierre suave",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 150mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "2 niveles"
      },
      {
        "label": "MATERIAL",
        "value": "Canasta en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Corredera de balineras con cierre suave"
      }
    ],
    "price": 141526,
    "stock": 22,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-65.jpg",
    "gallery_urls": [
      "/images/products/kdj-65.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 13,
    "store_stock": 4,
    "web_stock": 5,
    "inventory_status": "in_stock",
    "sku": "08NB-150",
    "slug": "kdj-65-canasta-estrecha-tipo-b-de-2-niveles",
    "brand_collection": "Colección 2026",
    "category": "Condimenteros & Portaplatos",
    "materials": [
      "Canasta en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 124542,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Canasta estrecha extraíble para módulos de 150 mm con cierre suave."
  },
  {
    "id": "prod-kdj-66",
    "code": "KDJ-66",
    "name": "Canasta estrecha tipo C de 3 niveles",
    "category_id": "cat-cocina-condimenteros",
    "category_name": "Condimenteros & Portaplatos",
    "main_collection": "cocina",
    "short_description": "Canasta estrecha extraíble para módulos de 150 mm con cierre suave.",
    "full_description": "Canasta estrecha extraíble para módulos de 150 mm con cierre suave.",
    "technical_specs": {
      "ref_fabricante": "08NC-150",
      "aplicacion": "Cocina",
      "modulo": "150mm",
      "dimensiones": "110 × 460 × 475 mm",
      "material": "Canasta en hierro",
      "acabado": "Cromado",
      "configuracion": "3 niveles",
      "mecanismo": "Corredera de balineras con cierre suave",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 150mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "3 niveles"
      },
      {
        "label": "MATERIAL",
        "value": "Canasta en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Corredera de balineras con cierre suave"
      }
    ],
    "price": 138446,
    "stock": 26,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-66.jpg",
    "gallery_urls": [
      "/images/products/kdj-66.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 15,
    "store_stock": 5,
    "web_stock": 6,
    "inventory_status": "in_stock",
    "sku": "08NC-150",
    "slug": "kdj-66-canasta-estrecha-tipo-c-de-3-niveles",
    "brand_collection": "Colección 2026",
    "category": "Condimenteros & Portaplatos",
    "materials": [
      "Canasta en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 121832,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Canasta estrecha extraíble para módulos de 150 mm con cierre suave."
  },
  {
    "id": "prod-kdj-67",
    "code": "KDJ-67",
    "name": "Especiero de alambre de 3 niveles",
    "category_id": "cat-cocina-condimenteros",
    "category_name": "Condimenteros & Portaplatos",
    "main_collection": "cocina",
    "short_description": "Especiero extraíble de alambre para módulo de 300 mm.",
    "full_description": "Especiero extraíble de alambre para módulo de 300 mm.",
    "technical_specs": {
      "ref_fabricante": "08ND-300",
      "aplicacion": "Cocina",
      "modulo": "300mm",
      "dimensiones": "245 × 460 × 515 mm",
      "material": "Canasta de alambre redondo en hierro",
      "acabado": "Cromado",
      "configuracion": "3 niveles",
      "mecanismo": "Correderas ocultas con amortiguación",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 300mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "3 niveles"
      },
      {
        "label": "MATERIAL",
        "value": "Canasta de alambre redondo en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Correderas ocultas con amortiguación"
      }
    ],
    "price": 324422,
    "stock": 19,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-67.jpg",
    "gallery_urls": [
      "/images/products/kdj-67.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 11,
    "store_stock": 3,
    "web_stock": 5,
    "inventory_status": "in_stock",
    "sku": "08ND-300",
    "slug": "kdj-67-especiero-de-alambre-de-3-niveles",
    "brand_collection": "Colección 2026",
    "category": "Condimenteros & Portaplatos",
    "materials": [
      "Canasta de alambre redondo en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 285491,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Especiero extraíble de alambre para módulo de 300 mm."
  },
  {
    "id": "prod-kdj-68",
    "code": "KDJ-68",
    "name": "Despensa de alambre de 6 niveles",
    "category_id": "cat-cocina-alacenas",
    "category_name": "Alacenas & Columnas",
    "main_collection": "cocina",
    "short_description": "Sistema tipo despensa/torre con seis niveles de almacenamiento.",
    "full_description": "Sistema tipo despensa/torre con seis niveles de almacenamiento.",
    "technical_specs": {
      "ref_fabricante": "04PR-456",
      "aplicacion": "Cocina",
      "modulo": "450mm",
      "dimensiones": "391 × 512 × (1920-2220) mm",
      "material": "Canastas de alambre redondo en hierro; estructura en hierro",
      "acabado": "Canastas cromadas; estructura con pintura electrostática",
      "configuracion": "6 niveles",
      "mecanismo": "Sistema extraíble vertical",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 450mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "6 niveles"
      },
      {
        "label": "MATERIAL",
        "value": "Canastas de alambre redondo en hierro; estructura en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema extraíble vertical"
      }
    ],
    "price": 628320,
    "stock": 10,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-68.jpg",
    "gallery_urls": [
      "/images/products/kdj-68.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 6,
    "store_stock": 2,
    "web_stock": 2,
    "inventory_status": "in_stock",
    "sku": "04PR-456",
    "slug": "kdj-68-despensa-de-alambre-de-6-niveles",
    "brand_collection": "Colección 2026",
    "category": "Alacenas & Columnas",
    "materials": [
      "Canastas de alambre redondo en hierro; estructura en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 552921,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Sistema tipo despensa/torre con seis niveles de almacenamiento."
  },
  {
    "id": "prod-kdj-69",
    "code": "KDJ-69",
    "name": "Despensa en acero al carbono y madera de 6 niveles",
    "category_id": "cat-cocina-alacenas",
    "category_name": "Alacenas & Columnas",
    "main_collection": "cocina",
    "short_description": "Sistema tipo despensa/torre con seis niveles y bases de madera/MDF.",
    "full_description": "Sistema tipo despensa/torre con seis niveles y bases de madera/MDF.",
    "technical_specs": {
      "ref_fabricante": "04PB-456",
      "aplicacion": "Cocina",
      "modulo": "450mm",
      "dimensiones": "391 × 512 × (1920-2220) mm",
      "material": "Acero al carbono + base antideslizante + MDF; estructura en hierro",
      "acabado": "Estructura con pintura electrostática",
      "configuracion": "6 niveles",
      "mecanismo": "Sistema extraíble vertical",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 450mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "6 niveles"
      },
      {
        "label": "MATERIAL",
        "value": "Acero al carbono + base antideslizante + MDF; estructura en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema extraíble vertical"
      }
    ],
    "price": 854700,
    "stock": 8,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-69.jpg",
    "gallery_urls": [
      "/images/products/kdj-69.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 4,
    "store_stock": 1,
    "web_stock": 3,
    "inventory_status": "in_stock",
    "sku": "04PB-456",
    "slug": "kdj-69-despensa-en-acero-al-carbono-y-madera-de-6-niveles",
    "brand_collection": "Colección 2026",
    "category": "Alacenas & Columnas",
    "materials": [
      "Acero al carbono + base antideslizante + MDF; estructura en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 752136,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true,
    "description": "Sistema tipo despensa/torre con seis niveles y bases de madera/MDF."
  },
  {
    "id": "prod-kdj-70",
    "code": "KDJ-70",
    "name": "Despensa de vidrio de 6 niveles",
    "category_id": "cat-cocina-alacenas",
    "category_name": "Alacenas & Columnas",
    "main_collection": "cocina",
    "short_description": "Despensa extraíble premium de seis niveles con canastas en vidrio templado.",
    "full_description": "Despensa extraíble premium de seis niveles con canastas en vidrio templado.",
    "technical_specs": {
      "ref_fabricante": "04PG-456",
      "aplicacion": "Cocina",
      "modulo": "450mm",
      "dimensiones": "391 × 512 × (1920-2220) mm",
      "material": "Vidrio templado + aluminio + base en acero inoxidable 201 + MDF; estructura en hierro",
      "acabado": "Estructura con pintura electrostática",
      "configuracion": "6 niveles",
      "mecanismo": "Sistema extraíble vertical",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 450mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "6 niveles"
      },
      {
        "label": "MATERIAL",
        "value": "Vidrio templado + aluminio + base en acero inoxidable 201 + MDF; estructura en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema extraíble vertical"
      }
    ],
    "price": 1034880,
    "stock": 7,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-70.jpg",
    "gallery_urls": [
      "/images/products/kdj-70.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 4,
    "store_stock": 1,
    "web_stock": 2,
    "inventory_status": "in_stock",
    "sku": "04PG-456",
    "slug": "kdj-70-despensa-de-vidrio-de-6-niveles",
    "brand_collection": "Colección 2026",
    "category": "Alacenas & Columnas",
    "materials": [
      "Vidrio templado + aluminio + base en acero inoxidable 201 + MDF; estructura en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 910694,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true,
    "description": "Despensa extraíble premium de seis niveles con canastas en vidrio templado."
  },
  {
    "id": "prod-kdj-71",
    "code": "KDJ-71",
    "name": "Torre extraíble de vidrio de 6 niveles",
    "category_id": "cat-cocina-alacenas",
    "category_name": "Alacenas & Columnas",
    "main_collection": "cocina",
    "short_description": "Torre extraíble de seis niveles para módulo angosto.",
    "full_description": "Torre extraíble de seis niveles para módulo angosto.",
    "technical_specs": {
      "ref_fabricante": "04TG-206",
      "aplicacion": "Cocina",
      "modulo": "200mm",
      "dimensiones": "140 × 485 × (1800-2100) mm",
      "material": "Vidrio templado + aluminio + base antideslizante + MDF; estructura en hierro",
      "acabado": "Estructura con pintura electrostática",
      "configuracion": "6 niveles",
      "mecanismo": "Sistema extraíble vertical",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 200mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "6 niveles"
      },
      {
        "label": "MATERIAL",
        "value": "Vidrio templado + aluminio + base antideslizante + MDF; estructura en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema extraíble vertical"
      }
    ],
    "price": 862400,
    "stock": 9,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-71.jpg",
    "gallery_urls": [
      "/images/products/kdj-71.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 5,
    "store_stock": 1,
    "web_stock": 3,
    "inventory_status": "in_stock",
    "sku": "04TG-206",
    "slug": "kdj-71-torre-extraible-de-vidrio-de-6-niveles",
    "brand_collection": "Colección 2026",
    "category": "Alacenas & Columnas",
    "materials": [
      "Vidrio templado + aluminio + base antideslizante + MDF; estructura en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 758912,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Torre extraíble de seis niveles para módulo angosto."
  },
  {
    "id": "prod-kdj-72",
    "code": "KDJ-72",
    "name": "Torre extraíble de alambre de 6 niveles",
    "category_id": "cat-cocina-alacenas",
    "category_name": "Alacenas & Columnas",
    "main_collection": "cocina",
    "short_description": "Sistema tipo despensa/torre con seis niveles de almacenamiento.",
    "full_description": "Sistema tipo despensa/torre con seis niveles de almacenamiento.",
    "technical_specs": {
      "ref_fabricante": "04PR-206",
      "aplicacion": "Cocina",
      "modulo": "200mm",
      "dimensiones": "140 × 485 × (1800-2100) mm",
      "material": "Canastas de alambre redondo en hierro; estructura en hierro",
      "acabado": "Canastas cromadas; estructura con pintura electrostática",
      "configuracion": "6 niveles",
      "mecanismo": "Sistema extraíble vertical",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 200mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "6 niveles"
      },
      {
        "label": "MATERIAL",
        "value": "Canastas de alambre redondo en hierro; estructura en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema extraíble vertical"
      }
    ],
    "price": 754600,
    "stock": 11,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-72.jpg",
    "gallery_urls": [
      "/images/products/kdj-72.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 6,
    "store_stock": 2,
    "web_stock": 3,
    "inventory_status": "in_stock",
    "sku": "04PR-206",
    "slug": "kdj-72-torre-extraible-de-alambre-de-6-niveles",
    "brand_collection": "Colección 2026",
    "category": "Alacenas & Columnas",
    "materials": [
      "Canastas de alambre redondo en hierro; estructura en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 664048,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Sistema tipo despensa/torre con seis niveles de almacenamiento."
  },
  {
    "id": "prod-kdj-73",
    "code": "KDJ-73",
    "name": "Torre extraíble en acero al carbono y madera de 6 niveles",
    "category_id": "cat-cocina-alacenas",
    "category_name": "Alacenas & Columnas",
    "main_collection": "cocina",
    "short_description": "Sistema tipo despensa/torre con seis niveles y bases de madera/MDF.",
    "full_description": "Sistema tipo despensa/torre con seis niveles y bases de madera/MDF.",
    "technical_specs": {
      "ref_fabricante": "04TB-306",
      "aplicacion": "Cocina",
      "modulo": "300mm",
      "dimensiones": "240 × 485 × (1800-2100) mm",
      "material": "Acero al carbono + base antideslizante + MDF; estructura en hierro",
      "acabado": "Estructura con pintura electrostática",
      "configuracion": "6 niveles",
      "mecanismo": "Sistema extraíble vertical",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 300mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "6 niveles"
      },
      {
        "label": "MATERIAL",
        "value": "Acero al carbono + base antideslizante + MDF; estructura en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema extraíble vertical"
      }
    ],
    "price": 907060,
    "stock": 8,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-73.jpg",
    "gallery_urls": [
      "/images/products/kdj-73.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 4,
    "store_stock": 1,
    "web_stock": 3,
    "inventory_status": "in_stock",
    "sku": "04TB-306",
    "slug": "kdj-73-torre-extraible-en-acero-al-carbono-y-madera-de-6-niveles",
    "brand_collection": "Colección 2026",
    "category": "Alacenas & Columnas",
    "materials": [
      "Acero al carbono + base antideslizante + MDF; estructura en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 798212,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true,
    "description": "Sistema tipo despensa/torre con seis niveles y bases de madera/MDF."
  },
  {
    "id": "prod-kdj-74",
    "code": "KDJ-74",
    "name": "Esquinero universal de vidrio",
    "category_id": "cat-cocina-esquinas",
    "category_name": "Esquinas Mágicas",
    "main_collection": "cocina",
    "short_description": "Esquinero universal de vidrio para aprovechar módulos de esquina.",
    "full_description": "Esquinero universal de vidrio para aprovechar módulos de esquina.",
    "technical_specs": {
      "ref_fabricante": "04UG",
      "aplicacion": "Cocina",
      "modulo": "800-900mm",
      "dimensiones": "648 × 462 × 585 mm",
      "material": "Vidrio templado + aluminio + base en acero inoxidable 201 + MDF; estructura en hierro",
      "acabado": "Estructura con pintura electrostática",
      "configuracion": "Esquinero universal",
      "mecanismo": "Sistema extraíble para esquina",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 800-900mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Esquinero universal"
      },
      {
        "label": "MATERIAL",
        "value": "Vidrio templado + aluminio + base en acero inoxidable 201 + MDF; estructura en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema extraíble para esquina"
      }
    ],
    "price": 759220,
    "stock": 14,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-74.jpg",
    "gallery_urls": [
      "/images/products/kdj-74.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 8,
    "store_stock": 2,
    "web_stock": 4,
    "inventory_status": "in_stock",
    "sku": "04UG",
    "slug": "kdj-74-esquinero-universal-de-vidrio",
    "brand_collection": "Colección 2026",
    "category": "Esquinas Mágicas",
    "materials": [
      "Vidrio templado + aluminio + base en acero inoxidable 201 + MDF; estructura en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 668113,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true,
    "description": "Esquinero universal de vidrio para aprovechar módulos de esquina."
  },
  {
    "id": "prod-kdj-75",
    "code": "KDJ-75",
    "name": "Esquinero universal de alambre",
    "category_id": "cat-cocina-esquinas",
    "category_name": "Esquinas Mágicas",
    "main_collection": "cocina",
    "short_description": "Esquinero universal de alambre para módulos de esquina.",
    "full_description": "Esquinero universal de alambre para módulos de esquina.",
    "technical_specs": {
      "ref_fabricante": "04UR",
      "aplicacion": "Cocina",
      "modulo": "800-900mm",
      "dimensiones": "648 × 462 × 585 mm",
      "material": "Canasta en hierro; estructura en hierro",
      "acabado": "Canasta cromada; estructura con pintura electrostática",
      "configuracion": "Esquinero universal",
      "mecanismo": "Sistema extraíble para esquina",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 800-900mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Esquinero universal"
      },
      {
        "label": "MATERIAL",
        "value": "Canasta en hierro; estructura en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema extraíble para esquina"
      }
    ],
    "price": 634942,
    "stock": 16,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-75.jpg",
    "gallery_urls": [
      "/images/products/kdj-75.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 9,
    "store_stock": 3,
    "web_stock": 4,
    "inventory_status": "in_stock",
    "sku": "04UR",
    "slug": "kdj-75-esquinero-universal-de-alambre",
    "brand_collection": "Colección 2026",
    "category": "Esquinas Mágicas",
    "materials": [
      "Canasta en hierro; estructura en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 558748,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Esquinero universal de alambre para módulos de esquina."
  },
  {
    "id": "prod-kdj-76",
    "code": "KDJ-76",
    "name": "Esquinero universal en acero al carbono y madera",
    "category_id": "cat-cocina-esquinas",
    "category_name": "Esquinas Mágicas",
    "main_collection": "cocina",
    "short_description": "Esquinero universal con base de madera/MDF y estructura metálica.",
    "full_description": "Esquinero universal con base de madera/MDF y estructura metálica.",
    "technical_specs": {
      "ref_fabricante": "04UB",
      "aplicacion": "Cocina",
      "modulo": "800-900mm",
      "dimensiones": "648 × 462 × 585 mm",
      "material": "Acero al carbono + base antideslizante + MDF; estructura en hierro",
      "acabado": "Estructura con pintura electrostática",
      "configuracion": "Esquinero universal",
      "mecanismo": "Sistema extraíble para esquina",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 800-900mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Esquinero universal"
      },
      {
        "label": "MATERIAL",
        "value": "Acero al carbono + base antideslizante + MDF; estructura en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema extraíble para esquina"
      }
    ],
    "price": 760541,
    "stock": 10,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-76.jpg",
    "gallery_urls": [
      "/images/products/kdj-76.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 6,
    "store_stock": 2,
    "web_stock": 2,
    "inventory_status": "in_stock",
    "sku": "04UB",
    "slug": "kdj-76-esquinero-universal-en-acero-al-carbono-y-madera",
    "brand_collection": "Colección 2026",
    "category": "Esquinas Mágicas",
    "materials": [
      "Acero al carbono + base antideslizante + MDF; estructura en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 669276,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true,
    "description": "Esquinero universal con base de madera/MDF y estructura metálica."
  },
  {
    "id": "prod-kdj-77",
    "code": "KDJ-77",
    "name": "Esquinero giratorio derecho o izquierdo",
    "category_id": "cat-cocina-esquinas",
    "category_name": "Esquinas Mágicas",
    "main_collection": "cocina",
    "short_description": "Magic corner reversible para apertura hacia derecha o izquierda.",
    "full_description": "Magic corner reversible para apertura hacia derecha o izquierda.",
    "technical_specs": {
      "ref_fabricante": "04MB",
      "aplicacion": "Cocina",
      "modulo": "900-1000mm",
      "dimensiones": "760 × 500 × 530 mm",
      "material": "Acero al carbono + base antideslizante + MDF; estructura en hierro",
      "acabado": "Estructura con pintura electrostática",
      "configuracion": "Giro a derecha o izquierda",
      "mecanismo": "Sistema extraíble/giratorio para esquina",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 900-1000mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Giro a derecha o izquierda"
      },
      {
        "label": "MATERIAL",
        "value": "Acero al carbono + base antideslizante + MDF; estructura en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema extraíble/giratorio para esquina"
      }
    ],
    "price": 877678,
    "stock": 12,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-77.jpg",
    "gallery_urls": [
      "/images/products/kdj-77.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 7,
    "store_stock": 2,
    "web_stock": 3,
    "inventory_status": "in_stock",
    "sku": "04MB",
    "slug": "kdj-77-esquinero-giratorio-derecho-o-izquierdo",
    "brand_collection": "Colección 2026",
    "category": "Esquinas Mágicas",
    "materials": [
      "Acero al carbono + base antideslizante + MDF; estructura en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 772356,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Magic corner reversible para apertura hacia derecha o izquierda."
  },
  {
    "id": "prod-kdj-198",
    "code": "KDJ-198",
    "name": "Juego de canastas extraíbles SS201: plana y portaplatos",
    "category_id": "cat-cocina-condimenteros",
    "category_name": "Condimenteros & Portaplatos",
    "main_collection": "cocina",
    "short_description": "Juego de canastas de tres lados para almacenamiento y organización de vajilla.",
    "full_description": "Juego de canastas de tres lados para almacenamiento y organización de vajilla.",
    "technical_specs": {
      "ref_fabricante": "FS502601/FS502602",
      "aplicacion": "Cocina",
      "modulo": "600mm",
      "dimensiones": "564 × 425 × 165 mm",
      "material": "Acero inoxidable 201",
      "acabado": "Pulido",
      "configuracion": "Juego de 2 canastas: plana + portaplatos",
      "mecanismo": "Canastas extraíbles",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 600mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Juego de 2 canastas: plana + portaplatos"
      },
      {
        "label": "MATERIAL",
        "value": "Acero inoxidable 201"
      },
      {
        "label": "SISTEMA",
        "value": "Canastas extraíbles"
      }
    ],
    "price": 393932,
    "stock": 20,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-198.jpg",
    "gallery_urls": [
      "/images/products/kdj-198.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 12,
    "store_stock": 4,
    "web_stock": 4,
    "inventory_status": "in_stock",
    "sku": "FS502601/FS502602",
    "slug": "kdj-198-juego-de-canastas-extraibles-ss201-plana-y-portaplatos",
    "brand_collection": "Colección 2026",
    "category": "Condimenteros & Portaplatos",
    "materials": [
      "Acero inoxidable 201"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 346660,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Juego de canastas de tres lados para almacenamiento y organización de vajilla."
  },
  {
    "id": "prod-kdj-199",
    "code": "KDJ-199",
    "name": "Juego de canastas extraíbles SS201: plana y portaplatos",
    "category_id": "cat-cocina-condimenteros",
    "category_name": "Condimenteros & Portaplatos",
    "main_collection": "cocina",
    "short_description": "Juego de canastas de tres lados para almacenamiento y organización de vajilla.",
    "full_description": "Juego de canastas de tres lados para almacenamiento y organización de vajilla.",
    "technical_specs": {
      "ref_fabricante": "FS502701/FS502702",
      "aplicacion": "Cocina",
      "modulo": "700mm",
      "dimensiones": "664 × 425 × 165 mm",
      "material": "Acero inoxidable 201",
      "acabado": "Pulido",
      "configuracion": "Juego de 2 canastas: plana + portaplatos",
      "mecanismo": "Canastas extraíbles",
      "nota_imagen": "Imagen de referencia de la familia. Verificar variante/medida indicada en ficha."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 700mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Juego de 2 canastas: plana + portaplatos"
      },
      {
        "label": "MATERIAL",
        "value": "Acero inoxidable 201"
      },
      {
        "label": "SISTEMA",
        "value": "Canastas extraíbles"
      }
    ],
    "price": 428890,
    "stock": 15,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-199.jpg",
    "gallery_urls": [
      "/images/products/kdj-199.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 9,
    "store_stock": 3,
    "web_stock": 3,
    "inventory_status": "in_stock",
    "sku": "FS502701/FS502702",
    "slug": "kdj-199-juego-de-canastas-extraibles-ss201-plana-y-portaplatos",
    "brand_collection": "Colección 2026",
    "category": "Condimenteros & Portaplatos",
    "materials": [
      "Acero inoxidable 201"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 377423,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Juego de canastas de tres lados para almacenamiento y organización de vajilla."
  },
  {
    "id": "prod-kdj-200",
    "code": "KDJ-200",
    "name": "Juego de canastas extraíbles SS201: plana y portaplatos",
    "category_id": "cat-cocina-condimenteros",
    "category_name": "Condimenteros & Portaplatos",
    "main_collection": "cocina",
    "short_description": "Juego de canastas de tres lados para almacenamiento y organización de vajilla.",
    "full_description": "Juego de canastas de tres lados para almacenamiento y organización de vajilla.",
    "technical_specs": {
      "ref_fabricante": "FS502801/FS502802",
      "aplicacion": "Cocina",
      "modulo": "800mm",
      "dimensiones": "764 × 425 × 165 mm",
      "material": "Acero inoxidable 201",
      "acabado": "Pulido",
      "configuracion": "Juego de 2 canastas: plana + portaplatos",
      "mecanismo": "Canastas extraíbles",
      "nota_imagen": "Imagen de referencia de la familia. Verificar variante/medida indicada en ficha."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 800mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Juego de 2 canastas: plana + portaplatos"
      },
      {
        "label": "MATERIAL",
        "value": "Acero inoxidable 201"
      },
      {
        "label": "SISTEMA",
        "value": "Canastas extraíbles"
      }
    ],
    "price": 4664660,
    "stock": 6,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-200.jpg",
    "gallery_urls": [
      "/images/products/kdj-200.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 3,
    "store_stock": 1,
    "web_stock": 2,
    "inventory_status": "in_stock",
    "sku": "FS502801/FS502802",
    "slug": "kdj-200-juego-de-canastas-extraibles-ss201-plana-y-portaplatos",
    "brand_collection": "Colección 2026",
    "category": "Condimenteros & Portaplatos",
    "materials": [
      "Acero inoxidable 201"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 4104900,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true,
    "description": "Juego de canastas de tres lados para almacenamiento y organización de vajilla."
  },
  {
    "id": "prod-kdj-78",
    "code": "KDJ-78",
    "name": "Basurero doble con tapa de 20 + 20 litros",
    "category_id": "cat-cocina-basureros",
    "category_name": "Basureros Ecológicos",
    "main_collection": "cocina",
    "short_description": "Basurero doble extraíble con tapa para módulo de cocina.",
    "full_description": "Basurero doble extraíble con tapa para módulo de cocina.",
    "technical_specs": {
      "ref_fabricante": "06DD-220W",
      "aplicacion": "Cocina",
      "modulo": "400mm",
      "dimensiones": "335 × 500 × 470mm",
      "material": "ABS",
      "acabado": "No especificado",
      "configuracion": "2 recipientes: 20 L + 20 L, con tapa",
      "mecanismo": "Corredera de balineras con cierre suave",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 400mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "2 recipientes: 20 L + 20 L, con tapa"
      },
      {
        "label": "MATERIAL",
        "value": "ABS"
      },
      {
        "label": "SISTEMA",
        "value": "Corredera de balineras con cierre suave"
      }
    ],
    "price": 264880,
    "stock": 25,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-78.jpg",
    "gallery_urls": [
      "/images/products/kdj-78.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 15,
    "store_stock": 5,
    "web_stock": 5,
    "inventory_status": "in_stock",
    "sku": "06DD-220W",
    "slug": "kdj-78-basurero-doble-con-tapa-de-20-20-litros",
    "brand_collection": "Colección 2026",
    "category": "Basureros Ecológicos",
    "materials": [
      "ABS"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 233094,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Basurero doble extraíble con tapa para módulo de cocina."
  },
  {
    "id": "prod-kdj-79",
    "code": "KDJ-79",
    "name": "Basurero doble gris de 10 + 20 litros",
    "category_id": "cat-cocina-basureros",
    "category_name": "Basureros Ecológicos",
    "main_collection": "cocina",
    "short_description": "Basurero doble extraíble para clasificación de residuos.",
    "full_description": "Basurero doble extraíble para clasificación de residuos.",
    "technical_specs": {
      "ref_fabricante": "06DD-1020",
      "aplicacion": "Cocina",
      "modulo": "300mm",
      "dimensiones": "263 × 490 × 424 mm",
      "material": "ABS + hierro",
      "acabado": "Gris",
      "configuracion": "2 recipientes: 10 L + 20 L",
      "mecanismo": "Sistema extraíble; tipo de corredera no especificado",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 300mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "2 recipientes: 10 L + 20 L"
      },
      {
        "label": "MATERIAL",
        "value": "ABS + hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema extraíble; tipo de corredera no especificado"
      }
    ],
    "price": 329560,
    "stock": 18,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-79.jpg",
    "gallery_urls": [
      "/images/products/kdj-79.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 10,
    "store_stock": 3,
    "web_stock": 5,
    "inventory_status": "in_stock",
    "sku": "06DD-1020",
    "slug": "kdj-79-basurero-doble-gris-de-10-20-litros",
    "brand_collection": "Colección 2026",
    "category": "Basureros Ecológicos",
    "materials": [
      "ABS + hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 290012,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Basurero doble extraíble para clasificación de residuos."
  },
  {
    "id": "prod-kdj-80",
    "code": "KDJ-80",
    "name": "Basurero doble gris de 20 + 20 litros",
    "category_id": "cat-cocina-basureros",
    "category_name": "Basureros Ecológicos",
    "main_collection": "cocina",
    "short_description": "Basurero doble extraíble para módulo de 400 mm.",
    "full_description": "Basurero doble extraíble para módulo de 400 mm.",
    "technical_specs": {
      "ref_fabricante": "06DD-220",
      "aplicacion": "Cocina",
      "modulo": "400mm",
      "dimensiones": "342 × 490 × 424 mm",
      "material": "ABS + hierro",
      "acabado": "Gris",
      "configuracion": "2 recipientes: 20 L + 20 L",
      "mecanismo": "Sistema extraíble; tipo de corredera no especificado",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 400mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "2 recipientes: 20 L + 20 L"
      },
      {
        "label": "MATERIAL",
        "value": "ABS + hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema extraíble; tipo de corredera no especificado"
      }
    ],
    "price": 407728,
    "stock": 14,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-80.jpg",
    "gallery_urls": [
      "/images/products/kdj-80.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 8,
    "store_stock": 2,
    "web_stock": 4,
    "inventory_status": "in_stock",
    "sku": "06DD-220",
    "slug": "kdj-80-basurero-doble-gris-de-20-20-litros",
    "brand_collection": "Colección 2026",
    "category": "Basureros Ecológicos",
    "materials": [
      "ABS + hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 358800,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Basurero doble extraíble para módulo de 400 mm."
  },
  {
    "id": "prod-kdj-81",
    "code": "KDJ-81",
    "name": "Basurero de 14 litros en inoxidable 304",
    "category_id": "cat-cocina-basureros",
    "category_name": "Basureros Ecológicos",
    "main_collection": "cocina",
    "short_description": "Basurero compacto de 14 litros con componentes en acero inoxidable 304.",
    "full_description": "Basurero compacto de 14 litros con componentes en acero inoxidable 304.",
    "technical_specs": {
      "ref_fabricante": "SWG1-430",
      "aplicacion": "Cocina",
      "modulo": "400mm",
      "dimensiones": "365 × 289 × 370 mm",
      "material": "Plástico + acero inoxidable SUS304",
      "acabado": "Acero inoxidable pulido",
      "configuracion": "Capacidad 14 L",
      "mecanismo": "Sistema extraíble",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 400mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Capacidad 14 L"
      },
      {
        "label": "MATERIAL",
        "value": "Plástico + acero inoxidable SUS304"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema extraíble"
      }
    ],
    "price": 150920,
    "stock": 28,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-81.jpg",
    "gallery_urls": [
      "/images/products/kdj-81.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 16,
    "store_stock": 5,
    "web_stock": 7,
    "inventory_status": "in_stock",
    "sku": "SWG1-430",
    "slug": "kdj-81-basurero-de-14-litros-en-inoxidable-304",
    "brand_collection": "Colección 2026",
    "category": "Basureros Ecológicos",
    "materials": [
      "Plástico + acero inoxidable SUS304"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 132809,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Basurero compacto de 14 litros con componentes en acero inoxidable 304."
  },
  {
    "id": "prod-kdj-83",
    "code": "KDJ-83",
    "name": "Canasta elevable de vidrio",
    "category_id": "cat-cocina-elevables",
    "category_name": "Sistemas Elevables & Loceros",
    "main_collection": "cocina",
    "short_description": "Canasta elevable de vidrio para módulos superiores de cocina.",
    "full_description": "Canasta elevable de vidrio para módulos superiores de cocina.",
    "technical_specs": {
      "ref_fabricante": "04LG-600",
      "aplicacion": "Cocina",
      "modulo": "600mm",
      "dimensiones": "564 × 260 × 542 mm",
      "material": "Vidrio templado + aluminio + base en acero inoxidable 201 + madera; estructura en hierro",
      "acabado": "Estructura con pintura electrostática",
      "configuracion": "Canasta elevable",
      "mecanismo": "Sistema mecánico elevable",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 600mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Canasta elevable"
      },
      {
        "label": "MATERIAL",
        "value": "Vidrio templado + aluminio + base en acero inoxidable 201 + madera; estructura en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema mecánico elevable"
      }
    ],
    "price": 662732,
    "stock": 12,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-83.jpg",
    "gallery_urls": [
      "/images/products/kdj-83.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 7,
    "store_stock": 2,
    "web_stock": 3,
    "inventory_status": "in_stock",
    "sku": "04LG-600",
    "slug": "kdj-83-canasta-elevable-de-vidrio",
    "brand_collection": "Colección 2026",
    "category": "Sistemas Elevables & Loceros",
    "materials": [
      "Vidrio templado + aluminio + base en acero inoxidable 201 + madera; estructura en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 583204,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true,
    "description": "Canasta elevable de vidrio para módulos superiores de cocina."
  },
  {
    "id": "prod-kdj-84",
    "code": "KDJ-84",
    "name": "Canasta elevable de vidrio",
    "category_id": "cat-cocina-elevables",
    "category_name": "Sistemas Elevables & Loceros",
    "main_collection": "cocina",
    "short_description": "Canasta elevable de vidrio para módulos superiores de cocina.",
    "full_description": "Canasta elevable de vidrio para módulos superiores de cocina.",
    "technical_specs": {
      "ref_fabricante": "04LG-700",
      "aplicacion": "Cocina",
      "modulo": "700mm",
      "dimensiones": "664 × 260 × 542 mm",
      "material": "Vidrio templado + aluminio + base en acero inoxidable 201 + madera; estructura en hierro",
      "acabado": "Estructura con pintura electrostática",
      "configuracion": "Canasta elevable",
      "mecanismo": "Sistema mecánico elevable",
      "nota_imagen": "Imagen de referencia de la familia. Verificar variante/medida indicada en ficha."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 700mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Canasta elevable"
      },
      {
        "label": "MATERIAL",
        "value": "Vidrio templado + aluminio + base en acero inoxidable 201 + madera; estructura en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema mecánico elevable"
      }
    ],
    "price": 724560,
    "stock": 10,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-84.jpg",
    "gallery_urls": [
      "/images/products/kdj-84.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 6,
    "store_stock": 2,
    "web_stock": 2,
    "inventory_status": "in_stock",
    "sku": "04LG-700",
    "slug": "kdj-84-canasta-elevable-de-vidrio",
    "brand_collection": "Colección 2026",
    "category": "Sistemas Elevables & Loceros",
    "materials": [
      "Vidrio templado + aluminio + base en acero inoxidable 201 + madera; estructura en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 637612,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Canasta elevable de vidrio para módulos superiores de cocina."
  },
  {
    "id": "prod-kdj-85",
    "code": "KDJ-85",
    "name": "Canasta elevable de vidrio",
    "category_id": "cat-cocina-elevables",
    "category_name": "Sistemas Elevables & Loceros",
    "main_collection": "cocina",
    "short_description": "Canasta elevable de vidrio para módulos superiores de cocina.",
    "full_description": "Canasta elevable de vidrio para módulos superiores de cocina.",
    "technical_specs": {
      "ref_fabricante": "04LG-800",
      "aplicacion": "Cocina",
      "modulo": "800mm",
      "dimensiones": "764 × 260 × 542 mm",
      "material": "Vidrio templado + aluminio + base en acero inoxidable 201 + madera; estructura en hierro",
      "acabado": "Estructura con pintura electrostática",
      "configuracion": "Canasta elevable",
      "mecanismo": "Sistema mecánico elevable",
      "nota_imagen": "Imagen de referencia de la familia. Verificar variante/medida indicada en ficha."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 800mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Canasta elevable"
      },
      {
        "label": "MATERIAL",
        "value": "Vidrio templado + aluminio + base en acero inoxidable 201 + madera; estructura en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema mecánico elevable"
      }
    ],
    "price": 786464,
    "stock": 8,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-85.jpg",
    "gallery_urls": [
      "/images/products/kdj-85.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 4,
    "store_stock": 1,
    "web_stock": 3,
    "inventory_status": "in_stock",
    "sku": "04LG-800",
    "slug": "kdj-85-canasta-elevable-de-vidrio",
    "brand_collection": "Colección 2026",
    "category": "Sistemas Elevables & Loceros",
    "materials": [
      "Vidrio templado + aluminio + base en acero inoxidable 201 + madera; estructura en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 692088,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Canasta elevable de vidrio para módulos superiores de cocina."
  },
  {
    "id": "prod-kdj-86",
    "code": "KDJ-86",
    "name": "Locero elevable SS304 con portacubiertos",
    "category_id": "cat-cocina-elevables",
    "category_name": "Sistemas Elevables & Loceros",
    "main_collection": "cocina",
    "short_description": "Locero elevable para módulo superior, diseñado para platos, bowls y cubiertos.",
    "full_description": "Locero elevable para módulo superior, diseñado para platos, bowls y cubiertos.",
    "technical_specs": {
      "ref_fabricante": "04L3-600",
      "aplicacion": "Cocina",
      "modulo": "600mm",
      "dimensiones": "564 × 260 × 542 mm",
      "material": "Canasta en acero inoxidable 304; estructura en hierro",
      "acabado": "Estructura gris con pintura electrostática",
      "configuracion": "Canasta plana + portaplatos + caja para cubiertos/palillos",
      "mecanismo": "Sistema mecánico elevable",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 600mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Canasta plana + portaplatos + caja para cubiertos/palillos"
      },
      {
        "label": "MATERIAL",
        "value": "Canasta en acero inoxidable 304; estructura en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema mecánico elevable"
      }
    ],
    "price": 738075,
    "stock": 15,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-86.jpg",
    "gallery_urls": [
      "/images/products/kdj-86.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 9,
    "store_stock": 3,
    "web_stock": 3,
    "inventory_status": "in_stock",
    "sku": "04L3-600",
    "slug": "kdj-86-locero-elevable-ss304-con-portacubiertos",
    "brand_collection": "Colección 2026",
    "category": "Sistemas Elevables & Loceros",
    "materials": [
      "Canasta en acero inoxidable 304; estructura en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 649506,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true,
    "description": "Locero elevable para módulo superior, diseñado para platos, bowls y cubiertos."
  },
  {
    "id": "prod-kdj-87",
    "code": "KDJ-87",
    "name": "Locero elevable SS304 con portacubiertos",
    "category_id": "cat-cocina-elevables",
    "category_name": "Sistemas Elevables & Loceros",
    "main_collection": "cocina",
    "short_description": "Locero elevable para módulo superior, diseñado para platos, bowls y cubiertos.",
    "full_description": "Locero elevable para módulo superior, diseñado para platos, bowls y cubiertos.",
    "technical_specs": {
      "ref_fabricante": "04L3-700",
      "aplicacion": "Cocina",
      "modulo": "700mm",
      "dimensiones": "664 × 260 × 542 mm",
      "material": "Canasta en acero inoxidable 304; estructura en hierro",
      "acabado": "Estructura gris con pintura electrostática",
      "configuracion": "Canasta plana + portaplatos + caja para cubiertos/palillos",
      "mecanismo": "Sistema mecánico elevable",
      "nota_imagen": "Imagen de referencia de la familia. Verificar variante/medida indicada en ficha."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 700mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Canasta plana + portaplatos + caja para cubiertos/palillos"
      },
      {
        "label": "MATERIAL",
        "value": "Canasta en acero inoxidable 304; estructura en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema mecánico elevable"
      }
    ],
    "price": 796087,
    "stock": 11,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-87.jpg",
    "gallery_urls": [
      "/images/products/kdj-87.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 6,
    "store_stock": 2,
    "web_stock": 3,
    "inventory_status": "in_stock",
    "sku": "04L3-700",
    "slug": "kdj-87-locero-elevable-ss304-con-portacubiertos",
    "brand_collection": "Colección 2026",
    "category": "Sistemas Elevables & Loceros",
    "materials": [
      "Canasta en acero inoxidable 304; estructura en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 700556,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Locero elevable para módulo superior, diseñado para platos, bowls y cubiertos."
  },
  {
    "id": "prod-kdj-88",
    "code": "KDJ-88",
    "name": "Locero elevable SS304 con portacubiertos",
    "category_id": "cat-cocina-elevables",
    "category_name": "Sistemas Elevables & Loceros",
    "main_collection": "cocina",
    "short_description": "Locero elevable para módulo superior, diseñado para platos, bowls y cubiertos.",
    "full_description": "Locero elevable para módulo superior, diseñado para platos, bowls y cubiertos.",
    "technical_specs": {
      "ref_fabricante": "04L3-800",
      "aplicacion": "Cocina",
      "modulo": "800mm",
      "dimensiones": "764 × 260 × 542 mm",
      "material": "Canasta en acero inoxidable 304; estructura en hierro",
      "acabado": "Estructura gris con pintura electrostática",
      "configuracion": "Canasta plana + portaplatos + caja para cubiertos/palillos",
      "mecanismo": "Sistema mecánico elevable",
      "nota_imagen": "Imagen de referencia de la familia. Verificar variante/medida indicada en ficha."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 800mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Canasta plana + portaplatos + caja para cubiertos/palillos"
      },
      {
        "label": "MATERIAL",
        "value": "Canasta en acero inoxidable 304; estructura en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema mecánico elevable"
      }
    ],
    "price": 856301,
    "stock": 9,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-88.jpg",
    "gallery_urls": [
      "/images/products/kdj-88.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 5,
    "store_stock": 1,
    "web_stock": 3,
    "inventory_status": "in_stock",
    "sku": "04L3-800",
    "slug": "kdj-88-locero-elevable-ss304-con-portacubiertos",
    "brand_collection": "Colección 2026",
    "category": "Sistemas Elevables & Loceros",
    "materials": [
      "Canasta en acero inoxidable 304; estructura en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 753544,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Locero elevable para módulo superior, diseñado para platos, bowls y cubiertos."
  },
  {
    "id": "prod-kdj-89",
    "code": "KDJ-89",
    "name": "Canasta elevable eléctrica de alambre",
    "category_id": "cat-cocina-elevables",
    "category_name": "Sistemas Elevables & Loceros",
    "main_collection": "cocina",
    "short_description": "Sistema eléctrico elevable para módulo superior de cocina.",
    "full_description": "Sistema eléctrico elevable para módulo superior de cocina.",
    "technical_specs": {
      "ref_fabricante": "04EF-700",
      "aplicacion": "Cocina",
      "modulo": "700mm",
      "dimensiones": "700 × 256 × 700 mm",
      "material": "Acero plano 304 con tratamiento por electrólisis; laterales en hierro",
      "acabado": "Laterales con pintura electrostática",
      "configuracion": "Canasta elevable eléctrica",
      "mecanismo": "Control táctil; elevación y descenso motorizados; sin control por voz",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 700mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Canasta elevable eléctrica"
      },
      {
        "label": "MATERIAL",
        "value": "Acero plano 304 con tratamiento por electrólisis; laterales en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Control táctil; elevación y descenso motorizados; sin control por voz"
      }
    ],
    "price": 2005803,
    "stock": 6,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-89.jpg",
    "gallery_urls": [
      "/images/products/kdj-89.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 3,
    "store_stock": 1,
    "web_stock": 2,
    "inventory_status": "in_stock",
    "sku": "04EF-700",
    "slug": "kdj-89-canasta-elevable-electrica-de-alambre",
    "brand_collection": "Colección 2026",
    "category": "Sistemas Elevables & Loceros",
    "materials": [
      "Acero plano 304 con tratamiento por electrólisis; laterales en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 1765106,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true,
    "description": "Sistema eléctrico elevable para módulo superior de cocina."
  },
  {
    "id": "prod-kdj-90",
    "code": "KDJ-90",
    "name": "Canasta elevable eléctrica de vidrio",
    "category_id": "cat-cocina-elevables",
    "category_name": "Sistemas Elevables & Loceros",
    "main_collection": "cocina",
    "short_description": "Sistema eléctrico elevable de vidrio para módulo superior de cocina.",
    "full_description": "Sistema eléctrico elevable de vidrio para módulo superior de cocina.",
    "technical_specs": {
      "ref_fabricante": "04EG-600",
      "aplicacion": "Cocina",
      "modulo": "600mm",
      "dimensiones": "600 × 256 × 700 mm",
      "material": "Vidrio templado + aluminio; laterales en hierro",
      "acabado": "Laterales con pintura electrostática",
      "configuracion": "Canasta elevable eléctrica",
      "mecanismo": "Control táctil; elevación y descenso motorizados; sin control por voz",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 600mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Canasta elevable eléctrica"
      },
      {
        "label": "MATERIAL",
        "value": "Vidrio templado + aluminio; laterales en hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Control táctil; elevación y descenso motorizados; sin control por voz"
      }
    ],
    "price": 2076254,
    "stock": 5,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-90.jpg",
    "gallery_urls": [
      "/images/products/kdj-90.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 3,
    "store_stock": 1,
    "web_stock": 1,
    "inventory_status": "in_stock",
    "sku": "04EG-600",
    "slug": "kdj-90-canasta-elevable-electrica-de-vidrio",
    "brand_collection": "Colección 2026",
    "category": "Sistemas Elevables & Loceros",
    "materials": [
      "Vidrio templado + aluminio; laterales en hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 1827103,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true,
    "description": "Sistema eléctrico elevable de vidrio para módulo superior de cocina."
  },
  {
    "id": "prod-kdj-201",
    "code": "KDJ-201",
    "name": "Cubertero ABS plateado",
    "category_id": "cat-cocina-cuberteros",
    "category_name": "Cuberteros & Accesorios",
    "main_collection": "cocina",
    "short_description": "Organizador de cubiertos en ABS para cajones de cocina.",
    "full_description": "Organizador de cubiertos en ABS para cajones de cocina.",
    "technical_specs": {
      "ref_fabricante": "K-600",
      "aplicacion": "Cocina",
      "modulo": "600mm",
      "dimensiones": "535 × 485 × 60 mm",
      "material": "ABS",
      "acabado": "Plateado; superficie con liner",
      "configuracion": "Cubertero",
      "mecanismo": "Instalación interior de cajón",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 600mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Cubertero"
      },
      {
        "label": "MATERIAL",
        "value": "ABS"
      },
      {
        "label": "SISTEMA",
        "value": "Instalación interior de cajón"
      }
    ],
    "price": 33110,
    "stock": 40,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-201.jpg",
    "gallery_urls": [
      "/images/products/kdj-201.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 24,
    "store_stock": 8,
    "web_stock": 8,
    "inventory_status": "in_stock",
    "sku": "K-600",
    "slug": "kdj-201-cubertero-abs-plateado",
    "brand_collection": "Colección 2026",
    "category": "Cuberteros & Accesorios",
    "materials": [
      "ABS"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 29136,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Organizador de cubiertos en ABS para cajones de cocina."
  },
  {
    "id": "prod-kdj-202",
    "code": "KDJ-202",
    "name": "Cubertero ABS plateado",
    "category_id": "cat-cocina-cuberteros",
    "category_name": "Cuberteros & Accesorios",
    "main_collection": "cocina",
    "short_description": "Organizador de cubiertos en ABS para cajones de cocina.",
    "full_description": "Organizador de cubiertos en ABS para cajones de cocina.",
    "technical_specs": {
      "ref_fabricante": "K-700",
      "aplicacion": "Cocina",
      "modulo": "700mm",
      "dimensiones": "635 × 485 × 60 mm",
      "material": "ABS",
      "acabado": "Plateado; superficie con liner",
      "configuracion": "Cubertero",
      "mecanismo": "Instalación interior de cajón",
      "nota_imagen": "Imagen de referencia de la familia. Verificar variante/medida indicada en ficha."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 700mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Cubertero"
      },
      {
        "label": "MATERIAL",
        "value": "ABS"
      },
      {
        "label": "SISTEMA",
        "value": "Instalación interior de cajón"
      }
    ],
    "price": 38962,
    "stock": 35,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-202.jpg",
    "gallery_urls": [
      "/images/products/kdj-202.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 21,
    "store_stock": 7,
    "web_stock": 7,
    "inventory_status": "in_stock",
    "sku": "K-700",
    "slug": "kdj-202-cubertero-abs-plateado",
    "brand_collection": "Colección 2026",
    "category": "Cuberteros & Accesorios",
    "materials": [
      "ABS"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 34286,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Organizador de cubiertos en ABS para cajones de cocina."
  },
  {
    "id": "prod-kdj-91",
    "code": "KDJ-91",
    "name": "Joyero extraíble con cierre suave · variante 1",
    "category_id": "cat-closet-joyeros",
    "category_name": "Joyeros & Bandejas",
    "main_collection": "closet",
    "short_description": "Joyero extraíble revestido en cuero para organización de accesorios.",
    "full_description": "Joyero extraíble revestido en cuero para organización de accesorios. Nota: La documentación usa la misma referencia de proveedor para dos variantes; confirmar acabado exacto por variante antes de especificar instalación.",
    "technical_specs": {
      "ref_fabricante": "YD-04D-JB600",
      "aplicacion": "Clóset",
      "modulo": "600mm",
      "dimensiones": "(510-614) × 450 × 80 mm",
      "material": "Aluminio + cuero",
      "acabado": "Acabados de familia informados: Serenity Blue / Mocha",
      "configuracion": "Joyero extraíble",
      "mecanismo": "Sistema amortiguado / cierre suave",
      "nota_tecnica": "La documentación usa la misma referencia de proveedor para dos variantes; confirmar acabado exacto por variante antes de especificar instalación.",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 600mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Joyero extraíble"
      },
      {
        "label": "MATERIAL",
        "value": "Aluminio + cuero"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema amortiguado / cierre suave"
      }
    ],
    "price": 340171,
    "stock": 16,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-91.jpg",
    "gallery_urls": [
      "/images/products/kdj-91.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 9,
    "store_stock": 3,
    "web_stock": 4,
    "inventory_status": "in_stock",
    "sku": "YD-04D-JB600",
    "slug": "kdj-91-joyero-extraible-con-cierre-suave-variante-1",
    "brand_collection": "Colección 2026",
    "category": "Joyeros & Bandejas",
    "materials": [
      "Aluminio + cuero"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 299350,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Joyero extraíble revestido en cuero para organización de accesorios. Nota: La documentación usa la misma referencia de proveedor para dos variantes; confirmar acabado exacto por variante antes de especificar instalación."
  },
  {
    "id": "prod-kdj-92",
    "code": "KDJ-92",
    "name": "Joyero extraíble con cierre suave · variante 2",
    "category_id": "cat-closet-joyeros",
    "category_name": "Joyeros & Bandejas",
    "main_collection": "closet",
    "short_description": "Joyero extraíble revestido en cuero para organización de accesorios.",
    "full_description": "Joyero extraíble revestido en cuero para organización de accesorios. Nota: La documentación usa la misma referencia de proveedor para dos variantes; confirmar acabado exacto por variante antes de especificar instalación.",
    "technical_specs": {
      "ref_fabricante": "YD-04D-JB600",
      "aplicacion": "Clóset",
      "modulo": "600mm",
      "dimensiones": "(510-614) × 450 × 80 mm",
      "material": "Aluminio + cuero",
      "acabado": "Acabados de familia informados: Serenity Blue / Mocha",
      "configuracion": "Joyero extraíble",
      "mecanismo": "Sistema amortiguado / cierre suave",
      "nota_tecnica": "La documentación usa la misma referencia de proveedor para dos variantes; confirmar acabado exacto por variante antes de especificar instalación.",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 600mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Joyero extraíble"
      },
      {
        "label": "MATERIAL",
        "value": "Aluminio + cuero"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema amortiguado / cierre suave"
      }
    ],
    "price": 349438,
    "stock": 14,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-92.jpg",
    "gallery_urls": [
      "/images/products/kdj-92.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 8,
    "store_stock": 2,
    "web_stock": 4,
    "inventory_status": "in_stock",
    "sku": "YD-04D-JB600",
    "slug": "kdj-92-joyero-extraible-con-cierre-suave-variante-2",
    "brand_collection": "Colección 2026",
    "category": "Joyeros & Bandejas",
    "materials": [
      "Aluminio + cuero"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 307505,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true,
    "description": "Joyero extraíble revestido en cuero para organización de accesorios. Nota: La documentación usa la misma referencia de proveedor para dos variantes; confirmar acabado exacto por variante antes de especificar instalación."
  },
  {
    "id": "prod-kdj-93",
    "code": "KDJ-93",
    "name": "Pantalonero extraíble con marco de aluminio",
    "category_id": "cat-closet-pantaloneros",
    "category_name": "Pantaloneros & Percheros",
    "main_collection": "closet",
    "short_description": "Pantalonero de marco de aluminio para módulo de clóset.",
    "full_description": "Pantalonero de marco de aluminio para módulo de clóset.",
    "technical_specs": {
      "ref_fabricante": "YD-01-TR600",
      "aplicacion": "Clóset",
      "modulo": "600mm",
      "dimensiones": "(510-614) × 450 × 60 mm",
      "material": "Marco de aluminio",
      "acabado": "Gris oscuro / Mocha",
      "configuracion": "Pantalonero extraíble",
      "mecanismo": "Sistema extraíble",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 600mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Pantalonero extraíble"
      },
      {
        "label": "MATERIAL",
        "value": "Marco de aluminio"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema extraíble"
      }
    ],
    "price": 211950,
    "stock": 20,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-93.jpg",
    "gallery_urls": [
      "/images/products/kdj-93.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 12,
    "store_stock": 4,
    "web_stock": 4,
    "inventory_status": "in_stock",
    "sku": "YD-01-TR600",
    "slug": "kdj-93-pantalonero-extraible-con-marco-de-aluminio",
    "brand_collection": "Colección 2026",
    "category": "Pantaloneros & Percheros",
    "materials": [
      "Marco de aluminio"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 186516,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Pantalonero de marco de aluminio para módulo de clóset."
  },
  {
    "id": "prod-kdj-94",
    "code": "KDJ-94",
    "name": "Pantalonero lateral derecho con cierre suave",
    "category_id": "cat-closet-pantaloneros",
    "category_name": "Pantaloneros & Percheros",
    "main_collection": "closet",
    "short_description": "Pantalonero lateral extraíble con amortiguación.",
    "full_description": "Pantalonero lateral extraíble con amortiguación.",
    "technical_specs": {
      "ref_fabricante": "YL-12B-R",
      "aplicacion": "Clóset",
      "modulo": "400mm",
      "dimensiones": "360 × 450 × 120 mm",
      "material": "Aluminio + hierro",
      "acabado": "Gris oscuro",
      "configuracion": "Lateral derecho",
      "mecanismo": "Sistema extraíble amortiguado",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 400mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Lateral derecho"
      },
      {
        "label": "MATERIAL",
        "value": "Aluminio + hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema extraíble amortiguado"
      }
    ],
    "price": 175770,
    "stock": 18,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-94.jpg",
    "gallery_urls": [
      "/images/products/kdj-94.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 10,
    "store_stock": 3,
    "web_stock": 5,
    "inventory_status": "in_stock",
    "sku": "YL-12B-R",
    "slug": "kdj-94-pantalonero-lateral-derecho-con-cierre-suave",
    "brand_collection": "Colección 2026",
    "category": "Pantaloneros & Percheros",
    "materials": [
      "Aluminio + hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 154677,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Pantalonero lateral extraíble con amortiguación."
  },
  {
    "id": "prod-kdj-95",
    "code": "KDJ-95",
    "name": "Pantalonero lateral izquierdo con cierre suave",
    "category_id": "cat-closet-pantaloneros",
    "category_name": "Pantaloneros & Percheros",
    "main_collection": "closet",
    "short_description": "Pantalonero lateral extraíble con amortiguación.",
    "full_description": "Pantalonero lateral extraíble con amortiguación.",
    "technical_specs": {
      "ref_fabricante": "YL-12B-L",
      "aplicacion": "Clóset",
      "modulo": "400mm",
      "dimensiones": "360 × 450 × 120 mm",
      "material": "Aluminio + hierro",
      "acabado": "Gris oscuro",
      "configuracion": "Lateral izquierdo",
      "mecanismo": "Sistema extraíble amortiguado",
      "nota_imagen": "Imagen de referencia de la familia. Verificar variante/medida indicada en ficha."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 400mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Lateral izquierdo"
      },
      {
        "label": "MATERIAL",
        "value": "Aluminio + hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema extraíble amortiguado"
      }
    ],
    "price": 175770,
    "stock": 18,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-95.jpg",
    "gallery_urls": [
      "/images/products/kdj-95.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 10,
    "store_stock": 3,
    "web_stock": 5,
    "inventory_status": "in_stock",
    "sku": "YL-12B-L",
    "slug": "kdj-95-pantalonero-lateral-izquierdo-con-cierre-suave",
    "brand_collection": "Colección 2026",
    "category": "Pantaloneros & Percheros",
    "materials": [
      "Aluminio + hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 154677,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Pantalonero lateral extraíble con amortiguación."
  },
  {
    "id": "prod-kdj-96",
    "code": "KDJ-96",
    "name": "Pantalonero superior con cierre suave",
    "category_id": "cat-closet-pantaloneros",
    "category_name": "Pantaloneros & Percheros",
    "main_collection": "closet",
    "short_description": "Pantalonero superior con sistema amortiguado.",
    "full_description": "Pantalonero superior con sistema amortiguado.",
    "technical_specs": {
      "ref_fabricante": "YL-10",
      "aplicacion": "Clóset",
      "modulo": "800mm",
      "dimensiones": "660 × 450 × 120 mm",
      "material": "Aluminio + hierro",
      "acabado": "Gris oscuro",
      "configuracion": "Montaje superior",
      "mecanismo": "Sistema extraíble amortiguado",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 800mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Montaje superior"
      },
      {
        "label": "MATERIAL",
        "value": "Aluminio + hierro"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema extraíble amortiguado"
      }
    ],
    "price": 225112,
    "stock": 12,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-96.jpg",
    "gallery_urls": [
      "/images/products/kdj-96.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 7,
    "store_stock": 2,
    "web_stock": 3,
    "inventory_status": "in_stock",
    "sku": "YL-10",
    "slug": "kdj-96-pantalonero-superior-con-cierre-suave",
    "brand_collection": "Colección 2026",
    "category": "Pantaloneros & Percheros",
    "materials": [
      "Aluminio + hierro"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 198098,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Pantalonero superior con sistema amortiguado."
  },
  {
    "id": "prod-kdj-97",
    "code": "KDJ-97",
    "name": "Elevador de ropa con doble cierre suave · mocha",
    "category_id": "cat-closet-elevadores",
    "category_name": "Elevadores de Ropa",
    "main_collection": "closet",
    "short_description": "Elevador de ropa para aprovechar zonas altas del clóset.",
    "full_description": "Elevador de ropa para aprovechar zonas altas del clóset.",
    "technical_specs": {
      "ref_fabricante": "YG-05-LCH550",
      "aplicacion": "Clóset",
      "modulo": "510-660mm",
      "dimensiones": "450-600 mm",
      "material": "Aluminio + plástico",
      "acabado": "Mocha",
      "configuracion": "Elevador de ropa",
      "mecanismo": "Doble cierre suave",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 510-660mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Elevador de ropa"
      },
      {
        "label": "MATERIAL",
        "value": "Aluminio + plástico"
      },
      {
        "label": "SISTEMA",
        "value": "Doble cierre suave"
      }
    ],
    "price": 181960,
    "stock": 22,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-97.jpg",
    "gallery_urls": [
      "/images/products/kdj-97.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 13,
    "store_stock": 4,
    "web_stock": 5,
    "inventory_status": "in_stock",
    "sku": "YG-05-LCH550",
    "slug": "kdj-97-elevador-de-ropa-con-doble-cierre-suave-mocha",
    "brand_collection": "Colección 2026",
    "category": "Elevadores de Ropa",
    "materials": [
      "Aluminio + plástico"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 160124,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true,
    "description": "Elevador de ropa para aprovechar zonas altas del clóset."
  },
  {
    "id": "prod-kdj-98",
    "code": "KDJ-98",
    "name": "Canasta extraíble de ratán · gris oscuro",
    "category_id": "cat-closet-organizadores",
    "category_name": "Organizadores & Canastas Clóset",
    "main_collection": "closet",
    "short_description": "Canasta extraíble de ratán para almacenamiento en clóset.",
    "full_description": "Canasta extraíble de ratán para almacenamiento en clóset.",
    "technical_specs": {
      "ref_fabricante": "XYH-06-RB600",
      "aplicacion": "Clóset",
      "modulo": "600mm",
      "dimensiones": "564 × 450 × 200 mm",
      "material": "Aluminio + ratán",
      "acabado": "Gris oscuro",
      "configuracion": "Canasta de almacenamiento extraíble",
      "mecanismo": "Sistema amortiguado",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 600mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Canasta de almacenamiento extraíble"
      },
      {
        "label": "MATERIAL",
        "value": "Aluminio + ratán"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema amortiguado"
      }
    ],
    "price": 346574,
    "stock": 15,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-98.jpg",
    "gallery_urls": [
      "/images/products/kdj-98.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 9,
    "store_stock": 3,
    "web_stock": 3,
    "inventory_status": "in_stock",
    "sku": "XYH-06-RB600",
    "slug": "kdj-98-canasta-extraible-de-ratan-gris-oscuro",
    "brand_collection": "Colección 2026",
    "category": "Organizadores & Canastas Clóset",
    "materials": [
      "Aluminio + ratán"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 304985,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Canasta extraíble de ratán para almacenamiento en clóset."
  },
  {
    "id": "prod-kdj-99",
    "code": "KDJ-99",
    "name": "Zapatero giratorio de 12 niveles",
    "category_id": "cat-closet-zapateros",
    "category_name": "Zapateros Giratorios",
    "main_collection": "closet",
    "short_description": "Zapatero giratorio de doce niveles para organización vertical.",
    "full_description": "Zapatero giratorio de doce niveles para organización vertical. Nota: El documento de origen registra la altura como \"H18575-1945\"; el dato presenta una inconsistencia tipográfica y debe confirmarse antes de fabricación o instalación.",
    "technical_specs": {
      "ref_fabricante": "YK-02-RSR12",
      "aplicacion": "Clóset",
      "modulo": "760mm",
      "dimensiones": "680 × 340 × H18575-1945 mm (dato de origen; altura por confirmar)",
      "material": "Hierro + MDF",
      "acabado": "Gris hierro",
      "configuracion": "12 niveles",
      "mecanismo": "Sistema giratorio",
      "nota_tecnica": "El documento de origen registra la altura como \"H18575-1945\"; el dato presenta una inconsistencia tipográfica y debe confirmarse antes de fabricación o instalación.",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 760mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "12 niveles"
      },
      {
        "label": "MATERIAL",
        "value": "Hierro + MDF"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema giratorio"
      }
    ],
    "price": 1185800,
    "stock": 8,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-99.jpg",
    "gallery_urls": [
      "/images/products/kdj-99.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 4,
    "store_stock": 1,
    "web_stock": 3,
    "inventory_status": "in_stock",
    "sku": "YK-02-RSR12",
    "slug": "kdj-99-zapatero-giratorio-de-12-niveles",
    "brand_collection": "Colección 2026",
    "category": "Zapateros Giratorios",
    "materials": [
      "Hierro + MDF"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 1043504,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true,
    "description": "Zapatero giratorio de doce niveles para organización vertical. Nota: El documento de origen registra la altura como \"H18575-1945\"; el dato presenta una inconsistencia tipográfica y debe confirmarse antes de fabricación o instalación."
  },
  {
    "id": "prod-kdj-100",
    "code": "KDJ-100",
    "name": "Cajón con clave revestido en cuero · gris",
    "category_id": "cat-closet-seguridad",
    "category_name": "Cajones con Clave & Relojes",
    "main_collection": "closet",
    "short_description": "Cajón revestido en cuero con sistema de clave para almacenamiento de objetos personales.",
    "full_description": "Cajón revestido en cuero con sistema de clave para almacenamiento de objetos personales.",
    "technical_specs": {
      "ref_fabricante": "07DL-600",
      "aplicacion": "Clóset",
      "modulo": "600mm",
      "dimensiones": "564 × 402 × 152 mm",
      "material": "Cuero",
      "acabado": "Gris",
      "configuracion": "Cajón con clave",
      "mecanismo": "Sistema de bloqueo por clave; mecanismo de corredera no especificado",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 600mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Cajón con clave"
      },
      {
        "label": "MATERIAL",
        "value": "Cuero"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema de bloqueo por clave; mecanismo de corredera no especificado"
      }
    ],
    "price": 1216600,
    "stock": 6,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-100.jpg",
    "gallery_urls": [
      "/images/products/kdj-100.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 3,
    "store_stock": 1,
    "web_stock": 2,
    "inventory_status": "in_stock",
    "sku": "07DL-600",
    "slug": "kdj-100-cajon-con-clave-revestido-en-cuero-gris",
    "brand_collection": "Colección 2026",
    "category": "Cajones con Clave & Relojes",
    "materials": [
      "Cuero"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 1070608,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true,
    "description": "Cajón revestido en cuero con sistema de clave para almacenamiento de objetos personales."
  },
  {
    "id": "prod-kdj-101",
    "code": "KDJ-101",
    "name": "Cajón con clave revestido en cuero · blanco",
    "category_id": "cat-closet-seguridad",
    "category_name": "Cajones con Clave & Relojes",
    "main_collection": "closet",
    "short_description": "Cajón revestido en cuero con sistema de clave para almacenamiento de objetos personales.",
    "full_description": "Cajón revestido en cuero con sistema de clave para almacenamiento de objetos personales.",
    "technical_specs": {
      "ref_fabricante": "07DL-600",
      "aplicacion": "Clóset",
      "modulo": "600mm",
      "dimensiones": "564 × 402 × 152 mm",
      "material": "Cuero",
      "acabado": "Blanco",
      "configuracion": "Cajón con clave",
      "mecanismo": "Sistema de bloqueo por clave; mecanismo de corredera no especificado",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 600mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Cajón con clave"
      },
      {
        "label": "MATERIAL",
        "value": "Cuero"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema de bloqueo por clave; mecanismo de corredera no especificado"
      }
    ],
    "price": 1216600,
    "stock": 5,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-101.jpg",
    "gallery_urls": [
      "/images/products/kdj-101.jpg"
    ],
    "is_featured": false,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 3,
    "store_stock": 1,
    "web_stock": 1,
    "inventory_status": "in_stock",
    "sku": "07DL-600",
    "slug": "kdj-101-cajon-con-clave-revestido-en-cuero-blanco",
    "brand_collection": "Colección 2026",
    "category": "Cajones con Clave & Relojes",
    "materials": [
      "Cuero"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 1070608,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true,
    "description": "Cajón revestido en cuero con sistema de clave para almacenamiento de objetos personales."
  },
  {
    "id": "prod-kdj-102",
    "code": "KDJ-102",
    "name": "Cajón con clave revestido en cuero · naranja",
    "category_id": "cat-closet-seguridad",
    "category_name": "Cajones con Clave & Relojes",
    "main_collection": "closet",
    "short_description": "Cajón revestido en cuero con sistema de clave para almacenamiento de objetos personales.",
    "full_description": "Cajón revestido en cuero con sistema de clave para almacenamiento de objetos personales.",
    "technical_specs": {
      "ref_fabricante": "07DL-600",
      "aplicacion": "Clóset",
      "modulo": "600mm",
      "dimensiones": "564 × 402 × 152 mm",
      "material": "Cuero",
      "acabado": "Naranja",
      "configuracion": "Cajón con clave",
      "mecanismo": "Sistema de bloqueo por clave; mecanismo de corredera no especificado",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 600mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "Cajón con clave"
      },
      {
        "label": "MATERIAL",
        "value": "Cuero"
      },
      {
        "label": "SISTEMA",
        "value": "Sistema de bloqueo por clave; mecanismo de corredera no especificado"
      }
    ],
    "price": 1216600,
    "stock": 4,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-102.jpg",
    "gallery_urls": [
      "/images/products/kdj-102.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 2,
    "store_stock": 0,
    "web_stock": 2,
    "inventory_status": "low_stock",
    "sku": "07DL-600",
    "slug": "kdj-102-cajon-con-clave-revestido-en-cuero-naranja",
    "brand_collection": "Colección 2026",
    "category": "Cajones con Clave & Relojes",
    "materials": [
      "Cuero"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 1070608,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true,
    "description": "Cajón revestido en cuero con sistema de clave para almacenamiento de objetos personales."
  },
  {
    "id": "prod-kdj-103",
    "code": "KDJ-103",
    "name": "Cajón con clave y mecanismo para relojes · 2 niveles, gris",
    "category_id": "cat-closet-seguridad",
    "category_name": "Cajones con Clave & Relojes",
    "main_collection": "closet",
    "short_description": "Cajón con clave y mecanismo para relojes, dispuesto en dos niveles.",
    "full_description": "Cajón con clave y mecanismo para relojes, dispuesto en dos niveles. Nota: KDJ-103 confirmado por Daniel. Altura del conjunto: 401 mm según la importación.",
    "technical_specs": {
      "ref_fabricante": "07WW-803",
      "aplicacion": "Clóset",
      "modulo": "800mm",
      "dimensiones": "760 × 438 × 401 mm",
      "material": "No especificado en el documento de origen",
      "acabado": "Gris",
      "configuracion": "2 niveles",
      "mecanismo": "Cajón con clave y mecanismo para relojes",
      "nota_tecnica": "KDJ-103 confirmado por Daniel. Altura del conjunto: 401 mm según la importación.",
      "nota_imagen": "Imagen del producto según archivo comercial de Montezzi."
    },
    "benefits": [
      {
        "label": "MÓDULO",
        "value": "Módulo 800mm"
      },
      {
        "label": "CONFIGURACIÓN",
        "value": "2 niveles"
      },
      {
        "label": "MATERIAL",
        "value": "No especificado en el documento de origen"
      },
      {
        "label": "SISTEMA",
        "value": "Cajón con clave y mecanismo para relojes"
      }
    ],
    "price": 4737040,
    "stock": 3,
    "min_stock_alert": 3,
    "image_url": "/images/products/kdj-103.jpg",
    "gallery_urls": [
      "/images/products/kdj-103.jpg"
    ],
    "is_featured": true,
    "created_at": "2026-01-10T00:00:00.000Z",
    "warehouse_stock": 1,
    "store_stock": 0,
    "web_stock": 2,
    "inventory_status": "low_stock",
    "sku": "07WW-803",
    "slug": "kdj-103-cajon-con-clave-y-mecanismo-para-relojes-2-niveles-gris",
    "brand_collection": "Colección 2026",
    "category": "Cajones con Clave & Relojes",
    "materials": [
      "No especificado en el documento de origen"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 4168595,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true,
    "description": "Cajón con clave y mecanismo para relojes, dispuesto en dos niveles. Nota: KDJ-103 confirmado por Daniel. Altura del conjunto: 401 mm según la importación."
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    "id": "ORD-2026-001",
    "customer_name": "Arq. Mariana Londoño",
    "customer_email": "mariana@arquitecturacontemporanea.com",
    "customer_phone": "+57 315 987 6543",
    "shipping_address": "Cra 43A # 1Sur-220, El Poblado",
    "city": "Medellín",
    "department": "Antioquia",
    "notes": "Entrega en piso 8, proyecto Penthouse Poblado",
    "total_amount": 4737040,
    "subtotal_amount": 4737040,
    "shipping_cost": 0,
    "status": "aprobado",
    "payment_method": "transferencia",
    "payment_status": "acreditado",
    "tracking_number": "ENV-MED-9941",
    "created_at": "2026-09-14T09:30:00.000Z",
    "items": [
      {
        "product_id": "prod-kdj-103",
        "code": "KDJ-103",
        "name": "Cajón con clave y mecanismo para relojes · 2 niveles, gris",
        "price": 4737040,
        "quantity": 1,
        "image_url": "/images/products/kdj-103.jpg",
        "subtotal": 4737040
      }
    ]
  },
  {
    "id": "ORD-2026-002",
    "customer_name": "Ing. David Osorio",
    "customer_email": "david@mobeldesign.co",
    "customer_phone": "+57 320 876 5432",
    "shipping_address": "Calle 85 # 11-53, Chico Norte",
    "city": "Bogotá D.C.",
    "department": "Cundinamarca",
    "notes": "Despacho directo a taller de carpintería Mobel",
    "total_amount": 2930954,
    "subtotal_amount": 2930954,
    "shipping_cost": 0,
    "status": "enviado",
    "payment_method": "tarjeta",
    "payment_status": "acreditado",
    "tracking_number": "ENV-BOG-4812",
    "created_at": "2026-09-13T16:45:00.000Z",
    "items": [
      {
        "product_id": "prod-kdj-90",
        "code": "KDJ-90",
        "name": "Canasta elevable eléctrica de vidrio",
        "price": 2076254,
        "quantity": 1,
        "image_url": "/images/products/kdj-90.jpg",
        "subtotal": 2076254
      },
      {
        "product_id": "prod-kdj-69",
        "code": "KDJ-69",
        "name": "Alacena en acero al carbono y madera de 6 niveles",
        "price": 854700,
        "quantity": 1,
        "image_url": "/images/products/kdj-69.jpg",
        "subtotal": 854700
      }
    ]
  },
  {
    "id": "ORD-2026-003",
    "customer_name": "Arq. Valentina Vélez",
    "customer_email": "valentina@vertice.com.co",
    "customer_phone": "+57 317 654 9871",
    "shipping_address": "Av. 4 Norte # 19N-40, Granada",
    "city": "Cali",
    "department": "Valle del Cauca",
    "notes": "Instalación en vestidor principal",
    "total_amount": 1535238,
    "subtotal_amount": 1535238,
    "shipping_cost": 0,
    "status": "entregado",
    "payment_method": "transferencia",
    "payment_status": "acreditado",
    "tracking_number": "ENV-CAL-7719",
    "created_at": "2026-09-12T11:20:00.000Z",
    "items": [
      {
        "product_id": "prod-kdj-92",
        "code": "KDJ-92",
        "name": "Joyero extraíble con cierre suave · variante 2",
        "price": 349438,
        "quantity": 1,
        "image_url": "/images/products/kdj-92.jpg",
        "subtotal": 349438
      },
      {
        "product_id": "prod-kdj-99",
        "code": "KDJ-99",
        "name": "Zapatero giratorio de 12 niveles",
        "price": 1185800,
        "quantity": 1,
        "image_url": "/images/products/kdj-99.jpg",
        "subtotal": 1185800
      }
    ]
  },
  {
    "id": "ORD-2026-004",
    "customer_name": "Constructora Bolívar S.A.",
    "customer_email": "compras@constructorabolivar.com",
    "customer_phone": "+57 310 445 6677",
    "shipping_address": "Carrera 53 # 106-280, Villa Santos",
    "city": "Barranquilla",
    "department": "Atlántico",
    "notes": "Lote inicial de esquinas para apartamentos tipo Penthouse",
    "total_amount": 4555320,
    "subtotal_amount": 4555320,
    "shipping_cost": 0,
    "status": "pendiente",
    "payment_method": "transferencia",
    "payment_status": "pendiente_verificacion",
    "created_at": "2026-09-14T08:10:00.000Z",
    "items": [
      {
        "product_id": "prod-kdj-74",
        "code": "KDJ-74",
        "name": "Esquina mágica universal de vidrio",
        "price": 759220,
        "quantity": 6,
        "image_url": "/images/products/kdj-74.jpg",
        "subtotal": 4555320
      }
    ]
  }
];

export const INITIAL_ABANDONED_CARTS: AbandonedCart[] = [
  {
    "id": "AB-CART-001",
    "customer_name": "Arq. Camilo Restrepo",
    "customer_email": "camilo@restrepoarquitectos.com",
    "customer_phone": "+57 316 456 7890",
    "city": "Bogotá D.C.",
    "items": [
      {
        "product_id": "prod-kdj-103",
        "code": "KDJ-103",
        "name": "Cajón con clave y mecanismo para relojes · 2 niveles, gris",
        "price": 4737040,
        "quantity": 1,
        "image_url": "/images/products/kdj-103.jpg",
        "subtotal": 4737040
      }
    ],
    "total_amount": 4737040,
    "created_at": "2026-09-13T14:30:00.000Z",
    "last_activity": "Paso de checkout - Selección de método de pago",
    "status": "abandonado",
    "recovery_notes": "Cliente interesado en acabado nogal para penthouse en Rosales."
  },
  {
    "id": "AB-CART-002",
    "customer_name": "Diseñadora Laura Zuluaga",
    "customer_email": "laura.zuluaga@estudiomadera.co",
    "customer_phone": "+57 301 987 6543",
    "city": "Medellín",
    "items": [
      {
        "product_id": "prod-kdj-90",
        "code": "KDJ-90",
        "name": "Canasta elevable eléctrica de vidrio",
        "price": 2076254,
        "quantity": 1,
        "image_url": "/images/products/kdj-90.jpg",
        "subtotal": 2076254
      },
      {
        "product_id": "prod-kdj-92",
        "code": "KDJ-92",
        "name": "Joyero extraíble con cierre suave · variante 2",
        "price": 349438,
        "quantity": 1,
        "image_url": "/images/products/kdj-92.jpg",
        "subtotal": 349438
      }
    ],
    "total_amount": 2425692,
    "created_at": "2026-09-13T11:15:00.000Z",
    "last_activity": "Revisión de bolsa de compra",
    "status": "contactado",
    "recovery_notes": "Se envió cotización formal con descuento B2B del 10%."
  },
  {
    "id": "AB-CART-003",
    "customer_name": "Mobel Studio S.A.S.",
    "customer_email": "proyectos@mobelstudio.com",
    "customer_phone": "+57 320 112 3344",
    "city": "Barranquilla",
    "items": [
      {
        "product_id": "prod-kdj-69",
        "code": "KDJ-69",
        "name": "Alacena en acero al carbono y madera de 6 niveles",
        "price": 854700,
        "quantity": 1,
        "image_url": "/images/products/kdj-69.jpg",
        "subtotal": 854700
      }
    ],
    "total_amount": 854700,
    "created_at": "2026-09-12T19:40:00.000Z",
    "last_activity": "Ingreso de dirección de despacho",
    "status": "abandonado"
  },
  {
    "id": "AB-CART-004",
    "customer_name": "Ebanistería Los Cedros",
    "customer_email": "taller@loscedros.com.co",
    "customer_phone": "+57 318 654 3210",
    "city": "Pereira",
    "items": [
      {
        "product_id": "prod-kdj-74",
        "code": "KDJ-74",
        "name": "Esquina mágica universal de vidrio",
        "price": 759220,
        "quantity": 1,
        "image_url": "/images/products/kdj-74.jpg",
        "subtotal": 759220
      }
    ],
    "total_amount": 759220,
    "created_at": "2026-09-12T08:20:00.000Z",
    "last_activity": "Checkout completado vía asesor WhatsApp",
    "status": "recuperado",
    "recovery_notes": "Orden convertida a ORD-2026-002."
  }
];

export const INITIAL_PRODUCT_ANALYTICS: ProductClickAnalytics[] = [
  {
    "product_id": "prod-kdj-103",
    "code": "KDJ-103",
    "name": "Cajón con clave y mecanismo para relojes · 2 niveles, gris",
    "category_name": "Cajones con Clave & Relojes",
    "main_collection": "closet",
    "price": 4737040,
    "clicks": 1850,
    "add_to_cart_count": 240,
    "orders_count": 45,
    "image_url": "/images/products/kdj-103.jpg"
  },
  {
    "product_id": "prod-kdj-90",
    "code": "KDJ-90",
    "name": "Canasta elevable eléctrica de vidrio",
    "category_name": "Sistemas Elevables & Loceros",
    "main_collection": "cocina",
    "price": 2076254,
    "clicks": 1420,
    "add_to_cart_count": 210,
    "orders_count": 52,
    "image_url": "/images/products/kdj-90.jpg"
  },
  {
    "product_id": "prod-kdj-69",
    "code": "KDJ-69",
    "name": "Alacena en acero al carbono y madera de 6 niveles",
    "category_name": "Alacenas & Columnas",
    "main_collection": "cocina",
    "price": 854700,
    "clicks": 1150,
    "add_to_cart_count": 185,
    "orders_count": 64,
    "image_url": "/images/products/kdj-69.jpg"
  },
  {
    "product_id": "prod-kdj-92",
    "code": "KDJ-92",
    "name": "Joyero extraíble con cierre suave · variante 2",
    "category_name": "Joyeros & Bandejas",
    "main_collection": "closet",
    "price": 349438,
    "clicks": 980,
    "add_to_cart_count": 160,
    "orders_count": 58,
    "image_url": "/images/products/kdj-92.jpg"
  },
  {
    "product_id": "prod-kdj-74",
    "code": "KDJ-74",
    "name": "Esquina mágica universal de vidrio",
    "category_name": "Esquinas Mágicas",
    "main_collection": "cocina",
    "price": 759220,
    "clicks": 890,
    "add_to_cart_count": 140,
    "orders_count": 48,
    "image_url": "/images/products/kdj-74.jpg"
  },
  {
    "product_id": "prod-kdj-99",
    "code": "KDJ-99",
    "name": "Zapatero giratorio de 12 niveles",
    "category_name": "Zapateros Giratorios",
    "main_collection": "closet",
    "price": 1185800,
    "clicks": 820,
    "add_to_cart_count": 130,
    "orders_count": 36,
    "image_url": "/images/products/kdj-99.jpg"
  },
  {
    "product_id": "prod-kdj-83",
    "code": "KDJ-83",
    "name": "Canasta elevable de vidrio",
    "category_name": "Sistemas Elevables & Loceros",
    "main_collection": "cocina",
    "price": 662732,
    "clicks": 710,
    "add_to_cart_count": 115,
    "orders_count": 38,
    "image_url": "/images/products/kdj-83.jpg"
  },
  {
    "product_id": "prod-kdj-60",
    "code": "KDJ-60",
    "name": "Condimentero lateral de 2 niveles con base de madera",
    "category_name": "Condimenteros & Portaplatos",
    "main_collection": "cocina",
    "price": 210928,
    "clicks": 690,
    "add_to_cart_count": 135,
    "orders_count": 42,
    "image_url": "/images/products/kdj-60.jpg"
  }
];

export const INITIAL_SYSTEM_USERS: SystemUser[] = [
  {
    "id": "usr-admin-01",
    "user_id": "usr-admin-01",
    "full_name": "Carlos Mendoza",
    "email": "admin@montezzi.com",
    "role": "admin",
    "company": "Montezzi Luxury Hardware S.A.S.",
    "phone": "+57 300 123 4567",
    "city": "Medellín",
    "total_orders": 14,
    "total_spent": 12450000,
    "status": "activo",
    "created_at": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "usr-colab-02",
    "user_id": "usr-colab-02",
    "full_name": "Santiago Arango",
    "email": "operaciones@montezzi.com",
    "role": "colaborador",
    "company": "Montezzi Showroom Medellín",
    "phone": "+57 311 234 5678",
    "city": "Medellín",
    "total_orders": 8,
    "total_spent": 4890000,
    "status": "activo",
    "created_at": "2026-02-15T00:00:00.000Z"
  },
  {
    "id": "usr-client-03",
    "user_id": "usr-client-03",
    "full_name": "Arq. Mariana Londoño",
    "email": "mariana@arquitecturacontemporanea.com",
    "role": "cliente",
    "company": "Estudio Londoño Arquitectos",
    "phone": "+57 315 987 6543",
    "city": "Medellín",
    "total_orders": 6,
    "total_spent": 5920000,
    "status": "activo",
    "created_at": "2026-03-10T00:00:00.000Z"
  },
  {
    "id": "usr-client-04",
    "user_id": "usr-client-04",
    "full_name": "Ing. David Osorio",
    "email": "david@mobeldesign.co",
    "role": "cliente",
    "company": "Mobel Design & Woodwork",
    "phone": "+57 320 876 5432",
    "city": "Bogotá D.C.",
    "total_orders": 4,
    "total_spent": 3410000,
    "status": "activo",
    "created_at": "2026-04-12T00:00:00.000Z"
  },
  {
    "id": "usr-client-05",
    "user_id": "usr-client-05",
    "full_name": "Arq. Valentina Vélez",
    "email": "valentina@vertice.com.co",
    "role": "cliente",
    "company": "Taller Vértice Arquitectura",
    "phone": "+57 317 654 9871",
    "city": "Cali",
    "total_orders": 3,
    "total_spent": 2180000,
    "status": "activo",
    "created_at": "2026-05-20T00:00:00.000Z"
  },
  {
    "id": "usr-colab-06",
    "user_id": "usr-colab-06",
    "full_name": "Andrés Felipe Echeverri",
    "email": "asesor1@montezzi.com",
    "role": "colaborador",
    "company": "Montezzi Ventas B2B",
    "phone": "+57 304 333 4455",
    "city": "Medellín",
    "total_orders": 12,
    "total_spent": 8900000,
    "status": "activo",
    "created_at": "2026-06-01T00:00:00.000Z"
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    "id": "cpn-001",
    "code": "BIENVENIDO10",
    "discount_type": "percentage",
    "discount_value": 10,
    "min_purchase": 300000,
    "expiry_date": "2026-12-31T23:59:59.000Z",
    "usage_count": 14,
    "is_active": true,
    "created_at": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cpn-002",
    "code": "ARQUITECTURA50K",
    "discount_type": "fixed",
    "discount_value": 50000,
    "min_purchase": 500000,
    "expiry_date": "2026-12-31T23:59:59.000Z",
    "usage_count": 8,
    "is_active": true,
    "created_at": "2026-02-01T00:00:00.000Z"
  },
  {
    "id": "cpn-003",
    "code": "VIPMONTEZZI",
    "discount_type": "percentage",
    "discount_value": 15,
    "min_purchase": 1000000,
    "expiry_date": "2026-12-31T23:59:59.000Z",
    "usage_count": 5,
    "is_active": true,
    "created_at": "2026-03-01T00:00:00.000Z"
  }
];

export const INITIAL_REVIEWS: ProductReview[] = [
  {
    "id": "rev-001",
    "product_id": "prod-kdj-103",
    "user_name": "Arq. Camilo Restrepo",
    "user_email": "camilo@restrepoarquitectos.com",
    "rating": 5,
    "title": "Ingeniería y seguridad impecables",
    "comment": "Instalamos este cajón con watch winder en el penthouse de Los Rosales. El nivel de acabado del cuero cosido y la suavidad del rotor para los relojes automáticos superó las expectativas del cliente.",
    "status": "approved",
    "created_at": "2026-08-15T10:30:00.000Z"
  },
  {
    "id": "rev-002",
    "product_id": "prod-kdj-90",
    "user_name": "Diseñadora Laura Zuluaga",
    "user_email": "laura.zuluaga@estudiomadera.co",
    "rating": 5,
    "title": "Mecanismo silencioso de altísima gama",
    "comment": "La canasta elevable eléctrica de vidrio le dio un toque futurista y muy elegante a la cocina de exhibición. El sensor touch y la parada suave funcionan perfecto.",
    "status": "approved",
    "created_at": "2026-08-20T14:15:00.000Z"
  },
  {
    "id": "rev-003",
    "product_id": "prod-kdj-69",
    "user_name": "Ing. David Osorio",
    "user_email": "david@mobeldesign.co",
    "rating": 5,
    "title": "Estructura robusta y madera natural exquisita",
    "comment": "Excelente alacena de 6 niveles. La combinación entre acero grafito y repisas de madera cálida es perfecta para proyectos de cocinas contemporáneas.",
    "status": "approved",
    "created_at": "2026-08-28T09:45:00.000Z"
  },
  {
    "id": "rev-004",
    "product_id": "prod-kdj-92",
    "user_name": "Arq. Valentina Vélez",
    "user_email": "valentina@vertice.com.co",
    "rating": 5,
    "title": "Tacto de terciopelo y división milimétrica",
    "comment": "La bandeja joyero para clóset tiene una corredera sincronizada de extracción total sin ruido. Excelente producto.",
    "status": "approved",
    "created_at": "2026-09-02T16:20:00.000Z"
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    "id": "apt-001",
    "customer_name": "Arq. Mariana Londoño",
    "customer_email": "mariana@arquitecturacontemporanea.com",
    "customer_phone": "+57 315 987 6543",
    "service_type": "Asesoría en Showroom Medellín",
    "appointment_date": "2026-11-15",
    "appointment_time": "10:00 AM",
    "city": "Medellín",
    "address": "Showroom Montezzi - Cra 43A El Poblado",
    "price": 0,
    "status": "confirmed",
    "payment_status": "paid",
    "notes": "Revisión técnica de muestras para proyecto residencial en Llanogrande.",
    "created_at": "2026-11-05T10:00:00.000Z"
  },
  {
    "id": "apt-002",
    "customer_name": "Ing. David Osorio",
    "customer_email": "david@mobeldesign.co",
    "customer_phone": "+57 320 876 5432",
    "service_type": "Diseño Virtual & Cotización B2B",
    "appointment_date": "2026-11-18",
    "appointment_time": "03:00 PM",
    "city": "Bogotá D.C.",
    "price": 0,
    "status": "confirmed",
    "payment_status": "paid",
    "notes": "Planos y despiece para 12 módulos de cocinas con canastas elevables y esquinas mágicas.",
    "created_at": "2026-11-06T15:30:00.000Z"
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    "id": "log-001",
    "user_id": "usr-admin-01",
    "user_name": "Carlos Mendoza",
    "user_email": "admin@montezzi.com",
    "entity_type": "product",
    "entity_id": "prod-kdj-103",
    "entity_name": "KDJ-103 · Cajón con clave y watch winder",
    "action": "stock_adjustment",
    "description": "Ajuste de inventario multicanal: Bodega Principal (2 unids), Showroom (1 unid). Total: 3 unids.",
    "details": { "warehouse_stock": 2, "store_stock": 1, "web_stock": 0, "total": 3 },
    "created_at": "2026-11-08T09:15:00.000Z"
  },
  {
    "id": "log-002",
    "user_id": "usr-admin-01",
    "user_name": "Carlos Mendoza",
    "user_email": "admin@montezzi.com",
    "entity_type": "order",
    "entity_id": "ORD-2026-001",
    "entity_name": "Orden ORD-2026-001",
    "action": "siigo_sync",
    "description": "Emisión exitosa de Factura Electrónica FEF-19 ante DIAN. CUFE generado.",
    "details": { "siigo_invoice_number": "FEF-19", "cufe": "a89f4b3c92e10f8821d3e4b7c89a0123fe56d78b" },
    "created_at": "2026-11-08T11:40:00.000Z"
  },
  {
    "id": "log-003",
    "user_id": "usr-colab-02",
    "user_name": "Santiago Arango",
    "user_email": "operaciones@montezzi.com",
    "entity_type": "product",
    "entity_id": "prod-kdj-90",
    "entity_name": "KDJ-90 · Canasta elevable eléctrica",
    "action": "update",
    "description": "Actualización de ficha técnica y asignación de stock web.",
    "details": { "web_stock": 2 },
    "created_at": "2026-11-08T14:20:00.000Z"
  }
];

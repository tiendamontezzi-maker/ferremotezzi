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
    "name": "Condimentero lateral de 2 niveles con base de madera",
    "category_id": "cat-cocina-condimenteros",
    "category_name": "Condimenteros & Portaplatos",
    "main_collection": "cocina",
    "short_description": "Condimentero lateral extraíble de dos niveles con elegante base de madera cálida y guías telescópicas con amortiguación.",
    "full_description": "Condimentero lateral de 2 niveles con base de madera perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 200mm, dimensiones de 145 × 480 × 590 mm y capacidad de 20 kg.",
    "technical_specs": {
      "material": "Acero al carbono y madera noble tratada",
      "acabado": "Pintura electrostática gris grafito y madera natural",
      "dimensiones": "145 × 480 × 590 mm",
      "mecanismo": "Extracción lateral sincronizada con cierre suave",
      "modulo": "200mm",
      "capacidad_carga": "20 kg",
      "compatibilidad": "Diseñado para módulo de 200mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero al carbono y madera noble tratada"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 200mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 20 kg"
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
    "sku": "KDJ-60",
    "slug": "kdj-60-condimentero-lateral-de-2-niveles-con-base-de-madera",
    "brand_collection": "Colección 2026",
    "category": "Condimenteros & Portaplatos",
    "materials": [
      "Acero al carbono y madera noble tratada"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 185616,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-61",
    "code": "KDJ-61",
    "name": "Condimentero lateral de 2 niveles en acero al carbono",
    "category_id": "cat-cocina-condimenteros",
    "category_name": "Condimenteros & Portaplatos",
    "main_collection": "cocina",
    "short_description": "Condimentero de arquitectura minimalista en acero al carbono reforzado, máxima durabilidad y extracción total silenciosa.",
    "full_description": "Condimentero lateral de 2 niveles en acero al carbono perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 300mm, dimensiones de 249 × 480 × 592 mm y capacidad de 25 kg.",
    "technical_specs": {
      "material": "Acero al carbono de alto calibre",
      "acabado": "Antracita mate microtexturado",
      "dimensiones": "249 × 480 × 592 mm",
      "mecanismo": "Correderas ocultas de extracción total con freno hidráulico",
      "modulo": "300mm",
      "capacidad_carga": "25 kg",
      "compatibilidad": "Diseñado para módulo de 300mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero al carbono de alto calibre"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 300mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 25 kg"
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
    "sku": "KDJ-61",
    "slug": "kdj-61-condimentero-lateral-de-2-niveles-en-acero-al-carbono",
    "brand_collection": "Colección 2026",
    "category": "Condimenteros & Portaplatos",
    "materials": [
      "Acero al carbono de alto calibre"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 229372,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-62",
    "code": "KDJ-62",
    "name": "Condimentero lateral de vidrio de 3 niveles",
    "category_id": "cat-cocina-condimenteros",
    "category_name": "Condimenteros & Portaplatos",
    "main_collection": "cocina",
    "short_description": "Organizador vertical de 3 niveles con laterales en vidrio templado traslúcido y estructura metálica ultra delgada.",
    "full_description": "Condimentero lateral de vidrio de 3 niveles perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 200mm, dimensiones de 149 × 480 × 672 mm y capacidad de 20 kg.",
    "technical_specs": {
      "material": "Vidrio templado de seguridad y aluminio arquitectónico",
      "acabado": "Vidrio ahumado y perfilería grafito",
      "dimensiones": "149 × 480 × 672 mm",
      "mecanismo": "Guías de amortiguación inferior cierre suave",
      "modulo": "200mm",
      "capacidad_carga": "20 kg",
      "compatibilidad": "Diseñado para módulo de 200mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Vidrio templado de seguridad y aluminio arquitectónico"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 200mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 20 kg"
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
    "sku": "KDJ-62",
    "slug": "kdj-62-condimentero-lateral-de-vidrio-de-3-niveles",
    "brand_collection": "Colección 2026",
    "category": "Condimenteros & Portaplatos",
    "materials": [
      "Vidrio templado de seguridad y aluminio arquitectónico"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 240683,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-63",
    "code": "KDJ-63",
    "name": "Condimentero multifunción de vidrio de 3 niveles",
    "category_id": "cat-cocina-condimenteros",
    "category_name": "Condimenteros & Portaplatos",
    "main_collection": "cocina",
    "short_description": "Sistema multifunción de tres niveles con divisiones técnicas para frascos, especias y utensilios culinarios.",
    "full_description": "Condimentero multifunción de vidrio de 3 niveles perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 350mm, dimensiones de 300 × 435 × 495 mm y capacidad de 30 kg.",
    "technical_specs": {
      "material": "Vidrio templado y acero inoxidable",
      "acabado": "Cristal templado y marco titanio oscuro",
      "dimensiones": "300 × 435 × 495 mm",
      "mecanismo": "Sistema de extracción frontal con frenado de aire",
      "modulo": "350mm",
      "capacidad_carga": "30 kg",
      "compatibilidad": "Diseñado para módulo de 350mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Vidrio templado y acero inoxidable"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 350mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 30 kg"
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
    "sku": "KDJ-63",
    "slug": "kdj-63-condimentero-multifuncion-de-vidrio-de-3-niveles",
    "brand_collection": "Colección 2026",
    "category": "Condimenteros & Portaplatos",
    "materials": [
      "Vidrio templado y acero inoxidable"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 327954,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-64",
    "code": "KDJ-64",
    "name": "Condimentero estrecho tipo A de 2 niveles",
    "category_id": "cat-cocina-condimenteros",
    "category_name": "Condimenteros & Portaplatos",
    "main_collection": "cocina",
    "short_description": "Solución compacta de 2 niveles diseñada para optimizar módulos ultra estrechos de cocina con aprovechamiento total.",
    "full_description": "Condimentero estrecho tipo A de 2 niveles perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 150mm, dimensiones de 95 × 450 × 500 mm y capacidad de 15 kg.",
    "technical_specs": {
      "material": "Acero cromado anticorrosivo",
      "acabado": "Cromo brillante multicapa",
      "dimensiones": "95 × 450 × 500 mm",
      "mecanismo": "Correderas de montaje lateral con cierre suave",
      "modulo": "150mm",
      "capacidad_carga": "15 kg",
      "compatibilidad": "Diseñado para módulo de 150mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero cromado anticorrosivo"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 150mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 15 kg"
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
    "sku": "KDJ-64",
    "slug": "kdj-64-condimentero-estrecho-tipo-a-de-2-niveles",
    "brand_collection": "Colección 2026",
    "category": "Condimenteros & Portaplatos",
    "materials": [
      "Acero cromado anticorrosivo"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 140805,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-65",
    "code": "KDJ-65",
    "name": "Condimentero estrecho tipo B de 2 niveles",
    "category_id": "cat-cocina-condimenteros",
    "category_name": "Condimenteros & Portaplatos",
    "main_collection": "cocina",
    "short_description": "Diseño ergonómico tipo B con bandejas profundas para envases de aceite y vinagre en módulos compactos.",
    "full_description": "Condimentero estrecho tipo B de 2 niveles perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 150mm, dimensiones de 108 × 460 × 480 mm y capacidad de 15 kg.",
    "technical_specs": {
      "material": "Acero al carbono termolacado",
      "acabado": "Gris titanio",
      "dimensiones": "108 × 460 × 480 mm",
      "mecanismo": "Rieles laterales sincronizados",
      "modulo": "150mm",
      "capacidad_carga": "15 kg",
      "compatibilidad": "Diseñado para módulo de 150mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero al carbono termolacado"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 150mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 15 kg"
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
    "sku": "KDJ-65",
    "slug": "kdj-65-condimentero-estrecho-tipo-b-de-2-niveles",
    "brand_collection": "Colección 2026",
    "category": "Condimenteros & Portaplatos",
    "materials": [
      "Acero al carbono termolacado"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 124542,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-66",
    "code": "KDJ-66",
    "name": "Condimentero estrecho tipo C de 3 niveles",
    "category_id": "cat-cocina-condimenteros",
    "category_name": "Condimenteros & Portaplatos",
    "main_collection": "cocina",
    "short_description": "Tres alturas de almacenamiento optimizadas para botellas, salsas y frascos de especias en un ancho de solo 150mm.",
    "full_description": "Condimentero estrecho tipo C de 3 niveles perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 150mm, dimensiones de 110 × 460 × 475 mm y capacidad de 18 kg.",
    "technical_specs": {
      "material": "Alambre de acero estructural",
      "acabado": "Gris electrostático premium",
      "dimensiones": "110 × 460 × 475 mm",
      "mecanismo": "Guías con absorción de impacto",
      "modulo": "150mm",
      "capacidad_carga": "18 kg",
      "compatibilidad": "Diseñado para módulo de 150mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Alambre de acero estructural"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 150mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 18 kg"
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
    "sku": "KDJ-66",
    "slug": "kdj-66-condimentero-estrecho-tipo-c-de-3-niveles",
    "brand_collection": "Colección 2026",
    "category": "Condimenteros & Portaplatos",
    "materials": [
      "Alambre de acero estructural"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 121832,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-67",
    "code": "KDJ-67",
    "name": "Condimentero de alambre de 3 niveles",
    "category_id": "cat-cocina-condimenteros",
    "category_name": "Condimenteros & Portaplatos",
    "main_collection": "cocina",
    "short_description": "Condimentero robusto de alambre estructurado en 3 niveles para módulo de 300mm con bandejas de alambre calibrado.",
    "full_description": "Condimentero de alambre de 3 niveles perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 300mm, dimensiones de 245 × 460 × 515 mm y capacidad de 25 kg.",
    "technical_specs": {
      "material": "Alambre de acero tratado",
      "acabado": "Pintura epoxi antracita",
      "dimensiones": "245 × 460 × 515 mm",
      "mecanismo": "Extracción total con cierre silencioso",
      "modulo": "300mm",
      "capacidad_carga": "25 kg",
      "compatibilidad": "Diseñado para módulo de 300mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Alambre de acero tratado"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 300mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 25 kg"
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
    "sku": "KDJ-67",
    "slug": "kdj-67-condimentero-de-alambre-de-3-niveles",
    "brand_collection": "Colección 2026",
    "category": "Condimenteros & Portaplatos",
    "materials": [
      "Alambre de acero tratado"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 285491,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-68",
    "code": "KDJ-68",
    "name": "Alacena de alambre de 6 niveles",
    "category_id": "cat-cocina-alacenas",
    "category_name": "Alacenas & Columnas",
    "main_collection": "cocina",
    "short_description": "Columna de despensa de piso a techo con 6 canastas de alambre regulables en altura y apertura frontal integrada.",
    "full_description": "Alacena de alambre de 6 niveles perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 450mm, dimensiones de 391 × 512 × (1920-2220) mm y capacidad de 70 kg.",
    "technical_specs": {
      "material": "Marco de acero estructural y canastas de alambre reforzado",
      "acabado": "Gris grafito texturado",
      "dimensiones": "391 × 512 × (1920-2220) mm",
      "mecanismo": "Sistema tandem de apertura telescópica con amortiguador de alta carga",
      "modulo": "450mm",
      "capacidad_carga": "70 kg",
      "compatibilidad": "Diseñado para módulo de 450mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Marco de acero estructural y canastas de alambre reforzado"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 450mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 70 kg"
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
    "sku": "KDJ-68",
    "slug": "kdj-68-alacena-de-alambre-de-6-niveles",
    "brand_collection": "Colección 2026",
    "category": "Alacenas & Columnas",
    "materials": [
      "Marco de acero estructural y canastas de alambre reforzado"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 552921,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-69",
    "code": "KDJ-69",
    "name": "Alacena en acero al carbono y madera de 6 niveles",
    "category_id": "cat-cocina-alacenas",
    "category_name": "Alacenas & Columnas",
    "main_collection": "cocina",
    "short_description": "Columna alacena arquitectónica de lujo con 6 bandejas en chapa de madera cálida sobre estructura de acero al carbono.",
    "full_description": "Alacena en acero al carbono y madera de 6 niveles perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 450mm, dimensiones de 391 × 512 × (1920-2220) mm y capacidad de 80 kg.",
    "technical_specs": {
      "material": "Acero al carbono y madera natural sellada",
      "acabado": "Negro mate y roble natural",
      "dimensiones": "391 × 512 × (1920-2220) mm",
      "mecanismo": "Telescópico de alta capacidad con soft close progresivo",
      "modulo": "450mm",
      "capacidad_carga": "80 kg",
      "compatibilidad": "Diseñado para módulo de 450mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero al carbono y madera natural sellada"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 450mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 80 kg"
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
    "sku": "KDJ-69",
    "slug": "kdj-69-alacena-en-acero-al-carbono-y-madera-de-6-niveles",
    "brand_collection": "Colección 2026",
    "category": "Alacenas & Columnas",
    "materials": [
      "Acero al carbono y madera natural sellada"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 752136,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-70",
    "code": "KDJ-70",
    "name": "Alacena de vidrio de 6 niveles",
    "category_id": "cat-cocina-alacenas",
    "category_name": "Alacenas & Columnas",
    "main_collection": "cocina",
    "short_description": "La cúspide de la despensa moderna: 6 bandejas en vidrio templado de seguridad con perfiles perimetrales en aluminio anodizado.",
    "full_description": "Alacena de vidrio de 6 niveles perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 450mm, dimensiones de 391 × 512 × (1920-2220) mm y capacidad de 80 kg.",
    "technical_specs": {
      "material": "Vidrio templado ahumado y perfil de aluminio anodizado",
      "acabado": "Cristal ahumado y marco antracita",
      "dimensiones": "391 × 512 × (1920-2220) mm",
      "mecanismo": "Eje deslizante sincronizado para servicio pesado",
      "modulo": "450mm",
      "capacidad_carga": "80 kg",
      "compatibilidad": "Diseñado para módulo de 450mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Vidrio templado ahumado y perfil de aluminio anodizado"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 450mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 80 kg"
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
    "sku": "KDJ-70",
    "slug": "kdj-70-alacena-de-vidrio-de-6-niveles",
    "brand_collection": "Colección 2026",
    "category": "Alacenas & Columnas",
    "materials": [
      "Vidrio templado ahumado y perfil de aluminio anodizado"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 910694,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-71",
    "code": "KDJ-71",
    "name": "Alacena extraíble de vidrio de 6 niveles",
    "category_id": "cat-cocina-alacenas",
    "category_name": "Alacenas & Columnas",
    "main_collection": "cocina",
    "short_description": "Columna extraíble esbelta de 6 niveles con laterales de cristal para módulo de 200mm, máxima visibilidad y distinción.",
    "full_description": "Alacena extraíble de vidrio de 6 niveles perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 200mm, dimensiones de 140 × 485 × (1800-2100) mm y capacidad de 50 kg.",
    "technical_specs": {
      "material": "Vidrio de seguridad y guías metálicas de precisión",
      "acabado": "Vidrio satinado y metal titanio",
      "dimensiones": "140 × 485 × (1800-2100) mm",
      "mecanismo": "Rieles superior e inferior con sincronización",
      "modulo": "200mm",
      "capacidad_carga": "50 kg",
      "compatibilidad": "Diseñado para módulo de 200mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Vidrio de seguridad y guías metálicas de precisión"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 200mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 50 kg"
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
    "sku": "KDJ-71",
    "slug": "kdj-71-alacena-extraible-de-vidrio-de-6-niveles",
    "brand_collection": "Colección 2026",
    "category": "Alacenas & Columnas",
    "materials": [
      "Vidrio de seguridad y guías metálicas de precisión"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 758912,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-72",
    "code": "KDJ-72",
    "name": "Alacena extraíble de alambre de 6 niveles",
    "category_id": "cat-cocina-alacenas",
    "category_name": "Alacenas & Columnas",
    "main_collection": "cocina",
    "short_description": "Sistema despensero vertical para espacios reducidos con 6 niveles de alambre y extracción frontal lineal suave.",
    "full_description": "Alacena extraíble de alambre de 6 niveles perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 200mm, dimensiones de 140 × 485 × (1800-2100) mm y capacidad de 45 kg.",
    "technical_specs": {
      "material": "Acero al carbono cromado",
      "acabado": "Cromo de alto brillo",
      "dimensiones": "140 × 485 × (1800-2100) mm",
      "mecanismo": "Doble riel de rodamientos de bolas con amortiguación",
      "modulo": "200mm",
      "capacidad_carga": "45 kg",
      "compatibilidad": "Diseñado para módulo de 200mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero al carbono cromado"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 200mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 45 kg"
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
    "sku": "KDJ-72",
    "slug": "kdj-72-alacena-extraible-de-alambre-de-6-niveles",
    "brand_collection": "Colección 2026",
    "category": "Alacenas & Columnas",
    "materials": [
      "Acero al carbono cromado"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 664048,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-73",
    "code": "KDJ-73",
    "name": "Alacena extraíble en acero al carbono y madera de 6 niveles",
    "category_id": "cat-cocina-alacenas",
    "category_name": "Alacenas & Columnas",
    "main_collection": "cocina",
    "short_description": "Armonía de calidez de madera y solidez estructural en acero con 6 repisas extraíbles para módulo de 300mm.",
    "full_description": "Alacena extraíble en acero al carbono y madera de 6 niveles perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 300mm, dimensiones de 240 × 485 × (1800-2100) mm y capacidad de 60 kg.",
    "technical_specs": {
      "material": "Acero al carbono electrostático y madera natural",
      "acabado": "Grafito mate y base en madera noble",
      "dimensiones": "240 × 485 × (1800-2100) mm",
      "mecanismo": "Extracción total silenciosa de alta resistencia",
      "modulo": "300mm",
      "capacidad_carga": "60 kg",
      "compatibilidad": "Diseñado para módulo de 300mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero al carbono electrostático y madera natural"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 300mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 60 kg"
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
    "sku": "KDJ-73",
    "slug": "kdj-73-alacena-extraible-en-acero-al-carbono-y-madera-de-6-niveles",
    "brand_collection": "Colección 2026",
    "category": "Alacenas & Columnas",
    "materials": [
      "Acero al carbono electrostático y madera natural"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 798212,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-74",
    "code": "KDJ-74",
    "name": "Esquina mágica universal de vidrio",
    "category_id": "cat-cocina-esquinas",
    "category_name": "Esquinas Mágicas",
    "main_collection": "cocina",
    "short_description": "Mecanismo angular inteligente que extrae el 100% del contenido de rincones ciegos, con bandejas en elegante vidrio.",
    "full_description": "Esquina mágica universal de vidrio perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 800-900mm, dimensiones de 648 × 462 × 585 mm y capacidad de 35 kg total (8-10 kg por canasta).",
    "technical_specs": {
      "material": "Vidrio templado y articulaciones en fundición de acero",
      "acabado": "Vidrio ahumado y perfilería grafito mate",
      "dimensiones": "648 × 462 × 585 mm",
      "mecanismo": "Brazo cinemático articulado universal (izquierda o derecha) con freno suave",
      "modulo": "800-900mm",
      "capacidad_carga": "35 kg total (8-10 kg por canasta)",
      "compatibilidad": "Diseñado para módulo de 800-900mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Vidrio templado y articulaciones en fundición de acero"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 800-900mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 35 kg total (8-10 kg por canasta)"
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
    "sku": "KDJ-74",
    "slug": "kdj-74-esquina-magica-universal-de-vidrio",
    "brand_collection": "Colección 2026",
    "category": "Esquinas Mágicas",
    "materials": [
      "Vidrio templado y articulaciones en fundición de acero"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 668113,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-75",
    "code": "KDJ-75",
    "name": "Esquina mágica universal de alambre",
    "category_id": "cat-cocina-esquinas",
    "category_name": "Esquinas Mágicas",
    "main_collection": "cocina",
    "short_description": "Aprovechamiento integral para esquineros ciegos con 4 canastas de alambre perimetral y apertura articulada sincronizada.",
    "full_description": "Esquina mágica universal de alambre perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 800-900mm, dimensiones de 648 × 462 × 585 mm y capacidad de 35 kg total.",
    "technical_specs": {
      "material": "Alambre de acero electropulido",
      "acabado": "Cromo brillante anticorrosión",
      "dimensiones": "648 × 462 × 585 mm",
      "mecanismo": "Articulación telescópica universal ambidiestra",
      "modulo": "800-900mm",
      "capacidad_carga": "35 kg total",
      "compatibilidad": "Diseñado para módulo de 800-900mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Alambre de acero electropulido"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 800-900mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 35 kg total"
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
    "sku": "KDJ-75",
    "slug": "kdj-75-esquina-magica-universal-de-alambre",
    "brand_collection": "Colección 2026",
    "category": "Esquinas Mágicas",
    "materials": [
      "Alambre de acero electropulido"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 558748,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-76",
    "code": "KDJ-76",
    "name": "Esquina mágica universal en acero al carbono y madera",
    "category_id": "cat-cocina-esquinas",
    "category_name": "Esquinas Mágicas",
    "main_collection": "cocina",
    "short_description": "Mecanismo esquinero de alta gama con bandejas de base en madera sellada y barandas en chapa de acero al carbono.",
    "full_description": "Esquina mágica universal en acero al carbono y madera perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 800-900mm, dimensiones de 648 × 462 × 585 mm y capacidad de 40 kg total.",
    "technical_specs": {
      "material": "Acero al carbono y madera contrachapada tratada",
      "acabado": "Negro mate arquitectónico y fondo madera",
      "dimensiones": "648 × 462 × 585 mm",
      "mecanismo": "Cinemática sincronizada de salida frontal completa con amortiguador",
      "modulo": "800-900mm",
      "capacidad_carga": "40 kg total",
      "compatibilidad": "Diseñado para módulo de 800-900mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero al carbono y madera contrachapada tratada"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 800-900mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 40 kg total"
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
    "sku": "KDJ-76",
    "slug": "kdj-76-esquina-magica-universal-en-acero-al-carbono-y-madera",
    "brand_collection": "Colección 2026",
    "category": "Esquinas Mágicas",
    "materials": [
      "Acero al carbono y madera contrachapada tratada"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 669276,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-77",
    "code": "KDJ-77",
    "name": "Esquina mágica giratoria derecha o izquierda",
    "category_id": "cat-cocina-esquinas",
    "category_name": "Esquinas Mágicas",
    "main_collection": "cocina",
    "short_description": "Bandejas giratorias independientes tipo riñón que se deslizan suavemente fuera del mueble con movimiento curvo ergonómico.",
    "full_description": "Esquina mágica giratoria derecha o izquierda perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 900-1000mm, dimensiones de 760 × 500 × 530 mm y capacidad de 20 kg por bandeja.",
    "technical_specs": {
      "material": "Bandejas con base de textura antideslizante y borde de acero",
      "acabado": "Antracita mate y cromo satinado",
      "dimensiones": "760 × 500 × 530 mm",
      "mecanismo": "Giro axial independiente de 180° con auto-freno de posicionamiento",
      "modulo": "900-1000mm",
      "capacidad_carga": "20 kg por bandeja",
      "compatibilidad": "Diseñado para módulo de 900-1000mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Bandejas con base de textura antideslizante y borde de acero"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 900-1000mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 20 kg por bandeja"
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
    "sku": "KDJ-77",
    "slug": "kdj-77-esquina-magica-giratoria-derecha-o-izquierda",
    "brand_collection": "Colección 2026",
    "category": "Esquinas Mágicas",
    "materials": [
      "Bandejas con base de textura antideslizante y borde de acero"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 772356,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-198",
    "code": "KDJ-198",
    "name": "Juego de condimenteros extraíbles SS201: plano y portaplatos",
    "category_id": "cat-cocina-condimenteros",
    "category_name": "Condimenteros & Portaplatos",
    "main_collection": "cocina",
    "short_description": "Set dual de gavetas extraíbles en acero inoxidable SS201: bandeja inferior plana y nivel superior con soporte portaplatos.",
    "full_description": "Juego de condimenteros extraíbles SS201: plano y portaplatos perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 600mm, dimensiones de 564 × 425 × 165 mm y capacidad de 30 kg.",
    "technical_specs": {
      "material": "Acero Inoxidable SS201 de grado sanitario",
      "acabado": "Acero pulido satinado",
      "dimensiones": "564 × 425 × 165 mm",
      "mecanismo": "Rieles de montaje inferior con cierre amortiguado",
      "modulo": "600mm",
      "capacidad_carga": "30 kg",
      "compatibilidad": "Diseñado para módulo de 600mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero Inoxidable SS201 de grado sanitario"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 600mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 30 kg"
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
    "sku": "KDJ-198",
    "slug": "kdj-198-juego-de-condimenteros-extraibles-ss201-plano-y-portaplatos",
    "brand_collection": "Colección 2026",
    "category": "Condimenteros & Portaplatos",
    "materials": [
      "Acero Inoxidable SS201 de grado sanitario"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 346660,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-199",
    "code": "KDJ-199",
    "name": "Juego de condimenteros extraíbles SS201: plano y portaplatos",
    "category_id": "cat-cocina-condimenteros",
    "category_name": "Condimenteros & Portaplatos",
    "main_collection": "cocina",
    "short_description": "Juego de gavetas organizadoras en inoxidable para módulo de 700mm, con distribución técnica para vajilla y ollas.",
    "full_description": "Juego de condimenteros extraíbles SS201: plano y portaplatos perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 700mm, dimensiones de 664 × 425 × 165 mm y capacidad de 35 kg.",
    "technical_specs": {
      "material": "Acero Inoxidable SS201",
      "acabado": "Acero pulido satinado",
      "dimensiones": "664 × 425 × 165 mm",
      "mecanismo": "Correderas ocultas de extracción total",
      "modulo": "700mm",
      "capacidad_carga": "35 kg",
      "compatibilidad": "Diseñado para módulo de 700mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero Inoxidable SS201"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 700mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 35 kg"
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
    "sku": "KDJ-199",
    "slug": "kdj-199-juego-de-condimenteros-extraibles-ss201-plano-y-portaplatos",
    "brand_collection": "Colección 2026",
    "category": "Condimenteros & Portaplatos",
    "materials": [
      "Acero Inoxidable SS201"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 377423,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-200",
    "code": "KDJ-200",
    "name": "Juego de condimenteros extraíbles SS201: plano y portaplatos",
    "category_id": "cat-cocina-condimenteros",
    "category_name": "Condimenteros & Portaplatos",
    "main_collection": "cocina",
    "short_description": "Set de gran formato para módulo de 800mm en inoxidable SS201, capacidad para servicio completo de banquetería.",
    "full_description": "Juego de condimenteros extraíbles SS201: plano y portaplatos perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 800mm, dimensiones de 764 × 425 × 165 mm y capacidad de 45 kg.",
    "technical_specs": {
      "material": "Acero Inoxidable SS201 reforzado",
      "acabado": "Satinado premium anti-huellas",
      "dimensiones": "764 × 425 × 165 mm",
      "mecanismo": "Rieles para alta carga con amortiguación hidráulica",
      "modulo": "800mm",
      "capacidad_carga": "45 kg",
      "compatibilidad": "Diseñado para módulo de 800mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero Inoxidable SS201 reforzado"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 800mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 45 kg"
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
    "sku": "KDJ-200",
    "slug": "kdj-200-juego-de-condimenteros-extraibles-ss201-plano-y-portaplatos",
    "brand_collection": "Colección 2026",
    "category": "Condimenteros & Portaplatos",
    "materials": [
      "Acero Inoxidable SS201 reforzado"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 4104900,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-78",
    "code": "KDJ-78",
    "name": "Basurero doble con tapa de 20 + 20 litros",
    "category_id": "cat-cocina-basureros",
    "category_name": "Basureros Ecológicos",
    "main_collection": "cocina",
    "short_description": "Estación de reciclaje bajo mesón con dos baldes de 20L cada uno, tapa hermética fija que sella olores al cerrar la puerta.",
    "full_description": "Basurero doble con tapa de 20 + 20 litros perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 400mm, dimensiones de 335 × 500 × 470 mm y capacidad de 40 L capacidad / 25 kg carga.",
    "technical_specs": {
      "material": "Polímero técnico lavable y chasis de acero",
      "acabado": "Gris neutro y tapa grafito",
      "dimensiones": "335 × 500 × 470 mm",
      "mecanismo": "Extracción frontal automática con cierre suave",
      "modulo": "400mm",
      "capacidad_carga": "40 L capacidad / 25 kg carga",
      "compatibilidad": "Diseñado para módulo de 400mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Polímero técnico lavable y chasis de acero"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 400mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 40 L capacidad / 25 kg carga"
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
    "sku": "KDJ-78",
    "slug": "kdj-78-basurero-doble-con-tapa-de-20-20-litros",
    "brand_collection": "Colección 2026",
    "category": "Basureros Ecológicos",
    "materials": [
      "Polímero técnico lavable y chasis de acero"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 233094,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-79",
    "code": "KDJ-79",
    "name": "Basurero doble gris de 10 + 20 litros",
    "category_id": "cat-cocina-basureros",
    "category_name": "Basureros Ecológicos",
    "main_collection": "cocina",
    "short_description": "Basurero ecológico asimétrico (10L + 20L) diseñado para separación selectiva en gabinetes estándar de 300mm.",
    "full_description": "Basurero doble gris de 10 + 20 litros perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 300mm, dimensiones de 263 × 490 × 424 mm y capacidad de 30 L capacidad.",
    "technical_specs": {
      "material": "Polímeros reciclables de alta densidad",
      "acabado": "Gris antracita mate",
      "dimensiones": "263 × 490 × 424 mm",
      "mecanismo": "Correderas de balineras de acero con freno suave",
      "modulo": "300mm",
      "capacidad_carga": "30 L capacidad",
      "compatibilidad": "Diseñado para módulo de 300mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Polímeros reciclables de alta densidad"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 300mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 30 L capacidad"
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
    "sku": "KDJ-79",
    "slug": "kdj-79-basurero-doble-gris-de-10-20-litros",
    "brand_collection": "Colección 2026",
    "category": "Basureros Ecológicos",
    "materials": [
      "Polímeros reciclables de alta densidad"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 290012,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-80",
    "code": "KDJ-80",
    "name": "Basurero doble gris de 20 + 20 litros",
    "category_id": "cat-cocina-basureros",
    "category_name": "Basureros Ecológicos",
    "main_collection": "cocina",
    "short_description": "Sistema de gestión de residuos de gran volumen para cocina gourmet: 2 contenedores de 20 litros con manijas ergonómicas.",
    "full_description": "Basurero doble gris de 20 + 20 litros perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 400mm, dimensiones de 342 × 490 × 424 mm y capacidad de 40 L capacidad.",
    "technical_specs": {
      "material": "Polipropileno técnico y guías de acero zincado",
      "acabado": "Gris perla y grafito",
      "dimensiones": "342 × 490 × 424 mm",
      "mecanismo": "Extracción total sincronizada con soft close",
      "modulo": "400mm",
      "capacidad_carga": "40 L capacidad",
      "compatibilidad": "Diseñado para módulo de 400mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Polipropileno técnico y guías de acero zincado"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 400mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 40 L capacidad"
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
    "sku": "KDJ-80",
    "slug": "kdj-80-basurero-doble-gris-de-20-20-litros",
    "brand_collection": "Colección 2026",
    "category": "Basureros Ecológicos",
    "materials": [
      "Polipropileno técnico y guías de acero zincado"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 358800,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-81",
    "code": "KDJ-81",
    "name": "Basurero de 14 litros en inoxidable 304",
    "category_id": "cat-cocina-basureros",
    "category_name": "Basureros Ecológicos",
    "main_collection": "cocina",
    "short_description": "Contenedor cilíndrico en auténtico acero inoxidable AISI 304 con mecanismo de apertura automática sincronizada con la puerta.",
    "full_description": "Basurero de 14 litros en inoxidable 304 perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 400mm, dimensiones de 365 × 289 × 370 mm y capacidad de 14 L capacidad.",
    "technical_specs": {
      "material": "Acero Inoxidable AISI 304 y balde interior removible",
      "acabado": "Inox cepillado brillante",
      "dimensiones": "365 × 289 × 370 mm",
      "mecanismo": "Apertura mecánica pivotante con tapa elevable automática",
      "modulo": "400mm",
      "capacidad_carga": "14 L capacidad",
      "compatibilidad": "Diseñado para módulo de 400mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero Inoxidable AISI 304 y balde interior removible"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 400mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 14 L capacidad"
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
    "sku": "KDJ-81",
    "slug": "kdj-81-basurero-de-14-litros-en-inoxidable-304",
    "brand_collection": "Colección 2026",
    "category": "Basureros Ecológicos",
    "materials": [
      "Acero Inoxidable AISI 304 y balde interior removible"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 132809,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-83",
    "code": "KDJ-83",
    "name": "Canasta elevable de vidrio",
    "category_id": "cat-cocina-elevables",
    "category_name": "Sistemas Elevables & Loceros",
    "main_collection": "cocina",
    "short_description": "Mecanismo descensor neumático de dos niveles con fondos de cristal para acceder sin esfuerzo a la parte superior de muebles altos.",
    "full_description": "Canasta elevable de vidrio perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 600mm, dimensiones de 564 × 260 × 542 mm y capacidad de 15 kg.",
    "technical_specs": {
      "material": "Vidrio templado, aluminio y amortiguadores de gas",
      "acabado": "Cristal templado y marco grafito",
      "dimensiones": "564 × 260 × 542 mm",
      "mecanismo": "Brazos mecánicos con selector de fuerza y amortiguación hidráulica bidireccional",
      "modulo": "600mm",
      "capacidad_carga": "15 kg",
      "compatibilidad": "Diseñado para módulo de 600mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Vidrio templado, aluminio y amortiguadores de gas"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 600mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 15 kg"
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
    "sku": "KDJ-83",
    "slug": "kdj-83-canasta-elevable-de-vidrio",
    "brand_collection": "Colección 2026",
    "category": "Sistemas Elevables & Loceros",
    "materials": [
      "Vidrio templado, aluminio y amortiguadores de gas"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 583204,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-84",
    "code": "KDJ-84",
    "name": "Canasta elevable de vidrio",
    "category_id": "cat-cocina-elevables",
    "category_name": "Sistemas Elevables & Loceros",
    "main_collection": "cocina",
    "short_description": "Módulo elevable descensor para mueble alto de 700mm en vidrio templado y aluminio de grado espacial.",
    "full_description": "Canasta elevable de vidrio perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 700mm, dimensiones de 664 × 260 × 542 mm y capacidad de 18 kg.",
    "technical_specs": {
      "material": "Vidrio templado y aluminio extruido",
      "acabado": "Cristal templado y perfil grafito",
      "dimensiones": "664 × 260 × 542 mm",
      "mecanismo": "Equilibrador asistido por resorte de tensión regulable",
      "modulo": "700mm",
      "capacidad_carga": "18 kg",
      "compatibilidad": "Diseñado para módulo de 700mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Vidrio templado y aluminio extruido"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 700mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 18 kg"
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
    "sku": "KDJ-84",
    "slug": "kdj-84-canasta-elevable-de-vidrio",
    "brand_collection": "Colección 2026",
    "category": "Sistemas Elevables & Loceros",
    "materials": [
      "Vidrio templado y aluminio extruido"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 637612,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-85",
    "code": "KDJ-85",
    "name": "Canasta elevable de vidrio",
    "category_id": "cat-cocina-elevables",
    "category_name": "Sistemas Elevables & Loceros",
    "main_collection": "cocina",
    "short_description": "Canasta elevable de 800mm con dos repisas completas de cristal, optimiza la accesibilidad y ergonomía de alacenas superiores.",
    "full_description": "Canasta elevable de vidrio perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 800mm, dimensiones de 764 × 260 × 542 mm y capacidad de 20 kg.",
    "technical_specs": {
      "material": "Vidrio templado laminado y marco metálico",
      "acabado": "Vidrio translúcido y marco antracita",
      "dimensiones": "764 × 260 × 542 mm",
      "mecanismo": "Descensor suave de dos posiciones con cierre amortiguado",
      "modulo": "800mm",
      "capacidad_carga": "20 kg",
      "compatibilidad": "Diseñado para módulo de 800mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Vidrio templado laminado y marco metálico"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 800mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 20 kg"
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
    "sku": "KDJ-85",
    "slug": "kdj-85-canasta-elevable-de-vidrio",
    "brand_collection": "Colección 2026",
    "category": "Sistemas Elevables & Loceros",
    "materials": [
      "Vidrio templado laminado y marco metálico"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 692088,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-86",
    "code": "KDJ-86",
    "name": "Locero elevable SS304 con portacubiertos",
    "category_id": "cat-cocina-elevables",
    "category_name": "Sistemas Elevables & Loceros",
    "main_collection": "cocina",
    "short_description": "Estación escurridora descendente en acero 304 quirúrgico con rejilla para platos, vasos y canastilla para cubiertos.",
    "full_description": "Locero elevable SS304 con portacubiertos perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 600mm, dimensiones de 564 × 260 × 542 mm y capacidad de 16 kg.",
    "technical_specs": {
      "material": "Acero Inoxidable AISI 304 inoxidable de por vida",
      "acabado": "Acero inoxidable electropulido",
      "dimensiones": "564 × 260 × 542 mm",
      "mecanismo": "Elevador neumático con bandeja inferior recolectora de agua",
      "modulo": "600mm",
      "capacidad_carga": "16 kg",
      "compatibilidad": "Diseñado para módulo de 600mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero Inoxidable AISI 304 inoxidable de por vida"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 600mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 16 kg"
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
    "sku": "KDJ-86",
    "slug": "kdj-86-locero-elevable-ss304-con-portacubiertos",
    "brand_collection": "Colección 2026",
    "category": "Sistemas Elevables & Loceros",
    "materials": [
      "Acero Inoxidable AISI 304 inoxidable de por vida"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 649506,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-87",
    "code": "KDJ-87",
    "name": "Locero elevable SS304 con portacubiertos",
    "category_id": "cat-cocina-elevables",
    "category_name": "Sistemas Elevables & Loceros",
    "main_collection": "cocina",
    "short_description": "Sistema escurridor descensor para gabinete aéreo de 700mm en inoxidable 304, drenaje perfecto sin humedad en la carpintería.",
    "full_description": "Locero elevable SS304 con portacubiertos perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 700mm, dimensiones de 664 × 260 × 542 mm y capacidad de 18 kg.",
    "technical_specs": {
      "material": "Acero Inoxidable AISI 304",
      "acabado": "Acero satinado",
      "dimensiones": "664 × 260 × 542 mm",
      "mecanismo": "Brazos de descenso ergonómicos con retención y subida suave",
      "modulo": "700mm",
      "capacidad_carga": "18 kg",
      "compatibilidad": "Diseñado para módulo de 700mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero Inoxidable AISI 304"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 700mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 18 kg"
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
    "sku": "KDJ-87",
    "slug": "kdj-87-locero-elevable-ss304-con-portacubiertos",
    "brand_collection": "Colección 2026",
    "category": "Sistemas Elevables & Loceros",
    "materials": [
      "Acero Inoxidable AISI 304"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 700556,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-88",
    "code": "KDJ-88",
    "name": "Locero elevable SS304 con portacubiertos",
    "category_id": "cat-cocina-elevables",
    "category_name": "Sistemas Elevables & Loceros",
    "main_collection": "cocina",
    "short_description": "Locero elevable de máxima dimensión (800mm) para alacenas de gran formato, construcción íntegra en inoxidable sanitario 304.",
    "full_description": "Locero elevable SS304 con portacubiertos perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 800mm, dimensiones de 764 × 260 × 542 mm y capacidad de 22 kg.",
    "technical_specs": {
      "material": "Acero Inoxidable AISI 304",
      "acabado": "Acero cepillado de grado culinario",
      "dimensiones": "764 × 260 × 542 mm",
      "mecanismo": "Compensador de peso mecánico con pistones reforzados",
      "modulo": "800mm",
      "capacidad_carga": "22 kg",
      "compatibilidad": "Diseñado para módulo de 800mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero Inoxidable AISI 304"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 800mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 22 kg"
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
    "sku": "KDJ-88",
    "slug": "kdj-88-locero-elevable-ss304-con-portacubiertos",
    "brand_collection": "Colección 2026",
    "category": "Sistemas Elevables & Loceros",
    "materials": [
      "Acero Inoxidable AISI 304"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 753544,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-89",
    "code": "KDJ-89",
    "name": "Canasta elevable eléctrica de alambre",
    "category_id": "cat-cocina-elevables",
    "category_name": "Sistemas Elevables & Loceros",
    "main_collection": "cocina",
    "short_description": "Motorización inteligente para cocina de vanguardia: desciende y asciende con solo tocar un botón touch o sensor de proximidad.",
    "full_description": "Canasta elevable eléctrica de alambre perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 700mm, dimensiones de 700 × 256 × 700 mm y capacidad de 25 kg.",
    "technical_specs": {
      "material": "Alambre de acero estructural y actuador lineal motorizado",
      "acabado": "Antracita mate y componentes cromados",
      "dimensiones": "700 × 256 × 700 mm",
      "mecanismo": "Motor eléctrico silencioso < 45dB, sensor anti-atrapamiento y control touch",
      "modulo": "700mm",
      "capacidad_carga": "25 kg",
      "compatibilidad": "Diseñado para módulo de 700mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Alambre de acero estructural y actuador lineal motorizado"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 700mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 25 kg"
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
    "sku": "KDJ-89",
    "slug": "kdj-89-canasta-elevable-electrica-de-alambre",
    "brand_collection": "Colección 2026",
    "category": "Sistemas Elevables & Loceros",
    "materials": [
      "Alambre de acero estructural y actuador lineal motorizado"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 1765106,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-90",
    "code": "KDJ-90",
    "name": "Canasta elevable eléctrica de vidrio",
    "category_id": "cat-cocina-elevables",
    "category_name": "Sistemas Elevables & Loceros",
    "main_collection": "cocina",
    "short_description": "La máxima expresión del lujo funcional: canasta motorizada con paneles en vidrio templado y movimiento eléctrico ultra suave.",
    "full_description": "Canasta elevable eléctrica de vidrio perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 600mm, dimensiones de 600 × 256 × 700 mm y capacidad de 25 kg.",
    "technical_specs": {
      "material": "Vidrio templado templado y actuador electromecánico",
      "acabado": "Cristal templado y marco negro anodizado",
      "dimensiones": "600 × 256 × 700 mm",
      "mecanismo": "Accionamiento eléctrico continuo con parada de seguridad y memoria de altura",
      "modulo": "600mm",
      "capacidad_carga": "25 kg",
      "compatibilidad": "Diseñado para módulo de 600mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Vidrio templado templado y actuador electromecánico"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 600mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 25 kg"
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
    "sku": "KDJ-90",
    "slug": "kdj-90-canasta-elevable-electrica-de-vidrio",
    "brand_collection": "Colección 2026",
    "category": "Sistemas Elevables & Loceros",
    "materials": [
      "Vidrio templado templado y actuador electromecánico"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 1827103,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-201",
    "code": "KDJ-201",
    "name": "Cubertero ABS plateado",
    "category_id": "cat-cocina-cuberteros",
    "category_name": "Cuberteros & Accesorios",
    "main_collection": "cocina",
    "short_description": "Organizador modular de cubiertos en polímero técnico ABS termoformado con elegante acabado plateado mate antibacteriano.",
    "full_description": "Cubertero ABS plateado perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 600mm, dimensiones de 535 × 485 × 60 mm y capacidad de Bandeja divisoria.",
    "technical_specs": {
      "material": "Polímero ABS de alto impacto",
      "acabado": "Plateado mate satinado",
      "dimensiones": "535 × 485 × 60 mm",
      "mecanismo": "Ajuste milimétrico para gavetas y pestañas recortables",
      "modulo": "600mm",
      "capacidad_carga": "Bandeja divisoria",
      "compatibilidad": "Diseñado para módulo de 600mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Polímero ABS de alto impacto"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 600mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica Bandeja divisoria"
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
    "sku": "KDJ-201",
    "slug": "kdj-201-cubertero-abs-plateado",
    "brand_collection": "Colección 2026",
    "category": "Cuberteros & Accesorios",
    "materials": [
      "Polímero ABS de alto impacto"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 29136,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-202",
    "code": "KDJ-202",
    "name": "Cubertero ABS plateado",
    "category_id": "cat-cocina-cuberteros",
    "category_name": "Cuberteros & Accesorios",
    "main_collection": "cocina",
    "short_description": "Bandeja cubertera expandida para cajón de 700mm con compartimentos ergonómicos para cuchillería, espátulas y cubiertos de servicio.",
    "full_description": "Cubertero ABS plateado perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 700mm, dimensiones de 635 × 485 × 60 mm y capacidad de Bandeja divisoria.",
    "technical_specs": {
      "material": "Polímero ABS de grado alimentario",
      "acabado": "Plateado mate satinado",
      "dimensiones": "635 × 485 × 60 mm",
      "mecanismo": "Pestañas de acople adaptable para encaje perfecto",
      "modulo": "700mm",
      "capacidad_carga": "Bandeja divisoria",
      "compatibilidad": "Diseñado para módulo de 700mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Polímero ABS de grado alimentario"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 700mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica Bandeja divisoria"
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
    "sku": "KDJ-202",
    "slug": "kdj-202-cubertero-abs-plateado",
    "brand_collection": "Colección 2026",
    "category": "Cuberteros & Accesorios",
    "materials": [
      "Polímero ABS de grado alimentario"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 34286,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-91",
    "code": "KDJ-91",
    "name": "Joyero extraíble con cierre suave · variante 1",
    "category_id": "cat-closet-joyeros",
    "category_name": "Joyeros & Bandejas",
    "main_collection": "closet",
    "short_description": "Bandeja organizadora de lujo con compartimentos individuales para anillos, cadenas, gemelos y accesorios en cuero fino y terciopelo.",
    "full_description": "Joyero extraíble con cierre suave · variante 1 perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 600mm, dimensiones de (510-614) × 450 × 80 mm y capacidad de 20 kg.",
    "technical_specs": {
      "material": "Marco perimetral de aluminio y tapizado en terciopelo italiano",
      "acabado": "Aluminio moka y terciopelo beige arena",
      "dimensiones": "(510-614) × 450 × 80 mm",
      "mecanismo": "Correderas telescópicas ocultas sincronizadas con cierre amortiguado",
      "modulo": "600mm",
      "capacidad_carga": "20 kg",
      "compatibilidad": "Diseñado para módulo de 600mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Marco perimetral de aluminio y tapizado en terciopelo italiano"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 600mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 20 kg"
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
    "sku": "KDJ-91",
    "slug": "kdj-91-joyero-extraible-con-cierre-suave-variante-1",
    "brand_collection": "Colección 2026",
    "category": "Joyeros & Bandejas",
    "materials": [
      "Marco perimetral de aluminio y tapizado en terciopelo italiano"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 299350,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-92",
    "code": "KDJ-92",
    "name": "Joyero extraíble con cierre suave · variante 2",
    "category_id": "cat-closet-joyeros",
    "category_name": "Joyeros & Bandejas",
    "main_collection": "closet",
    "short_description": "Diseño exclusivo con ranuras termo-curvadas y almohadillas desmontables para relojes y pulseras en piel sintética texturada.",
    "full_description": "Joyero extraíble con cierre suave · variante 2 perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 600mm, dimensiones de (510-614) × 450 × 80 mm y capacidad de 20 kg.",
    "technical_specs": {
      "material": "Aluminio extruido, cuero sintético de alta costura y gamuza",
      "acabado": "Gris antracita y gamuza grafito",
      "dimensiones": "(510-614) × 450 × 80 mm",
      "mecanismo": "Extracción total de deslizamiento ultra sedoso",
      "modulo": "600mm",
      "capacidad_carga": "20 kg",
      "compatibilidad": "Diseñado para módulo de 600mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aluminio extruido, cuero sintético de alta costura y gamuza"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 600mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 20 kg"
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
    "sku": "KDJ-92",
    "slug": "kdj-92-joyero-extraible-con-cierre-suave-variante-2",
    "brand_collection": "Colección 2026",
    "category": "Joyeros & Bandejas",
    "materials": [
      "Aluminio extruido, cuero sintético de alta costura y gamuza"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 307505,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-93",
    "code": "KDJ-93",
    "name": "Pantalonero extraíble con marco de aluminio",
    "category_id": "cat-closet-pantaloneros",
    "category_name": "Pantaloneros & Percheros",
    "main_collection": "closet",
    "short_description": "Marco de aluminio estructural con varillas antideslizantes para colgar hasta 10 pantalones sin pliegues ni arrugas indeseadas.",
    "full_description": "Pantalonero extraíble con marco de aluminio perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 600mm, dimensiones de (510-614) × 450 × 60 mm y capacidad de 25 kg.",
    "technical_specs": {
      "material": "Aluminio extruido y tubos con recubrimiento de silicona antideslizante",
      "acabado": "Moka anodizado satinado",
      "dimensiones": "(510-614) × 450 × 60 mm",
      "mecanismo": "Rieles sincronizados de extracción total con freno de impacto",
      "modulo": "600mm",
      "capacidad_carga": "25 kg",
      "compatibilidad": "Diseñado para módulo de 600mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aluminio extruido y tubos con recubrimiento de silicona antideslizante"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 600mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 25 kg"
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
    "sku": "KDJ-93",
    "slug": "kdj-93-pantalonero-extraible-con-marco-de-aluminio",
    "brand_collection": "Colección 2026",
    "category": "Pantaloneros & Percheros",
    "materials": [
      "Aluminio extruido y tubos con recubrimiento de silicona antideslizante"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 186516,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-94",
    "code": "KDJ-94",
    "name": "Pantalonero lateral derecho con cierre suave",
    "category_id": "cat-closet-pantaloneros",
    "category_name": "Pantaloneros & Percheros",
    "main_collection": "closet",
    "short_description": "Pantalonero voladizo de fijación lateral derecha con 9 varillas independientes para clósets y vestidores esquineros.",
    "full_description": "Pantalonero lateral derecho con cierre suave perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 400mm, dimensiones de 360 × 450 × 120 mm y capacidad de 15 kg.",
    "technical_specs": {
      "material": "Acero al carbono y aluminio",
      "acabado": "Gris grafito mate",
      "dimensiones": "360 × 450 × 120 mm",
      "mecanismo": "Corredera lateral telescópica de extensión total con amortiguador",
      "modulo": "400mm",
      "capacidad_carga": "15 kg",
      "compatibilidad": "Diseñado para módulo de 400mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero al carbono y aluminio"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 400mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 15 kg"
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
    "sku": "KDJ-94",
    "slug": "kdj-94-pantalonero-lateral-derecho-con-cierre-suave",
    "brand_collection": "Colección 2026",
    "category": "Pantaloneros & Percheros",
    "materials": [
      "Acero al carbono y aluminio"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 154677,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-95",
    "code": "KDJ-95",
    "name": "Pantalonero lateral izquierdo con cierre suave",
    "category_id": "cat-closet-pantaloneros",
    "category_name": "Pantaloneros & Percheros",
    "main_collection": "closet",
    "short_description": "Versión lateral izquierda con varillas engomadas para una simetría perfecta en proyectos de clóset para parejas.",
    "full_description": "Pantalonero lateral izquierdo con cierre suave perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 400mm, dimensiones de 360 × 450 × 120 mm y capacidad de 15 kg.",
    "technical_specs": {
      "material": "Acero al carbono y aluminio",
      "acabado": "Gris grafito mate",
      "dimensiones": "360 × 450 × 120 mm",
      "mecanismo": "Corredera lateral telescópica de extensión total con amortiguador",
      "modulo": "400mm",
      "capacidad_carga": "15 kg",
      "compatibilidad": "Diseñado para módulo de 400mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Acero al carbono y aluminio"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 400mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 15 kg"
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
    "sku": "KDJ-95",
    "slug": "kdj-95-pantalonero-lateral-izquierdo-con-cierre-suave",
    "brand_collection": "Colección 2026",
    "category": "Pantaloneros & Percheros",
    "materials": [
      "Acero al carbono y aluminio"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 154677,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-96",
    "code": "KDJ-96",
    "name": "Pantalonero superior con cierre suave",
    "category_id": "cat-closet-pantaloneros",
    "category_name": "Pantaloneros & Percheros",
    "main_collection": "closet",
    "short_description": "Pantalonero de anclaje bajo repisa o cielo de mueble con doble hilera de varillas y extracción frontal centrada.",
    "full_description": "Pantalonero superior con cierre suave perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 800mm, dimensiones de 660 × 450 × 120 mm y capacidad de 30 kg.",
    "technical_specs": {
      "material": "Aluminio y varillas de acero amortiguadas",
      "acabado": "Moka oscuro",
      "dimensiones": "660 × 450 × 120 mm",
      "mecanismo": "Fijación superior bajo entrepaño con guías amortiguadas de deslizamiento suave",
      "modulo": "800mm",
      "capacidad_carga": "30 kg",
      "compatibilidad": "Diseñado para módulo de 800mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Aluminio y varillas de acero amortiguadas"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 800mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 30 kg"
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
    "sku": "KDJ-96",
    "slug": "kdj-96-pantalonero-superior-con-cierre-suave",
    "brand_collection": "Colección 2026",
    "category": "Pantaloneros & Percheros",
    "materials": [
      "Aluminio y varillas de acero amortiguadas"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 198098,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-97",
    "code": "KDJ-97",
    "name": "Elevador de ropa con doble cierre suave · mocha",
    "category_id": "cat-closet-elevadores",
    "category_name": "Elevadores de Ropa",
    "main_collection": "closet",
    "short_description": "Perchero abatible hidráulico que desciende trajes y camisas desde la zona más alta del vestidor con esfuerzo cero.",
    "full_description": "Elevador de ropa con doble cierre suave · mocha perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 510-660mm, dimensiones de 450-600 mm (Ancho telescópico adaptable) y capacidad de 15 kg de prendas colgadas.",
    "technical_specs": {
      "material": "Brazo en aluminio forjado y cárter con fluido hidráulico de alta densidad",
      "acabado": "Moka arquitectónico satinado",
      "dimensiones": "450-600 mm (Ancho telescópico adaptable)",
      "mecanismo": "Doble pistón amortiguador tanto en subida como en bajada",
      "modulo": "510-660mm",
      "capacidad_carga": "15 kg de prendas colgadas",
      "compatibilidad": "Diseñado para módulo de 510-660mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Brazo en aluminio forjado y cárter con fluido hidráulico de alta densidad"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 510-660mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 15 kg de prendas colgadas"
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
    "sku": "KDJ-97",
    "slug": "kdj-97-elevador-de-ropa-con-doble-cierre-suave-mocha",
    "brand_collection": "Colección 2026",
    "category": "Elevadores de Ropa",
    "materials": [
      "Brazo en aluminio forjado y cárter con fluido hidráulico de alta densidad"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 160124,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-98",
    "code": "KDJ-98",
    "name": "Condimentero extraíble de ratán · gris oscuro",
    "category_id": "cat-closet-organizadores",
    "category_name": "Organizadores & Canastas Clóset",
    "main_collection": "closet",
    "short_description": "Cesta canasta para clóset con fino tejido estilo ratán transpirable, ideal para toallas, lencería, suéteres y accesorios.",
    "full_description": "Condimentero extraíble de ratán · gris oscuro perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 600mm, dimensiones de 564 × 450 × 200 mm y capacidad de 25 kg.",
    "technical_specs": {
      "material": "Fibra técnica tejida transpirable y marco de aluminio",
      "acabado": "Ratán sintético gris oscuro y marco titanio",
      "dimensiones": "564 × 450 × 200 mm",
      "mecanismo": "Correderas de extracción completa con cierre suave",
      "modulo": "600mm",
      "capacidad_carga": "25 kg",
      "compatibilidad": "Diseñado para módulo de 600mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Fibra técnica tejida transpirable y marco de aluminio"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 600mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 25 kg"
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
    "sku": "KDJ-98",
    "slug": "kdj-98-condimentero-extraible-de-ratan-gris-oscuro",
    "brand_collection": "Colección 2026",
    "category": "Organizadores & Canastas Clóset",
    "materials": [
      "Fibra técnica tejida transpirable y marco de aluminio"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 304985,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-99",
    "code": "KDJ-99",
    "name": "Zapatero giratorio de 12 niveles",
    "category_id": "cat-closet-zapateros",
    "category_name": "Zapateros Giratorios",
    "main_collection": "closet",
    "short_description": "Columna giratoria 360° para calzado con 12 niveles de bandejas bilaterales, almacena más de 36 pares en un solo módulo.",
    "full_description": "Zapatero giratorio de 12 niveles perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 760mm, dimensiones de 680 × 340 × (1850-1945) mm (12 tier) y capacidad de 50 kg total (36+ pares de calzado).",
    "technical_specs": {
      "material": "Eje de acero cromado y bandejas de polímero texturado con reborde de retención",
      "acabado": "Moka cálido y gris antracita",
      "dimensiones": "680 × 340 × (1850-1945) mm (12 tier)",
      "mecanismo": "Rodamiento central axial giratorio 360° de rotación fluida y silenciosa",
      "modulo": "760mm",
      "capacidad_carga": "50 kg total (36+ pares de calzado)",
      "compatibilidad": "Diseñado para módulo de 760mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Eje de acero cromado y bandejas de polímero texturado con reborde de retención"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 760mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 50 kg total (36+ pares de calzado)"
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
    "sku": "KDJ-99",
    "slug": "kdj-99-zapatero-giratorio-de-12-niveles",
    "brand_collection": "Colección 2026",
    "category": "Zapateros Giratorios",
    "materials": [
      "Eje de acero cromado y bandejas de polímero texturado con reborde de retención"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 1043504,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-100",
    "code": "KDJ-100",
    "name": "Cajón con clave revestido en cuero · gris",
    "category_id": "cat-closet-seguridad",
    "category_name": "Cajones con Clave & Relojes",
    "main_collection": "closet",
    "short_description": "Cajón de seguridad biométrico y teclado digital para vestidor, tapizado a mano en cuero automotriz gris con costura artesanal.",
    "full_description": "Cajón con clave revestido en cuero · gris perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 600mm, dimensiones de 564 × 402 × 152 mm y capacidad de 35 kg.",
    "technical_specs": {
      "material": "Caja de seguridad en acero reforzado forrada en cuero legítimo cosido",
      "acabado": "Cuero gris grafito y herrajes metálicos pavonados",
      "dimensiones": "564 × 402 × 152 mm",
      "mecanismo": "Cerradura motorizada con teclado numérico touch y lector de huella dactilar",
      "modulo": "600mm",
      "capacidad_carga": "35 kg",
      "compatibilidad": "Diseñado para módulo de 600mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Caja de seguridad en acero reforzado forrada en cuero legítimo cosido"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 600mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 35 kg"
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
    "sku": "KDJ-100",
    "slug": "kdj-100-cajon-con-clave-revestido-en-cuero-gris",
    "brand_collection": "Colección 2026",
    "category": "Cajones con Clave & Relojes",
    "materials": [
      "Caja de seguridad en acero reforzado forrada en cuero legítimo cosido"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 1070608,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-101",
    "code": "KDJ-101",
    "name": "Cajón con clave revestido en cuero · blanco",
    "category_id": "cat-closet-seguridad",
    "category_name": "Cajones con Clave & Relojes",
    "main_collection": "closet",
    "short_description": "Edición clóset luminoso en cuero marfil cosido con cerrojo digital invisible, compartimentos interiores acolchados para valores.",
    "full_description": "Cajón con clave revestido en cuero · blanco perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 600mm, dimensiones de 564 × 402 × 152 mm y capacidad de 35 kg.",
    "technical_specs": {
      "material": "Estructura en chapa blindada y revestimiento de piel sintética premium",
      "acabado": "Cuero blanco marfil con pespunte perla",
      "dimensiones": "564 × 402 × 152 mm",
      "mecanismo": "Cierre electrónico inteligente con batería recargable USB de larga duración",
      "modulo": "600mm",
      "capacidad_carga": "35 kg",
      "compatibilidad": "Diseñado para módulo de 600mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Estructura en chapa blindada y revestimiento de piel sintética premium"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 600mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 35 kg"
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
    "sku": "KDJ-101",
    "slug": "kdj-101-cajon-con-clave-revestido-en-cuero-blanco",
    "brand_collection": "Colección 2026",
    "category": "Cajones con Clave & Relojes",
    "materials": [
      "Estructura en chapa blindada y revestimiento de piel sintética premium"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 1070608,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": false,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-102",
    "code": "KDJ-102",
    "name": "Cajón con clave revestido en cuero · naranja",
    "category_id": "cat-closet-seguridad",
    "category_name": "Cajones con Clave & Relojes",
    "main_collection": "closet",
    "short_description": "Estilo Hermès contemporáneo: cuero naranja mandarina vibrante con costuras de alta talabartería y acceso seguro codificado.",
    "full_description": "Cajón con clave revestido en cuero · naranja perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 600mm, dimensiones de 564 × 402 × 152 mm y capacidad de 35 kg.",
    "technical_specs": {
      "material": "Blindaje interno en acero y revestimiento exterior en cuero naranja de talabartería",
      "acabado": "Cuero naranja de lujo y herrajes moka",
      "dimensiones": "564 × 402 × 152 mm",
      "mecanismo": "Bloqueo biométrico digital con clave y corredera oculta de extracción total",
      "modulo": "600mm",
      "capacidad_carga": "35 kg",
      "compatibilidad": "Diseñado para módulo de 600mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Blindaje interno en acero y revestimiento exterior en cuero naranja de talabartería"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 600mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 35 kg"
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
    "sku": "KDJ-102",
    "slug": "kdj-102-cajon-con-clave-revestido-en-cuero-naranja",
    "brand_collection": "Colección 2026",
    "category": "Cajones con Clave & Relojes",
    "materials": [
      "Blindaje interno en acero y revestimiento exterior en cuero naranja de talabartería"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 1070608,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true
  },
  {
    "id": "prod-kdj-103",
    "code": "KDJ-103",
    "name": "Cajón con clave y mecanismo para relojes · 2 niveles, gris",
    "category_id": "cat-closet-seguridad",
    "category_name": "Cajones con Clave & Relojes",
    "main_collection": "closet",
    "short_description": "El emblema definitivo de alta relojería: cajón blindado con cerradura digital, dos niveles y rotores Watch Winder programables.",
    "full_description": "Cajón con clave y mecanismo para relojes · 2 niveles, gris perteneciente a la Colección Oficial Montezzi 2026. Diseñado con tolerancias milimétricas para módulos de carpintería arquitectónica contemporánea. Incluye especificaciones técnicas para módulo 800mm, dimensiones de 760 × 438 × 401 mm y capacidad de 45 kg.",
    "technical_specs": {
      "material": "Chasis de seguridad en acero, interior en terciopelo negro y rotores antimagnéticos",
      "acabado": "Cuero gris antracita cosido y apliques en aluminio torneado",
      "dimensiones": "760 × 438 × 401 mm",
      "mecanismo": "Cerradura digital biométrica + rotores japoneses ultra silenciosos con ciclos de rotación TPD",
      "modulo": "800mm",
      "capacidad_carga": "45 kg",
      "compatibilidad": "Diseñado para módulo de 800mm en tableros de 15mm, 18mm y 22mm.",
      "unidades_empaque": "1 Set completo con herrajes, fijaciones y plantilla de montaje técnico."
    },
    "benefits": [
      {
        "label": "MATERIAL",
        "value": "Chasis de seguridad en acero, interior en terciopelo negro y rotores antimagnéticos"
      },
      {
        "label": "MÓDULO",
        "value": "Módulo 800mm"
      },
      {
        "label": "CIERRE",
        "value": "Amortiguación suave y silenciosa"
      },
      {
        "label": "CARGA",
        "value": "Capacidad técnica 45 kg"
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
    "sku": "KDJ-103",
    "slug": "kdj-103-cajon-con-clave-y-mecanismo-para-relojes-2-niveles-gris",
    "brand_collection": "Colección 2026",
    "category": "Cajones con Clave & Relojes",
    "materials": [
      "Chasis de seguridad en acero, interior en terciopelo negro y rotores antimagnéticos"
    ],
    "boxes_count": 1,
    "warranty": "1 año por defectos de fabricación oficial Montezzi",
    "wholesale_price": 4168595,
    "wholesale_min_qty": 3,
    "fast_shipping_badge": true,
    "returns_policy_badge": true
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

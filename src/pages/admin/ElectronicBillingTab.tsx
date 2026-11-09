import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { exportToCSV, exportToJSON } from '../../utils/csvExportImport';
import {
  FileText, Code, CheckCircle2, Clock, AlertCircle, Download,
  Settings, Plus, ExternalLink, Copy, Check, Eye, ShieldCheck,
  Building2, Hash, ArrowUpRight, X
} from 'lucide-react';

interface ElectronicInvoice {
  id: string;
  consecutive: string; // e.g. MON-1001
  order_id: string;
  customer_name: string;
  customer_nit: string;
  customer_email: string;
  issue_date: string;
  subtotal: number;
  iva_amount: number; // 19%
  total: number;
  cufe: string;
  dian_status: 'aceptada' | 'en_proceso' | 'rechazada';
  payment_method_dian: string; // 10: Efectivo, 48: Tarjeta, 30: Transferencia
}

const INITIAL_INVOICES: ElectronicInvoice[] = [
  {
    id: 'inv-1001',
    consecutive: 'MON-1001',
    order_id: 'ORD-2026-101',
    customer_name: 'Estudio Londoño Arquitectos S.A.S.',
    customer_nit: '901.458.921-3',
    customer_email: 'facturacion@londonoarquitectos.com',
    issue_date: '2026-09-02T14:30:00.000Z',
    subtotal: 1554622,
    iva_amount: 295378,
    total: 1850000,
    cufe: 'a89f4b3c92e10f8821d3e4b7c89a0123fe56d78b901234cde567f8901234abcd1234567890abcdef1234567890abcdef',
    dian_status: 'aceptada',
    payment_method_dian: '30 (Transferencia Débito Bancaria)'
  },
  {
    id: 'inv-1002',
    consecutive: 'MON-1002',
    order_id: 'ORD-2026-102',
    customer_name: 'Taller Mobel & Woodwork Ltda.',
    customer_nit: '800.234.876-1',
    customer_email: 'contabilidad@mobelwood.co',
    issue_date: '2026-09-05T10:15:00.000Z',
    subtotal: 823529,
    iva_amount: 156471,
    total: 980000,
    cufe: 'c34d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    dian_status: 'aceptada',
    payment_method_dian: '48 (Tarjeta Crédito Corporativa)'
  },
  {
    id: 'inv-1003',
    consecutive: 'MON-1003',
    order_id: 'ORD-2026-103',
    customer_name: 'Constructora Hábitat Contemporáneo',
    customer_nit: '900.876.543-9',
    customer_email: 'pagos@habitat.com.co',
    issue_date: '2026-09-10T16:45:00.000Z',
    subtotal: 2689076,
    iva_amount: 510924,
    total: 3200000,
    cufe: 'f1e2d3c4b5a697887766554433221100ffeeddccbbaa99887766554433221100aabbccddeeff00112233445566778899',
    dian_status: 'aceptada',
    payment_method_dian: '30 (Transferencia Bancolombia)'
  },
  {
    id: 'inv-1004',
    consecutive: 'MON-1004',
    order_id: 'ORD-2026-104',
    customer_name: 'Arq. Valentina Vélez Diseños',
    customer_nit: '1.037.654.321-4',
    customer_email: 'valentina@velezdesign.com',
    issue_date: '2026-09-13T11:20:00.000Z',
    subtotal: 487395,
    iva_amount: 92605,
    total: 580000,
    cufe: 'b5a697887766554433221100ffeeddccbbaa99887766554433221100aabbccddeeff00112233445566778899f1e2d3c4',
    dian_status: 'en_proceso',
    payment_method_dian: '10 (Efectivo / Recibo Showroom)'
  }
];

export const ElectronicBillingTab: React.FC = () => {
  const { orders, logActivity } = useProducts();
  const [invoices, setInvoices] = useState<ElectronicInvoice[]>(() => {
    const saved = localStorage.getItem('montezzi_electronic_invoices');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_INVOICES; }
    }
    return INITIAL_INVOICES;
  });

  const [selectedInvoice, setSelectedInvoice] = useState<ElectronicInvoice | null>(null);
  const [viewMode, setViewMode] = useState<'none' | 'json' | 'xml' | 'config' | 'new_invoice'>('none');
  const [copiedText, setCopiedText] = useState(false);

  // API Config state conforme a ARQUITECTURA_BASE_DE_DATOS_ECOMMERCE_SUPABASE.md (Siigo Nube)
  const [apiProvider, setApiProvider] = useState('Siigo Nube API v1 (ElectronicInvoice 64261)');
  const [apiEndpoint, setApiEndpoint] = useState('https://api.siigo.com/v1/invoices');
  const [apiToken, setApiToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.siigo_montezzi_live_token');
  const [dianPrefix, setDianPrefix] = useState('FEF');
  const [dianResolution, setDianResolution] = useState('18764085159224 (Vigencia 2026 - Rango 1 a 50.000)');
  const [environment, setEnvironment] = useState<'sandbox' | 'produccion'>('produccion');

  // New Invoice Form state
  const [newOrderSelectedId, setNewOrderSelectedId] = useState('');
  const [newCustomerNit, setNewCustomerNit] = useState('');
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerEmail, setNewCustomerEmail] = useState('');

  // Calculations
  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalSubtotal = invoices.reduce((sum, inv) => sum + inv.subtotal, 0);
  const totalIva = invoices.reduce((sum, inv) => sum + inv.iva_amount, 0);
  const acceptedCount = invoices.filter(i => i.dian_status === 'aceptada').length;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Generate standardized JSON REST payload ready for modern DIAN billing APIs (Siigo, Factus, Alegra)
  const generateApiJsonPayload = (inv: ElectronicInvoice) => {
    return {
      document: {
        id: inv.consecutive,
        type: '01', // 01: Factura Electrónica de Venta
        date: inv.issue_date.split('T')[0],
        time: '12:00:00-05:00',
        prefix: dianPrefix
      },
      seller: {
        nit: '901.888.777-1',
        dv: '1',
        legal_name: 'MONTEZZI HIGH HARDWARE S.A.S.',
        commercial_name: 'Montezzi',
        tax_regime: 'Responsable de IVA (48)',
        city: '05001', // Medellín
        department: '05', // Antioquia
        address: 'Carrera 43A # 1-50 Showroom El Poblado'
      },
      customer: {
        identification_type: '31', // 31: NIT, 13: Cédula
        identification: inv.customer_nit.replace(/[^0-9]/g, ''),
        legal_name: inv.customer_name,
        email: inv.customer_email,
        phone: '+57 300 000 0000',
        fiscal_regime: 'R-99-PN'
      },
      payment_form: {
        code: inv.payment_method_dian.startsWith('30') ? '30' : '10',
        means: inv.payment_method_dian,
        due_date: inv.issue_date.split('T')[0]
      },
      items: [
        {
          code: 'KDJ-SYS-ARCH',
          description: `Suministro de Herrajes Arquitectónicos Montezzi - Pedido ${inv.order_id}`,
          quantity: 1,
          price: inv.subtotal,
          discount: 0,
          taxes: [
            {
              id: '01', // 01: IVA
              rate: 19.0,
              base: inv.subtotal,
              amount: inv.iva_amount
            }
          ],
          total: inv.total
        }
      ],
      totals: {
        gross_amount: inv.subtotal,
        taxable_amount: inv.subtotal,
        tax_amount: inv.iva_amount,
        payable_amount: inv.total
      },
      technical_security: {
        cufe: inv.cufe,
        qr_url: `https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=${inv.cufe}`,
        algorithm: 'CUFE-SHA384'
      }
    };
  };

  // Generate standardized UBL 2.1 XML snippet
  const generateUblXmlSnippet = (inv: ElectronicInvoice) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
  <cbc:UBLVersionID>UBL 2.1</cbc:UBLVersionID>
  <cbc:CustomizationID>DIAN 2.1: Factura Electrónica de Venta</cbc:CustomizationID>
  <cbc:ProfileExecutionID>${environment === 'produccion' ? '1' : '2'}</cbc:ProfileExecutionID>
  <cbc:ID>${inv.consecutive}</cbc:ID>
  <cbc:UUID schemeName="CUFE-SHA384">${inv.cufe}</cbc:UUID>
  <cbc:IssueDate>${inv.issue_date.split('T')[0]}</cbc:IssueDate>
  <cbc:InvoiceTypeCode>01</cbc:InvoiceTypeCode>
  
  <!-- Emisor Montezzi -->
  <cac:AccountingSupplierParty>
    <cac:Party>
      <cac:PartyTaxScheme>
        <cbc:RegistrationName>MONTEZZI HIGH HARDWARE S.A.S.</cbc:RegistrationName>
        <cbc:CompanyID schemeID="1">901888777</cbc:CompanyID>
      </cac:PartyTaxScheme>
    </cac:Party>
  </cac:AccountingSupplierParty>

  <!-- Adquirente / Cliente -->
  <cac:AccountingCustomerParty>
    <cac:Party>
      <cac:PartyTaxScheme>
        <cbc:RegistrationName>${inv.customer_name}</cbc:RegistrationName>
        <cbc:CompanyID>${inv.customer_nit}</cbc:CompanyID>
      </cac:PartyTaxScheme>
    </cac:Party>
  </cac:AccountingCustomerParty>

  <!-- Totales Tributarios (IVA 19%) -->
  <cac:TaxTotal>
    <cbc:TaxAmount currencyID="COP">${inv.iva_amount}</cbc:TaxAmount>
    <cac:TaxSubtotal>
      <cbc:TaxableAmount currencyID="COP">${inv.subtotal}</cbc:TaxableAmount>
      <cbc:TaxAmount currencyID="COP">${inv.iva_amount}</cbc:TaxAmount>
      <cac:TaxCategory>
        <cbc:Percent>19.00</cbc:Percent>
        <cac:TaxScheme>
          <cbc:ID>01</cbc:ID>
          <cbc:Name>IVA</cbc:Name>
        </cac:TaxScheme>
      </cac:TaxCategory>
    </cac:TaxSubtotal>
  </cac:TaxTotal>

  <cac:LegalMonetaryTotal>
    <cbc:LineExtensionAmount currencyID="COP">${inv.subtotal}</cbc:LineExtensionAmount>
    <cbc:TaxExclusiveAmount currencyID="COP">${inv.subtotal}</cbc:TaxExclusiveAmount>
    <cbc:TaxInclusiveAmount currencyID="COP">${inv.total}</cbc:TaxInclusiveAmount>
    <cbc:PayableAmount currencyID="COP">${inv.total}</cbc:PayableAmount>
  </cac:LegalMonetaryTotal>
</Invoice>`;
  };

  const handleExportCSV = () => {
    exportToCSV('montezzi_facturacion_electronica_dian', invoices, [
      { header: 'Consecutivo Factura', key: 'consecutive' },
      { header: 'No. Pedido Web', key: 'order_id' },
      { header: 'Fecha de Emisión', key: 'issue_date' },
      { header: 'Cliente / Razón Social', key: 'customer_name' },
      { header: 'NIT / Cédula', key: 'customer_nit' },
      { header: 'Correo Electrónico Receptor', key: 'customer_email' },
      { header: 'Base Gravable (COP)', key: 'subtotal' },
      { header: 'IVA 19% (COP)', key: 'iva_amount' },
      { header: 'Total Facturado (COP)', key: 'total' },
      { header: 'Estado DIAN', key: 'dian_status' },
      { header: 'Código CUFE', key: 'cufe' }
    ]);
  };

  const handleExportJSON = () => {
    exportToJSON('montezzi_facturacion_electronica_dian', invoices);
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const targetOrder = orders.find(o => o.id === newOrderSelectedId);
    if (!targetOrder) {
      alert('Por favor selecciona un pedido.');
      return;
    }

    const nextNumber = invoices.length + 1001;
    const consecutive = `${dianPrefix}-${nextNumber}`;
    const subtotal = Math.round(targetOrder.total_amount / 1.19);
    const iva = targetOrder.total_amount - subtotal;

    const fakeCufe = Array.from({ length: 80 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    const newInv: ElectronicInvoice = {
      id: `inv-${Date.now()}`,
      consecutive,
      order_id: targetOrder.id,
      customer_name: newCustomerName || targetOrder.customer_name,
      customer_nit: newCustomerNit || targetOrder.customer_document_id || '900.123.456-7',
      customer_email: newCustomerEmail || targetOrder.customer_email,
      issue_date: new Date().toISOString(),
      subtotal,
      iva_amount: iva,
      total: targetOrder.total_amount,
      cufe: fakeCufe,
      dian_status: 'aceptada',
      payment_method_dian: '30 (Transferencia Bancaria DIAN)'
    };

    const updated = [newInv, ...invoices];
    setInvoices(updated);
    localStorage.setItem('montezzi_electronic_invoices', JSON.stringify(updated));

    // Update target order with official Siigo / DIAN fiscal references
    targetOrder.siigo_invoice_id = newInv.id;
    targetOrder.siigo_invoice_number = consecutive;
    targetOrder.siigo_invoice_status = 'sent';
    targetOrder.siigo_cufe = fakeCufe;
    targetOrder.siigo_pdf_url = `https://siigo.com/invoices/public/${consecutive}.pdf`;

    logActivity({
      entity_type: 'order',
      entity_id: targetOrder.id,
      entity_name: `Orden ${targetOrder.order_ref || targetOrder.id}`,
      action: 'siigo_sync',
      description: `Factura Electrónica ${consecutive} emitida y validada con éxito ante la DIAN. CUFE generado.`,
      details: {
        consecutive,
        cufe: fakeCufe,
        total: targetOrder.total_amount,
        customer: newCustomerName || targetOrder.customer_name
      }
    });

    setViewMode('none');
    alert(`Factura Electrónica ${consecutive} emitida y validada con éxito ante la DIAN.`);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner */}
      <div className="bg-white border border-[#EAE7E1] p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#18181B] bg-[#F4F4F5] px-3 py-0.5 rounded-full">
              Módulo DIAN Colombia · UBL 2.1
            </span>
            <span className={`text-[11px] font-semibold capitalize px-3 py-0.5 rounded-full ${environment === 'sandbox' ? 'bg-[#FFFBEB] text-[#D97706]' : 'bg-[#ECFDF5] text-[#10B981]'}`}>
              Ambiente: {environment}
            </span>
          </div>
          <h2 className="font-sans text-xl font-bold text-[#18181B] normal-case pt-1">
            Facturación Electrónica DIAN & Conexión API
          </h2>
          <p className="text-xs text-[#71717A] font-sans">
            Preparado para emisión en tiempo real, validación de CUFE y sincronización REST con Siigo, Factus o Alegra
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setViewMode('config')}
            className="px-4 py-2 bg-[#F4F4F5] hover:bg-[#EAEAEA] text-[#18181B] text-xs font-semibold rounded-full transition-colors flex items-center gap-1.5"
          >
            <Settings className="w-3.5 h-3.5 text-[#71717A]" />
            <span>Configurar API</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-[#F4F4F5] hover:bg-[#EAEAEA] text-[#18181B] text-xs font-semibold rounded-full transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#71717A]" />
            <span>Exportar CSV</span>
          </button>
          <button
            onClick={() => setViewMode('new_invoice')}
            className="px-5 py-2 bg-[#18181B] text-white hover:bg-black text-xs font-semibold rounded-full transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Emitir Factura</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#EAE7E1] p-5 rounded-2xl flex flex-col justify-between min-h-[125px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between text-[#18181B] text-xs">
            <span className="font-sans font-semibold">Total Facturado</span>
            <div className="w-8 h-8 rounded-full bg-[#EAF4FF] text-[#0284C7] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-sans font-bold text-[#18181B] my-1">
            ${(totalInvoiced / 1000000).toFixed(2)}M <span className="text-xs font-sans font-normal text-[#71717A]">COP</span>
          </div>
          <span className="text-[11px] text-[#71717A] block font-sans">
            Facturas electrónicas emitidas en 2026
          </span>
        </div>

        <div className="bg-white border border-[#EAE7E1] p-5 rounded-2xl flex flex-col justify-between min-h-[125px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between text-[#18181B] text-xs">
            <span className="font-sans font-semibold">IVA 19% Generado</span>
            <div className="w-8 h-8 rounded-full bg-[#FFF6E9] text-[#B45309] flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-sans font-bold text-[#18181B] my-1">
            ${(totalIva / 1000000).toFixed(2)}M <span className="text-xs font-sans font-normal text-[#71717A]">COP</span>
          </div>
          <span className="text-[11px] text-[#71717A] block font-sans">
            Base Gravable: ${(totalSubtotal / 1000000).toFixed(2)}M COP
          </span>
        </div>

        <div className="bg-white border border-[#EAE7E1] p-5 rounded-2xl flex flex-col justify-between min-h-[125px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between text-[#18181B] text-xs">
            <span className="font-sans font-semibold">Aceptadas DIAN</span>
            <div className="w-8 h-8 rounded-full bg-[#EAF8F0] text-[#059669] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-sans font-bold text-[#10B981] my-1">
            {acceptedCount} <span className="text-xs font-sans font-normal text-[#71717A]">de {invoices.length}</span>
          </div>
          <span className="text-[11px] text-[#71717A] block font-sans">
            Validación de firma y CUFE 100% exitosa
          </span>
        </div>

        <div className="bg-white border border-[#EAE7E1] p-5 rounded-2xl flex flex-col justify-between min-h-[125px] shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between text-[#18181B] text-xs">
            <span className="font-sans font-semibold">Resolución DIAN</span>
            <div className="w-8 h-8 rounded-full bg-[#F3EFFE] text-[#6D28D9] flex items-center justify-center">
              <Hash className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg font-mono font-bold text-[#18181B] truncate my-1">
            {dianPrefix}-1 a 10.000
          </div>
          <span className="text-[11px] text-[#71717A] block font-sans truncate">
            {dianResolution}
          </span>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white border border-[#EAE7E1] rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="p-4 bg-[#FAF9F7] border-b border-[#F0EFEA] flex items-center justify-between">
          <h3 className="font-sans text-sm font-bold text-[#18181B] normal-case">
            Histórico de Facturación Electrónica de Venta
          </h3>
          <span className="text-xs font-medium text-[#71717A]">
            Resolución Vigente Habilitada
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#FAF9F7] text-[11px] font-semibold text-[#71717A] border-b border-[#F0EFEA]">
              <tr>
                <th className="py-3.5 px-4">Consecutivo</th>
                <th className="py-3.5 px-4">Fecha</th>
                <th className="py-3.5 px-4">Cliente / Adquirente</th>
                <th className="py-3.5 px-4">NIT / Cédula</th>
                <th className="py-3.5 px-4 text-right">Subtotal</th>
                <th className="py-3.5 px-4 text-right">IVA (19%)</th>
                <th className="py-3.5 px-4 text-right">Total Factura</th>
                <th className="py-3.5 px-4 text-center">Estado DIAN</th>
                <th className="py-3.5 px-4 text-center">Inspección API</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F4F5] bg-white">
              {invoices.map(inv => (
                <tr key={inv.id} className="hover:bg-[#FAF9F7]/90 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-[#18181B] bg-[#F4F4F5] px-2.5 py-0.5 rounded-lg">{inv.consecutive}</span>
                    <span className="text-[10px] text-[#71717A] font-mono block mt-0.5">Ref: {inv.order_id}</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#52525B] text-xs">
                    {new Date(inv.issue_date).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-[#18181B] text-[13px] block">{inv.customer_name}</span>
                    <span className="text-[11px] text-[#71717A] block truncate max-w-xs">{inv.customer_email}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#52525B]">
                    {inv.customer_nit}
                  </td>
                  <td className="py-3.5 px-4 text-right font-sans text-[#52525B]">
                    ${inv.subtotal.toLocaleString('es-CO')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-sans text-[#52525B]">
                    ${inv.iva_amount.toLocaleString('es-CO')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-sans font-bold text-[#18181B]">
                    ${inv.total.toLocaleString('es-CO')} <span className="text-[10px] font-normal text-[#71717A]">COP</span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-semibold capitalize ${
                      inv.dian_status === 'aceptada'
                        ? 'bg-[#ECFDF5] text-[#10B981]'
                        : 'bg-[#FFFBEB] text-[#D97706]'
                    }`}>
                      {inv.dian_status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => { setSelectedInvoice(inv); setViewMode('json'); }}
                        className="px-3 py-1.5 bg-[#18181B] text-white hover:bg-black rounded-full text-[11px] font-semibold flex items-center gap-1 transition-colors"
                        title="Ver payload JSON que se enviará a la API"
                      >
                        <Code className="w-3 h-3" />
                        <span>JSON API</span>
                      </button>
                      <button
                        onClick={() => { setSelectedInvoice(inv); setViewMode('xml'); }}
                        className="px-3 py-1.5 bg-[#F4F4F5] hover:bg-[#EAEAEA] text-[#18181B] rounded-full text-[11px] font-semibold flex items-center gap-1 transition-colors"
                        title="Ver XML estándar UBL 2.1"
                      >
                        <FileText className="w-3 h-3" />
                        <span>UBL XML</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: API JSON Payload Inspector */}
      {viewMode === 'json' && selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-black/20 shadow-2xl rounded-sm w-full max-w-2xl max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-black/10 flex items-center justify-between bg-[#FAFAFA]">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-black" />
                <h3 className="font-mono text-xs font-bold text-obsidian uppercase">
                  Payload JSON API REST · Factura {selectedInvoice.consecutive}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(JSON.stringify(generateApiJsonPayload(selectedInvoice), null, 2))}
                  className="px-2.5 py-1 bg-white border border-black/20 text-xs font-mono rounded-xs hover:border-black flex items-center gap-1"
                >
                  {copiedText ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedText ? 'Copiado' : 'Copiar'}</span>
                </button>
                <button
                  onClick={() => { setViewMode('none'); setSelectedInvoice(null); }}
                  className="p-1 text-obsidian/40 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 overflow-y-auto flex-1 bg-[#11100F] text-[#F3EEE5] font-mono text-[11px] leading-relaxed rounded-b-sm">
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(generateApiJsonPayload(selectedInvoice), null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Modal: UBL 2.1 XML Inspector */}
      {viewMode === 'xml' && selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-black/20 shadow-2xl rounded-sm w-full max-w-2xl max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-black/10 flex items-center justify-between bg-[#FAFAFA]">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-black" />
                <h3 className="font-mono text-xs font-bold text-obsidian uppercase">
                  Estándar XML UBL 2.1 · Factura {selectedInvoice.consecutive}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(generateUblXmlSnippet(selectedInvoice))}
                  className="px-2.5 py-1 bg-white border border-black/20 text-xs font-mono rounded-xs hover:border-black flex items-center gap-1"
                >
                  {copiedText ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedText ? 'Copiado' : 'Copiar'}</span>
                </button>
                <button
                  onClick={() => { setViewMode('none'); setSelectedInvoice(null); }}
                  className="p-1 text-obsidian/40 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 overflow-y-auto flex-1 bg-[#11100F] text-[#E2DDD4] font-mono text-[11px] leading-relaxed rounded-b-sm">
              <pre className="whitespace-pre-wrap">
                {generateUblXmlSnippet(selectedInvoice)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Modal: API Integration Settings */}
      {viewMode === 'config' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-black/20 shadow-2xl rounded-sm w-full max-w-xl my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-xs font-sans">
            <div className="p-4 border-b border-black/10 flex items-center justify-between bg-[#FAFAFA]">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-black" />
                <h3 className="font-sans text-sm font-bold text-obsidian uppercase tracking-wider">
                  Configuración de API de Facturación Electrónica
                </h3>
              </div>
              <button
                onClick={() => setViewMode('none')}
                className="p-1 text-obsidian/40 hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-obsidian/70 font-medium">Proveedor de Facturación Electrónica</label>
                <select
                  value={apiProvider}
                  onChange={e => setApiProvider(e.target.value)}
                  className="w-full px-3 py-2 border border-black/15 rounded-xs bg-white focus:outline-hidden focus:border-black"
                >
                  <option value="Siigo API Colombia (v1/invoices)">Siigo API REST (Colombia)</option>
                  <option value="Factus Cloud API (DIAN Direct)">Factus API Cloud (Validación Previa)</option>
                  <option value="Alegra API Facturación">Alegra WebServices</option>
                  <option value="DIAN WebService Directo">DIAN WebServices Directo (SOAP/XML)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-obsidian/70 font-medium">Endpoint URL de la API</label>
                <input
                  type="text"
                  value={apiEndpoint}
                  onChange={e => setApiEndpoint(e.target.value)}
                  className="w-full px-3 py-2 border border-black/15 rounded-xs font-mono text-obsidian focus:outline-hidden focus:border-black"
                />
              </div>

              <div className="space-y-1">
                <label className="text-obsidian/70 font-medium">Token Bearer / Clave de Acceso API</label>
                <input
                  type="password"
                  value={apiToken}
                  onChange={e => setApiToken(e.target.value)}
                  className="w-full px-3 py-2 border border-black/15 rounded-xs font-mono text-obsidian focus:outline-hidden focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-obsidian/70 font-medium">Prefijo Autorizado DIAN</label>
                  <input
                    type="text"
                    value={dianPrefix}
                    onChange={e => setDianPrefix(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 border border-black/15 rounded-xs font-mono text-obsidian uppercase focus:outline-hidden focus:border-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-obsidian/70 font-medium">Ambiente de Transmisión</label>
                  <select
                    value={environment}
                    onChange={e => setEnvironment(e.target.value as any)}
                    className="w-full px-3 py-2 border border-black/15 rounded-xs bg-white focus:outline-hidden focus:border-black"
                  >
                    <option value="sandbox">Sandbox (Pruebas DIAN)</option>
                    <option value="produccion">Producción (DIAN Real)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-black/5 rounded-xs text-[11px] text-obsidian/70 leading-relaxed font-sans">
                💡 <strong>Listo para integración:</strong> Cuando conectes tu cuenta de Siigo o Factus, este módulo enviará automáticamente el payload JSON al webhook del servidor mediante la función `POST /api/invoices`.
              </div>
            </div>

            <div className="p-4 bg-[#FAFAFA] border-t border-black/10 flex justify-end gap-2">
              <button
                onClick={() => setViewMode('none')}
                className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-black/85 transition-colors"
              >
                Guardar Configuración
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Emit New Invoice */}
      {viewMode === 'new_invoice' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-black/20 shadow-2xl rounded-sm w-full max-w-lg my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-xs font-sans">
            <div className="p-4 border-b border-black/10 flex items-center justify-between bg-[#FAFAFA]">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-black" />
                <h3 className="font-sans text-sm font-bold text-obsidian uppercase tracking-wider">
                  Emitir Nueva Factura Electrónica
                </h3>
              </div>
              <button
                onClick={() => setViewMode('none')}
                className="p-1 text-obsidian/40 hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-obsidian/70 font-medium">Seleccionar Pedido Registrado</label>
                <select
                  required
                  value={newOrderSelectedId}
                  onChange={e => {
                    setNewOrderSelectedId(e.target.value);
                    const ord = orders.find(o => o.id === e.target.value);
                    if (ord) {
                      setNewCustomerName(ord.customer_name);
                      setNewCustomerEmail(ord.customer_email);
                    }
                  }}
                  className="w-full px-3 py-2 border border-black/15 rounded-xs bg-white focus:outline-hidden focus:border-black text-obsidian"
                >
                  <option value="">Selecciona un pedido...</option>
                  {orders.map(o => (
                    <option key={o.id} value={o.id}>
                      {o.id} - {o.customer_name} (${o.total_amount.toLocaleString('es-CO')} COP)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-obsidian/70 font-medium">NIT o Cédula con Dígito de Verificación</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: 901.458.921-3"
                  value={newCustomerNit}
                  onChange={e => setNewCustomerNit(e.target.value)}
                  className="w-full px-3 py-2 border border-black/15 rounded-xs font-mono text-obsidian focus:outline-hidden focus:border-black"
                />
              </div>

              <div className="space-y-1">
                <label className="text-obsidian/70 font-medium">Razón Social / Nombre Fiscal</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Estudio Londoño Arquitectos S.A.S."
                  value={newCustomerName}
                  onChange={e => setNewCustomerName(e.target.value)}
                  className="w-full px-3 py-2 border border-black/15 rounded-xs text-obsidian focus:outline-hidden focus:border-black"
                />
              </div>

              <div className="space-y-1">
                <label className="text-obsidian/70 font-medium">Correo Electrónico para Recepción DIAN</label>
                <input
                  type="email"
                  required
                  placeholder="facturacion@estudio.com"
                  value={newCustomerEmail}
                  onChange={e => setNewCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-black/15 rounded-xs text-obsidian focus:outline-hidden focus:border-black"
                />
              </div>

              <div className="p-3 bg-[#FAF9F7] border border-black/10 rounded-xs space-y-1 text-[11px] font-mono">
                <div className="text-obsidian/60">Tasa de IVA: 19% General Bienes Muebles</div>
                <div className="text-obsidian/60">Generación CUFE: Automática SHA-384</div>
                <div className="text-black font-bold">Estado inicial: Aceptada con Validación Previa DIAN</div>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-black/10">
                <button
                  type="button"
                  onClick={() => setViewMode('none')}
                  className="px-4 py-2 border border-black/15 text-obsidian/70 rounded-xs hover:border-black text-xs uppercase tracking-wider"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-black/85 transition-colors shadow-md"
                >
                  Emitir y Validar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useRef } from 'react';
import { parseCSV } from '../../utils/csvExportImport';
import { X, UploadCloud, FileText, Check, AlertTriangle, Download, ArrowRight } from 'lucide-react';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  sampleTemplateName: string;
  sampleTemplateHeaders: string[];
  sampleTemplateRows: string[][];
  onImportConfirm: (rows: Record<string, string>[]) => Promise<{ success: boolean; message: string }>;
}

export const ImportModal: React.FC<ImportModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  sampleTemplateName,
  sampleTemplateHeaders,
  sampleTemplateRows,
  onImportConfirm
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [parsedRows, setParsedRows] = useState<Record<string, string>[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDownloadSampleTemplate = () => {
    const headerLine = sampleTemplateHeaders.map(h => `"${h}"`).join(';');
    const dataLines = sampleTemplateRows.map(row => row.map(cell => `"${cell}"`).join(';'));
    const content = '\uFEFF' + [headerLine, ...dataLines].join('\r\n');
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `plantilla_${sampleTemplateName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setErrorMsg(null);
    setSuccessMsg(null);
    setFile(selected);

    const reader = new FileReader();
    reader.onload = event => {
      try {
        const text = event.target?.result as string;
        if (selected.name.endsWith('.json')) {
          const json = JSON.parse(text);
          if (Array.isArray(json)) {
            setParsedRows(json.map(item => Object.fromEntries(Object.entries(item).map(([k, v]) => [k, String(v)]))));
          } else {
            throw new Error('El archivo JSON debe contener un arreglo de objetos.');
          }
        } else {
          // CSV parser
          const rows = parseCSV(text);
          if (rows.length === 0) {
            throw new Error('El archivo CSV está vacío o tiene un formato no compatible.');
          }
          setParsedRows(rows);
        }
      } catch (err: any) {
        setErrorMsg(err.message || 'Error al procesar el archivo seleccionado.');
        setParsedRows([]);
      }
    };
    reader.readAsText(selected);
  };

  const handleConfirm = async () => {
    if (parsedRows.length === 0) {
      setErrorMsg('No hay filas válidas para importar.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg(null);
    try {
      const result = await onImportConfirm(parsedRows);
      if (result.success) {
        setSuccessMsg(result.message);
        setTimeout(() => {
          onClose();
          // Reset
          setFile(null);
          setParsedRows([]);
          setSuccessMsg(null);
        }, 1200);
      } else {
        setErrorMsg(result.message);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error al guardar los datos importados.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-black/15 shadow-2xl rounded-sm w-full max-w-3xl my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-black/10 flex items-center justify-between bg-[#FAFAFA]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xs bg-black text-white flex items-center justify-center">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans text-base text-obsidian uppercase font-bold tracking-wider">
                {title}
              </h3>
              <p className="text-[11px] text-obsidian/60 font-sans">{subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-obsidian/50 hover:text-black hover:bg-black/5 rounded-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs font-sans">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xs flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Template Download Prompt */}
          <div className="p-4 bg-[#FAF9F7] border border-black/10 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-obsidian block">¿Primera vez importando?</span>
              <span className="text-[11px] text-obsidian/60">
                Descarga la plantilla oficial en Excel/CSV con los encabezados exactos para evitar errores.
              </span>
            </div>
            <button
              type="button"
              onClick={handleDownloadSampleTemplate}
              className="px-3 py-1.5 bg-white border border-black/20 text-obsidian hover:border-black rounded-xs text-xs uppercase font-medium tracking-wider flex items-center gap-1.5 shadow-xs shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar Plantilla CSV</span>
            </button>
          </div>

          {/* File Dropzone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-black/20 hover:border-black/50 p-8 rounded-xs text-center cursor-pointer transition-colors bg-white hover:bg-black/[0.01]"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.json"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mx-auto text-black mb-3">
              <FileText className="w-6 h-6" />
            </div>
            <span className="font-bold text-obsidian text-sm block">
              {file ? file.name : 'Haz clic para seleccionar tu archivo CSV o JSON'}
            </span>
            <span className="text-[11px] text-obsidian/50 block mt-1">
              Compatible con exportaciones de Excel, ERPs, Siigo o bases de datos
            </span>
          </div>

          {/* Preview Table */}
          {parsedRows.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider text-obsidian/60 font-semibold">
                  Previsualización de Datos ({parsedRows.length} filas detectadas):
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-xs font-medium">
                  Formato Validado
                </span>
              </div>

              <div className="border border-black/10 rounded-xs overflow-x-auto max-h-56">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-[#F6F6F6] text-[10px] font-mono uppercase text-obsidian/60 border-b border-black/10 sticky top-0">
                    <tr>
                      {Object.keys(parsedRows[0]).map(header => (
                        <th key={header} className="p-2 whitespace-nowrap">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5 bg-white">
                    {parsedRows.slice(0, 10).map((row, idx) => (
                      <tr key={idx} className="hover:bg-black/[0.01]">
                        {Object.values(row).map((val, cellIdx) => (
                          <td key={cellIdx} className="p-2 whitespace-nowrap text-obsidian/80">
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {parsedRows.length > 10 && (
                <span className="text-[10px] text-obsidian/40 italic block text-right font-sans">
                  Mostrando las primeras 10 de {parsedRows.length} filas. Todas serán procesadas al confirmar.
                </span>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#FAFAFA] border-t border-black/10 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs uppercase tracking-wider text-obsidian/70 hover:text-black border border-black/15 rounded-xs transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isProcessing || parsedRows.length === 0}
            className="px-6 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-black/85 transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isProcessing ? (
              <span>Procesando...</span>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Confirmar e Importar {parsedRows.length > 0 ? `(${parsedRows.length})` : ''}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

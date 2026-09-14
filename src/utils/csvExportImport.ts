/**
 * Montezzi Luxury Hardware - Data Export & Import Utilities
 * Universal CSV and JSON export/import helpers with UTF-8 BOM encoding for Excel compatibility.
 */

export interface ExportColumn<T> {
  header: string;
  key: keyof T | ((item: T) => string | number | boolean | null | undefined);
}

/**
 * Exports any dataset to a downloadable CSV file.
 * Adds UTF-8 Byte Order Mark (\uFEFF) so Spanish accents and characters open perfectly in Excel.
 */
export function exportToCSV<T>(
  filename: string,
  data: T[],
  columns: ExportColumn<T>[]
): void {
  if (!data || data.length === 0) {
    alert('No hay datos disponibles para exportar.');
    return;
  }

  const headerRow = columns.map(c => `"${c.header.replace(/"/g, '""')}"`).join(';');
  
  const rows = data.map(item => {
    return columns.map(col => {
      let val: any;
      if (typeof col.key === 'function') {
        val = col.key(item);
      } else {
        val = item[col.key];
      }

      if (val === null || val === undefined) {
        return '""';
      }

      const strVal = String(val).replace(/"/g, '""');
      return `"${strVal}"`;
    }).join(';');
  });

  const csvContent = '\uFEFF' + [headerRow, ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Exports any dataset to a downloadable formatted JSON file.
 */
export function exportToJSON(filename: string, data: any): void {
  if (!data || (Array.isArray(data) && data.length === 0)) {
    alert('No hay datos disponibles para exportar.');
    return;
  }

  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Parses raw CSV content into an array of objects.
 * Handles both comma (,) and semicolon (;) separators.
 */
export function parseCSV(csvText: string): Record<string, string>[] {
  const cleanText = csvText.replace(/^\uFEFF/, '').trim();
  const lines = cleanText.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) return [];

  // Detect delimiter (; or ,)
  const firstLine = lines[0];
  const semicolonCount = (firstLine.match(/;/g) || []).length;
  const commaCount = (firstLine.match(/,/g) || []).length;
  const delimiter = semicolonCount >= commaCount ? ';' : ',';

  // Parse header
  const parseRow = (rowStr: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < rowStr.length; i++) {
      const char = rowStr[i];
      if (char === '"') {
        if (inQuotes && rowStr[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === delimiter && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  const headers = parseRow(lines[0]).map(h => h.replace(/^["']|["']$/g, '').trim());

  const results: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseRow(lines[i]);
    if (values.length === 0 || values.every(v => v === '')) continue;

    const rowObj: Record<string, string> = {};
    headers.forEach((header, index) => {
      rowObj[header] = values[index] !== undefined ? values[index].replace(/^["']|["']$/g, '').trim() : '';
    });
    results.push(rowObj);
  }

  return results;
}

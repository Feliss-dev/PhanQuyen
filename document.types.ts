export interface Department {
    id: string;
    name: string;
  }
  
  export interface Field {
    id: string;
    name: string;
  }

  export interface DocumentType {
    id: string;
    name: string;
  }
  
  export interface File {
    type: 'MAIN' | 'ORIGINAL';
    path: string;
    name?: string; // Thêm thuộc tính name nếu cần để hỗ trợ upload
  }
  
  export interface FormData {
    departmentId: string;
    fieldId: string;
    documentTypeId: string;
    documentNumber: string;
    issueDate: string;
    issuingLevel: string;
    title: string;
    summary: string;
    status: 'PRIVATE' | 'PUBLIC';
    files: File[];
    originalFiles: File[];
  }
  
import React, { ChangeEvent, FormEvent, useState } from "react";
import FileInputGroup from "./FileInputGroup";
import SelectField from "./SelectField";
import { Department, DocumentType, Field, FormData } from "@/document.types";

interface DocumentUploadFormProps {
  departments: Department[];
  fields: Field[];
  documentTypes: DocumentType[];
  onSubmit: (formData: FormData) => void;
}

const DocumentUploadForm = ({
  departments,
  fields,
  documentTypes,
  onSubmit,
}: DocumentUploadFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    departmentId: "",
    fieldId: "",
    documentTypeId: "",
    documentNumber: "",
    issueDate: "",
    issuingLevel: "",
    title: "",
    summary: "",
    status: "PRIVATE",
    files: [{ type: "MAIN", path: "" }],
    originalFiles: [{ type: "ORIGINAL", path: "" }],
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddFile = (type: "MAIN" | "ORIGINAL") => {
    const key = type === "MAIN" ? "files" : "originalFiles";
    setFormData({
      ...formData,
      [key]: [...formData[key], { type, path: "" }],
    });
  };

  const handleFileChange = (
    index: number,
    value: string,
    type: "MAIN" | "ORIGINAL"
  ) => {
    const key = type === "MAIN" ? "files" : "originalFiles";
    const updatedFiles = [...formData[key]];
    updatedFiles[index].path = value;
    setFormData({ ...formData, [key]: updatedFiles });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Left Column */}
      <div className="space-y-6">
        <div>
        
        <SelectField
          name="departmentId"
          label="Đơn vị cập nhật"
          options={departments}
          value={formData.departmentId}
          onChange={handleInputChange}
        />
        </div>

        <div>
          
        <SelectField
          name="fieldId"
          label="Lĩnh vực"
          options={fields}
          value={formData.fieldId}
          onChange={handleInputChange}
        />
        </div>
        <div>
         
        <SelectField
          name="documentTypeId"
          label="Loại văn bản"
          options={documentTypes}
          value={formData.documentTypeId}
          onChange={handleInputChange}
        />
        </div>

        <div className="flex space-x-4">
        <div>
            <label htmlFor="documentNumber" className="block text-sm font-medium text-gray-700">
              Số văn bản
            </label>
          <input
            type="text"
            name="documentNumber"
            placeholder="Số văn bản"
            className="input"
            value={formData.documentNumber}
            onChange={handleInputChange}
          />
         </div>
         <div>
            <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700">
              Ngày ban hành
            </label>
          <input
            type="date"
            name="issueDate"
            className="input"
            value={formData.issueDate}
            onChange={handleInputChange}
          />
        </div>
        </div>
        <div>
          <label htmlFor="issuingLevel" className="block text-sm font-medium text-gray-700">
            Cấp ban hành
          </label>
        <input
          type="text"
          name="issuingLevel"
          placeholder="Cấp ban hành"
          className="input"
          value={formData.issuingLevel}
          onChange={handleInputChange}
        />
      </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
      <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Tên văn bản
          </label>
        <input
          type="text"
          name="title"
          placeholder="Tên văn bản"
          className="input"
          value={formData.title}
          onChange={handleInputChange}
        />
        </div>

        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
            Trích yếu
          </label>
        <textarea
          name="summary"
          placeholder="Trích yếu"
          className="textarea"
          value={formData.summary}
          onChange={handleInputChange}
        />
          </div>

        <div className="space-y-4">
          <FileInputGroup
            files={formData.files.map((file) => file.path)}
            type="MAIN"
            onAdd={() => handleAddFile("MAIN")}
            onChange={(index, value) => handleFileChange(index, value, "MAIN")}
          />
          <FileInputGroup
            files={formData.originalFiles.map((file) => file.path)}
            type="ORIGINAL"
            onAdd={() => handleAddFile("ORIGINAL")}
            onChange={(index, value) =>
              handleFileChange(index, value, "ORIGINAL")
            }
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="status"
              value="PRIVATE"
              checked={formData.status === "PRIVATE"}
              onChange={handleInputChange}
            />
            <span>Private</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="status"
              value="PUBLIC"
              checked={formData.status === "PUBLIC"}
              onChange={handleInputChange}
            />
            <span>Public</span>
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Đăng tải tài liệu
        </button>
      </div>
    </form>
  );
};

export default DocumentUploadForm;

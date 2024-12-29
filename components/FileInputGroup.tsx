import React from 'react';

interface FileInputGroupProps {
  files: string[]; // Mảng các file được upload
  type: 'MAIN' | 'ORIGINAL'; // Loại file, chỉ có thể là 'MAIN' hoặc 'ORIGINAL'
  onAdd: () => void; // Hàm xử lý thêm file mới
  onChange: (index: number, value: string) => void; // Hàm xử lý thay đổi file, nhận chỉ số và giá trị mới
}

const FileInputGroup = ({ files, type, onAdd, onChange }: FileInputGroupProps) => {
  return (
    <div>
      <h4 className="text-lg font-semibold">{type === 'MAIN' ? 'Files' : 'File Gốc'}</h4>
      {files.map((file, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="file"
            className="input"
            onChange={(e) => onChange(index, e.target.value)}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="btn btn-secondary mt-2"
      >
        + Thêm file
      </button>
    </div>
  );
};

export default FileInputGroup;

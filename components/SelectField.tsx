import React from 'react';

type Option = {
  id: string | number; // id có thể là số hoặc chuỗi
  name: string; // name là chuỗi
};

type SelectFieldProps = {
  name: string; // Thuộc tính name là chuỗi
  label: string; // Nhãn hiển thị
  options: Option[]; // Mảng các lựa chọn (array of objects)
  value: string | number; // Giá trị được chọn
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Hàm xử lý sự kiện onChange
};

const SelectField =({
  name,
  label,
  options,
  value,
  onChange,
}: SelectFieldProps) => {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="input"
      >
        <option value="">Chọn</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;

// src/components/_components/Footer.tsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Thông tin trường */}
          <div>
            <h3 className="text-lg font-bold mb-2">Trường Đại học Tài nguyên và Môi trường</h3>
            <p className="text-sm">
              Địa chỉ: Số 236 đường Phạm Văn Đồng, quận Bắc Từ Liêm, Hà Nội, Việt Nam
            </p>
            <p className="text-sm">Điện thoại: (+84) 24 3756 2401</p>
            <p className="text-sm">Email: info@tnm.edu.vn</p>
          </div>

          {/* Column 2: Liên kết */}
          <div>
            <h3 className="text-lg font-bold mb-2">Liên kết hữu ích</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-sm hover:text-gray-400">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="/admissions" className="text-sm hover:text-gray-400">
                  Tuyển sinh
                </a>
              </li>
              <li>
                <a href="/courses" className="text-sm hover:text-gray-400">
                  Chương trình đào tạo
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm hover:text-gray-400">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Mạng xã hội */}
          <div>
            <h3 className="text-lg font-bold mb-2">Mạng xã hội</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.facebook.com/tnm.edu.vn" target="_blank" className="text-sm hover:text-gray-400">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com/tnm.edu.vn" target="_blank" className="text-sm hover:text-gray-400">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/school/tnm.edu.vn" target="_blank" className="text-sm hover:text-gray-400">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Trường Đại học Tài nguyên và Môi trường. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

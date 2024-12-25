1. Bảng User (Người dùng)
Mục đích: Lưu trữ thông tin người dùng trong hệ thống.

Các trường chính:

id: Khóa chính, định danh duy nhất (UUID).
name: Tên người dùng (tùy chọn).
email: Địa chỉ email duy nhất.
password: Mật khẩu được mã hóa.
role: Vai trò của người dùng (ADMIN, USER).
departmentId: Khóa ngoại liên kết với bảng Departments để xác định người dùng thuộc đơn vị/khoa nào.
Liên kết:

1-n với bảng Departments: Một người dùng thuộc về một đơn vị/khoa.
1-n với bảng Document: Một người dùng có thể tải lên nhiều tài liệu.
2. Bảng Departments (Đơn vị/Khoa)
Mục đích: Lưu trữ thông tin về các đơn vị hoặc khoa trong tổ chức.

Các trường chính:

id: Khóa chính, định danh duy nhất (UUID).
name: Tên đơn vị/khoa.
Liên kết:

1-n với bảng User: Một đơn vị/khoa có nhiều người dùng.
1-n với bảng Document: Một đơn vị/khoa có thể tải lên nhiều tài liệu.
3. Bảng Fields (Lĩnh vực)
Mục đích: Lưu trữ danh sách các lĩnh vực chuyên môn liên quan đến tài liệu.

Các trường chính:

id: Khóa chính, định danh duy nhất (UUID).
name: Tên lĩnh vực.
Liên kết:

1-n với bảng Document: Một lĩnh vực có thể bao gồm nhiều tài liệu.
4. Bảng DocumentTypes (Loại tài liệu)
Mục đích: Lưu trữ danh sách các loại tài liệu.

Các trường chính:

id: Khóa chính, định danh duy nhất (UUID).
name: Tên loại tài liệu.
Liên kết:

1-n với bảng Document: Một loại tài liệu có thể được áp dụng cho nhiều tài liệu.
5. Bảng Document (Tài liệu)
Mục đích: Lưu trữ thông tin chi tiết về tài liệu được tải lên.

Các trường chính:

id: Khóa chính, định danh duy nhất (UUID).
title: Tiêu đề tài liệu.
documentNumber: Số hiệu tài liệu.
issueDate: Ngày ban hành tài liệu.
issuingLevel: Cấp phát hành tài liệu.
summary: Tóm tắt nội dung tài liệu (tùy chọn).
status: Trạng thái tài liệu (PRIVATE, PUBLIC).
userId: Khóa ngoại liên kết với bảng User (người tải tài liệu).
departmentId: Khóa ngoại liên kết với bảng Departments.
fieldId: Khóa ngoại liên kết với bảng Fields.
documentTypeId: Khóa ngoại liên kết với bảng DocumentTypes.
Liên kết:

1-1 với bảng User: Một tài liệu được tải lên bởi một người dùng.
1-n với bảng Departments: Một tài liệu thuộc về một đơn vị/khoa.
1-n với bảng Fields: Một tài liệu thuộc về một lĩnh vực.
1-n với bảng DocumentTypes: Một tài liệu thuộc về một loại tài liệu.
1-n với bảng DocumentFile: Một tài liệu có thể có nhiều file liên quan.
6. Bảng DocumentFile (File tài liệu)
Mục đích: Lưu trữ các file liên quan đến tài liệu.

Các trường chính:

id: Khóa chính, định danh duy nhất (UUID).
documentId: Khóa ngoại liên kết với bảng Document.
fileType: Loại file (MAIN, ORIGINAL).
filePath: Đường dẫn lưu trữ file.
Liên kết:

1-n với bảng Document: Một tài liệu có thể có nhiều file.
Tóm tắt các liên kết chính
Bảng User liên kết với bảng Departments (1-n):

Một người dùng thuộc về một đơn vị/khoa.
Bảng Departments liên kết với bảng Document (1-n):

Một đơn vị/khoa có thể tải lên nhiều tài liệu.
Bảng Fields và DocumentTypes liên kết với bảng Document (1-n):

Một lĩnh vực hoặc loại tài liệu có thể bao gồm nhiều tài liệu.
Bảng Document liên kết với bảng DocumentFile (1-n):

Một tài liệu có thể có nhiều file liên quan.
Mối quan hệ tổng thể
Hệ thống tập trung vào việc quản lý tài liệu, trong đó tài liệu được liên kết với người dùng, đơn vị/khoa, lĩnh vực, và loại tài liệu.
Các file tài liệu được lưu trữ riêng biệt và được gắn với từng tài liệu cụ thể.
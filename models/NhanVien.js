var NhanVien = function (maNV,tenNV,heSoCV,tenCV,luongCB,soGioLam) {
    this.maNhanVien = maNV;
    this.tenNhanVien = tenNV;
    this.heSoChucVu = heSoCV;
    this.chucVu = tenCV;
    this.luongCoBan = luongCB;
    this.soGioLamTrongThang = soGioLam;
    // Các giá trị tính toán được thì không đưa vào lưu trữ
    this.tinhLuongNhanVien = function () {
        var tongLuong = Number(this.luongCoBan) * Number(this.heSoChucVu);
        return tongLuong;
    }
    this.xepLoaiNhanVien= function () {
        var soGioLam = this.soGioLamTrongThang;
        var xepLoai = '';
        if (soGioLam > 120) {
            xepLoai = 'Nhân viên xuất sắc';
        } else if (soGioLam > 100 && soGioLam <= 120) {
            xepLoai = 'Nhân viên giỏi';
        } else if (soGioLam > 80 && soGioLam <= 100) {
            xepLoai = 'Nhân viên khá';
        } else if (soGioLam > 50 && soGioLam <= 80) {
            xepLoai = 'Nhân viên trung bình';
        } else {
            xepLoai = 'Không đủ tiêu chuẩn!';
        }
        return xepLoai;
    }
}
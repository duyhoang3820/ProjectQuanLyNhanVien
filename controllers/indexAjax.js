var validation = new Validatiton();
var kiemTra = function () {
    var valid = true;
    valid &= validation.kiemTraRong('#maNhanVien', 'Mã nhân viên ', '#kiemTraRong_maNhanVien') &
        validation.kiemTraRong('#tenNhanVien', 'Tên nhân viên ', '#kiemTraRong_tenNhanVien') &
        validation.kiemTraRong('#luongCoBan', 'Lương căn bản ', '#kiemTraRong_luongCoBan') &
        validation.kiemTraRong('#soGioLam', 'Số giờ làm ', '#kiemTraRong_soGioLam');

    valid &= validation.kiemTraDoDai('#maNhanVien', 'Mã nhân viên ', '#kiemTraDoDai_maNhanVien', 4, 6) &
        validation.kiemTraTatCaSo('#maNhanVien', 'Mã nhân viên ', '#kiemTraDinhDang_tatCaSo');

    valid &= validation.kiemTraTatCaChu('#tenNhanVien', 'Tên nhân viên ', '#kiemTraDinhDang_tatCaChu');

    valid &= validation.kiemTraGiaTri('#luongCoBan', 'Lương cơ bản ', '#kiemTraGiaTri_luongCoBan', 1000000, 20000000) & validation.kiemTraGiaTri('#soGioLam', 'Số giờ làm', '#kiemTraGiaTri_soGioLam', 50, 150);
    if (!valid) {
        return;
    }
}
var renderNhanVien = function () {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien', //Backend cung cấp api
        method: 'GET', //Backend cung cấp method
        responseType: 'json' //Backend cung cấp dữ liệu trả về
    })

    // Xử lý thành công
    promise.then(function (result) {
        console.log('result', result.data);
        // Hiển thị thông tin sinh viên lên table
        renderTableNhanVien(result.data);
    });
    // Xử lý thất bại
    promise.catch(function (err) {
    });
}
var renderTableNhanVien = function (arrNhanVien) {
    var content = '';
    for (var i = 0; i < arrNhanVien.length; i++) {
        var nhanVien = arrNhanVien[i];
        var nv = new NhanVien(nhanVien.maNhanVien, nhanVien.tenNhanVien, nhanVien.heSoChucVu, nhanVien.chucVu, nhanVien.luongCoBan, nhanVien.soGioLamTrongThang);

        content += `
        <tr>
        <td>${nv.maNhanVien}</td>
        <td>${nv.tenNhanVien}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.luongCoBan}</td>
        <td>${nv.tinhLuongNhanVien()}</td>
        <td>${nv.soGioLamTrongThang}</td>
        <td>${nv.xepLoaiNhanVien()}</td>
        <td>
        <button class="btn btn-danger" onclick="xoaNhanVien('${nv.maNhanVien}')">Xóa</button>
        <button class="btn btn-danger" onclick="chinhSua('${nv.maNhanVien}')">Chỉnh sửa</button>
        </td>
        </tr>
        `;
    }
    document.querySelector('#tblNhanVien').innerHTML = content;
}

renderNhanVien();


document.querySelector('#btnXacNhan').onclick = function () {
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.heSoChucVu = document.querySelector('#chucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLam').value;

    var arrOption = document.querySelector('#chucVu').options;
    var slChucVu = document.querySelector('#chucVu');
    nhanVien.chucVu = arrOption[slChucVu.selectedIndex].innerHTML;

    kiemTra();


    // Gọi API để đưa dữ liệu về server lưu trữ
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',//api backend cung cấp
        method: 'POST',//method backend cung cấp
        data: nhanVien,//Format data phải đúng định dạng backend cần
        responseType: 'json',
    });

    promise.then(function (result) {
        console.log('Xử lý thành công', result.data);
        // Gọi hàm ajax lấy dữ liệu mới nhất từ server về
        renderNhanVien();
    });

    promise.catch(function (error) {
        console.log('Xử lý thất bại', error.reponse.data);
    });
}


window.xoaNhanVien = function (maNhanVien) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNhanVien}`,
        method: 'DELETE',
    });
    // Xử lý thành công
    promise.then(function (result) {
        console.log('result', result.data);
        // Gọi hàm ajax lấy dữ liệu mới nhất từ server về
        renderNhanVien();
    });
    // Xử lý thất bại
    promise.catch(function (error) {
        console.log('Xử lý thất bại', error.reponse.data);
    });
}


window.chinhSua = function (maNhanVien) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNhanVien}`,
        method: 'GET',
        // responseType: 'json'
    })

    promise.then(function (result) {
        console.log('Xử lý thành công', result.data);

        var arrOption = document.querySelector('#chucVu').options;
        var slChucVu = document.querySelector('#chucVu');
        var nv = result.data;

        document.querySelector('#maNhanVien').value = nv.maNhanVien;
        document.querySelector('#tenNhanVien').value = nv.tenNhanVien;
        arrOption[slChucVu.selectedIndex].innerHTML = nv.chucVu;
        document.querySelector('#luongCoBan').value = nv.luongCoBan;
        document.querySelector('#soGioLam').value = nv.soGioLamTrongThang;

        // nhanVien.chucVu  = arrOption[slChucVu.selectedIndex].innerHTML;
        renderNhanVien();
    });

    promise.catch(function (error) {
        console.log('Xử lý thất bại', error.reponse.data);
    });
}


document.querySelector('#btnCapNhatNhanVien').onclick = function () {
    var nhanVien = new NhanVien();
    var arrOption = document.querySelector('#chucVu').options;
    var slChucVu = document.querySelector('#chucVu');

    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.chucVu = arrOption[slChucVu.selectedIndex].innerHTML;
    nhanVien.heSoChucVu = document.querySelector('#chucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.tinhLuongNhanVien();
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLam').value;
    nhanVien.xepLoaiNhanVien();

    kiemTra();

    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nhanVien.maNhanVien}`,
        method: 'PUT',
        data: nhanVien
    });

    promise.then(function (result) {
        console.log('result', result.data);
        // Gọi hàm ajax lấy dữ liệu mới nhất từ server về
        renderNhanVien();
    });
    // Xử lý thất bại
    promise.catch(function (error) {
        console.log('Xử lý thất bại', error.reponse.data);
    });
}

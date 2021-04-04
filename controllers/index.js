var validate = new Validatiton();
document.querySelector('#btnXacNhan').onclick = function () {
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.heSoChucVu = document.querySelector('#chucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.gioLam = document.querySelector('#soGioLam').value;

    // lấy danh sách option trong thẻ select
    // var arrOption=document.querySelectorAll('#chucVu option')

    var arrOption = document.querySelector('#chucVu').options;
    // console.log('option', arrOption);
    // lấy vị trí option đc chọn từ select
    var slChucVu = document.querySelector('#chucVu');
    // console.log('indexOptionSelected', slChucVu.selectedIndex);

    nhanVien.tenChucVu = arrOption[slChucVu.selectedIndex].innerHTML;
    // document.querySelector('#txtChucVu').innerHTML = nhanVien.tenChucVu;


}

import {DonVi} from "./donvi";
import {PhongBan} from "./phongban";

export class HoSo {
  idHoSo : number = 0;
  soHieuCBCCVC : string = '';
  donVi : DonVi = new DonVi();
  phongBan : PhongBan = new PhongBan();
  imageUrl : Blob = new Blob();
  hoVaTen : string = '';
  ngaySinh ?: string;
  gioiTinh : string = '';
  noiSinh : string = '';
  hoKhauThuongTru ?: string;
  noiOHienTai ?: string;
  danToc : number = 0;
  tonGiao : number = 0;
  soCmnd ?: string;
  chucVu : string = '';
  ngayBoNhiem ?: string;
  maNgach : string = '';
  bacLuong : number = 0;
  heSoLuong : number = 0;
  heSoPhuCapChucVu : number = 0;
  phuCapThamNienVuotKhung : number = 0;
  ngayVaoDcsvn ?: string;
  soTheDang ?: string;
  trinhDoGDPT ?: string;
  trinhDoChuyenMon ?: string;
  hocVi ?: string;
  hocHam ?: string;
  ngoaiNgu ?: string;
  tinHoc ?: string;
  soBaoHiemXh ?: string;
  danhGia : string = '';
  ngayDanhGia : string = '';
  soQuyetDinhKhenThuong: string = '';
  hinhThucKhenThuong: string = '';
  ngayKhenThuong: string = '';
  soQuyetDinhKyLuat: string = '';
  hinhThucKyLuat: string = '';
  ngayKyLuat: string = '';
  ngayGuiDaoTaoBoiDuong : string = '';
  tenChuyenNganhDaoTaoBoiDuong : string = '';
  trangThaiDaoTaoBoiDuong : string = '';

  constructor() {
  }
}

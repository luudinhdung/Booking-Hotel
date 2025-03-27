import styles from "./Footer.module.scss";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Hàng trên: Links */}
      <div className={styles["footer-top"]}>
        <div className={styles["footer-links"]}>
          <div className={styles["footer-column"]}>
            <h4>Về Chúng Tôi</h4>
            <ul>
              <li>
                <a href="#">Giới thiệu</a>
              </li>
              <li>
                <a href="#">Liên hệ</a>
              </li>
              <li>
                <a href="#">Chính sách bảo mật</a>
              </li>
            </ul>
          </div>
          <div className={styles["footer-column"]}>
            <h4>Hỗ Trợ</h4>
            <ul>
              <li>
                <a href="#">Hướng dẫn sử dụng</a>
              </li>
              <li>
                <a href="#">Câu hỏi thường gặp</a>
              </li>
              <li>
                <a href="#">Phản hồi khách hàng</a>
              </li>
            </ul>
          </div>
          <div className={styles["footer-column"]}>
            <h4>Liên Hệ</h4>
            <ul>
              <li>
                <a href="#">Email: support@bookingapp.com</a>
              </li>
              <li>
                <a href="#">Hotline: 1900 123 456</a>
              </li>
              <li>
                <a href="#">Địa chỉ: Hà Nội, Việt Nam</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hàng dưới: Bản quyền & Social Media */}
      <div className={styles["footer-bottom"]}>
        <p>&copy; 2025 BookingApp. All rights reserved.</p>
        <div className={styles["social-icons"]}>
          <a href="#">
            <FaFacebookF />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

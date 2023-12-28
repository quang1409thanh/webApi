// components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer>
            <footer className="general-footer">
                <div className="main-footer d-flex">
                    <div className="footer-info">
                        <div className="logo-ft d-flex justify-content-between">
                            <a href="/" target="_blank"><img src="/img/logo.png" alt="HShop"
                                                             className="footer-logo-image"/></a>
                            <a href="https://uet.vnu.edu.vn/" target="_blank"><img src="/img/logo2_new.png" alt="UET"
                                                                                   className="footer-logo-image"/></a>
                        </div>
                        <div className="content-footer-info">
                            <div className="description-ft">
                                <p style={{textAlign: 'center', fontSize: '20px'}}>Dịch vụ chuyển phát <span
                                    className="highlight">Magic Post</span></p>
                                <div className="description-ft-detail" style={{paddingLeft: '15px'}}>
                                    <p><strong>Địa chỉ: </strong> UET, Xuân Thủy, Cầu Giấy, Hà Nội</p>
                                    <p><strong>Số điện thoại: </strong>0987 910 JQK/ 0999 999 999</p>
                                    <p><strong>Email: </strong> MagicPost@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-about d-flex justify-content-between">
                        <div className="introduce-ft about-ft-item">
                            <p className="title-ft">Giới thiệu</p>
                            <ul>
                                <li><a href="/gioithieu" target="_blank">Về Magic Post</a></li>
                                <li><a
                                    href="https://uet.vnu.edu.vn/truong-dai-hoc-cong-nghe-15-nam-xay-dung-va-truong-thanh/"
                                    target="_blank">Về UET</a></li>
                            </ul>
                        </div>
                        <div className="service-ft about-ft-item">
                            <p className="title-ft">Dịch vụ khách hàng</p>
                            <ul>
                                <li><a href="">Hướng dẫn</a></li>
                                <li><a href="">Chính sách thanh toán</a></li>
                            </ul>
                        </div>
                        <div className="contact-ft about-ft-item">
                            <p className="title-ft">Liên hệ</p>
                            <ul>
                                <li><a href="tel:0999999999">Hotline</a></li>
                                <li><a href="mailto:HShop@gmail.com">Email</a></li>
                                <li><a href="https://www.messenger.com/" target="_blank">Messenger</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </footer>
    );
};

export default Footer;

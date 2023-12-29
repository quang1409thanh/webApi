import React from 'react';

class HomeBody extends React.Component {

    render() {
        // fix slide.
        const settings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            adaptiveHeight: false,
        };

        return (
            <div>
                <section className="banner">
                    <div className="slider_banner">
                        <a href="" target="_blank" className="slide_link">
                            <img src="img/slide1.jpg" className="slide_img"/>
                        </a>
                        <a href="" target="_blank" className="slide_link hidden">
                            <img src="img/slide2.jpg" className="slide_img"/>
                        </a>
                        <a href="" target="_blank" className="slide_link hidden">
                            <img src="img/slide3.jpg" className="slide_img"/>
                        </a>
                    </div>
                </section>
                <section className="post-office-tracking">
                    <div className="container-form-tracking">
                        <div className="row">
                            <div className="postage-tracking">
                                <div className="form-title">
                                    <img src="img/icon-tracking.svg" alt="" style={{ marginRight: '0.5rem' }} />
                                    Theo dõi bưu gửi
                                </div>
                                <form className="form-tracking" method="get" action="/find_postal_items">
                                    <input type="text" name="code" className="input-tracking"
                                           placeholder="Nhập mã bưu gửi"/>
                                    <button className="button-tracking">Theo dõi</button>
                                </form>
                            </div>
                            <div className="other-services">
                                <ul className="item-service">
                                    <li>
                                        <a href="/list_office">
                                            <div className="icon-service">
                                                <img src="img/icon-fill.svg" alt=""/>
                                            </div>
                                            <div className="content-service">Tìm bưu cục</div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/aggregation_employee">
                                            <div className="icon-service">
                                                <img src="img/icon-calculator.svg" alt=""/>
                                            </div>
                                            <div className="content-service">Ước tính phí</div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <br/>
                <br/>
                <section className="impressive-figures">
                    <div className="container">
                        <div className="title text-uppercase text-center hidden">
                            Số liệu ấn tượng
                        </div>
                        <div className="row ">
                            <div className="impressive-figures-col mt-50">
                                <img src="./img/icon-giao-dich.svg" alt=""/>
                                <span className="number-left count">33.000.000</span>
                                <div className="__content-col">Giao dịch tài chính</div>
                            </div>
                            <div className="impressive-figures-col col-center">
                                <div className="title text-uppercase">Số liệu ấn tượng</div>
                                <img src="./img/icon-diem-giao-dich.svg" alt=""/>
                                <span className="number-left count">13.000</span>
                                <span className="number-left">+</span>
                                <div className="__content-col">Điểm giao dịch</div>
                            </div>
                            <div className="impressive-figures-col mt-50">
                                <img src="./img/icon-box.svg" alt=""/>
                                <span className="number-left count">1.851.000.000</span>
                                <div className="__content-col">Bưu gửi được vận chuyển</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default HomeBody;

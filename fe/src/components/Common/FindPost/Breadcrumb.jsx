// Breadcrumb.js
import React from 'react';

const Breadcrumb = () => {
    return (
        <section className="breadcrumb-section">
            <nav className="container">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item individual">
                        <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item active">
                        Tìm kiếm bưu cục
                    </li>
                </ol>
            </nav>
        </section>
    );
};

export default Breadcrumb;

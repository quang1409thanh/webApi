// src/App.js
import React from 'react';
import QRCode from 'react-qr-code';

function GoodsQr() {
    const orderCode = '12345678';

    return (
        <div>
            <h1>Order Details</h1>
            <p>Order Code: {orderCode}</p>

            <h2>QR Code</h2>
            <QRCode value={`http://localhost:8000/qrcode/${orderCode}`} />
        </div>
    );
}

export default GoodsQr;

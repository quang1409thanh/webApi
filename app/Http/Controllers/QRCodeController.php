<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class QRCodeController extends Controller
{
    //
    public function generateQRCode($orderCode)
    {
        $url = url("/order/{$orderCode}");
        return QrCode::size(300)->generate($url);
    }

}

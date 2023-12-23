<?php

namespace App\Providers;

use App\Models\TransactionPoint;
use App\Models\TransactionPointHead;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        Validator::extend('unique_transaction_point', function ($attribute, $value, $parameters, $validator) {
            return !TransactionPointHead::where('transaction_point_id', $value)->exists();
        });

    }
}

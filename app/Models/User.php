<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    /**
     * Check if the user is a company leader.
     *
     * @return bool
     */
    public function isAdminSystem(): bool
    {

        return $this->adminSystem !== null;
    }

    public function adminSystem(): HasOne
    {
        return $this->hasOne(AdminSystem::class);
    }

    /**
     * Check if the user is a company leader.
     *
     * @return bool
     */
    public function isCompanyLeader(): bool
    {
        return $this->companyLeader !== null;
    }

    /**
     * Define a relationship with the CompanyLeader model.
     *
     * @return HasOne
     */
    public function companyLeader(): HasOne
    {
        return $this->hasOne(CompanyLeader::class);
    }

    public function isAggregationPointHead()
    {
        return $this->aggregationPointHead !== null;
    }

    public function aggregationPointHead(): HasOne
    {
        return $this->hasOne(AggregationPointHead::class);
    }

    public function isTransactionPointHead()
    {
        return $this->transactionPointHead !== null;
    }

    public function transactionPointHead(): HasOne
    {
        return $this->hasOne(TransactionPointHead::class);
    }

    public function isTransactionOfficer()
    {
        return $this->transactionOfficer !== null;
    }

    public function transactionOfficer(): HasOne
    {
        return $this->hasOne(TransactionOfficer::class);
    }

    public function isAggregationPointEmployee()
    {
        return $this->aggregationPointEmployee !== null;
    }

    public function aggregationPointEmployee(): HasOne
    {
        return $this->hasOne(AggregationPointEmployee::class);
    }

    public function isCustomer()
    {
        return $this->customer !== null;
    }

    public function customer(): HasOne
    {
        return $this->hasOne(Customer::class);
    }

    public function isShipper(): bool
    {
        return $this->shipper !== null;
    }

    public function shipper(): HasOne
    {
        return $this->hasOne(Shipper::class);
    }


    // images
    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    // goods
    public function sentGoods(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Good::class, 'sender_id');
    }

    public function receivedGoods(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Good::class, 'receiver_id');
    }

    public function getUserType(): string
    {
        if ($this->isAdminSystem()) {
            return 'adminSystem';
        } else if ($this->isCompanyLeader()) {
            return 'companyLeader';
        } else if ($this->isAggregationPointHead()) {
            return 'aggregationPointHead';
        } else if ($this->isTransactionPointHead()) {
            return 'transactionPointHead';
        } else if ($this->isTransactionOfficer()) {
            return 'transactionOfficer';
        } else if ($this->isAggregationPointEmployee()) {
            return 'aggregationPointEmployee';
        } else if ($this->isCustomer()) {
            return 'customer';
        } else if ($this->isShipper()) {
            return 'shipper';
        } else {
            return 'Regular User';
        }
    }
}

<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
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
    public function isAdminSystem()
    {

        return $this->adminSystem !== null;
    }

    public function adminSystem()
    {
        return $this->hasOne(AdminSystem::class);
    }

    /**
     * Check if the user is a company leader.
     *
     * @return bool
     */
    public function isCompanyLeader()
    {
        return $this->companyLeader !== null;
    }

    /**
     * Define a relationship with the CompanyLeader model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function companyLeader()
    {
        return $this->hasOne(CompanyLeader::class);
    }
    public function isAggregationPointHead()
    {
        return $this->aggregationPointHead !== null;
    }

    public function aggregationPointHead()
    {
        return $this->hasOne(AggregationPointHead::class);
    }

    public function isTransactionPointHead()
    {
        return $this->transactionPointHead !== null;
    }

    public function transactionPointHead()
    {
        return $this->hasOne(TransactionPointHead::class);
    }

    public function isTransactionOfficer()
    {
        return $this->transactionOfficer !== null;
    }

    public function transactionOfficer()
    {
        return $this->hasOne(TransactionOfficer::class);
    }

    public function isAggregationPointEmployee()
    {
        return $this->aggregationPointEmployee !== null;
    }

    public function aggregationPointEmployee()
    {
        return $this->hasOne(AggregationPointEmployee::class);
    }

    public function isCustomer()
    {
        return $this->customer !== null;
    }

    public function customer()
    {
        return $this->hasOne(Customer::class);
    }

    public function isShipper()
    {
        return $this->shipper !== null;
    }

    public function shipper()
    {
        return $this->hasOne(Shipper::class);
    }


    // images
    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    // goods
    public function sentGoods()
    {
        return $this->hasMany(Goods::class, 'sender_id');
    }

    public function receivedGoods()
    {
        return $this->hasMany(Goods::class, 'receiver_id');
    }

    public function getUserType()
    {
        if ($this->isAdminSystem()) {
            return 'Admin System'; 
        } else if ($this->isCompanyLeader()) {
            return 'Company Leader';
        } elseif ($this->isAggregationPointHead()) {
            return 'Aggregation Point Head';
        } elseif ($this->isTransactionPointHead()) {
            return 'Transaction Point Head';
        } elseif ($this->isTransactionOfficer()) {
            return 'Transaction Officer';
        } elseif ($this->isAggregationPointEmployee()) {
            return 'Aggregation Point Employee';
        } elseif ($this->isCustomer()) {
            return 'Customer';
        } elseif ($this->isShipper()) {
            return 'Shipper';
        } else {
            return 'Regular User';
        }
    }
}

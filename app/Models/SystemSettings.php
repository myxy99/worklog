<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SystemSettings extends Model
{
    protected $table = 'system_settings';
    protected $primaryKey = 'system_setting_id';
    public $timestamps = false;
    public $guarded = ['system_setting_id'];

    public function get()
    {
        return $this->select('system_setting_site_record_info', 'system_setting_other', 'system_setting_wx_qrcode')
            ->first();
    }
}

<?php

namespace App\Services\WhatsApp;

use App\Services\WhatsApp\Drivers\UltraMsgDriver;
use InvalidArgumentException;

class WhatsAppService
{
    /**
     * Get the configured driver.
     * 
     * @return WhatsAppServiceInterface
     */
    public static function driver(): WhatsAppServiceInterface
    {
        $driver = config('services.whatsapp.default', 'ultramsg');

        switch ($driver) {
            case 'ultramsg':
                return new UltraMsgDriver();
            // case 'twilio':
            //     return new TwilioDriver();
            default:
                throw new InvalidArgumentException("WhatsApp driver [{$driver}] is not supported.");
        }
    }
}

<?php

namespace App\Services\WhatsApp\Drivers;

use App\Services\WhatsApp\WhatsAppServiceInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class UltraMsgDriver implements WhatsAppServiceInterface
{
    protected $instanceId;
    protected $token;
    protected $baseUrl;

    public function __construct()
    {
        $this->instanceId = config('services.whatsapp.ultramsg.instance_id');
        $this->token = config('services.whatsapp.ultramsg.token');
        $this->baseUrl = "https://api.ultramsg.com/{$this->instanceId}/messages";
    }

    public function sendPdf(string $phone, string $pdfUrl, string $filename, string $caption): bool
    {
        if (!$this->instanceId || !$this->token) {
            Log::warning("WhatsApp UltraMsg credentials missing.");
            return false;
        }

        try {
            $response = Http::post("{$this->baseUrl}/document", [
                'token' => $this->token,
                'to'    => $phone,
                'filename' => $filename,
                'document' => $pdfUrl,
                'caption' => $caption
            ]);

            if ($response->successful()) {
                return true;
            }

            Log::error("WhatsApp UltraMsg Error: " . $response->body());
            return false;
        } catch (\Exception $e) {
            Log::error("WhatsApp UltraMsg Exception: " . $e->getMessage());
            return false;
        }
    }
}

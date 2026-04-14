<?php

namespace App\Services\WhatsApp;

interface WhatsAppServiceInterface
{
    /**
     * Send a PDF document via WhatsApp.
     * 
     * @param string $phone The recipient phone number (including country code)
     * @param string $pdfUrl Public URL to the PDF or local path depending on driver
     * @param string $filename Original filename
     * @param string $caption Accompanying message
     * @return bool
     */
    public function sendPdf(string $phone, string $pdfUrl, string $filename, string $caption): bool;
}

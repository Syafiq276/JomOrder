<?php

/**
 * JomOrder cPanel Helper Script
 * This script helps perform common Laravel tasks if you lack SSH/Terminal access.
 * 
 * SECURITY WARNING: DELETE THIS FILE IMMEDIATELY AFTER USE.
 */

// Simple password protection or token (Optional)
// if ($_GET['token'] !== 'jomorder-secret') die('Unauthorized');

use Illuminate\Support\Facades\Artisan;

// Manually bootstrap the application
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$kernel->handle(Illuminate\Http\Request::capture());

echo "<h2>JomOrder cPanel Setup</h2>";

if (isset($_GET['action'])) {
    $action = $_GET['action'];
    
    try {
        switch ($action) {
            case 'migrate':
                echo "<pre>Running migrations...</pre>";
                Artisan::call('migrate', ['--force' => true]);
                echo "<pre>" . Artisan::output() . "</pre>";
                break;
                
            case 'storage-link':
                echo "<pre>Linking storage...</pre>";
                Artisan::call('storage:link');
                echo "<pre>" . Artisan::output() . "</pre>";
                break;
                
            case 'optimize':
                echo "<pre>Optimizing...</pre>";
                Artisan::call('optimize:clear');
                Artisan::call('config:cache');
                Artisan::call('route:cache');
                Artisan::call('view:cache');
                echo "<pre>Optimized successfully!</pre>";
                break;
                
            default:
                echo "<p style='color:red;'>Action not recognized.</p>";
        }
    } catch (\Exception $e) {
        echo "<p style='color:red;'>Error: " . $e->getMessage() . "</p>";
    }
}

echo "<ul>
    <li><a href='?action=migrate'>Run Migrations (Database Setup)</a></li>
    <li><a href='?action=storage-link'>Create Storage Link (Image Support)</a></li>
    <li><a href='?action=optimize'>Clear and Re-cache (Performance)</a></li>
</ul>";

echo "<p style='color:red; font-weight:bold;'>REMINDER: Delete this file after your site is working!</p>";

# 🚀 JomOrder: cPanel Deployment Guide

Follow these steps to finalize your deployment on cPanel now that the code is uploaded.

## 1. Project Folder Structure
Ensure your files are placed **outside** of `public_html` for security.
- Recommended: `/home/username/jomorder`
- Web Folder: `/home/username/public_html`

## 2. Point Domain to Application
Since Laravel's entry point is the `/public` folder, you must point your domain to it.

### **Method A: Symlink (Recommended)**
If you have **Terminal** access in cPanel:
```bash
cd ~
rm -rf public_html
ln -s /home/username/jomorder/public public_html
```

### **Method B: .htaccess Redirection**
If you cannot change the document root or create symlinks, create a `.htaccess` file inside `public_html`:
```apache
<IfModule mod_rewrite.c>
   RewriteEngine on
   RewriteRule ^(.*)$ jomorder/public/$1 [L]
</IfModule>
```

---

## 3. Configuration (.env)
1. Open your File Manager and locate the `.env` file in your project folder.
2. Update the following values:
   - `APP_ENV=production`
   - `APP_DEBUG=false`
   - `APP_URL=https://yourdomain.my`
   - `DB_DATABASE=your_cpanel_db_name`
   - `DB_USERNAME=your_cpanel_db_user`
   - `DB_PASSWORD=your_cpanel_db_pass`

---

## 4. Final Setup (Browser Helper)
I have created a helper script to finish the installation via your browser.
1. Visit: `https://yourdomain.my/cpanel_setup.php`
2. Click **Run Migrations** to set up your tables.
3. Click **Create Storage Link** to enable image/receipt support.
4. Click **Optimize** for better speed.

> [!CAUTION]
> **IMPORTANT SECURITY STEP:** Delete the `public/cpanel_setup.php` file immediately after you see the "Success" messages.

---

## 5. WhatsApp Automation
Ensure your Cron Jobs are set up to process the WhatsApp message queue:
- **Cron Command:** `php /home/username/jomorder/artisan schedule:run >> /dev/null 2>&1`
- **Frequency:** Every Minute.

**Your JomOrder system is now ready for Café Kak Na!** ☕🥘✨

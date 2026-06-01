<?php
require_once __DIR__ . '/config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
header('Access-Control-Allow-Methods: POST');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

function clean(string $val): string {
    return htmlspecialchars(strip_tags(trim($val)), ENT_QUOTES, 'UTF-8');
}

$fname   = clean($_POST['fname']   ?? '');
$lname   = clean($_POST['lname']   ?? '');
$email   = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$org     = clean($_POST['org']     ?? '');
$type    = clean($_POST['type']    ?? '');
$area    = clean($_POST['area']    ?? 'Not specified');
$message = clean($_POST['message'] ?? '');

if (!$fname || !$lname || !$email || !$org || !$type || !$message) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please fill all required fields.']);
    exit;
}

$fullName  = $fname . ' ' . $lname;
$timestamp = date('d M Y, h:i A') . ' IST';

$typeLabels = [
    'industry'   => 'Industry Partnership',
    'research'   => 'R&D / Research Collaboration',
    'academic'   => 'Academic / University Partnership',
    'govt'       => 'Government / PSU Project',
    'consulting' => 'AI Consulting / Problem Solving',
    'internship' => 'Student Internship',
    'other'      => 'Other',
];
$areaLabels = [
    'defence'     => 'Defence & Security',
    'health'      => 'Healthcare & Pharma',
    'agriculture' => 'Agriculture',
    'industry'    => 'Industrial Automation',
    'education'   => 'Education & EdTech',
    'multiple'    => 'Multiple Areas',
];
$typeLabel = $typeLabels[$type] ?? $type;
$areaLabel = $areaLabels[$area] ?? $area;

require_once __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function makeMailer(string $user, string $password): PHPMailer {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->Port       = (int) SMTP_PORT;
    $mail->SMTPAuth   = true;
    $mail->Username   = $user;
    $mail->Password   = $password;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->CharSet    = 'UTF-8';
    if (SMTP_DEBUG === 'true' && IS_DEVELOPMENT) {
        $mail->SMTPDebug  = 2;
        $mail->Debugoutput = function($str, $level) {
            error_log("[BharatNexgen SMTP] {$str}");
        };
    }
    return $mail;
}

$siteUrl = SITE_URL;

$internalHtml = <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
  body{font-family:Arial,sans-serif;background:#0b1120;color:#e2e8f0;margin:0;padding:0}
  .wrap{max-width:620px;margin:30px auto;background:#111c33;border:1px solid #1e3a5f;border-radius:10px;overflow:hidden}
  .header{background:linear-gradient(135deg,#0b1120,#163060);padding:30px 32px;border-bottom:2px solid #c8952a}
  .header h1{margin:0;font-size:1.4rem;color:#c8952a}
  .header p{margin:6px 0 0;font-size:0.85rem;color:#94a3b8}
  .body{padding:28px 32px}
  .row{margin-bottom:18px}
  .label{font-size:0.72rem;text-transform:uppercase;letter-spacing:2px;color:#c8952a;margin-bottom:4px}
  .value{font-size:0.95rem;color:#e2e8f0;background:#0d1628;border:1px solid #1e3a5f;border-radius:6px;padding:10px 14px}
  .message-box{white-space:pre-wrap;line-height:1.7}
  .footer{padding:16px 32px;background:#0b1120;font-size:0.78rem;color:#64748b;border-top:1px solid #1e3a5f}
</style></head>
<body>
<div class="wrap">
  <div class="header">
    <h1>🤝 New Collaboration Request</h1>
    <p>Received: {$timestamp}</p>
  </div>
  <div class="body">
    <div class="row"><div class="label">Full Name</div><div class="value">{$fullName}</div></div>
    <div class="row"><div class="label">Email</div><div class="value"><a href="mailto:{$email}" style="color:#38bdf8">{$email}</a></div></div>
    <div class="row"><div class="label">Organization</div><div class="value">{$org}</div></div>
    <div class="row"><div class="label">Collaboration Type</div><div class="value">{$typeLabel}</div></div>
    <div class="row"><div class="label">Focus Area</div><div class="value">{$areaLabel}</div></div>
    <div class="row"><div class="label">Message</div><div class="value message-box">{$message}</div></div>
  </div>
  <div class="footer">BharatNexgen Automation Pvt. Ltd. · TBIF, IIT Ropar · Punjab, India</div>
</div>
</body></html>
HTML;

$confirmHtml = <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
  body{font-family:Arial,sans-serif;background:#0b1120;color:#e2e8f0;margin:0;padding:0}
  .wrap{max-width:620px;margin:30px auto;background:#111c33;border:1px solid #1e3a5f;border-radius:10px;overflow:hidden}
  .header{background:linear-gradient(135deg,#0b1120,#163060);padding:30px 32px;border-bottom:2px solid #c8952a;text-align:center}
  .header h1{margin:0;font-size:1.5rem;color:#c8952a}
  .header p{margin:8px 0 0;font-size:0.88rem;color:#94a3b8}
  .body{padding:28px 32px;line-height:1.8}
  .body p{color:#cbd5e1;margin-bottom:14px}
  .details{background:#0d1628;border:1px solid #1e3a5f;border-radius:8px;padding:18px 20px;margin:20px 0;font-size:0.88rem;color:#94a3b8}
  .details strong{color:#c8952a}
  .cta{text-align:center;margin:28px 0 0}
  .cta a{background:#c8952a;color:#0b1120;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:700;font-size:0.9rem}
  .footer{padding:16px 32px;background:#0b1120;font-size:0.78rem;color:#64748b;border-top:1px solid #1e3a5f;text-align:center}
</style></head>
<body>
<div class="wrap">
  <div class="header">
    <h1>BharatNexgen Automation</h1>
    <p>Your collaboration request has been received ✅</p>
  </div>
  <div class="body">
    <p>Dear <strong style="color:#e2e8f0">{$fullName}</strong>,</p>
    <p>Thank you for reaching out to BharatNexgen Automation Pvt. Ltd. Our team will get back to you within <strong style="color:#c8952a">24–48 business hours</strong>.</p>
    <div class="details">
      <strong>Your Submission Summary</strong><br><br>
      <strong>Organization:</strong> {$org}<br>
      <strong>Collaboration Type:</strong> {$typeLabel}<br>
      <strong>Focus Area:</strong> {$areaLabel}<br>
      <strong>Submitted on:</strong> {$timestamp}
    </div>
    <p>You can also reach us at <a href="mailto:support@bharatnexgen.com" style="color:#38bdf8">support@bharatnexgen.com</a>.</p>
    <p style="color:#64748b;font-size:0.82rem">This is an automated confirmation. Please do not reply to this email.</p>
    <div class="cta"><a href="{$siteUrl}/pages/collaborate.html">Visit Our Website</a></div>
  </div>
  <div class="footer">
    BharatNexgen Automation Pvt. Ltd. · TBIF, IIT Ropar · Punjab — 140001, India<br>
    <a href="{$siteUrl}" style="color:#38bdf8">www.bharatnexgen.com</a>
  </div>
</div>
</body></html>
HTML;

try {
    $mail1 = makeMailer(SMTP_USER, SMTP_PASSWORD);
    $mail1->setFrom(SMTP_USER, 'BharatNexgen Website');
    $mail1->addAddress(NOTIFY_TO, 'BharatNexgen Collaborate');
    $mail1->addReplyTo($email, $fullName);
    $mail1->Subject = "New Collaboration Request — {$fullName} ({$typeLabel})";
    $mail1->isHTML(true);
    $mail1->Body    = $internalHtml;
    $mail1->AltBody = "New request from {$fullName} <{$email}>\nOrg: {$org}\nType: {$typeLabel}\nArea: {$areaLabel}\n\nMessage:\n{$message}";
    $mail1->send();

    $mail2 = makeMailer(NOREPLY_USER, NOREPLY_PASSWORD);
    $mail2->setFrom(NOREPLY_USER, 'BharatNexgen — No Reply');
    $mail2->addAddress($email, $fullName);
    $mail2->Subject = 'We received your collaboration request — BharatNexgen';
    $mail2->isHTML(true);
    $mail2->Body    = $confirmHtml;
    $mail2->AltBody = "Dear {$fullName},\n\nThank you for reaching out. We will respond within 24-48 business hours.\n\nBharatNexgen Automation Pvt. Ltd.";
    $mail2->send();

    echo json_encode(['success' => true, 'message' => 'Your request has been submitted successfully!']);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email. Please try again or contact us directly.']);
    error_log('[BharatNexgen Mailer] ' . $e->getMessage());
}

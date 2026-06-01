<?php
$appEnv = strtolower(trim(getenv('APP_ENV') ?: 'development'));

$envFile = match($appEnv) {
    'production'  => __DIR__ . '/.env.prod',
    'development' => __DIR__ . '/.env.dev',
    default       => __DIR__ . '/.env.dev',
};

if (!file_exists($envFile)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server configuration error.']);
    error_log("[BharatNexgen] Missing env file: {$envFile} (APP_ENV={$appEnv})");
    exit;
}

$lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
foreach ($lines as $line) {
    $line = trim($line);
    if ($line === '' || str_starts_with($line, '#')) continue;
    if (!str_contains($line, '=')) continue;
    [$key, $value] = explode('=', $line, 2);
    $key   = trim($key);
    $value = trim($value);
    if (str_contains($value, ' #')) $value = trim(explode(' #', $value, 2)[0]);
    if (
        (str_starts_with($value, '"') && str_ends_with($value, '"')) ||
        (str_starts_with($value, "'") && str_ends_with($value, "'"))
    ) $value = substr($value, 1, -1);
    putenv("{$key}={$value}");
    if (!defined($key)) define($key, $value);
}

$required = [
    'APP_ENV', 'SMTP_HOST', 'SMTP_PORT',
    'SMTP_USER', 'SMTP_PASSWORD',
    'NOREPLY_USER', 'NOREPLY_PASSWORD',
    'NOTIFY_TO', 'SITE_URL', 'ALLOWED_ORIGIN', 'SMTP_DEBUG',
];
foreach ($required as $key) {
    if (!defined($key) || constant($key) === '') {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Server configuration error.']);
        error_log("[BharatNexgen] Missing key: {$key} (APP_ENV={$appEnv})");
        exit;
    }
}

define('IS_PRODUCTION',  APP_ENV === 'production');
define('IS_DEVELOPMENT', APP_ENV === 'development');

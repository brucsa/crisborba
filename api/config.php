<?php
// Configurações do banco de dados — preencher com os dados do cPanel do Hostgator
define('DB_HOST', 'localhost');
define('DB_NAME', 'bru35182_crisborba');
define('DB_USER', 'bru35182_crisborba_user');
define('DB_PASS', 'Brunacrist13*');

define('UPLOAD_DIR', __DIR__ . '/../uploads/');
define('UPLOAD_URL', '/uploads/');

function getDB() {
    static $pdo = null;
    if ($pdo) return $pdo;
    try {
        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER, DB_PASS,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
             PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
        );
    } catch (PDOException $e) {
        http_response_code(500);
        die(json_encode(['error' => 'Erro de conexão com o banco.']));
    }
    return $pdo;
}

function json_out($data, $code = 200) {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function requireAuth() {
    session_start();
    if (empty($_SESSION['admin_id'])) {
        json_out(['error' => 'Não autorizado.'], 401);
    }
}

// Cabeçalhos CORS e segurança
header('Access-Control-Allow-Origin: ' . (isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*'));
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

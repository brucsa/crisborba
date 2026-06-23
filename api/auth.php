<?php
require_once __DIR__ . '/config.php';
session_start();

$body = json_decode(file_get_contents('php://input'), true) ?? [];
$action = $body['action'] ?? $_GET['action'] ?? '';

switch ($action) {

    case 'login':
        $email = trim($body['email'] ?? '');
        $senha = $body['senha'] ?? '';
        if (!$email || !$senha) json_out(['error' => 'Preencha e-mail e senha.'], 400);

        $db = getDB();
        $st = $db->prepare("SELECT id, password_hash FROM admin_users WHERE email = ? LIMIT 1");
        $st->execute([$email]);
        $user = $st->fetch();

        if (!$user || !password_verify($senha, $user['password_hash'])) {
            json_out(['error' => 'E-mail ou senha incorretos.'], 401);
        }

        $_SESSION['admin_id'] = $user['id'];
        $_SESSION['admin_email'] = $email;
        json_out(['ok' => true]);

    case 'logout':
        $_SESSION = [];
        session_destroy();
        json_out(['ok' => true]);

    case 'check':
        if (!empty($_SESSION['admin_id'])) {
            json_out(['logged' => true, 'email' => $_SESSION['admin_email']]);
        }
        json_out(['logged' => false]);

    default:
        json_out(['error' => 'Ação inválida.'], 400);
}

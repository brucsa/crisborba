<?php
require_once __DIR__ . '/config.php';
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_FILES['foto'])) {
    json_out(['error' => 'Nenhuma imagem recebida.'], 400);
}

$file   = $_FILES['foto'];
$tipos  = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
$maxMB  = 8;

if (!in_array($file['type'], $tipos)) {
    json_out(['error' => 'Formato inválido. Use JPG, PNG ou WebP.'], 400);
}
if ($file['size'] > $maxMB * 1024 * 1024) {
    json_out(['error' => "Imagem muito grande. Máximo {$maxMB}MB."], 400);
}

$ext      = pathinfo($file['name'], PATHINFO_EXTENSION);
$nome     = time() . '_' . bin2hex(random_bytes(4)) . '.' . strtolower($ext);
$destino  = UPLOAD_DIR . $nome;

if (!is_dir(UPLOAD_DIR)) mkdir(UPLOAD_DIR, 0755, true);

if (!move_uploaded_file($file['tmp_name'], $destino)) {
    json_out(['error' => 'Falha ao salvar imagem.'], 500);
}

json_out(['ok' => true, 'url' => UPLOAD_URL . $nome]);

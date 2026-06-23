<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$body   = json_decode(file_get_contents('php://input'), true) ?? [];

// Leitura pública — sem autenticação
if ($method === 'GET') {
    $db = getDB();
    $rows = $db->query("SELECT * FROM temas ORDER BY nome ASC")->fetchAll();
    foreach ($rows as &$row) {
        $row['tags']   = $row['tags']   ? json_decode($row['tags'],   true) : [];
        $row['opcoes'] = $row['opcoes'] ? json_decode($row['opcoes'], true) : [];
    }
    json_out($rows);
}

// Escrita — exige login
requireAuth();

switch ($method) {

    case 'POST':
        $id     = $body['id']        ?? null;
        $nome   = trim($body['nome'] ?? '');
        $cat    = trim($body['categoria'] ?? '');
        $tags   = json_encode($body['tags']   ?? []);
        $desc   = trim($body['descricao'] ?? '');
        $tipo     = $body['tipo']     ?? 'parceria';
        $opcoes   = json_encode($body['opcoes']   ?? []);
        $destaque = !empty($body['destaque']) ? 1 : 0;

        if (!$id || !$nome) json_out(['error' => 'id e nome são obrigatórios.'], 400);

        $db = getDB();
        $st = $db->prepare(
            "INSERT INTO temas (id, nome, categoria, tags, descricao, tipo, opcoes, destaque)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
               nome=VALUES(nome), categoria=VALUES(categoria), tags=VALUES(tags),
               descricao=VALUES(descricao), tipo=VALUES(tipo), opcoes=VALUES(opcoes), destaque=VALUES(destaque)"
        );
        $st->execute([$id, $nome, $cat, $tags, $desc, $tipo, $opcoes, $destaque]);
        json_out(['ok' => true, 'id' => $id]);

    case 'DELETE':
        $id = $body['id'] ?? $_GET['id'] ?? null;
        if (!$id) json_out(['error' => 'id obrigatório.'], 400);
        $db = getDB();
        $db->prepare("DELETE FROM temas WHERE id = ?")->execute([$id]);
        json_out(['ok' => true]);

    default:
        json_out(['error' => 'Método não suportado.'], 405);
}

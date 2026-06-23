<?php
// Rode este arquivo UMA VEZ após subir pro Hostgator para criar as tabelas e o usuário admin.
// Depois de executar, APAGUE ou renomeie este arquivo por segurança.

require_once __DIR__ . '/config.php';

// ---- Configure aqui antes de rodar ----
$ADMIN_EMAIL = 'crisborba@email.com';  // troque pelo e-mail real da Cris
$ADMIN_SENHA = 'TrocaPorUmaSenhaForte2025!'; // troque por uma senha forte
// ----------------------------------------

$db = getDB();

// Tabela de temas
$db->exec("CREATE TABLE IF NOT EXISTS temas (
    id          VARCHAR(100) PRIMARY KEY,
    nome        VARCHAR(255) NOT NULL,
    categoria   VARCHAR(100),
    tags        TEXT,
    descricao   TEXT,
    tipo        VARCHAR(50) DEFAULT 'parceria',
    opcoes      LONGTEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

// Tabela de usuários admin
$db->exec("CREATE TABLE IF NOT EXISTS admin_users (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    email         VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

// Cria ou atualiza o usuário admin
$hash = password_hash($ADMIN_SENHA, PASSWORD_BCRYPT);
$st   = $db->prepare(
    "INSERT INTO admin_users (email, password_hash) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)"
);
$st->execute([$ADMIN_EMAIL, $hash]);

echo "<h2>✅ Setup concluído!</h2>";
echo "<p>Tabelas criadas e usuário admin configurado.</p>";
echo "<p><strong>E-mail:</strong> {$ADMIN_EMAIL}</p>";
echo "<p style='color:red'><strong>Importante:</strong> Apague ou renomeie este arquivo agora!</p>";

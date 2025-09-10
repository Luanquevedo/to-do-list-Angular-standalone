<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require_once __DIR__ . '/../src/database.php';// importação do database.php onde contem todos parametros de conexao com DB

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
//Permitido apenas metodo GET para essa API
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    header('Allow: GET');
    echo json_encode(["error" => "Método não permitido. Use GET"]);
    exit;
}

$database = new Database();
$db = $database->getConnection();
//Executa consulta de todos itens cadstrados na tabela task
try {
    $stmt = $db->query("SELECT id, textTask, textMateria FROM task");
    $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["tasks" => $tasks]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erro ao buscar tarefas: " . $e->getMessage()]);
}
?>

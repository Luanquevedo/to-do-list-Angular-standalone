<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require_once __DIR__ . '/../src/database.php'; // importação do database.php onde contem todos parametros de conexao com DB

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
//Permitido apenas metodo DELETE para essa API
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405);
    header('Allow: DELETE');
    echo json_encode(["error" => "Método não permitido. Use DELETE"]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
//Verificação se id foi infomado
if (empty($data['id'])) {
    http_response_code(400);
    echo json_encode(["error" => "ID da tarefa é obrigatório."]);
    exit;
}

$database = new Database();
$db = $database->getConnection();
//executa a validação do id se possui alguma task criada e realiza a exclusão caso positivo
try {
    $stmt = $db->prepare("SELECT id FROM task WHERE id = :id");
    $stmt->execute([':id' => $data['id']]);
    $task = $stmt->fetch();

    if (!$task) {
        http_response_code(404);
        echo json_encode(["error" => "Tarefa não encontrada."]);
        exit;
    }

    $stmt = $db->prepare("DELETE FROM task WHERE id = :id");
    $stmt->execute([':id' => $data['id']]);

    http_response_code(200);
    echo json_encode(["success" => "Tarefa excluída com sucesso."]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erro no banco de dados: " . $e->getMessage()]);
}
?>
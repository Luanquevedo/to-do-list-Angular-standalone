<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require_once __DIR__ . '/../src/database.php';// importação do database.php onde contem todos parametros de conexao com DB

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
//Permitido apenas metodo PUT para essa API
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    header('Allow: PUT');
    echo json_encode(["error" => "Método não permitido. Use PUT"]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['id'])) { // valida se possui id
    http_response_code(400);
    echo json_encode(["error" => "ID da tarefa obrigatório"]);
    exit;
}

// captura os dados a serem atualizados
$textTask = $data['textTask'] ?? '';
$textMateria = $data['textMateria'] ?? '';

$database = new Database();
$db = $database->getConnection();

try {
    //excuta a query para atualização das atividades por texto da atividade e por texto da materia caso atividade exista
    $stmt = $db->prepare("UPDATE task SET textTask = :textTask, textMateria = :textMateria WHERE id = :id");
    $stmt->execute([
        ':textTask' => $textTask,
        ':textMateria' => $textMateria,
        ':id' => $data['id']
    ]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["success" => "Tarefa atualizada com sucesso!"]);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Nenhuma tarefa encontrada com esse ID."]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erro no banco de dados: " . $e->getMessage()]);
}

<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require_once __DIR__ . '/../src/database.php'; // importação do database.php onde contem todos parametros de conexao com DB

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
//Permitido apenas metodo POST para essa API
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo json_encode(["error" => "Metodo não permitido. Use POST"]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
//função para validar se a task informada possui ao menos 4 caracteres
function validateMinLength($textTask)
{
    return strlen($textTask) >= 4;
}

if (empty($data['textTask']) || !validateMinLength($data['textTask'])) {
    $errors[] = "A sua atividade deve conter ao menos 4 caracteres para ser cadastrada.";
}

if (empty($data['textMateria']) || !validateMinLength($data['textMateria'])) {
    $errors[] = "A materia precisa conter ao menos 4 caracteres para ser cadastrada.";
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(["errors" => $errors]);
    exit;
}

$database = new Database();
$db = $database->getConnection();

try {
    // Realiza verificação se possui task igual
    $stmt = $db->prepare("SELECT id FROM task WHERE textTask = :textTask");
    $stmt->execute([':textTask' => $data['textTask']]);
    $existingTask = $stmt->fetch();

    if ($existingTask) {
        http_response_code(409);
        echo json_encode(["error" => "Essa atividade já existe."]);
        exit;
    }

    // Cria uma nova task
    $stmt = $db->prepare("INSERT INTO task (textTask, textMateria) VALUES (:textTask, :textMateria)");
    $stmt->execute([
        ':textTask' => $data['textTask'],
        ':textMateria' => $data['textMateria']
    ]);

    http_response_code(201);
    echo json_encode(["success" => "Tarefa cadastrada com sucesso!"]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erro no banco de dados: " . $e->getMessage()]);
}
?>
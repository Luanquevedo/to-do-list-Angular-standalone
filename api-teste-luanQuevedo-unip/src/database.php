<?php

class Database
{

    private static $conn;

    public static function getConnection()
    {
        if (!self::$conn) {
            $host = '127.0.0.1'; 
            $db = 'testeunip';
            $user = 'root';
            $pass = '1234';

            try {
                self::$conn = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
                self::$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $exception) {
                die(json_encode(["error" => "erro na conexão" . $exception->getMessage()]));
            }
        }

        return self::$conn;
    }
}

?>
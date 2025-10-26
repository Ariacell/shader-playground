<?php

header('Content-Type: application/json');
// TODO: Make CORS only apply in local dev
header("Access-Control-Allow-Origin: *");

require 'vendor/autoload.php';

use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$dbhost = 'postgres';
$dbname='postgres';
$dbuser = 'shader_user';
$dbpass = $_ENV['SHADER_DB_PASSWORD'];

$dbconn = pg_connect("host=$dbhost dbname=$dbname user=$dbuser password=$dbpass")
    or die('Could not connect: ' . pg_last_error());

$query = 'SELECT * FROM shaders.shader_entries';
$result = pg_query($dbconn, $query) or die('Error message: ' . pg_last_error());

$arr = pg_fetch_all($result);

pg_free_result($result);
pg_close($dbconn);

echo json_encode($arr)

?>

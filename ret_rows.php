<?php

    $conn = new mysqli('localhost', 'root', '', 'eg_d3');
    $q = $conn->query("select * from data_table");
    $json_string = "{";
    $json_string_array = [];
    $i = 0;
    while($row = $q->fetch_assoc()) {
        $json_string_array[$i] = "\"".$row['id']."\":\"".$row['name']."\"";
        $i++;
    }
    $json_string.= implode(',', $json_string_array);
    $json_string .= "}";
    echo $json_string;
?>
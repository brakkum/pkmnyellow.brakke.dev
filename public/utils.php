<?php

function echo_json($array) {
    header('Content-type: application/json');
    echo json_encode($array);
}

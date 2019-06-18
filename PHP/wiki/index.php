<?php

$res = json_decode(file_get_contents('https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=1'), true);

var_dump($res['query']['random'][0]['title']);

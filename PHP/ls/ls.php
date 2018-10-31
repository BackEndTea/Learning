<?php
foreach(scandir(getcwd(),0) as $content) {
    print($content . "\n");
}

<?php

    $mysqlhost = "127.0.0.1";
    function connect_to_db () {
        global $mysqlhost;
        $dbuser = "root";
        $dbname = "papyrusbio";
        $dbpass = "root";
        $dbport = 8889;
        $mysqli = new mysqli(
            $mysqlhost,
            $dbuser,
            $dbpass,
            $dbname,
            $dbport
        );
        $GLOBALS['link'] = $mysqli;
    }

    // function connect_to_db () {
    //     $mysqlhost = "mysql.papyrusbio.com:3306";
    //     $dbuser = "dev_papyrusbio";
    //     $dbname = "papyrusbio";
    //     $dbpass = "JswnV^919I%w";
    //     $dbport = 3306;
    //     $mysqli = new mysqli(
    //         $mysqlhost,
    //         $dbuser,
    //         $dbpass,
    //         $dbname,
    //         $dbport
    //     );
    //     $GLOBALS['link'] = $mysqli;
    // }

?>
<?php
    header ("Access-Control-Allow-Origin: *");
    header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
    header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    header ("Access-Control-Allow-Headers: *");

    include_once('database_connect.php');
    connect_to_db();
    $mysqli = $GLOBALS['link'];

    $postdata = file_get_contents('php://input');
    foreach(json_decode($postdata) as $key => $value){
        $_POST[$key] = $value;
    }

    if (isset($_GET['get_molecules'])) {
        
        $contexts = $mysqli->query("select * from molecules");
        $res = array();
        for($i = 0; $i < $contexts->num_rows; $i++){
            $row = $contexts->fetch_row();
            array_push($res, array(
                'id' => $row[0],
                'name' => $row[1]
            ));
        }

        echo json_encode($res);

    } else if (isset($_GET['get_groups'])) {
        $molecule = $_GET['molecule'];
        $action_type = $_GET['action_type'];
        $res = array();
        
        if($action_type == 0) {
            $contexts = $mysqli->query("select * from groups");
            for($i = 0; $i < $contexts->num_rows; $i++){
                $row = $contexts->fetch_row();
                array_push($res, array(
                    'id' => $row[0],
                    'name' => $row[1]
                ));
            }
        } else if ($action_type == 1) {
            $contexts = $mysqli->query("select distinct groups.id, groups.name from products join groups on products.group_1 = groups.id where products.molecule_1 = $molecule;");
            for($i = 0; $i < $contexts->num_rows; $i++){
                $row = $contexts->fetch_row();
                array_push($res, array(
                    'id' => $row[0],
                    'name' => $row[1]
                ));
            }
        } else if ($action_type == 2) {
            $contexts = $mysqli->query("select distinct groups.id, groups.name from products join groups on products.group_2 = groups.id where products.molecule_2 = $molecule;");
            for($i = 0; $i < $contexts->num_rows; $i++){
                $row = $contexts->fetch_row();
                array_push($res, array(
                    'id' => $row[0],
                    'name' => $row[1]
                ));
            }
        }
        
        echo json_encode($res);

    } else if (isset($_GET['get_categories'])) {

        $contexts = $mysqli->query("select * from categories");
        $res = array();
        for($i = 0; $i < $contexts->num_rows; $i++){
            $row = $contexts->fetch_row();

            array_push($res, array(
                'id' => $row[0],
                'name' => $row[1],
                'description' => $row[2],
                'image' => $row[3],
                'thumbnail' => $row[4]
            ));
        }
        echo json_encode($res);

    } else if (isset($_GET['get_products'])) {
        $item = json_decode($_GET['query']);
        $m1 = $item->m1;
        $m2 = $item->m2;
        $g1 = $item->g1;
        $g2 = $item->g2;
        $contexts = $mysqli->query("select * from 

        (select * from products a where size = 
                (
                    SELECT MIN(size)
                    FROM products b
                    WHERE b.group_id = a.group_id
                )
        ) as tm
        
        where 
            (molecule_1 = '$m1' and molecule_2 = '$m2' and group_1 = '$g1' and group_2 = '$g2') or
            (molecule_1 = '$m2' and molecule_2 = '$m1' and group_1 = '$g2' and group_2 = '$g1')
        ");

        $res = array();
        for($i = 0; $i < $contexts->num_rows; $i++){
            $row = $contexts->fetch_row();
            array_push($res, array(
                'id'                    => $row[0],
                'sku'                   => $row[1],
                'group_id'              => $row[2],
                'name'                  => $row[3],
                'description'           => $row[4],
                'detailed_description'  => $row[5],
                'size'                  => $row[6],
                'cost'                  => $row[7],
                'molecule1'             => $row[8],
                'group1'                => $row[9],
                'molecule2'             => $row[10],
                'group2'                => $row[11],
                'category1'             => $row[12],
                'category2'             => $row[13],
                'image'                 => $row[14],
                'thumbnail'             => $row[15]      
            ));
        }

        echo json_encode($res);
    } else if (isset($_GET['get_product_by_id'])) {

        $id = $_GET['id'];
        
        $query = "select * from products where id = '$id'";
        $contexts = $mysqli->query($query);
        $row = $contexts->fetch_row();
        $result = array(
            'id'                    => $row[0],
            'sku'                   => $row[1],
            'group_id'              => $row[2],
            'name'                  => $row[3],
            'description'           => $row[4],
            'detailed_description'  => $row[5],
            'size'                  => $row[6],
            'cost'                  => $row[7],
            'molecule1'             => $row[8],
            'group1'                => $row[9],
            'molecule2'             => $row[10],
            'group2'                => $row[11],
            'category1'             => $row[12],
            'category2'             => $row[13],
            'image'                 => $row[14],
            'thumbnail'             => $row[15]      
        );
        echo json_encode($result);
    } else if (isset($_GET['get_products_group'])) {
        
        $group_id = $_GET['group_id'];
        $query = "select * from products where group_id = $group_id";
        $contexts = $mysqli->query($query);
        
        $res = array();
        for($i = 0; $i < $contexts->num_rows; $i++){
            $row = $contexts->fetch_row();
            //var_dump($row);exit;
            array_push($res, array(
                'id'                    => $row[0],
                'sku'                   => $row[1],
                'group_id'              => $row[2],
                'name'                  => $row[3],
                'description'           => $row[4],
                'detailed_description'  => $row[5],
                'size'                  => $row[6],
                'cost'                  => $row[7],
                'molecule1'             => $row[8],
                'group1'                => $row[9],
                'molecule2'             => $row[10],
                'group2'                => $row[11],
                'category1'             => $row[12],
                'category2'             => $row[13],
                'image'                 => $row[14],
                'thumbnail'             => $row[15]      
            ));
        }

        echo json_encode($res);

    } else if (isset($_GET['save_action'])) {
        
        $session_id = $_GET['save_action'];
        $action = $_GET['action'];
        $description = $_GET['description'];
        $related_to = $_GET['related_to'];
        $save_index = $_GET['save_index'];
        $query = "insert into actions (session_id, action, description, related_to) value ($session_id, '$action', '$description', '$related_to')";
        //$start_time = microtime(true);
        $context = $mysqli->query($query);

        $context = $mysqli->query($query);

        echo json_encode(['res' => $save_index]);

    } else if (isset($_POST['save_action'])) {
        
        $session_id = $_POST['save_action'];
        $action = $_POST['action'];
        $description = $_POST['description'];
        $related_to = $_POST['related_to'];
        $save_index = $_POST['save_index'];
        $query = "insert into actions (session_id, action, description, related_to) value ($session_id, '$action', '$description', '$related_to')";
        //$start_time = microtime(true);
        
        $context = $mysqli->query($query);
        echo json_encode(['res' => $save_index]);

    } else if (isset($_GET['get_products_keyword'])) {
        $keyword = $_GET['keyword'];
        $query = "";

        if ($keyword == 'all') {
            $query = "select * from products";
        } else {
            $query = "select * from products where 
            product_name like '%$keyword%' or description like '%$keyword%'";
        }

        $contexts = $mysqli->query($query);
        
        $res = array();
        for($i = 0; $i < $contexts->num_rows; $i++){
            $row = $contexts->fetch_row();
            array_push($res, array(
                'id'                    => $row[0],
                'sku'                   => $row[1],
                'group_id'              => $row[2],
                'name'                  => $row[3],
                'description'           => $row[4],
                'detailed_description'  => $row[5],
                'size'                  => $row[6],
                'cost'                  => $row[7],
                'molecule1'             => $row[8],
                'group1'                => $row[9],
                'molecule2'             => $row[10],
                'group2'                => $row[11],
                'category1'             => $row[12],
                'category2'             => $row[13],
                'image'                 => $row[14],
                'thumbnail'             => $row[15]      
            ));
        }

        echo json_encode($res);
    }

?>

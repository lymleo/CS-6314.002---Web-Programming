<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "HW4";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$key = trim($_SERVER['PATH_INFO'], '/');

if($key){
	$sql = "SELECT * FROM Book WHERE Book_id = $key";
	$result = $conn->query($sql);
	
	if($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
		$output->title = $row['Title'];
        $output->year = $row['Year'];
        $output->price = $row['Price'];
        $output->category = $row['Category'];
		
		$sql = "SELECT Author_Name FROM Book_Authors, Authors 
				WHERE Book_Authors.Author_id = Authors.Author_id AND Book_Authors.Book_id = $key";
		$authors = $conn->query($sql);
		if(mysqli_num_rows($authors) == 1) 
			//do I need to keep Author_Name
			$output->author = mysqli_fetch_array($authors, MYSQLI_ASSOC)['Author_Name'];
		else {
			$a = array();
			while($row = mysqli_fetch_array($authors, MYSQLI_ASSOC))
				$a[] = $row['Author_Name'];
			$output->author = $a;
		}
		echo json_encode($output, JSON_PRETTY_PRINT);
		
	}
	else 
		echo "0 result returned";
}

else {
	$sql = "SELECT * FROM book";
	$result = $conn->query($sql);

	if (mysqli_num_rows($result) > 0) {
		while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
			$output[] = array(
				//'Book_id' => ($row['Book_id']),
				'title' => ($row['Title']),
				//'year' => ($row['year']),
				'price' => ($row['Price']),
				'category' => ($row['Category'])
				);
		}
		echo json_encode($output, JSON_PRETTY_PRINT);
	}
	else {
		echo "0 results returned";
	}
	$conn->close();	
}




?>
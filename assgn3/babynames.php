<?php

$con=mysqli_connect("localhost","root","root","assgn3");
if (mysqli_connect_errno()){echo "Failed to connect to MySQL: " . mysqli_connect_error();}

$year = $_GET['year'];
$gender = $_GET['gender'];

if ($year=="" && $gender==""){
$query = "SELECT * FROM BabyNames;";}
else if ($year=="" && $gender!=""){
$query = "SELECT * FROM BabyNames WHERE gender = '$gender';";}
else if ($year!="" && $gender==""){
$query = "SELECT * FROM BabyNames WHERE year = '$year';";}
else {
$query = "SELECT * FROM BabyNames WHERE gender = '$gender' AND year = '$year';";}

$result = mysqli_query($con,$query);

echo "<table border='2'> 
<tr>
<th>Name</th>
<th>Year</th>
<th>Ranking</th>
<th>Gender</th>
</tr>"; 

while($row = mysqli_fetch_array($result)) { 
   echo "<tr>";
   echo "<td>" . $row['name'] . "</td>";
   echo "<td>" . $row['year'] . "</td>";
   echo "<td>" . $row['ranking'] . "</td>";
   echo "<td>" . $row['gender'] . "</td>";
   echo "</tr>"; }
   echo "</table>";

mysqli_close($con);
?>
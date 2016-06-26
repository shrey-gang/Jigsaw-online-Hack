<?php
	header("Access-Control-Allow-Origin: *");
	header('Content-type: text/html');
	
	$city = $_GET['city'];
	$url="http://api.openweathermap.org/data/2.5/weather?q='".$city."'&appid=7d789a8ca3a4bef6245aea69dd8d9d86&units=metric";
    $timeout = 60;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); 
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST,  2);
    $data = curl_exec($ch);
    curl_close($ch);
	$data = json_decode($data,true);
	
?>
	<table width="100%">
		<tr bgcolor="#0099FF">
			<th align="center"><img src="http://openweathermap.org/img/w/<?=$data['weather'][0]['icon'];?>.png" />
			<br />
			<font color="#FFFFFF">
			<?php echo $data['main']['temp']."&#8451;<br>".strtoupper($data['weather'][0]['description']); ?>
			</font>
			</th>
		</tr>
		<tr>
			<td align="center"><font color="#999999"><?php echo $data['main']['temp_min']." / ".$data['main']['temp_max']; ?></font> &#8451; </b></td>
		</tr>
		<tr>
			<td align="center"><strong> <?php echo $data['name']; ?></strong></td>
		</tr>
	</table>
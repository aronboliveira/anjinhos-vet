<?php
header('Content-type: application/json');
function fetch_google_sheet_data(): bool {
	try {
		$d = file_get_contents('https://docs.google.com/spreadsheets/d/1rFo-mXKs7OYv5onU2XvnlzLzsZ6ZrBNEmqYEofbe10E/export?format=csv');
		if (!$d) throw new Exception('Failed to fetch Google Sheets data!');
		$lns = explode(PHP_EOL, $d);
		$hd = str_getcsv(array_shift($lns));
		$jd = [];
		foreach($lns as $l) $jd = array_combine($hd, str_getcsv($l));
		echo json_encode($jd);
		return true;
	} catch (Exception $e) {
		return false;
	}
}
if (!fetch_google_sheet_data()) echo file_get_contents('patients.json');
?>
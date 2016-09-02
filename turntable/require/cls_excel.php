<?php
/**
 * Excel 输出类
 */
class Misc_Excel_Model
{
	/**
	 * Header of excel document (prepended to the rows)
	 * 
	 * Copied from the excel xml-specs.
	 * 
	 * @access private
	 * @var string
	 */
	var $header = "<?xml version=\"1.0\" encoding=\"UTF-8\"?\>
<Workbook xmlns=\"urn:schemas-microsoft-com:office:spreadsheet\"
 xmlns:x=\"urn:schemas-microsoft-com:office:excel\"
 xmlns:ss=\"urn:schemas-microsoft-com:office:spreadsheet\"
 xmlns:html=\"http://www.w3.org/TR/REC-html40\">";

	/**
	 * Footer of excel document (appended to the rows)
	 * 
	 * Copied from the excel xml-specs.
	 * 
	 * @access private
	 * @var string
	 */
	var $footer = "</Workbook>";

	/**
	 * Document lines (rows in an array)
	 * 
	 * @access private
	 * @var array
	 */
	var $lines = array ();

	/**
	 * Worksheet title
	 *
	 * Contains the title of a single worksheet
	 *
	 * @access private 
	 * @var string
	 */
	var $worksheet_title = "Table1";

	/**
	 * Add a single row to the $document string
	 * 
	 * @access private
	 * @param array 1-dimensional array
	 * @todo Row-creation should be done by $this->addArray
	 */
	function addRow ($array) {

		// initialize all cells for this row
		$cells = "";
		
		// foreach key -> write value into cells
		foreach ($array as $k => $v)
		{
			$vType = gettype( $v );
			$type = ( $vType == 'double' || $vType == 'integer' ) ? 'Number' : 'String';
  			$cells .= "<Cell><Data ss:Type=\"$type\">" . $v . "</Data></Cell>\n";
		}

		// transform $cells content into one row
		$this->lines[] = "<Row>\n" . $cells . "</Row>\n";
	}

	/**
	 * Add an array to the document
	 * 
	 * This should be the only method needed to generate an excel
	 * document.
	 * 
	 * @access public
	 * @param array 2-dimensional array
	 * @todo Can be transfered to __construct() later on
	 */
	function addArray ($array) {

		// run through the array and add them into rows
		foreach ($array as $k => $v):
			$this->addRow ($v);
		endforeach;

	}

	/**
	 * Set the worksheet title
	 * 
	 * Checks the string for not allowed characters (:\/?*),
	 * cuts it to maximum 31 characters and set the title. Damn
	 * why are not-allowed chars nowhere to be found? Windows
	 * help's no help...
	 *
	 * @access public
	 * @param string $title Designed title
	 */
	function setWorksheetTitle ($title) {

		// strip out special chars first
		$title = preg_replace ("/[\\\|:|\/|\?|\*|\[|\]]/", "", $title);

		// now cut it to the allowed length
		$title = substr ($title, 0, 31);

		// set title
		$this->worksheet_title = $title;

	}

	/**
	 * Generate the excel file
	 * 
	 * Finally generates the excel file and uses the header() function
	 * to deliver it to the browser.
	 * 
	 * @access public
	 * @param string $filename Name of excel file to generate (...xls)
	 */
	function generateXML ($filename) {

		// deliver header (as recommended in php manual)
		header("Content-Type: application/vnd.ms-excel; charset=UTF-8");
		header("Content-Disposition: inline; filename=\"" . $filename . ".xls\"");

		// print out document to the browser
		// need to use stripslashes for the damn ">"
		echo stripslashes ($this->header);
		echo "\n<Worksheet ss:Name=\"" . $this->worksheet_title . "\">\n<Table>\n";
		echo "<Column ss:Index=\"1\" ss:AutoFitWidth=\"0\" ss:Width=\"110\"/>\n";
		echo implode ("\n", $this->lines);
		echo "</Table>\n</Worksheet>\n";
		echo $this->footer;
	}
}

 //  使用方法
 
//   $doc = array (
//		0 => array ('中国', '中国人', '中国人民', '123456')
//   );
//   $xls = new Misc_Excel_Model;
//   $xls->addArray ( $doc );
//   $xls->generateXML ("mytest");
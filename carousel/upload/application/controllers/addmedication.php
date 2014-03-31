<?php defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Example
 *
 * This is an example of a few basic user interaction methods you could use
 * all done with a hardcoded array.
 *
 * @package		CodeIgniter
 * @subpackage	Rest Server
 * @category	Controller
 * @author		Phil Sturgeon
 * @link		http://philsturgeon.co.uk/code/
*/

// This can be removed if you use __autoload() in config.php OR use Modular Extensions

class addmedication extends CI_Controller
{
	function __construct(){
		parent::__construct();
		//$this->load->model('users','',TRUE);
		$this->load->helper('url');
		$this->load->library('session');
	}
	
	public function index()
	{
		$this->load->view('addMedicationPage');
	}


	function view(){
		$patientId = $this->post('patientId');
		$date = $this->post('date');
		$this->load->model('appointmentData');
		$result = $this->appointmentData->getApptData($patientId, $date);

		

    	
		echo json_encode($result);
		
	}
	
	
	function medsave(){
		$CurDate = date("Y-m-d");
		$CurDateTime = date("Y-m-d H:i:s");
		$patientId = $this->input->post('patientId');
		$cmid = "31";
		$doctorid = "52";
		$medicationname = $this->input->post('mname');
		$fromdate = $this->input->post('fromDate');
		$todate = $this->input->post('toDate');
		$description = $this->input->post('description');
		$dosage = $this->input->post('dosage');
		$dosagetypeid = $this->input->post('dosageTypeid');
		$comments = $this->input->post('comments');
		$historical = "historical";
		$lastprescribedon = $CurDateTime;
		$medtimeid = $this->input->post('medtimeid');
		$refillinformation = "refill";
		$sideeffects = "";
		$frequency = $this->input->post('frequency');
		$reminderduration = "";
		$time1 = $this->input->post('time1');
		$time2 = $this->input->post('time2');
		$time3 = $this->input->post('time3');
		$time4 = $this->input->post('time4');
		$time5 = $this->input->post('time5');
		$time6 = $this->input->post('time6');
		$isdeleted = "0";
		$issunday = $this->input->post('issunday');
		$ismonday  = $this->input->post('ismonday');
		$istuesday = $this->input->post('istuesday');
		$iswednesday = $this->input->post('iswednesday');
		$isthursday = $this->input->post('isthursday');
		$isfriday = $this->input->post('isfriday');
		$issaturday = $this->input->post('issaturday');
		$createdby = $patientId;
		$lastupdatedby = $patientId;
		$createddate = $CurDateTime;
		$lastupdateddate = $CurDateTime;
		$ismissed = "0";
		
		//$patientId = $this->post('patientId');
		//$isthursday = $this->post('isthursday');
		$this->load->model('medicationdata');
		$result['medication'] = $this->medicationdata->savemeddata($patientId, $cmid, $doctorid, $medicationname, $fromdate, $todate,$description, $dosage, $dosagetypeid, $comments, $historical, $lastprescribedon,$medtimeid, $refillinformation, $sideeffects, $frequency, $reminderduration, $time1, $time2, $time3, $time4, $time5, $time6, $isdeleted, $issunday, $ismonday, $istuesday, $iswednesday, $isthursday, $isfriday, $issaturday, $createdby, $lastupdatedby, $createddate, $lastupdateddate, $ismissed);

		

    	
		echo json_encode($result);
		
	}
	
	
	function medEdit(){
		$CurDate = date("Y-m-d");
		$CurDateTime = date("Y-m-d H:i:s");
		$id = $this->input->post('id');
		$patientId = $this->input->post('patientId');
		$cmid = "31";
		$doctorid = "52";
		$medicationid = $this->input->post('mid');
		$medicationname = $this->input->post('mname');
		$fromdate = $this->input->post('fromDate');
		$todate = $this->input->post('toDate');
		$description = $this->input->post('description');
		$dosage = $this->input->post('dosage');
		$dosagetypeid = $this->input->post('dosageTypeid');
		$comments = $this->input->post('comments');
		$historical = "historical";
		$lastprescribedon = $CurDateTime;
		$medtimeid = $this->input->post('medtimeid');
		$refillinformation = "refill";
		$sideeffects = "";
		$frequency = $this->input->post('frequency');
		$reminderduration = "";
		$time1 = $this->input->post('time1');
		$time2 = $this->input->post('time2');
		$time3 = $this->input->post('time3');
		$time4 = $this->input->post('time4');
		$time5 = $this->input->post('time5');
		$time6 = $this->input->post('time6');
		$isdeleted = "0";
		$issunday = $this->input->post('issunday');
		$ismonday  = $this->input->post('ismonday');
		$istuesday = $this->input->post('istuesday');
		$iswednesday = $this->input->post('iswednesday');
		$isthursday = $this->input->post('isthursday');
		$isfriday = $this->input->post('isfriday');
		$issaturday = $this->input->post('issaturday');
		$createdby = $patientId;
		$lastupdatedby = $patientId;
		$createddate = $CurDateTime;
		$lastupdateddate = $CurDateTime;
		$ismissed = "0";
		
		//$patientId = $this->post('patientId');
		//$isthursday = $this->post('isthursday');
		$this->load->model('medicationdata');
		$result['medication'] = $this->medicationdata->editmeddata($id, $medicationid, $medicationname, $fromdate, $todate,$description, $dosage, $dosagetypeid, $comments, $medtimeid, $frequency, $reminderduration, $time1, $time2, $time3, $time4, $time5, $time6, $issunday, $ismonday, $istuesday, $iswednesday, $isthursday, $isfriday, $issaturday, $createdby, $lastupdatedby, $createddate, $lastupdateddate);

		

    	
		echo json_encode($result);
		
	}
	
	
	function meddelete(){
		$id = $this->inputpost('id');
		$this->load->model('medicationdata');
		$result['medication'] = $this->medicationdata->deletemeddata($id);

		

    	
		echo json_encode($id);
		
	}
	
	
	
	
	
    
    
}
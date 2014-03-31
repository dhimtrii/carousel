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

class addaction extends CI_Controller
{
	function __construct(){
		parent::__construct();
		//$this->load->model('users','',TRUE);
		$this->load->helper('url');
		$this->load->library('session');
	}
	
	public function index()
	{
		$this->load->view('addActionPage');
	}


	function saveaction(){
		$this->load->helper('form');
		$patientId = $this->input->post('patientId');
		$type = $this->input->post('type');
		$exerciseId = $this->input->post('exerciseId');
		$description = $this->input->post('description');
		$duration = $this->input->post('duration');
		$exType = $this->input->post('exType');
		$fromDate = $this->input->post('fromDate');
		$toDate = $this->input->post('toDate');
		$frequency = $this->input->post('frequency');
		$time1 = $this->input->post('time1');
		$time2 = $this->input->post('time2');
		$time3 = $this->input->post('time2');
		$time4 = $this->input->post('time4');
		$time5 = $this->input->post('time5');
		//$date = $this->post('date');
		$this->load->model('actiondata');
		$result = $this->actiondata->saveactndata($patientId, $type, $exerciseId, $duration, $description, $exType, $fromDate, $toDate, $frequency, $time1, $time2, $time3, $time4, $time5);

		

    	
		echo json_encode($patientId);
		
	}
	
	
	
	function editaction(){
		$this->load->helper('form');
		$id = $this->input->post('id');
		$patientId = $this->input->post('patientId');
		$type = $this->input->post('type');
		$exerciseId = $this->input->post('exerciseId');
		$description = $this->input->post('description');
		$duration = $this->input->post('duration');
		$exType = $this->input->post('exType');
		$fromDate = $this->input->post('fromDate');
		$toDate = $this->input->post('toDate');
		$frequency = $this->input->post('frequency');
		$time1 = $this->input->post('time1');
		$time2 = $this->input->post('time2');
		$time3 = $this->input->post('time3');
		$time4 = $this->input->post('time4');
		$time5 = $this->input->post('time5');
		//$date = $this->post('date');
		$this->load->model('actiondata');
		$result = $this->actiondata->editactndata($id, $patientId, $type, $exerciseId, $duration, $description, $exType, $fromDate, $toDate, $frequency, $time1, $time2, $time3, $time4, $time5);

		

    	
		echo json_encode($patientId);
		
	}
	
	
	function actndelete(){
		$id = $this->input->post('id');
		$this->load->model('actiondata');
		$result['action'] = $this->actiondata->deleteactndata($id);

		

    	
		echo json_encode($id);
		
	}
	
	
    
    
}
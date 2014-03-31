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

class addappointment extends CI_Controller
{
	function __construct(){
		parent::__construct();
		$this->load->helper('url');
		$this->load->library('session');
	}
	
	
	public function index()
	{
		$this->load->view('addAppointmentPage');
	}


	function view(){
		$patientId = $this->input->post('patientId');
		//$date = $this->post('date');
		$this->load->model('appointmentdata');
		$result['appointment'] = $this->appointmentdata->getapptdata($patientId);

		

    	
		echo json_encode($result);
		
	}
	
	
	function savedata(){
		$patientId = $this->input->post('patientId');
		$dName = $this->input->post('did');
		$speciality = $this->input->post('spid');
		$confirmed = $this->input->post('confirmed');
		$description = $this->input->post('description');
		$frequency = $this->input->post('frequency');
		$reminder1 = $this->input->post('reminder1');
		$reminder2 = $this->input->post('reminder2');
		$status = $this->input->post('status');
		$startDate = $this->input->post('startDate');
		$creationDate = $this->input->post('creationDate');
		$lastUpdationDate = $this->input->post('lastUpdationDate');
		$createdBy = $this->input->post('createdBy');
		$lastUpdatedBy = $this->input->post('lastUpdatedBy');
		$isDeleted = $this->input->post('isDeleted');
		$this->load->model('appointmentdata');
		$result['appointment'] = $this->appointmentdata->saveapptdata($patientId, $dName, $speciality, $confirmed, $description,$frequency, $reminder1, $reminder2, $status, $startDate, $creationDate,$lastUpdationDate, $createdBy, $lastUpdatedBy, $isDeleted);

		

    	
		echo json_encode($result);
		
	}
	
	
	function editdata(){
		$id = $this->input->post('id');
		$patientId = $this->input->post('patientId');
		$dName = $this->input->post('did');
		$speciality = $this->input->post('spid');
		$confirmed = $this->input->post('confirmed');
		$description = $this->input->post('description');
		$frequency = $this->input->post('frequency');
		$reminder1 = $this->input->post('reminder1');
		$reminder2 = $this->input->post('reminder2');
		$status = $this->input->post('status');
		$startDate = $this->input->post('startDate');
		$creationDate = $this->input->post('creationDate');
		$lastUpdationDate = $this->input->post('lastUpdationDate');
		$createdBy = $this->input->post('createdBy');
		$lastUpdatedBy = $this->input->post('lastUpdatedBy');
		$isDeleted = $this->input->post('isDeleted');
		$this->load->model('appointmentdata');
		$result['appointment'] = $this->appointmentdata->editapptdata($id, $patientId, $dName, $speciality, $confirmed, $description,$frequency, $reminder1, $reminder2, $status, $startDate, $creationDate,$lastUpdationDate, $createdBy, $lastUpdatedBy, $isDeleted);

		//$id, $patientId, $dName, $speciality, $confirmed, $description,$frequency, $reminder1, $reminder2, $status, $startDate, $creationDate,$lastUpdationDate, $createdBy, $lastUpdatedBy, $isDeleted
		//$id, $patientId, $dName, $speciality, $confirmed, $description,$frequency, $reminder1, $reminder2, $status, $startDate, $creationDate,$lastUpdationDate, $createdBy, $lastUpdatedBy, $isDeleted

    	
		echo json_encode($result);
		
	}
	
	
	function apptdelete(){
		$id = $this->input->post('id');
		$this->load->model('appointmentdata');
		$result['appointment'] = $this->appointmentdata->deleteapptdata($id);

		

    	
		$this->response($result);
		
	}
	
	
	function getdoctors(){
		$id = $this->input->post('patientId');
		$this->load->model('appointmentdata');
		$result['doctors'] = $this->appointmentdata->getdoctorlist($id);

		echo json_encode($result);
		
	}
	
	
    
    
}
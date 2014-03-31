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

class addvaccination extends CI_Controller
{
	function __construct(){
		parent::__construct();
		//$this->load->model('users','',TRUE);
		$this->load->helper('url');
		$this->load->library('session');
	}
	
	public function index()
	{
		$this->load->view('addVaccinationPage');
	}


	function view(){
		$patientId = $this->post('patientId');
		$date = $this->post('date');
		$this->load->model('vaccinationdata');
		$result = $this->vaccinationdata->getvaccndata($patientId, $date);

		

    	
		echo json_encode($result);
		
	}
	
	
	
	
	function savedata(){
		$patientId = $this->input->post('patientId');
		$vncId = $this->input->post('vncId');
		$vName = $this->input->post('vName');
		$description = $this->input->post('description');
		$date = $this->input->post('date');
		$this->load->model('vaccinationdata');
		$result = $this->vaccinationdata->savevaccndata($patientId, $vncId, $vName, $date, $description);

		

    	
		echo json_encode($result);
		
	}
	
	
	function editdata(){
		$id = $this->input->post('id');
		$patientId = $this->input->post('patientId');
		$vncId = $this->input->post('vncId');
		$vName = $this->input->post('vName');
		$description = $this->input->post('description');
		$date = $this->input->post('date');
		$this->load->model('vaccinationdata');
		$result = $this->vaccinationdata->editvaccndata($id, $patientId, $vncId, $vName, $date, $description);

		

    	
		echo json_encode($result);
		
	}
	
	
	function deletedata(){
		$id = $this->input->post('id');
		$this->load->model('vaccinationdata');
		$result['vaccination'] = $this->vaccinationdata->deletevaccndata($id);

		

    	
		echo json_encode($patientId);
		
	}
	
	
    
    
}
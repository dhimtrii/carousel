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

class appointment extends CI_Controller
{
	function __construct(){
		parent::__construct();
		$this->load->helper('url');
	}
	
	
	public function index()
	{
		$this->load->view('appointmentPage');
	}


	function view(){
		$patientId = $this->input->post('patientId');
		$date = $this->input->post('date');
		$this->load->model('appointmentdata');
		$result['appointment'] = $this->appointmentdata->getapptdata($patientId, $date);

		

    	
		echo json_encode($result);
		
	}
	
	
	function viewsel(){
		$id = $this->input->post('id');
		//$date = $this->post('date');
		$this->load->model('appointmentdata');
		$result['appointment'] = $this->appointmentdata->getselapptdata($id);

		

    	
		echo json_encode($result);
		
	}
	
	
    
    
}
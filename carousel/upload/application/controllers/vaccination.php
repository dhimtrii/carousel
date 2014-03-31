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

class vaccination extends CI_Controller
{
	function __construct(){
		parent::__construct();
		//$this->load->model('users','',TRUE);
		$this->load->helper('url');
		$this->load->library('session');
	}
	
	public function index()
	{
		$this->load->view('vaccinationPage');
	}


	function viewvaccn(){
		$patientId = $this->input->post('patientId');
		$this->load->model('vaccinationdata');
		$result['vaccination'] = $this->vaccinationdata->getvaccndata($patientId);

		

    	
		echo json_encode($result);
		
	}
	
	function viewselvaccn(){
		$id = $this->input->post('id');
		$this->load->model('vaccinationdata');
		$result['vaccination'] = $this->vaccinationdata->getselvaccndata($id);

		

    	
		echo json_encode($result);
		
	}
	
	
    
    
}
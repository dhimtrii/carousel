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

class medication extends CI_Controller
{
	function __construct(){
		parent::__construct();
		//$this->load->model('users','',TRUE);
		$this->load->helper('url');
		$this->load->library('session');
	}
	
	public function index()
	{
		$this->load->view('medicationPage');
	}


	function view(){
		$patientId = $this->input->post('patientId');
		$date = $this->input->post('date');
		$this->load->model('medicationdata');
		$result['medication'] = $this->medicationdata->getmeddata($patientId, $date);

		

    	
		echo json_encode($result);
		
	}
	
	function viewselmed(){
		$id = $this->input->post('id');
		$this->load->model('medicationdata');
		$result['medication'] = $this->medicationdata->getselmeddata($id);

		

    	
		echo json_encode($result);
		
	}
	
	
    
    
}
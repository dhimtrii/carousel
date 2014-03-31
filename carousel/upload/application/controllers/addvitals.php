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

class addvitals extends CI_Controller
{
	function __construct(){
		parent::__construct();
		//$this->load->model('users','',TRUE);
		$this->load->helper('url');
		$this->load->library('session');
	}
	
	public function index()
	{
		$this->load->view('addVitalsPage');
	}


	function savedata(){
		
		$patientId = $this->input->post('patientId');
		$vtlId = $this->input->post('vtlId');
		$cnt = $this->input->post('cnt');
		$val1 = $this->input->post('val1');
		$val2 = $this->input->post('val2');
		$val3 = $this->input->post('val3');
		$val4 = $this->input->post('val4');
		$attrVal1 = $this->input->post('attrVal1');
		$attrVal2 = $this->input->post('attrVal2');
		$attrVal3 = $this->input->post('attrVal3');
		$attrVal4 = $this->input->post('attrVal4');
		$date = $this->input->post('date');
		$this->load->model('vitaldata');
		$result['vitals'] = $this->vitaldata->savevitaldata($patientId, $vtlId, $cnt, $val1, $val2, $val3, $val4, $attrVal1, $attrVal2, $attrVal3, $attrVal4, $date);

		

    	
		echo json_encode($patientId);
		
	}
	
	
	function editdata(){
		$id = $this->input->post('id');
		$pvtid = $this->input->post('pvtid');
		$patientId = $this->input->post('patientId');
		$vtlId = $this->input->post('vtlId');
		$cnt = $this->input->post('cnt');
		$val1 = $this->input->post('val1');
		$val2 = $this->input->post('val2');
		$val3 = $this->input->post('val3');
		$val4 = $this->input->post('val4');
		$attrVal1 = $this->input->post('attrVal1');
		$attrVal2 = $this->input->post('attrVal2');
		$attrVal3 = $this->input->post('attrVal3');
		$attrVal4 = $this->input->post('attrVal4');
		$date = $this->input->post('date');
		$this->load->model('vitaldata');
		$result['vitals'] = $this->vitaldata->editvitaldata($id, $pvtid, $patientId, $vtlId, $cnt, $val1, $val2, $val3, $val4, $attrVal1, $attrVal2, $attrVal3, $attrVal4, $date);

		

    	
		echo json_encode($result);
		
	}
	
	
    
    
}
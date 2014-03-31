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
require APPPATH.'/libraries/REST_Controller.php';

class file extends REST_Controller
{	
	function __construct(){
		parent::__construct();
		//$this->load->model('users','',TRUE);
	}

	
	function viewfiles_post(){
		$patientId = $this->post('userid');
		$this->load->model('files_model');
		$result['files'] = $this->files_model->get_allfiles($patientId);
		
		$this->response($result);
	}
	
	
	function updatefile_post(){
		$title = $this->post('title');
		$this->load->model('files_model');
		$result['files'] = $this->files_model->update_files($title);
		
		$this->response($result);
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
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

class profile extends CI_Controller
{
	function __construct(){
		parent::__construct();
		//$this->load->model('users','',TRUE);
	}
	
	public function index()
	{
		$this->load->view('profile', true);
	}


	function getprofile_post(){
		$userId = $this->post('userId');
		$this->load->model('users');
		$result["user"] = $this->users->getprofiledata($userId);

		
    	
		echo json_encode($result);
		
	}
	
	
    
    
}
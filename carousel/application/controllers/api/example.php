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

class example extends REST_Controller
{
	function __construct(){
		parent::__construct();
		//$this->load->model('users','',TRUE);
		$this->load->library('session');
	}


	function user_post(){
		$username = $this->post('username');
		$password = $this->post('password');
		$this->load->model('Users');
		$result1["user"] = $this->users->login($username, $password);

		$my_file = './files/'.$username.'.pem';
		$handle = fopen($my_file, 'r');
		$data = fread($handle,filesize($my_file));
		
		
		$result2['privKey'] = $data;
		$result = array_merge($result1, $result2);
    	
		$this->response($result);
		
	}
	
	function getprofile_post(){
		$userId = $this->post('userId');
		$this->load->model('Users');
		$result["user"] = $this->Users->getprofiledata($userId);

		
    	
		$this->response($result);
		
	}
	
	
	function gettweet_post(){
		$patientid = $this->post('patientId');
		$this->load->model('users');
		$result['tweet'] = $this->users->gettweets($patientid);

		

    	
		$this->response($result);
	}
	
	function addtweet_post(){
		$patientid = $this->post('patientId');
		$isEncrypt = $this->post('isEncrypt');
		$text = $this->post('tweet');
		$this->load->model('users');
		$result['tweet'] = $this->users->addtweet($patientid, $text, $isEncrypt);

		

    	
		$this->response($result);
	}
	
	
	function changepass_post(){
		$patientid = $this->post('patientId');
		$password = $this->post('password');
		$this->load->model('users');
		$result['password'] = $this->users->changepassword($patientid, $password);

		

    	
		$this->response($result);
	}
	
	
	function viewsettings_post(){
		$patientId = $this->post('patientId');
		$this->load->model('users');
		$result['settings'] = $this->users->getsettingsdata($patientId);

		

    	
		$this->response($result);
		
	}
	
    
    
}
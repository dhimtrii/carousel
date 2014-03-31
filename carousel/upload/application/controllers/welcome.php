<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class welcome extends CI_Controller {

	function __construct(){
		parent::__construct();
		$this->load->helper('url');
		$this->load->library('session');
	}
	
	
	public function index()
	{
		$this->load->view('login');
	}
	
	
	function login(){
		$this->load->helper('form');
		$username = $this->input->post('username');
		$password = $this->input->post('password');
		$this->load->model('Users');
		$result = array('username' => $this->Users->login($username, $password));
		if($result['username'] != false){
			$my_file = './files/'.$username.'.pem';
			$handle = fopen($my_file, 'r');
			$data = fread($handle,filesize($my_file));
			
			$this->session->set_userdata('privKey', $data);
			
			$session_id = $this->session->userdata('privKey');
		}

		echo json_encode($result);
	}
}

/* End of file welcome.php */
/* Location: ./system/application/controllers/welcome.php */
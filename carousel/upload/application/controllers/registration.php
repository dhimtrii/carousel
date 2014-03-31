<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class registration extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	
	function __construct(){
		parent::__construct();
		$this->load->helper('url');
	}
	
	
	public function index()
	{
		$this->load->view('registration');
	}
	
	
	function getcountry(){
		$this->load->model('users');
		$result = array('country' => $this->users->getcountry());

		echo json_encode($result);
	}
	
	
	function registeruser(){
		$this->load->helper('form');
		$fname = $this->input->post('fname');
		$lname = $this->input->post('lname');
		$gender = $this->input->post('gender');
		$dob = $this->input->post('dob');
		$email = $this->input->post('email');
		$pass = $this->input->post('password');
		$username = $this->input->post('username');
		$city = $this->input->post('city');
		$state = $this->input->post('state');
		$country = $this->input->post('country');
		$tel = $this->input->post('tel');
		$privKey = $this->input->post('privKey');
		
		
		
		$my_file = './files/'.$username.'.pem';
		$handle = fopen($my_file, 'w') or die('Cannot open file:  '.$my_file);
		fwrite($handle, $privKey);
		
		$this->load->model('users');
		$result = array('username' => $this->users->registeruserdata($fname, $lname, $gender, $dob, $email, $username, $pass, $city, $state, $country, $tel));

		
		
	}
	
	
	function login(){
		$this->load->helper('form');
		$username = $this->input->post('username');
		$password = $this->input->post('password');
		$this->load->model('users');
		$result = array('username' => $this->users->login($username, $password));

		
		echo json_encode($result);
		
		
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
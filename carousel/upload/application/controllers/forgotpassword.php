<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class forgotpassword extends CI_Controller {

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
		$this->load->view('forgotPassword');
	}
	
	
	function login(){
		$this->load->helper('form');
		$username = $this->input->post('username');
		$password = $this->input->post('password');
		$this->load->model('Users');
		$result = array('username' => $this->Users->login($username, $password));

		// $user = $this->some_model->getSomething( $this->get('id') );
		
		//if($result){
			/*$sess_array = array();
			foreach($result as $row){
				$sess_array = array(
					'id' => $row->id,
					'username' => $row->username
				);
				//$this->session->set_userdata('logged_in', $sess_array);
			}*/
		//	return $result;
		//}else{
			//$this->form_validation->set_message('check_database', 'Invalid username or password');
		//	return $result;
		//}

		$url = "home.php";
		//echo json_encode($result);
		//$this->load->view('home', true);
		//redirect('home', true);
		
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
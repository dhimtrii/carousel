<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class viewfile extends CI_Controller {

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
	
	public function __construct(){
		parent::__construct();
		$this->load->model('files_model');
		$this->load->database();
		$this->load->helper('url');
	}
	
	
	public function index()
	{
		$this->load->view('files');
	}
	
	
	public function files(){
		$this->load->helper('form');
		$patientId = $this->input->post('patientId');
		//$files = $this->files_model->get_files($patientId);
		//$this->load->view('files', array('files' => $files));
		$result['files'] = $this->files_model->get_files($patientId);
		
		echo json_encode($result);
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
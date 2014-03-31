<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class home extends CI_Controller {

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
		$this->load->library('session');
	}
	
	
	public function index()
	{
		$role_id = $this->session->userdata('role');
		if($role_id == 1){
			$this->load->view('homePage', true);
		}else{
			$this->load->view('dochomePage', true);
		}
	}
	
	
	function getalldata(){
		$patientId = $this->input->post('patientId');
		$date = $this->input->post('date');
		$type = $this->input->post('type');
		if($type == "med"){
			$this->load->model('medicationdata');
			$result['medication'] = $this->medicationdata->getmeddata($patientId, $date);
		}elseif($type == "appt"){
			$this->load->model('appointmentdata');
			$result['appointment'] = $this->appointmentdata->getapptdata($patientId, $date);
		}elseif($type == "vit"){
			$this->load->model('vitaldata');
			$result['vital'] = $this->vitaldata->getvitdata($patientId, $date);
		}elseif($type == "vaccn"){
			$this->load->model('vaccinationdata');
			$result['vaccination'] = $this->vaccinationdata->getvaccndata($patientId, $date);
		}elseif($type == "actn"){
			$this->load->model('actiondata');
			$result['action'] = $this->actiondata->getactndata($patientId, $date);
		}else{
			$this->load->model('files_model');
			//$result['vitalData'] = $this->homedata->getvitgraphdata($patientId);
			$result['files'] = $this->files_model->get_files($patientId);
		}
		
		echo json_encode($result);
	}
	
	
	function getallgraphdata(){
		$patientId = $this->input->post('patientId');
		$id = $this->input->post('id');
		$this->load->model('vitaldata');
		$result['vitals'] = $this->vitaldata->getvitsdata($patientId, $id);
		
		
		echo json_encode($result);
	}
	
	
	function getalldocdata(){
		$docId = $this->input->post('docId');
		$this->load->model('homedata');
		$result['request'] = $this->homedata->getrequestdata($docId);
		$result['files'] = $this->homedata->getfilesdata($docId);
		
		echo json_encode($result);
	}
	
	
	
	function getalldoctor(){
		$patientId = $this->input->post('patientId');
		$this->load->model('homedata');
		$result['doctor'] = $this->homedata->getalldoctors($patientId);
		
		echo json_encode($result);
	}
	
	
	function getalldoctorlist(){
		$patientId = $this->input->post('patientId');
		$this->load->model('homedata');
		$result['doctor'] = $this->homedata->getalldoctorslist($patientId);
		
		echo json_encode($result);
	}
	
	
	function getallpatient(){
		$userId = $this->input->post('userId');
		$this->load->model('homedata');
		$result['patientlist'] = $this->homedata->getallpatientlist($userId);
		
		echo json_encode($result);
	}
	
	function acceptreq(){
		$id = $this->input->post('id');
		$this->load->model('homedata');
		$result['id'] = $this->homedata->acceptreqdata($id);
		
		echo json_encode($result);
	}
	
	
	function sharedoc(){
		$id = $this->input->post('id');
		$docid = $this->input->post('docId');
		$this->load->model('homedata');
		$result['id'] = $this->homedata->sharedocument($id, $docid);
		
		echo json_encode($result);
	}
	
	
	
	
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
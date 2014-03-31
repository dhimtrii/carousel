<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class User extends REST_Controller
{
	function __construct(){
		parent::__construct();
		//$this->load->model('users','',TRUE);
		$this->load->library('session');
	}
	
	function login_post(){
		$username = $this->post('username');
		$password = $this->post('password');
		$this->load->model('Users');
		$result["user"] = $this->users->login($username, $password);
		$this->response($result);		
	}
	
	function getcountry(){
		$this->load->model('users');
		$result = array('country' => $this->users->getallcountry());

		echo json_encode($result);
	}
	
	function getstate(){
		$this->load->model('users');
		$result = array('country' => $this->users->getallcountry());

		echo json_encode($result);
	}
	
	function registeruser_post(){
		$this->load->helper('form');
		$email = $this->post('email');
		$pass = $this->post('password');
		$username = $this->post('username');
		$mobile = $this->post('mobile');
		
		$this->load->model('users');
		$result = array('status' => $this->users->registeruserdata($email, $username, $pass));

		
		echo json_encode($result);
	}
	
	function updateAddProfile_post(){
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
		$this->load->model('users');
		$result = array('status' => $this->users->updateuserdata($fname, $lname, $gender, $dob, $email, $username, $pass, $city, $state, $country, $tel));
		echo json_encode($result);
	}
	
	public function photo_post(){
	   $status = "";
	   $msg = "";
	   $file_element_name = 'file';
	    
	   if ($status != "error")
	   {
	      /*$dirname = "andrews1";
		$filename = $_SERVER['DOCUMENT_ROOT']."/files/" . $dirname . "/";
		
		if (!file_exists($filename)) {
		    mkdir($_SERVER['DOCUMENT_ROOT']."/files/" . $dirname, 0777);
		    //echo "The directory $dirname was successfully created.";
		    exit;
		} else {
		    //echo "The directory $dirname exists.";
		}
	      $config['upload_path'] = $_SERVER['DOCUMENT_ROOT'].'/files/' . $dirname . '/';*/
	      $config['upload_path'] = './files/';

	      $config['allowed_types'] = 'gif|jpg|png|doc|txt|jpeg|pdf';
	      $config['max_size']  = 1024 * 8;
	      $config['encrypt_name'] = TRUE;
	 
	      $this->load->library('upload', $config);
	 
	      if (!$this->upload->do_upload('file'))
	      {
		 $status = 'error1';
		 $msg = $this->upload->display_errors('', '');
	      }
	      else
	      {
		 $data = $this->upload->data();
		 $datas = array('upload_data' => $this->upload->data());
		 $image_name = $datas['upload_data']['file_name'];
		 $image_file = $datas['upload_data']['full_path'];
		 $file_id = $this->files_model->insert_file($data['file_name'], '', '');
		 if($file_id)
		 {
		    $status = "success";
		    $msg = "File successfully uploaded";
		 }
		 else
		 {
		    unlink($data['full_path']);
		    $status = "error";
		    $msg = "Something went wrong when saving the file, please try again.";
		 }
	      }
	   }
	   //echo json_encode(array('status' => $status, 'msg' => $file_element_name));
	   
	   //$this->response("iii");
	   //$this->response(array('status' => $status, 'fileid' => $file_id, 'msg' => $file_element_name));
	   
	   $result['files'] = $file_id;
		
	   $this->response($result);
	}
	
	
	
	function settings_post(){
	    $this->load->helper('form');
	    $isLock = $this->input->post('fname');
	    
	}
}
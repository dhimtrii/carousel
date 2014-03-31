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

require APPPATH.'/libraries/S3.php';

class upload extends REST_Controller {

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
	
	
	public function file_post(){
	   $s3 = new S3("AKIAI3ON6HT6QHC4SKNQ", "l83qe6vqoYWi9OsTsK92ctduJx3bmddiYpHOKvXN");
	   $status = "";
	   $msg = "";
	   $file_element_name = 'file';
	    
	   /*if (empty($_POST['title']))
	   {
	      $status = "error";
	      $msg = "Please enter a title";
	   }*/
	    
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
		
		
		
		$s3->putBucket("bucketdhiman1234", S3::ACL_PUBLIC_READ);
	    
		if ($s3->putObjectFile($image_file, "bucketdhiman1234", $image_name, S3::ACL_PUBLIC_READ)) {
					unlink($image_file);
				}else{
					$msg = "<strong>Something went wrong while uploading your file... sorry.</strong>";
				}
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
	      @unlink($_FILES[$file_element_name]);
	   }
	   //echo json_encode(array('status' => $status, 'msg' => $file_element_name));
	   
	   //$this->response("iii");
	   //$this->response(array('status' => $status, 'fileid' => $file_id, 'msg' => $file_element_name));
	   
	   $result['files'] = $file_id;
		
	   $this->response($result);
	}
	
	
	public function files(){
		$files = $this->files_model->get_files();
		$this->load->view('files', array('files' => $files));
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
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

class conversation extends REST_Controller
{
	function __construct(){
		parent::__construct();
		//$this->load->model('users','',TRUE);
		$this->load->library('session');
	}


	function compose_post(){
		$this->load->helper('form');
		$createdby = $this->post('createdby');
		$msgBody = $this->post('msgBody');
		$msgFrom = $this->post('msgFrom');
		$msgTo = $this->post('msgTo');
		$msgSubject = $this->post('msgSubject');
		$thread = $this->post('thread');
		$sendername = $this->post('sendername');
		$role = $this->post('role');
		$tonames = $this->post('tonames');
		$msgListId = $this->post('msgListId');
		$attachment = $this->post('attachment');
		$this->load->model('conversationModel');
		$result = array('status' => $this->conversationModel->composeMessage($createdby, $msgBody, $msgFrom, $msgTo, $msgSubject, $thread, $sendername, $role, $tonames, $msgListId, $attachment));
	
    	
		$this->response($result);
		
	}
	
	
	function forward_post(){
		$this->load->helper('form');
		$msgBody = $this->post('msgBody');
		$msgFrom = $this->post('msgFrom');
		$msgTo = $this->post('msgTo');
		$msgSubject = $this->post('msgSubject');
		$thread = $this->post('thread');
		$newThread = $this->post('newThread');
		$sendername = $this->post('sendername');
		$role = $this->post('role');
		$tonames = $this->post('tonames');
		$msgListId = $this->post('msgListId');
		$attachment = $this->post('attachment');
		$this->load->model('conversationModel');
		$result = array('status' => $this->conversationModel->forwardMessage($msgBody, $msgFrom, $msgTo, $msgSubject, $thread, $newThread, $sendername, $role, $tonames, $msgListId, $attachment));
    	
		$this->response($result);
		
	}
	
	function inbox_post(){
		$userid = $this->post('userid');
		$this->load->model('conversationModel');
		$result = array('inboxMessages' => $this->conversationModel->getInboxData($userid));
    	
		$this->response($result);
		
	}
	
	function detailMsg_post(){
		$thread = $this->post('thread');
		$recpientid = $this->post('recpientid');
		$this->load->model('conversationModel');
		$result = array('messagesDetailList' => $this->conversationModel->getDetailedMsg($thread, $recpientid));
    	
		$this->response($result);
		
	}
	
	
	function unreadCnt_post(){
		$userid = $this->post('userid');
		$this->load->model('conversationModel');
		$result = array('unreadCnt' => $this->conversationModel->getUnreadCnt($userid));
    	
		$this->response($result);
		
	}
	
	
	function contacts_post(){
		$userid = $this->post('userid');
		$this->load->model('conversationModel');
		$result = array('contacts' => $this->conversationModel->getContacts($userid));
    	
		$this->response($result);
		
	}
	
	
	function syncContact_post(){
		$userid = $this->post('userid');
		$nameArray = $this->post('nameArray');
		$phoneNumberArr = $this->post('phoneNumberArr');
		$this->load->model('conversationModel');
		$result = array('contacts' => $this->conversationModel->syncContacts($userid, $nameArray, $phoneNumberArr));
    	
		$this->response($result);
		
	}
	
		
    
    
}
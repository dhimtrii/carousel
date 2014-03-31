<?php
class conversationModel extends CI_Model {

    var $title   = '';
    var $content = '';
    var $date    = '';

    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }
    
    function login($username, $password){
        
        $this -> db -> select('*');
        $this -> db -> from('auth');
        $this->db->join('user', 'auth.authid = user.uid');
	//$this->db->join('settings', 'settings.uid = user.uid');
        $this -> db -> where('username = ' . "'" . $username . "'"); 
	$this -> db -> where('password = ' . "'" . $password . "'");
        $this -> db -> limit(1);
        
        $query = $this -> db -> get();
	foreach ($query->result() as $row)
	{
	   	
	   $userid =  $row->uid ;
	   $username =  $row->username;
	   $firstname =  $row-> firstname;
	   $lastname =  $row->lastname;
	   
	   $zipcode =  $row->zipcode ;
	   $this->session->set_userdata('userid', $userid);
	   $this->session->set_userdata('firstname', $firstname);
	   $this->session->set_userdata('lastname', $lastname);
	   $this->session->set_userdata('pincode', $zipcode);
	}
	
        if($query -> num_rows() == 1){
            return $query->result();
        }
            return false;
        
    }
    
    
    function composeMessage($createdby, $msgBody, $msgFrom, $msgTo, $msgSubject, $thread, $sendername, $role, $tonames, $msgListId, $attachment){
	$return = false;
	$createdDate = "";
	$messageListId = $msgListId;
	if($msgListId == ""){
	    $messageListQuery = "insert into messageList (msgThread, fromUser, createdBy, createdDate, lastMessage) values ('$thread', '$msgFrom', '$createdby', '$createdDate', '$msgBody')";
	    $this->db->query($messageListQuery);
	    $messageListId = $this->db->insert_id();
	}
	
	
	
	$sentDate = "";
	$messageDetail = array();
	array_push($messageDetail, $tonames);
	array_push($messageDetail, $msgTo);
	array_push($messageDetail, $sendername);
	$messageDetail = implode(",", $messageDetail);
	$messageQuery = "insert into message (msgListId, msgText, fromUser, sentDate, msgDetail, attachmentPath) values ('$messageListId', '$msgBody', '$msgFrom', '$sentDate', '$messageDetail', '$attachment')";
	$this->db->query($messageQuery);
	
	$messageId = $this->db->insert_id();
	
	$msgTo = explode(",", $msgTo);
	$readTime = "";
	for($i = 0; $i < count($msgTo); $i++){
	    $messageDetailQuery = "insert into messageDetail (msgId, recipient, isread, readTime) values ('$messageId', '$msgTo[$i]', '0', '$readTime')";
	    $this->db->query($messageDetailQuery);
	    
	    $this -> db -> select('*');
	    $this -> db -> from('latestMsgInfo');
	    $this -> db -> where('userId = ' . "" .  $msgTo[$i] . "");
	    $this -> db -> limit(1);
	    
	    $query = $this -> db -> get();
	    $unreadMsgCnt = 0;
	    foreach ($query->result() as $row)
	    {
		    
	       $unreadMsgCnt =  $row->unreadCnt ;
	    }
	    $unreadMsgCnt = $unreadMsgCnt + 1;
	    if($unreadMsgCnt > 1){
		$messageInfoQuery = "update latestMsgInfo set unreadCnt = '$unreadMsgCnt' where userId = '$msgTo[$i]'";
		$this->db->query($messageInfoQuery);
	    }else{
		$messageInfoQuery = "insert into latestMsgInfo (userId, unreadCnt) values ('$msgTo[$i]', '$unreadMsgCnt')";
		$this->db->query($messageInfoQuery);
	    }
	    $return = true;
	}

	 return $return;
	
    }
    
    
    function forwardMessage($msgBody, $msgFrom, $msgTo, $msgSubject, $thread, $newThread, $sendername, $role, $tonames, $msgListId, $attachment){
	
    }
    
    
    function getInboxData($userid){
	$this -> db -> select('messageList.msgThread, messageList.fromUser, messageList.createdBy, messageList.lastMessage, messageList.msgListId, message.sentDate, message.msgDetail, messageDetail.isread, latestMsgInfo.unreadCnt');
	$this -> db -> from('messageList');
	$this->db->join('message', 'message.msgListId = messageList.msgListId');
	$this->db->join('messageDetail', 'messageDetail.msgId = message.msgId');
	$this->db->join('latestMsgInfo', 'latestMsgInfo.userId = messageDetail.recipient');
        $this -> db -> where('latestMsgInfo.userId = ' . "" .  $userid . "");
	$this->db->or_where('message.fromUser = ' . "" .  $userid . "");
	$this->db->group_by('messageList.msgListId');
	    
	$query = $this -> db -> get();
	if($query -> num_rows() == 1){
            return $query->result();
        }
            return false;
    }
    
    
    function getDetailedMsg($thread, $recpientid){
	
    }
    
    
    function getUnreadCnt($userid){
	
    }
    
    
    function getContacts($userid){
	
    }
    
    



}

?>
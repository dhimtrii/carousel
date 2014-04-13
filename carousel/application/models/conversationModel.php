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
	    if($msgListId != ""){
		
	    }
	    $return = true;
	}

	 return $return;
	
    }
    
    
    function forwardMessage($msgBody, $msgFrom, $msgTo, $msgSubject, $thread, $newThread, $sendername, $role, $tonames, $msgListId, $attachment){
	$createdDate = "";
	$messageListQuery = "insert into messageList (msgThread, fromUser, createdBy, createdDate, lastMessage) values ('$newThread', '$msgFrom', '$msgFrom', '$createdDate', '$msgBody')";
	$this->db->query($messageListQuery);
	$messageListId = $this->db->insert_id();
	$newMsgDetail = array();
	array_push($newMsgDetail, $tonames);
	array_push($newMsgDetail, $msgTo);
	array_push($newMsgDetail, $sendername);
	$newMsgDetail = implode(",", $newMsgDetail);
	
	$this -> db -> select('message.msgId, messageList.msgThread, message.fromUser, messageList.createdBy, message.msgListId, message.sentDate, message.msgDetail, message.msgText, message.attachmentPath');
	$this -> db -> from('messageList');
	$this->db->join('message', 'message.msgListId = messageList.msgListId');
	$this->db->or_where('messageList.msgThread = ' . "'" .  $thread . "'");
	$this->db->group_by('message.msgId');
	    
	$query = $this -> db -> get();
	if($query -> num_rows() >= 1){
	    foreach ($query->result() as $row)
	    {
		$oldmsgText = $row->msgText;
		$oldfromUser = $row->fromUser;
		$oldsentDate = $row->sentDate;
		$msgDetail = $row->msgDetail;
		$oldattachmentPath = $row->attachmentPath;

		$msgDetail = explode(",", $msgDetail);
		$toName = $msgDetail[0];
		$toIds = $msgDetail[1];
		$sendername = $msgDetail[2];
		
		$newToId = explode("|", $msgTo);
		$newToname = explode("|", $tonames);
		
		
		$messageQuery = "insert into message (msgListId, msgText, fromUser, sentDate, msgDetail, attachmentPath) values ('$messageListId', '$oldmsgText', '$oldfromUser', '$oldsentDate', '$newMsgDetail', '$oldattachmentPath')";
		$this->db->query($messageQuery);
		$messageId = $this->db->insert_id();
		
		$readTime = "";
		for($i = 0; $i < count($newToId); $i++){
		    $messageDetailQuery = "insert into messageDetail (msgId, recipient, isread, readTime) values ('$messageId', '$newToId[$i]', '0', '$readTime')";
		    $this->db->query($messageDetailQuery);
		    
		    $this -> db -> select('*');
		    $this -> db -> from('latestMsgInfo');
		    $this -> db -> where('userId = ' . "" .  $newToId[$i] . "");
		    $this -> db -> limit(1);
		    
		    $query = $this -> db -> get();
		    $unreadMsgCnt = 0;
		    foreach ($query->result() as $row)
		    {
			    
		       $unreadMsgCnt =  $row->unreadCnt ;
		    }
		    $unreadMsgCnt = $unreadMsgCnt + 1;
		    if($unreadMsgCnt > 1){
			$messageInfoQuery = "update latestMsgInfo set unreadCnt = '$unreadMsgCnt' where userId = '$newToId[$i]'";
			$this->db->query($messageInfoQuery);
		    }else{
			$messageInfoQuery = "insert into latestMsgInfo (userId, unreadCnt) values ('$newToId[$i]', '$unreadMsgCnt')";
			$this->db->query($messageInfoQuery);
		    }
		    $return = true;
		}
	    }
        }
	$sentDate = "";
	$messageQuery = "insert into message (msgListId, msgText, fromUser, sentDate, msgDetail, attachmentPath) values ('$messageListId', '$msgBody', '$msgFrom', '$sentDate', '$newMsgDetail', '$attachment')";
	$this->db->query($messageQuery);
	$messageId = $this->db->insert_id();
	
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
            return false;
    }
    
    
    function getInboxData($userid){
	$this -> db -> select('messageList.msgListId, messageList.msgThread, messageList.fromUser, messageList.createdBy, messageList.lastMessage, messageList.msgListId, message.sentDate, message.msgDetail, messageDetail.isread, latestMsgInfo.unreadCnt');
	$this -> db -> from('messageList');
	$this->db->join('message', 'message.msgListId = messageList.msgListId');
	$this->db->join('messageDetail', 'messageDetail.msgId = message.msgId');
	$this->db->join('latestMsgInfo', 'latestMsgInfo.userId = messageDetail.recipient');
        $this -> db -> where('latestMsgInfo.userId = ' . "" .  $userid . "");
	$this->db->or_where('message.fromUser = ' . "" .  $userid . "");
	$this->db->group_by('messageList.msgListId');
	    
	$query = $this -> db -> get();
	if($query -> num_rows() >= 1){
            return $query->result();
        }
            return false;
    }
    
    
    function getDetailedMsg($thread, $recpientid){
	$this -> db -> select('message.msgId, messageList.msgThread, messageList.fromUser, messageList.createdBy, messageList.msgListId, message.sentDate, message.msgDetail, message.msgText, message.attachmentPath');
	$this -> db -> from('messageList');
	$this->db->join('message', 'message.msgListId = messageList.msgListId');
	//$this->db->join('messageDetail', 'messageDetail.msgId = message.msgId');
	//$this->db->join('latestMsgInfo', 'latestMsgInfo.userId = messageDetail.recipient');
	$this->db->or_where('messageList.msgThread = ' . "'" .  $thread . "'");
	$this->db->group_by('message.msgId');
	
	$messages = array();
	$messageList = array();
	$messageArr = array();
	$recipient = array();
	$query = $this -> db -> get();
	if($query -> num_rows() >= 1){
	    foreach ($query->result() as $row)
	    {
		$msgId = $row->msgId;
		$tempmsg = array();
		$tempmsg["messageId"] = $row->msgId;
		$tempmsg["msgThread"] = $row->msgThread;
		$tempmsg["fromUser"] = $row->fromUser;
		$tempmsg["createdBy"] = $row->createdBy;
		$tempmsg["msgListId"] = $row->msgListId;
		$tempmsg["sentDate"] = $row->sentDate;
		$tempmsg["msgDetail"] = $row->msgDetail;
		$tempmsg["msgText"] = $row->msgText;
		$tempmsg["attachmentPath"] = $row->attachmentPath;
		array_push($messageList, $tempmsg);
	    }
	    $messageArr["messages"] = $messageList;
	    array_push($messages, $messageArr);
	    $this -> db -> select('user.uid, user.firstname, user.lastname');
	    $this -> db -> from('user');
	    $this->db->join('messageDetail', 'messageDetail.recipient = user.uid');
	    $this->db->join('message', 'message.msgId = messageDetail.msgId');
	    $this->db->join('messageList', 'messageList.msgListId = message.msgListId');	    
	    $this->db->or_where('messageList.msgThread = ' . "'" .  $thread . "'");
	    $queryuser = $this -> db -> get();
	    if($queryuser -> num_rows() >= 1){
		$recipient['recipients'] = $queryuser->result();
	    }
	    array_push($messages, $recipient);
	    return $messages;
        }
            return false;
    }
    
    
    function getUnreadCnt($userid){
	$this -> db -> select('latestMsgInfo.userId, latestMsgInfo.unreadCnt');
	$this -> db -> from('latestMsgInfo');
	$this->db->join('user', 'user.uid = latestMsgInfo.userId');
	$this->db->where('user.uid = ' . "" .  $userid . "");
	$queryuser = $this -> db -> get();
	if($queryuser -> num_rows() >= 1){
	    return $queryuser->result();
	}
	    return false;
    }
    
    
    function getContacts($userid){
	$this -> db -> select('contacts.userid, contacts.friendId, user.firstname, user.lastname, contacts.isActive, user.phone, user.profileImagePath');
	$this -> db -> from('contacts');
	$this->db->join('user', 'user.uid = contacts.friendId');
	$this->db->where('contacts.userid = ' . "" .  $userid . "");
	$queryuser = $this -> db -> get();
	if($queryuser -> num_rows() >= 1){
	    return $queryuser->result();
	}
	    return false;
	
    }
    
    
    function syncContacts($userid, $nameArray, $phoneNumberArr){
	$phoneNumberArr = explode(",", $phoneNumberArr);
	$nameArray = explode(",", $nameArray);
	$count = 0;
	for($i = 0; $i < count($phoneNumberArr); $i++){
	    $this -> db -> select('user.uid');
	    $this -> db -> from('user');
	    $this->db->where('user.phone = ' . "" .  $phoneNumberArr[$i] . "");
	    $queryuser = $this -> db -> get();
	    if($queryuser -> num_rows() >= 1){
		foreach ($queryuser->result() as $row)
		{
		    $user = $row->uid;
		    $this -> db -> select('*');
		    $this -> db -> from('contacts');
		    $this->db->where('contacts.friendId = ' . "" .  $user . "");
		    $this->db->where('contacts.userid = ' . "" .  $userid . "");
		    $queryFriend = $this -> db -> get();
		    if($queryFriend -> num_rows() < 1){
			$count = $count + 1;
			$insertFriendQuery = "insert into contacts (userid, friendId, isActive) values ('$userid', '$user', '1')";
			$this->db->query($insertFriendQuery);
		    }
		}
	    }
	}
	return $count;
    }
    
    



}

?>
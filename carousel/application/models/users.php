<?php
class users extends CI_Model {

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
    
    function getallcountry(){
        $this->load->database();
        $this -> db -> select('*');
        $this -> db -> from('country');
        
        $query = $this -> db -> get();
        if($query -> num_rows() > 0){
            return $query->result();
        }
            return false;
        
    }
    
    function getallstate(){
        $this->load->database();
        $this -> db -> select('*');
        $this -> db -> from('country');
        
        $query = $this -> db -> get();
        if($query -> num_rows() > 0){
            return $query->result();
        }
            return false;
        
    }
    
    
    function registeruserdata($email, $username, $pass){
	$this->load->database();
	$status = 0;
	$this -> db -> select('*');
	$this -> db -> from('user');
	$this -> db -> where('email = ' . "'" . $email . "'");
	$emailquery = $this -> db -> get();
	if($emailquery -> num_rows() > 0){
	    $status = 2;//"This email address has already been used. Please select a different email address.";
	    $statusText = "This email address has already been taken";
	}else{
	    $this -> db -> select('*');
	    $this -> db -> from('auth');
	    $this -> db -> where('username = ' . "'" . $username . "'");
	    $unamequery = $this -> db -> get();
	    if($unamequery -> num_rows() > 0){
		$status = 3;//"This username has already been used. Please select a different username.";
		$statusText = "This Username has already been taken";
	    }else{
		$user = "insert into user (email, status, isdeleted) values('$email', 1, 0)";
			
		$this->db->query($user);
		$uid = $this->db->insert_id();
		$user = "insert into auth (uid, username, password) values ('$uid', '$username', '$pass')";
		$this->db->query($user);
		$patientid = $this->db->insert_id();
		$user = "insert into settings (uid) values ('$uid')";
	        $this->db->query($user);
		$this->session->set_userdata('uservariable', $username);
		$status = 1;
	    }
	}
	
	return $status;
	
    }
    
    
    function updateuserdata($fname, $lname, $gender, $dob, $email, $username, $pass, $city, $state, $country, $tel){
	$this->load->database();
	$status = 0;
	$this->load->database();
        $this -> db -> select('*');
        $this -> db -> from('promo');
	$this -> db -> where('promocode = ' . "'" . $promo . "'");
	//$this -> db -> where('ispicked != 1');
	
        
        $query = $this -> db -> get();
        if($query -> num_rows() > 0){
	    foreach ($query->result() as $row)
	    {	
		$isPicked =  $row->ispicked ;
	    }
	    if($isPicked == 1){
		$status = 4;
	    }else{
		$this -> db -> select('*');
		$this -> db -> from('user');
		$this -> db -> where('email = ' . "'" . $email . "'");
		$emailquery = $this -> db -> get();
		if($emailquery -> num_rows() > 0){
		    $status = 2;//"This email address has already been used. Please select a different email address.";
		}else{
		    $this -> db -> select('*');
		    $this -> db -> from('auth');
		    $this -> db -> where('username = ' . "'" . $username . "'");
		    $unamequery = $this -> db -> get();
		    if($unamequery -> num_rows() > 0){
			$status = 3;//"This username has already been used. Please select a different username.";
		    }else{
			$stateQry = "insert into state (countryid, code, statename) values ('$country', '', '$state')";
			
			$this->db->query($stateQry);
			$sid = $this->db->insert_id();
			
			
			$user = "insert into user (roleid, firstname, lastname, gender, dateofbirth, address1, address2, city, stateid, countryid, zipcode, phone, email, status, isdeleted) values
			('$role', '$fname', '$lname', '$gender', '$dob', '', '', '$city', '$sid', '$country', '234567', '$tel', '$email', 1, 0)";
			
			$this->db->query($user);
			$uid = $this->db->insert_id();
			
			$user = "insert into auth (authid, username, password) values ('$uid', '$username', '$pass')";
			
			$this->db->query($user);
			
			if($role == 1){
			
			    $user = "insert into patient (userid, isactive, lockcode) values ('$uid', 1, '0000')";
			
			    $this->db->query($user);
			    $patientid = $this->db->insert_id();
			
			    $user = "insert into settings (patientid, encryptvit, encryptvaccn, encryptappt, encryptmed, encryptexe) values ('$patientid', 0, 0, 0, 0, 0)";
			
			    $this->db->query($user);
			}else{
			    $education = explode("_", $education);
			    $cnt = count($education);
			    for($i = 0; $i<$cnt; $i++){
				$user = "insert into physician (specialtyid, userid, registrationId) values ('$education[$i]', '$uid', '$registration')";
			    }
			
			    $this->db->query($user);
			    
			}
			$promoquery = "update promo set ispicked = 1, uid = $uid where promocode = '$promo'" ;
		    
			$this->db->query($promoquery);
			
			$this->session->set_userdata('uservariable', $username);
			
			$status = 1;
			
			
		    }
		}
	    }
	}else{
	    
	    $status = 4;//"Please select valid promo code";
	    
	}
	
	return $status;
	
    }
    
    
    function getprofiledata($userId){
        
        $this -> db -> select('*');
        $this -> db -> from('user');
	$this->db->join('auth', 'auth.authid = user.uid ');
        $this->db->join('state', 'state.sid = user.stateid ');
        $this->db->join('country', 'country.cid = user.countryid ');
	$this -> db -> where('uid = ' . "" . $userId . "");
        $this -> db -> limit(1);
        
        $query = $this -> db -> get();
        if($query -> num_rows() == 1){
            return $query->result();
        }
            return false;
        
    }
    
    function saveprofiledata($userId, $firstname, $lastname, $gender, $dob, $email, $username, $password, $address1, $address2, $city, $stateid, $state, $country, $phone){
	$auth = "update auth set username = '$username', password = '$password' where authid = '$userId'" ;
        
        $this->db->query($auth);
        $uid = $this->db->insert_id();
	
	$auth = "update state set statename = '$state' where sid = '$stateid'" ;
        
        $this->db->query($auth);
        $uid = $this->db->insert_id();
	
	$user = "update user set firstname = '$firstname', lastname = '$lastname', gender = '$gender', dateofbirth = '$dob', address1 = '$address1', address2 = '$address2', city = '$city', countryid = '$country', phone = '$phone', email = '$email' where uid = '$userId'";
	
	$this->db->query($user);
        $uid = $this->db->insert_id();
	
	return $uid;
    }
    
    
    function gettweets($patientid){
	$this -> db -> select('*');
        $this -> db -> from('tweet');
	$this -> db -> where('tweet.patientid = ' . $patientid);
        
        $query = $this -> db -> get();
        if($query -> num_rows() > 1){
            return $query->result();
        }
            return false;
        
    }
    
    
    function addtweet($patientid, $text, $isEncrypt){
	$this->load->database();
	
	$tweetQry = "insert into tweet (tweet, patientid, isencrypted) values ('$text', '$patientid', '$isEncrypt')";
        
        $this->db->query($tweetQry);
        $sid = $this->db->insert_id();
    }
    
    
    function changepassword($patientid, $password){
	$this->load->database();
	
	$updatePass = "update auth set password = '$password' where authid = ".$patientid;
        
        $this->db->query($updatePass);
        $sid = $this->db->insert_id();
	return $sid;
    }
    
    function forgotpassword($email){
	$this -> db -> select('auth.username, auth.password');
        $this -> db -> from('auth');
	$this->db->join('user', 'user.uid = auth.authid ');
	$this -> db -> where('user.email = "' . $email .'"');
        
        $query = $this -> db -> get();
        if($query -> num_rows() > 0){
	    foreach ($query->result() as $row){
		//$username =  $row->username ;
		$password =  $row->password;
	    }
            return $password;
        }
            return false;
    }
    
    
    function getsettingsdata($patientid){
	$this -> db -> select('*');
        $this -> db -> from('settings');
	$this -> db -> where('settings.patientid = ' . $patientid);
        
        $query = $this -> db -> get();
        if($query -> num_rows() >= 1){
            return $query->result();
        }
            return false;
        
    }
    
    
    function updatesettingsdata($encvit, $encvaccn, $encappt, $encmed, $encexe, $encdoc, $path, $id){
	$this->load->database();
	
	$this -> db -> select('*');
        $this -> db -> from('settings');
	$this -> db -> where('settings.patientid = ' . $id);
        
        $query = $this -> db -> get();
        if($query -> num_rows() > 0){	
	
	    $updatesettings = "update settings set encryptvit = '$encvit', encryptvaccn = '$encvaccn', encryptappt = '$encappt', encryptmed = '$encmed', encryptexe = '$encexe', encryptdoc = '$encdoc', encryptpath = '$path' where patientid = ".$id;
        
	    $this->db->query($updatesettings);
	    $sid = $this->db->insert_id();
	}else{
	    $addsettings = "insert into settings (patientid, encryptvit, encryptvaccn, encryptappt, encryptmed, encryptexe, encryptdoc, encryptpath) values('$id', '$encvit', '$encvaccn', '$encappt', '$encmed', '$encexe', '$encdoc', '$path')";
        
	    $this->db->query($addsettings);
	    $sid = $this->db->insert_id();
	}
	return $sid;
    }
    
    
    function getuserinfodata($userid){
	$this -> db -> select('*');
        $this -> db -> from('user');
	$this -> db -> where('user.uid = ' . $userid);
        
        $query = $this -> db -> get();
        if($query -> num_rows() >= 1){
            return $query->result();
        }
            return false;
        
    }
    
    
    function getdocinfodata($userid){
	$this -> db -> select('*');
        $this -> db -> from('user');
	$this->db->join('physician', 'physician.userid = user.uid ');
	$this->db->join('specialty', 'specialty.spId = physician.specialtyid ');
	$this -> db -> where('user.uid = ' . $userid);
        
        $query = $this -> db -> get();
        if($query -> num_rows() >= 1){
            return $query->result();
        }
            return false;
        
    }



}

?>
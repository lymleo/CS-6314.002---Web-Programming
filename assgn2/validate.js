$(document).ready(function() {
	$("#username").after("<span id = 'unameinfo'></span>");
	$("#password").after("<span id ='pwdinfo'></span>");
	$("#email").after("<span id='emailinfo'></span>");
	$(".info").hide();
	
	$("#username").on({
		focus:function(){
			$("#unameinfo").addClass("info").removeClass("ok error").text("The username must contain only alphabetical or numeric characters.").show();
		},
		
		blur:function(){
			var uname = $(this).val();
			var pattern =/^[A-Za-z0-9]+$/;
			if(uname==''){
				$("#unameinfo").hide();
			}else if(!pattern.test(uname)){
				$("#unameinfo").addClass("error").removeClass("info ok").text("Error");
			}else{
				$("#unameinfo").addClass("ok").removeClass("info error").text("OK");
			}
		}
	});
	
	$("#password").on({
		focus:function(){
			$("#pwdinfo").addClass("info").removeClass("ok error").append("The password should be at least 8 characters long.").show();
		},
		
		blur:function(){
			var password = $(this).val();
			if(password==''){
				$("#pwdinfo").hide();
			} else if(password.length < 8){
				$("#pwdinfo").addClass("error").removeClass("info ok").text("Error");
			} else{
				$("#pwdinfo").addClass("ok").removeClass("info error").text("OK");
			}
		}	
	});
	
	$("#email").on({
		focus:function(){
			$("#emailinfo").addClass("info").removeClass("ok error").text("The email address should be a valid email address (mysite@ourearth.com my.ownsite@ourearth.org or mysite@you.me.net)").show();
		},
		blur:function(){
			var email = $(this).val();
			var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			// email address validation: http://www.w3resource.com/javascript/form/email-validation.php
			if(email==''){
				$("#emailinfo").hide();
			}else if(!pattern.test(email)){
				$("#emailinfo").addClass("error").removeClass("ok info").text("Error");
			}else{
				$("#emailinfo").addClass("ok").removeClass("error info").text("OK");
			}			
	}
	});
});
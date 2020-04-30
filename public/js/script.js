$(function()
{
	/******************************************************************************************
	* socket.io client
	******************************************************************************************/
	var socket = io();
	var uid;
	var userIdToChatWith;
	var userIdStopedChecking;
	var defaultCheckinid = 0;

	if($('.hidden').text() != null)
	{
		uid = $('.hidden').text();	
	}
	
	/******************************************************************************************
	*******************************************************************************************/

	$("a").click(function(e)
	{
		//checks on href(a) click if was he checking up on anyone
		if(defaultCheckinid != 0)
		{
			stopCheckingUp(defaultCheckinid);
		}
	});


	/******************************************************************************************
	*  click handler from chat history
	******************************************************************************************/
	$('.userFromChatHistory').click(function(e)
	{
		userIdToChatWith = $(this).attr('id');

		//checks if checking up user id is not zero then fires stopChecking up
		if(defaultCheckinid != 0)
		{
			stopCheckingUp(defaultCheckinid);
		}


		defaultCheckinid = userIdToChatWith;

		
	
		startChatWith(userIdToChatWith);

				
	});

	socket.on(uid, function(data)
	{
		if(data.notificationType == 1)
		{
			if(userIdToChatWith == data.senderId)
			{
				//we have to check the scroll of the messagesbo height and put a dropdown array which show that new message has been appended
				updateHistory();
				$('.messages_box').append("<p class='messagesFromOther'>"+data.message_content+"</p>");						
			}
			else
			{
				
				$('#'+data.senderId).parent().prepend($('#'+data.senderId));
				$('#'+data.senderId).find('.events').html("<span class='w3-badge w3-green' style='border-radius: 50%;'><small>New</small></span>");
			}
		}

		if(data.notificationType == 2)
		{
			//$('#'+data.userCheckinUp).append("<small></small>");
			$('#'+data.userCheckinUp).find('.events').html("<i class='fa fa-eye'>is checkin up</i>");
		}
		if(data.notificationType == 3)
		{
			//$('#'+data.userTypingId).append("<small></small>");
			$('#'+data.userTypingId).find('.events').html("<i class='fa fa-pencil'>is typing ("+data.wordCount+" words)</i>");
		}


		if(data.notificationType == 4)
		{
			$('#'+data.userTypingId).find('.events').html("");
		}
		// io.emit(data.stopCheckingUpOnUserId, {notificationType: 5, userStopChecking: data.userStopCheckinUp});
		if(data.notificationType == 5)
		{
			//alert(data.userStopChecking);

			$('#'+data.userStopChecking).find('.events').html("");
		}
	});
	/*********************************************************************************************************************************
	* is typing method definition
	**********************************************************************************************************************************/
	function isTyping(userIdToChatWith, wordCount)
	{
		var userIdToBeNotified = userIdToChatWith;
		var wordCount = wordCount;
		socket.emit('isTypingText', {userTypingId : uid, userIdToBeNotified : userIdToBeNotified, wordCount: wordCount});
	}
	function stopedTyping(userIdToChatWith)
	{
		socket.emit('userIdToChatWith', {userTypingId : uid, userIdToBeNotified : userIdToChatWith});
	}
	/********************************************************************************************************************
	* method to tell they are checking up on
	********************************************************************************************************************/
	function checkingUp(id)
	{
		var userIdToBeNotified = id;
		socket.emit('checkingUpEvent', {userCheckinUp : uid, userIdToBeNotified : userIdToBeNotified});
	}

	/************************************************************************************************************************
	* stop checking up
	*************************************************************************************************************************/
	function stopCheckingUp(defaultCheckinid)
	{
		socket.emit('stopCheckin', {userStopCheckinUp : uid, stopCheckingUpOnUserId: defaultCheckinid});
	}
	/*************************************************************************************************************************
	# start new chat handler function
	**************************************************************************************************************************/
	
	function startChatWith(id)
	{
		//stopCheckingUp(userIdToChatWith);

		userIdToChatWith = id;	
		if($("#"+userIdToChatWith).children(".events").text() == "New")
		{
			//alert("hello");
			$("#"+userIdToChatWith).find('.events').html("");
		}
		
	

		checkingUp(userIdToChatWith);

		$('.default').hide();
		$('.custom').fadeIn();
		$('.headerProfile, .messages_box, .messageInput').html('');
		$(".messageInput").html("<input class='w3-input inputMessage w3-hover-teal' type='text'><i class='fa fa-send sendMessageBtn' title='Send Message'></i>");
		$.ajax
		({
			type : 'POST',
			url  : '/messaging/our_chat',
			data : {userIdToChatWith : userIdToChatWith},
			success : function(response)
			{
				if(response.messageListResults == 'no messages')
				{
					//alert("Some problem occured while fetching messages, it is server side ERROR: 501.1 Report to Admins");
					return false;
				}
				else if(response.messageListResults.length > 0)
				{
					//console.log(response.userDetailsResults);


					for(var i = 0; i < response.userDetailsResults.length; i++)
					{
						$('.headerProfile').html("<h3 class='margin_left_thirty'><b>"+ response.userDetailsResults[i].last_name +" "+ response.userDetailsResults[i].first_name +"<i class='w3-right fa fa-user'></i></b></h3>");
					}
					//$('').scrollTop($('.messages_box')[0].scrollHeight);
					//$('.messages_box').scrollTop($('.messages_box')[0].scrollHeight);

					for (var i = 0; i < response.messageListResults.length; i++) 
					{
						
						if(response.messageListResults[i].sender_id == response.logedInUser)
						{
							$('.messages_box').append("<p class='messagesfromMe'>"+response.messageListResults[i].message_content+" <sub>"+ response.messageListResults[i].date_time +"</sub></p>");
						}
						else
						{
							$('.messages_box').append("<p class='messagesFromOther'>"+response.messageListResults[i].message_content+" <sub>"+ response.messageListResults[i].date_time +"</sub></p>");
						}
					}	      
				}

			},
			error : function(response)
			{
				alert('ERROR: '+response);
			}
		});
		$('.inputMessage').keyup(function(e)
		{
			if($('.inputMessage').length > 0)
			{
				var regex = /\s+/gi;
	    		var wordCount = $('.inputMessage').val().trim().replace(regex, ' ').split(' ').length;

	    		//console.log(wordCount);
				isTyping(userIdToChatWith, wordCount);
				
				$('.inputMessage').blur(function(e)
				{
					stopedTyping(userIdToChatWith);
				});
				

			}
			else
			{
				return false;
			}			
		});
			
		$('.sendMessageBtn').click(function(e)
		{
			var inputMessageContent = $('.inputMessage').val();

			uid = $('.hidden').text();
			socket.emit('sendPrivateMessage', {receiverId: userIdToChatWith, inputMessageContent: inputMessageContent, sender_id : uid});

			$('.inputMessage').val('');
			$.ajax
			({
				type : 'POST',
				url  : '/messaging/insert_message',
				data : {inputMessageContent: inputMessageContent, receiverId : userIdToChatWith},
				success : function(data)
				{
					if(data == 'success')
					{
						updateHistory();
						$('.messages_box').append("<p class='messagesfromMe'>"+inputMessageContent+ "</p>");
					}
					else
					{
						alert(data);
					}
				},
				error : function(data)
				{
					alert("ERROR: "+data);
				}
			});						
		});
	}
	
	$('.searchUser').click(function(e)
	{		
        var userToSearch = $('.searchUsernameToStartChatWith').val();
        $('.userOnSearchList').html('');

        $.ajax
        ({
        	url : "/messaging/searchUserToStartChat",
        	type : "POST",
        	data : {userToSearch : userToSearch},
        	success : function(response)
        	{
        		if(response.result == 'no one')
        		{
        			$('.userOnSearchList').html("No user with such details, try again with different key!")
        		}
        		else if(response.result.length > 0)
        		{
        			for(var i = 0; i < response.result.length; i++)
        			{
        				$('.userOnSearchList').append("<li class='startChat pointer' id='" + response.result[i].id + "'>" + response.result[i].last_name + " "+ response.result[i].first_name +"<small>(@"+ response.result[i].user_name +")</small><span class='w3-right'>  <i class='fa fa-user fa-2x'></i></span></li>");
					}
					$('.userOnSearchList').append("<br>");
					$('.startChat').click(function()
					{
						$('.closeStartChatModal').click();
						startChatWith($(this).attr('id'));
					});			
        		}
        	},
        	error : function(data)
        	{
        		alert("Error: Could send request!")
        	}
        });	   
		
	});
	// is typing method
	

	//refresh chat history
	function updateHistory()
	{
		$.ajax
		({
			url: "/messaging/updateHistoryBar",
			type : "GET",
			success : function(response)
			{
				$(".chatHistoryBlock").html("");

				for(var i = 0; i< response.data.length; i++) 
				{
					$(".chatHistoryBlock").append("<li class='userFromChatHistory updateHistory pointer' id='"+response.data[i].id+"'>"+response.data[i].last_name+" "+response.data[i].first_name+"<br><small class='events'></small></li>");
				}
				$('.updateHistory').click(function()
				{
					var id = $(this).attr('id');
					startChatWith(id);
				});
					
			},
			error : function(response)
			{
				alert("Client side error: 150ed");
			}

		});
	}

	
	$('.closeStartChatModal').click(function()
	{
		$('.searchUsernameToStartChatWith').val('');
		$('.userOnSearchList').html('');
	});
});
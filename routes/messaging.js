// page 404
exports.other = function(req, res, next) {
    res.render('page_404.ejs');
}
//FOR FORWARDING, GET THE USERS BY ORDER OF FIRSTNAME sql injection catered for
exports.getTheUsersToForwardThisMessageTo = function(req, res, next)
{
  var user =  req.session.user,
  userId = req.session.userId;
  var userIdToStartChatWith = req.body.userIdToStartChatWith;
  if(userId == null)
  {
      res.redirect("/");
      return;
  }
  else
  {
      var excludeFromSearch = req.body.excludeFromSearch; //so that it exclude the user you were chating with
      var getTheUsersSQl = "SELECT fed_user.msg_user_id, fed_user.user_first_name, fed_user.user_last_name, fed_user.msg_user_name, fed_user.user_profilepicture FROM fed_user INNER JOIN ( SELECT DISTINCT rec FROM (SELECT *, CASE WHEN fed_messages.recipient_user_id = ? THEN fed_messages.sender_user_id WHEN fed_messages.sender_user_id = ? THEN fed_messages.recipient_user_id END AS rec FROM fed_messages WHERE (fed_messages.sender_user_id = ? OR fed_messages.recipient_user_id = ?)) as newtable ORDER BY id DESC) AS ttt ON fed_user.msg_user_id = ttt.rec  WHERE fed_user.msg_user_id != ? ORDER BY fed_user.user_first_name";

      db.query(getTheUsersSQl,[userId, userId, userId, userId, excludeFromSearch], function(err, usersListResults)
      {
        if(usersListResults.length)
        {
            res.send({usersListResults : usersListResults});
        }
        else
        {
            res.send({usersListResults: usersListResults});
        }
      });

  }
}
//DELETE MESSAGE sql injection catered
exports.deleteThisMessage = function(req, res, next)
{
  var user =  req.session.user,
  userId = req.session.userId;
  if(userId == null){
    res.redirect("/");
    return;
  }
  else
  {
      var messageId = req.body.thisMessageId;
      var messageUpdate = req.body.message;
      var userIdToStartChatWith = req.body.userIdToStartChatWith;



      var deleteMessageSql = "UPDATE fed_messages SET msg_text = ? WHERE id = ?";
      db.query(deleteMessageSql,[messageUpdate, messageId], function(err, deleteMessageSqlResults)
      {
         // res.send("deleted");
          var sqlQuery = "SELECT MAX(id) as lastMessageId FROM fed_messages  WHERE sender_user_id = ? AND recipient_user_id = ? OR sender_user_id = ? AND recipient_user_id = ?";
          db.query(sqlQuery,[userIdToStartChatWith, userId, userId, userIdToStartChatWith], function(err, theLastMessageId)
          {
            res.send({theResponse : 'deleted', theLastMessageId : theLastMessageId[0].lastMessageId});
          });
      });
  }
};

/////////////////////////////////////////SELECT MESSAGES BETWEEN sql injection cqtered for /////////////////////////////////////////////////////////////////////
exports.fetchMessages = function(req, res, next)
{
  var user =  req.session.user,
  userId = req.session.userId;
  var userIdToStartChatWith = req.body.userIdToStartChatWith;
  if(userId == null){
    res.redirect("/");
    return;
  }
  else
  {
    var sqlQuery = "SELECT * FROM fed_messages  WHERE sender_user_id = ? AND recipient_user_id = ? OR sender_user_id = ? AND recipient_user_id = ? ORDER BY id ASC";

    db.query(sqlQuery,[userIdToStartChatWith, userId, userId, userIdToStartChatWith], function(err, messageListResults)
    {
      if(messageListResults.length > 0)
      {
          var sql = "SELECT * FROM fed_user WHERE msg_user_id = ?";
          db.query(sql,[userIdToStartChatWith], function(err, userDetailsResults)
          {
            if(userDetailsResults.length)
            {
                res.send({haveChatMessage : 'yes', messageListResults: messageListResults, logedInUser : userId, userDetailsResults : userDetailsResults});
            }
            else
            {
                res.send({haveChatMessage: 'no_user_no_messages'});
            }
          });
      }
      else
      {
          var sql = "SELECT * FROM fed_user WHERE msg_user_id = ?";
          db.query(sql,[userIdToStartChatWith], function(err, userDetailsResults)
          {
            if(userDetailsResults.length > 0)
            {
              res.send({haveChatMessage : 'no', messageListResults: 'no messages', logedInUser : userId, userDetailsResults : userDetailsResults});
            }
            else
            {
              res.send({haveChatMessage: 'no_user_no_messages'});
            }
          });
      }
    });

  }
}
//SEARCH USER ON CHAT
exports.searchUserOnChat = function(req, res, next)
{
  var user =  req.session.user,
  userId = req.session.userId;
  if(userId == null)
  {
    res.redirect("/login");
    return;
  }
  else
  {
      var searchWithInChatInputKey = req.body.searchWithInChatInputKey.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;");;

      var searchUserSQL = "SELECT mmm.msg_user_id, mmm.msg_user_name, mmm.user_first_name, mmm.user_last_name, mmm.user_profilepicture FROM fed_user as mmm INNER JOIN (SELECT DISTINCT rec FROM (SELECT *, CASE WHEN fed_messages.recipient_user_id = ? THEN fed_messages.sender_user_id WHEN fed_messages.sender_user_id = ? THEN fed_messages.recipient_user_id END AS rec FROM fed_messages WHERE (fed_messages.sender_user_id = ? OR fed_messages.recipient_user_id = ?)) as newtable ORDER BY id DESC) as mmmm ON mmm.msg_user_id = mmmm.rec WHERE LOWER(mmm.user_first_name) LIKE ? OR LOWER(mmm.user_last_name) LIKE ? OR LOWER(msg_user_name)  LIKE ?";

      //var searchMessageSQL = "SELECT fed_messages.id, fed_messages.sender_user_id, fed_messages.recipient_user_id, fed_messages.msg_text, CASE WHEN fed_messages.recipient_user_id = '"+userId+"' THEN fed_messages.sender_user_id WHEN fed_messages.sender_user_id = '"+userId+"' THEN fed_messages.recipient_user_id END hhh FROM `fed_messages` WHERE sender_user_id = '"+userId+"' AND LOWER(fed_messages.msg_text) LIKE LOWER('%"+searchWithInChatInputKey+"%') OR recipient_user_id = '"+userId+"' AND LOWER(fed_messages.msg_text) LIKE LOWER('%"+searchWithInChatInputKey+"%')"
      var searchMessageSQL = "SELECT fed_user.msg_user_id, fed_user.msg_user_name, fed_user.user_last_name, fed_user.user_first_name, text_message, text_message_id, the_sender, the_recipient FROM fed_user INNER JOIN ( SELECT fed_messages.id AS text_message_id, fed_messages.sender_user_id AS the_sender, fed_messages.recipient_user_id AS the_recipient, fed_messages.msg_text AS text_message, CASE WHEN fed_messages.sender_user_id = '"+userId+"' THEN fed_messages.recipient_user_id WHEN fed_messages.recipient_user_id = '"+userId+"' THEN fed_messages.sender_user_id END AS newcolumn FROM fed_messages WHERE fed_messages.sender_user_id = '"+userId+"' AND LOWER(fed_messages.msg_text) LIKE LOWER('%"+searchWithInChatInputKey+"%') OR fed_messages.recipient_user_id = '"+userId+"' AND LOWER(fed_messages.msg_text) LIKE LOWER('%"+searchWithInChatInputKey+"%') ) AS TT ON fed_user.msg_user_id = TT.newcolumn ORDER BY TT.text_message_id DESC";
      db.query(searchUserSQL,[userId, userId, userId, userId, searchWithInChatInputKey.toLowerCase(), searchWithInChatInputKey.toLowerCase(), searchWithInChatInputKey.toLowerCase()], function(err, userSearchResultsResponse) 
      {
          db.query(searchMessageSQL, function(err, messageSearchResultsResponse)
          {
            
            if(userSearchResultsResponse != null && messageSearchResultsResponse != null)
            {
              res.send({userSearchResultsResponse : userSearchResultsResponse, messageSearchResultsResponse: messageSearchResultsResponse});
            }
            else if(userSearchResultsResponse != null)
            {
              res.send({userSearchResultsResponse : userSearchResultsResponse});
            }
            else if(messageSearchResultsResponse != null)
            {
              res.send({messageSearchResultsResponse: messageSearchResultsResponse});
            }
          });
      });
  }
};
//dashboard page functionality with sql injection and sanitization catered
exports.dashboard = function(req, res, next)
{
    var user =  req.session.user,
    userId = req.session.userId;
    if(userId == null)
    {
        res.redirect("/");
        return;
    }
    else
    {
        //fetching messages that have been sent by or recieved by loged in user
        var sql="SELECT * FROM (SELECT msg_date ,msg_text ,CASE WHEN recipient_user_id = ? THEN sender_user_id WHEN sender_user_id = ? THEN recipient_user_id END AS rec,CASE WHEN recipient_user_id = ? THEN sender_user_id WHEN sender_user_id = ? THEN sender_user_id END AS sender_id_of_message FROM fed_messages INNER JOIN fed_user AS sender ON sender.msg_user_id = sender_user_id INNER JOIN fed_user AS recipient ON recipient.msg_user_id = recipient_user_id INNER JOIN ( SELECT MAX(id) AS most_recent_message_id FROM fed_messages GROUP BY CASE WHEN sender_user_id > recipient_user_id THEN recipient_user_id ELSE sender_user_id END,CASE WHEN sender_user_id < recipient_user_id THEN recipient_user_id ELSE sender_user_id END ) T ON T.most_recent_message_id = fed_messages.id WHERE sender_user_id = ? OR recipient_user_id = ?) as myttt INNER JOIN (SELECT * FROM fed_user INNER JOIN ( SELECT DISTINCT rec FROM (SELECT *, CASE WHEN fed_messages.recipient_user_id = ? THEN fed_messages.sender_user_id WHEN fed_messages.sender_user_id = ? THEN fed_messages.recipient_user_id END AS rec FROM fed_messages WHERE (fed_messages.sender_user_id = ? OR fed_messages.recipient_user_id = ?) ) as newtable) as jj ON fed_user.msg_user_id = jj.rec) as otherttt ON myttt.rec = otherttt.msg_user_id ORDER BY msg_date DESC";
        db.query(sql,[userId, userId, userId, userId, userId, userId, userId, userId, userId, userId], function(err, results)
        {
            if(results.length > 0)
            {
                var sqlQuery = "SELECT user_profilepicture, user_first_name FROM fed_user WHERE msg_user_id = ?";
                db.query(sqlQuery,[userId], function(err, logedInUserProfile)
                {
                    if(logedInUserProfile.length)
                    {
                        res.render('very_new.ejs', {userChatHistoryListResults: results, user:user, userId : userId, logedInUserProfile: logedInUserProfile});
                    }
                    else
                    {
                        res.redirect("/");
                        return;
                    }
                });        
            }
            else
            {
                var sqlQuery = "SELECT user_profilepicture, user_first_name FROM fed_user WHERE msg_user_id = ?";
                db.query(sqlQuery, [userId], function(err, logedInUserProfile)
                {
                    if(logedInUserProfile.length)
                    {
                        var noHistoryMessage = "No chat history";
                        res.render('very_new.ejs',{noHistoryMessage:  noHistoryMessage, user:user, userId : userId, logedInUserProfile : logedInUserProfile});
                    }
                    else
                    {
                        res.redirect("/");
                        return;
                    }
                });                      
            }
        });
    }
};
// method to fecth all chat messages between two users, select messages and send them as request with sql injection and sanitization catered
exports.get_chat_by_id = function(req, res, next)
{
  var user =  req.session.user,
  userId = req.session.userId;
  if(userId == null)
  {
    res.redirect("/login");
    return;
  }
  else
  {
    var userTochatWith = req.body.userIdToChatWith;
    var sql = "SELECT * FROM fed_user WHERE msg_user_id = ?";               
   
    db.query(sql,[userTochatWith], function(err, userDetailsResults)
    {
      if(userDetailsResults.length)
      {
          var sqlUpdateReads = "UPDATE fed_messages SET is_read = 0 WHERE sender_user_id = ? AND recipient_user_id = ?";
          db.query(sqlUpdateReads, [userTochatWith, userId]);

          var sqlCmd = "SELECT * FROM fed_messages  WHERE sender_user_id = ? AND recipient_user_id = ? OR sender_user_id = ? AND recipient_user_id = ? ORDER BY id ASC";

          db.query(sqlCmd,[userTochatWith, userId, userId, userTochatWith], function(err, messageListResults)
          {
            if(messageListResults.length)
            {
                res.send({messageListResults: messageListResults, logedInUser : userId, userDetailsResults : userDetailsResults});
            }
            else
            {
              res.send({messageListResults : 'no messages', logedInUser : userId, userDetailsResults : userDetailsResults});
            }
          });
      }
      else
      {
           res.send({messageListResults : 'no messages', logedInUser : userId, userDetailsResults : 'Invalid user!'});
      }
    });
  }
}
//insert new message with sql injection and sanitization catered
exports.insert_the_message = function(req, res, next)
{


  var user =  req.session.user,
  userId = req.session.userId;

  if(userId == null)
  {
    res.redirect("/login");
    return;
  }
  else
  {

    var userToSendMessage = req.body.receiverId;
    var messageInput = req.body.inputMessageContent;
    var ForwardStatus = req.body.ForwardStatus;
    
    messageInput = messageInput.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;");

    var sqlQuery = "SELECT id FROM fed_messages WHERE sender_user_id = ? AND recipient_user_id = ? OR sender_user_id = ? AND recipient_user_id = ?";
    db.query(sqlQuery, [userToSendMessage, userId, userId, userToSendMessage], function(err, results)
    {
        if(results.length > 0)
        {
            var sqlCommand = "INSERT INTO `fed_messages`(`sender_user_id`, `recipient_user_id`, `msg_text`, `forward_status`, `msg_date`, `is_read`) VALUES(?, ?, ?, ?, NOW(), 1)";
            var query = db.query(sqlCommand,[userId, userToSendMessage, messageInput, ForwardStatus], function(err, result)
            {
              res.send('not_new_success_status');
            });
        }
        else
        {
            var sqlCommand = "INSERT INTO `fed_messages`(`sender_user_id`, `recipient_user_id`, `msg_text`, `forward_status`, `msg_date`, `is_read`) VALUES(?, ?, ?, ?, NOW(), 1)";
            var query = db.query(sqlCommand,[userId, userToSendMessage, messageInput, ForwardStatus], function(err, result)
            {
              res.send('new_success_status');
            });
        }
    });
  }
}

//delete chat with specific user with validation id to delete chat with and sql injection catered for
exports.deleteChatWith =function(req, res, next)
{
  var user =  req.session.user,
  userId = req.session.userId;

  if(userId == null)
  {
      res.redirect("/login");
  }
  else
  {
      var userIdToDeleteChatWith = req.body.userIdToDeleteChatWith;

      if(isNaN(userIdToDeleteChatWith))
      {
          res.send("error");
      }
      else
      {
          var sql = "DELETE FROM  fed_messages WHERE sender_user_id = ? AND  recipient_user_id = ?  OR sender_user_id = ? AND recipient_user_id = ?";
          db.query(sql,[userIdToDeleteChatWith, userId, userId, userIdToDeleteChatWith], function (err, result) 
          {
              if(err)
              {
                  res.send("error");
              }
              else
              {
                  res.send("success");
              }
          });
      }
  }
};
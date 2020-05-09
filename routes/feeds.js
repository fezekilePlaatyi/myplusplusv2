exports.insertFeedPost = function(req, res, next)
{
    var user =  req.session.user,
    userId = req.session.userId;
    if(userId == null){
       res.redirect("/");
       return;
    }
    else
    {
      	var feedContent = req.body.feedContent;
      	feedContent = feedContent.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;");
      	var privacy_status = "public";
      	/* Begin transaction */
		db.getConnection(function(err, connection) 
		{
	    	connection.beginTransaction(function(err) 
			{
			    if(err) 
			    { 
			  	    connection.rollback(function() 
			        {
			           res.send({message: 'error'});
			           connection.release();
			        });
			    }
			    else
			    {
				    connection.query("INSERT INTO `feeds_table`(`feed_owner`, `privacy_status`, `story_type`, `date_created`, `date_modified`) VALUES(?, ? , 2 , NOW(), NOW())",[userId ,privacy_status], function(err, result) 
				    {
					    if(err) 
					    { 
					        connection.rollback(function() 
					        {
					           res.send({message: 'error'});
					           connection.release();
					        });
					    }
						else
						{
						    var lastInsertedId = result.insertId;			 
						    connection.query("INSERT INTO `feed_post`(`feed_id`, `feed_postcontent`) VALUES(?, ?)",[lastInsertedId, feedContent], function(err, result) 
						    {
						      	if(err) 
						      	{ 
							        connection.rollback(function() 
							        {
							           res.send({message: 'error'});
							           connection.release();
							        });
						      	}
						      	else
						      	{
							      	var sql = "SELECT * FROM fed_user WHERE msg_user_id = '"+ userId +"'";
						            connection.query(sql, function(err, userDetailsResults)
						          	{
						            	if(userDetailsResults.length)
						            	{
						                	connection.commit(function(err) 
						            		{
										        if(err)
										        {
										        	connection.rollback(function() 
											        {
											           res.send({message: 'error'});
											           connection.release();
											        });
										        }
										        else
										        {
										        	res.send({message: 'success', lastInsertedId : lastInsertedId, logedInUser : userId, userDetailsResults : userDetailsResults});
						            				connection.release();
						            			}		        
										    });
						            	}
						            	else
						            	{
						                	connection.rollback(function() 
									        {
									           res.send({message: 'error'});
									           connection.release();
									        });
						            	}
						          	});
						        }
						    });
						}
				    });
				}
			});				
		});
		/* End transaction */
    }
}
//feed image, tested sql injection cattered for and validated by replacing unwanted characters
exports.insertFeedImage = function(req, res, next)
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
        var base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");
        var privacy_status = "public";
        var caption = req.body.caption;
        caption = caption.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;");
        var image_name = Date.now()+userId+"_image_post.png";

        require("fs").writeFile("public/feeds_images/"+image_name, base64Data, 'base64', function() 
		{
		    // The file upload is complete.
		    /* Begin transaction */
			db.getConnection(function(err, connection) 
			{
		    	connection.beginTransaction(function(err) 
				{
				    if(err) 
				    { 
				  	    connection.rollback(function() 
				        {
				           res.send({message: 'error'+err});
				           connection.release();
				        });
				    }
				    else
			    	{
						connection.query("INSERT INTO `feeds_table`(`feed_owner`, `privacy_status`, `story_type`, `date_created`, `date_modified`) VALUES('" + userId + "', '" + privacy_status + "', 1 , NOW(), NOW())", function(err, result) 
						{
						    if(err) 
						    { 
							    connection.rollback(function() 
						        {
						           res.send({message: 'error'+err});
						           connection.release();
						        });
						    }
						    else
						    {
						 		var lastInsertedId = result.insertId;
							 	connection.query("INSERT INTO `feeds_media`(`feed_id`, `media_name`) VALUES(?, ?)",[lastInsertedId, image_name], function(err, result) 
							    {
							        if(err) 
							        { 
							        	connection.rollback(function() 
								        {
								           res.send({message: 'error'+err});
								           connection.release();
								        });
							     	}
							     	else
							     	{
							     		if(caption != '')
								    	{
								    		var lastInsertedId = result.insertId;
								       		connection.query("INSERT INTO `feed_captions`(`media_id`, `caption_content`) VALUES(?, ?)",[lastInsertedId, caption], function(err, result) 
								       		{
									     		if(err)
									     		{
									     			connection.rollback(function() 
											        {
											           res.send({message: 'error'+err});
											           connection.release();
											        });
											    }
										        else
										        {
										        	var sql = "SELECT * FROM fed_user WHERE msg_user_id = ?";
										            connection.query(sql, [userId], function(err, userDetailsResults)
										          	{
										            	if(userDetailsResults.length)
										            	{
										                	connection.commit(function(err) 
										            		{
														        if(err)
														        {
														        	connection.rollback(function() 
															        {
															           res.send({message: 'error'+err});
															           connection.release();
															        });
														        }
														        else
														        {
														        	res.send({message: 'success', lastInsertedId : lastInsertedId, logedInUser : userId, userDetailsResults : userDetailsResults});
										            				connection.release();
										            			}		        
														    });
										            	}
										            	else
										            	{
										                	connection.rollback(function() 
													        {
													           res.send({message: 'error'+err});
													           connection.release();
													        });
										            	}
										          	});
										        }
								       		});
								       	} 
								       	else
								       	{
								       		var sql = "SELECT * FROM fed_user WHERE msg_user_id = '"+ userId +"'";
								            connection.query(sql, function(err, userDetailsResults)
								          	{
								            	if(userDetailsResults.length)
								            	{
								                	connection.commit(function(err) 
								            		{
												        if(err)
												        {
												        	connection.rollback(function() 
													        {
													           res.send({message: 'error'+err});
													           connection.release();
													        });
												        }
												        else
												        {
												        	res.send({message: 'success', lastInsertedId : lastInsertedId, logedInUser : userId, userDetailsResults : userDetailsResults});
								            				connection.release();
								            			}		        
												    });
								            	}
								            	else
								            	{
								                	connection.rollback(function() 
											        {
											           res.send({message: 'error'+err});
											           connection.release();
											        });
								            	}
								          	});
								       	}
							     	}
								});
					        }
						});
					}
				});
			});
			/* End transaction */		    
		});
		
	}
};
//insert videofeed image, tested sql injection cattered for and validated by replacing unwanted characters
exports.insertFeedVideo = function(req, res, next)
{
    var userToSearch = req.body.userToSearch;
    var user =  req.session.user,
    userId = req.session.userId;


    if(userId == null)
    {
      	res.redirect("/login");
      	return;
    }
    else
    {
        var privacy_status = "public";
        var caption = req.body.videoCaptionInputValue;

        caption = caption.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;");
        var recordedBlobs = req.body.fd;
 		var base64Data = recordedBlobs.data.replace(/^data:video\/mp4;base64,/, "");      
 		var video_name = Date.now()+userId+"_video_post.mp4";
 
		require("fs").writeFile("public/feeds_video/"+video_name, base64Data, 'base64', function() 
		{
		    // The file upload is complete.
		    /* Begin transaction */
			db.getConnection(function(err, connection) 
			{
		    	connection.beginTransaction(function(err) 
				{
				    if(err) 
				    { 
				  	    connection.rollback(function() 
				        {
				           res.send({message: 'error'});
				           connection.release();
				        });
				    }
				    else
			    	{
						connection.query("INSERT INTO `feeds_table`(`feed_owner`, `privacy_status`, `story_type`, `date_created`, `date_modified`) VALUES(?, ? , 3 , NOW(), NOW())",[userId, privacy_status], function(err, result) 
						{
						    if(err) 
						    { 
							    connection.rollback(function() 
						        {
						           res.send({message: 'error'});
						           connection.release();
						        });
						    }
						 	else
						 	{
							    var lastInsertedId = result.insertId;
							    var feedIdtoSend = lastInsertedId;
							 
							    connection.query("INSERT INTO `feeds_media`(`feed_id`, `media_name`) VALUES(?, ?)",[lastInsertedId, video_name], function(err, result) 
							    {
							        if(err) 
							        { 
							        	connection.rollback(function() 
								        {
								           res.send({message: 'error'});
								           connection.release();
								        });
							     	}  
							     	else
							     	{
										if(caption != '')
								    	{
								    		var lastInsertedId = result.insertId;
								       		connection.query("INSERT INTO `feed_captions`(`media_id`, `caption_content`) VALUES('"+lastInsertedId+"', '"+caption+"')", function(err, result) 
								       		{

									     		if(err) 
									     		{ 
									     			connection.rollback(function() 
											        {
											           res.send({message: 'error'});
											           connection.release();
											        });
										        }
								       		});
								       	}
								       	var sql3 = "SELECT * FROM fed_user WHERE msg_user_id = ?";
							            connection.query(sql3,[userId], function(err, userDetailsResults)
							          	{
							          		if(err)
							          		{
							          			connection.rollback(function() 
										        {
										           res.send({message: 'error'});
										           connection.release();
										        });
							          		}
							          		else
							          		{	
								          		connection.commit(function(err) 
										      	{
											        if(err) 
											        { 
											          	connection.rollback(function() 
												        {
												           res.send({message: 'error'});
												           connection.release();
												        });
											        }
											        else
											        {
											        	res.send({message : 'success', feedIdtoSend: feedIdtoSend, userDetailsResults : userDetailsResults});
											        	connection.release();
											        }		        
										     	});	
										    }	            	
							          	});
								    }
								});
							}
						});
					}
				});
			});
			/* End transaction */		    
		});
	}
};
//getting posts of all kinds for feeds
exports.getPosts = function(req, res, next)
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
		var sql = "SELECT checkerForLike.checkIfLiked, views.numberOfViews, comments.numberOfComments, cc.numberOfLikes, fed_user.user_first_name, fed_user.user_last_name, fed_user.msg_user_id, fed_user.msg_user_name, feeds_table.id as thisFeedId, feeds_table.privacy_status, feeds_table.story_type, feeds_table.date_created, feed_post.feed_id, feed_post.feed_postcontent, feeds_media.feed_id, feeds_media.media_name, feed_captions.caption_content FROM fed_user INNER JOIN feeds_table ON fed_user.msg_user_id = feeds_table.feed_owner left JOIN feed_post ON feeds_table.id = feed_post.feed_id left JOIN feeds_media ON feeds_table.id = feeds_media.feed_id left JOIN feed_captions ON feeds_media.id = feed_captions.media_id LEFT JOIN (SELECT COUNT(id) as numberOfLikes, feed_id FROM feed_likes GROUP BY feed_likes.feed_id) as cc ON cc.feed_id =  feeds_table.id LEFT JOIN (SELECT COUNT(id) as numberOfComments, feed_id FROM feed_comments GROUP BY feed_comments.feed_id) AS  comments ON feeds_table.id = comments.feed_id  LEFT JOIN (SELECT COUNT(id) as numberOfViews, feeds_views.feed_id FROM feeds_views GROUP BY feeds_views.feed_id) AS views ON feeds_table.id = views.feed_id LEFT JOIN (SELECT COUNT(id) AS checkIfLiked, feed_likes.feed_id, feed_likes.person_liked_id FROM feed_likes WHERE feed_likes.person_liked_id = '"+userId+"' GROUP BY feed_id) as checkerForLike on checkerForLike.feed_id = feeds_table.id WHERE fed_user.msg_user_id = '"+userId+"' OR fed_user.msg_user_id IN(SELECT rec FROM (SELECT *, CASE WHEN fed_messages.recipient_user_id = '"+userId+"' THEN fed_messages.sender_user_id WHEN fed_messages.sender_user_id = '"+userId+"' THEN fed_messages.recipient_user_id END AS rec FROM fed_messages WHERE (fed_messages.sender_user_id = '"+userId+"' OR fed_messages.recipient_user_id = '"+userId+"')) as newtable) ORDER BY feeds_table.id DESC";
		db.query(sql, function(err, postsListResults)
        {
            if(postsListResults.length)
	        {
	            res.send({postsListResults : postsListResults});
	        }
	        else
	        {
	            res.send({postsListResults: "no posts, 444 code"});
	        }
     	});
	}
};
//get new feeds
exports.showNewFeeds = function(req, res, next)
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
    	var lastFeedId = req.body.lastFeedId;
    	var sql = "SELECT checkerForLike.checkIfLiked, views.numberOfViews, comments.numberOfComments, cc.numberOfLikes, fed_user.user_first_name, fed_user.user_last_name, fed_user.msg_user_id, fed_user.msg_user_name, theFeedsTable.id as thisFeedId, theFeedsTable.privacy_status, theFeedsTable.story_type, theFeedsTable.date_created, feed_post.feed_id, feed_post.feed_postcontent, feeds_media.feed_id, feeds_media.media_name, feed_captions.caption_content FROM fed_user INNER JOIN (SELECT * FROM feeds_table WHERE feeds_table.id > ?) AS theFeedsTable ON fed_user.msg_user_id = theFeedsTable.feed_owner left JOIN feed_post ON theFeedsTable.id = feed_post.feed_id left JOIN feeds_media ON theFeedsTable.id = feeds_media.feed_id left JOIN feed_captions ON feeds_media.id = feed_captions.media_id LEFT JOIN (SELECT COUNT(id) as numberOfLikes, feed_id FROM feed_likes GROUP BY feed_likes.feed_id) as cc ON cc.feed_id =  theFeedsTable.id LEFT JOIN (SELECT COUNT(id) as numberOfComments, feed_id FROM feed_comments GROUP BY feed_comments.feed_id) AS  comments ON theFeedsTable.id = comments.feed_id  LEFT JOIN (SELECT COUNT(id) as numberOfViews, feeds_views.feed_id FROM feeds_views GROUP BY feeds_views.feed_id) AS views ON theFeedsTable.id = views.feed_id LEFT JOIN (SELECT COUNT(id) AS checkIfLiked, feed_likes.feed_id, feed_likes.person_liked_id FROM feed_likes WHERE feed_likes.person_liked_id = '"+userId+"' GROUP BY feed_id) as checkerForLike on checkerForLike.feed_id = theFeedsTable.id WHERE fed_user.msg_user_id = '"+userId+"' OR fed_user.msg_user_id IN(SELECT rec FROM (SELECT *, CASE WHEN fed_messages.recipient_user_id = '"+userId+"' THEN fed_messages.sender_user_id WHEN fed_messages.sender_user_id = '"+userId+"' THEN fed_messages.recipient_user_id END AS rec FROM fed_messages WHERE (fed_messages.sender_user_id = '"+userId+"' OR fed_messages.recipient_user_id = '"+userId+"')) as newtable) ORDER BY theFeedsTable.id DESC";
		db.query(sql,[lastFeedId], function(err, newFeedsListResults)
        {
        	if(err)
        	{
        		res.send("error");
        	}
            else if(newFeedsListResults.length > 0)
	        {
	            res.send({newFeedsList : newFeedsListResults});
	        }
	        else if(newFeedsListResults == null)
	        {
	            res.send("empty");
	        }
     	});
    }
};
//view feed injection catered for
exports.viewFeed = function(req, res, next)
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
    	var theFeedId = req.body.feedIdViewing;
    	var sql = "SELECT feeds_views.feed_id, feeds_views.viewer_id FROM feeds_views WHERE feed_id = ? AND viewer_id = ?";
    	db.query(sql, [theFeedId, userId], function(err, resultsForCheckingIfLiked)
        {
            if(resultsForCheckingIfLiked.length > 0)
	        {
	            res.send('already_viewed');
	        }
	        else
	        {
	            var sql2 = "INSERT INTO `feeds_views`(`feed_id`, `viewer_id`, `date_viewed`) VALUES(?, ?, NOW())";
	            db.query(sql2,[theFeedId, userId], function(err, resultsLike)
		        {
		            if(err) 
			        { 
			          	res.send('error');
			        }
			        else
			        {
			        	res.send('success');
			        }		
			    });
	        }
     	});

    }
};
//fetch comments for a feed
exports.getCommentsForFeed =  function(req, res, next)
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
    	var thisFeedId = req.body.thisFeedId;
    	var sqlStatement = "SELECT fed_user.msg_user_id, fed_user.msg_user_name, fed_user.user_first_name, fed_user.user_last_name, feed_comments.comment_content, feed_comments.date_commented FROM fed_user INNER JOIN feed_comments ON feed_comments.person_commented_id = fed_user.msg_user_id WHERE feed_id =  ? ORDER BY feed_comments.id DESC";
    	db.query(sqlStatement,[thisFeedId], function(err, resultsCommentsList)
        {
        	if(resultsCommentsList.length)
            {
            	res.send({comments : resultsCommentsList});
            }
            else
            {
            	res.send("empty");
            }
	    });
    }
};
//get friends allowed to be tagged
exports.getFriendsToTag =  function(req, res, next)
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
    	var thisFeedId = req.body.thisFeedId;    	
    	var sql = "SELECT feed_owner FROM feeds_table WHERE id = ?";
    	db.query(sql, [thisFeedId], function(err, ownerId)
        {
        	if(ownerId.length)
            {
            	var theOwnerIdOfFeed = ownerId[0].feed_owner;
            	var sql2 = "SELECT fed_user.msg_user_id, fed_user.user_first_name, fed_user.user_last_name, fed_user.msg_user_name FROM fed_user WHERE fed_user.msg_user_id IN(SELECT DISTINCT rec FROM (SELECT *, CASE WHEN fed_messages.recipient_user_id = '"+theOwnerIdOfFeed+"' THEN fed_messages.sender_user_id WHEN fed_messages.sender_user_id = '"+theOwnerIdOfFeed+"' THEN fed_messages.recipient_user_id END AS rec FROM fed_messages WHERE (fed_messages.sender_user_id = '"+theOwnerIdOfFeed+"' OR fed_messages.recipient_user_id = '"+theOwnerIdOfFeed+"')) as newtable ORDER BY id DESC) AND fed_user.msg_user_id IN(SELECT DISTINCT rec FROM (SELECT *, CASE WHEN fed_messages.recipient_user_id = '"+userId+"' THEN fed_messages.sender_user_id WHEN fed_messages.sender_user_id = '"+userId+"' THEN fed_messages.recipient_user_id END AS rec FROM fed_messages WHERE (fed_messages.sender_user_id = '"+userId+"' OR fed_messages.recipient_user_id = '"+userId+"')) as newtable ORDER BY id DESC)"
            	db.query(sql2, function(err, tagFriendsList)
		        {
		        	if(ownerId.length)
		            {
		            	res.send({tagFriendsList : tagFriendsList});
		            }
		            else
		            {
		            	res.send("empty");
		            }
			    });
            }
            else
            {
            	res.send("empty");
            }
	    });
    }
};
//get notifications
exports.getMyNotifications = function(req, res, next)
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
    	var queryData = "SELECT * FROM feeds_updates INNER JOIN (SELECT fed_user.msg_user_id, fed_user.user_first_name, fed_user.user_last_name, fed_user.msg_user_name FROM fed_user) AS new_users_table ON feeds_updates.by_user_id = new_users_table.msg_user_id INNER JOIN (SELECT feeds_table.story_type, feeds_table.id as f_id FROM feeds_table) as new_table_feeds ON new_table_feeds.f_id = feeds_updates.feed_id LEFT JOIN (SELECT feed_comments_updates.id AS feed_comm_upd_id, feed_comments_updates.update_id AS feed_comm_the_update_id, feed_comments_updates.comment_id as feed_comm_comment_id FROM feed_comments_updates) AS feed_comments_updates_tbl ON feed_comments_updates_tbl.feed_comm_the_update_id = feeds_updates.id WHERE feeds_updates.to_user_id = '"+ userId+"' ORDER BY feeds_updates.id DESC";
    	db.query(queryData, function(err, resultNotificationList)
        {
        	if(resultNotificationList.length > 0)
            {
            	res.send({resultNotificationList : resultNotificationList});
            }
            else
            {
            	res.send("empty");
            }	
	    });
    }
};

exports.updateFeedSeen = function(req, res, next)
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
    	var feedid = req.body.feedId;
    	var sql = "DELETE FROM feeds_notifications WHERE feeds_notifications.feed_id = '"+feedid+"'";
    	db.query(sql, function(err, deleteResults)
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

exports.showViewers = function(req, res, next)
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
    	var feedId = req.body.thisFeedId;
    	var sqlQuery = "SELECT fed_user.msg_user_name, fed_user.msg_user_id, fed_user.user_first_name, fed_user.user_last_name, feeds_views.date_viewed FROM fed_user INNER JOIN feeds_views ON fed_user.msg_user_id = feeds_views.	viewer_id WHERE feeds_views.feed_id = '"+feedId+"'";
   		db.query(sqlQuery, function(err, viewersResults)
        {
        	if(err)
            {
            	res.send("error");
            }
            else if(viewersResults.length)
            {
            	if(viewersResults.length > 0)
            	{
            		res.send({viewersResults : viewersResults});
            	}
            	else
            	{
            		res.send('empty');
            	}
            }	
	    });
    }
}

exports.showFeedsLikes = function(req, res, next)
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
    	var feedId = req.body.thisFeedId;
    	var sqlQuery = "SELECT fed_user.msg_user_name, fed_user.msg_user_id, fed_user.user_first_name, fed_user.user_last_name, feed_likes.date_liked FROM fed_user INNER JOIN feed_likes ON fed_user.msg_user_id = feed_likes.person_liked_id WHERE feed_likes.feed_id = '"+feedId+"'";
   		db.query(sqlQuery, function(err, likersResults)
        {
        	if(err)
            {
            	res.send("error");
            }
            else if(likersResults.length)
            {
            	if(likersResults.length > 0)
            	{
            		res.send({likersResults : likersResults});
            	}
            	else
            	{
            		res.send('empty');
            	}
            }	
	    });
    }
}

/****************************liking post*********************************************/
exports.likeTheFeed = function(req, res, next)
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
    	var theFeedId = req.body.feedIdLiking;
    	var sql = "SELECT feed_likes.id, feed_likes.feed_id, feed_likes.person_liked_id FROM feed_likes WHERE feed_id = '"+theFeedId+"' AND person_liked_id = '"+userId+"'";
    	db.query(sql, function(err, resultsForCheckingIfLiked)
        {
            if(resultsForCheckingIfLiked.length > 0)
	        {
	            //res.send('already_liked');

	            var likeId = resultsForCheckingIfLiked[0].id;
	            var sqlQuery = "DELETE FROM feed_likes WHERE feed_likes.id = '"+likeId+"'";
	            db.query(sqlQuery, function (err, result) 
	            {
				    if(err) 
				    {
				    	res.send('error');
				    }
				    else
				    {
				    	
						//GET OWNER ID
				    	var getFeedOwner = "SELECT feeds_table.feed_owner from feeds_table WHERE id ='"+theFeedId+"'";
				    	db.query(getFeedOwner, function (err, getFeedOwnerResult) 
			            {
			            	if(getFeedOwnerResult.length > 0)
			            	{
			            		var feedsOwnerId = getFeedOwnerResult[0].feed_owner;

			            		//DELETE NOTIFICATION OF LIKE
			            		var deleteLikeUpdate = "DELETE FROM feeds_updates WHERE feed_id = '"+theFeedId+"' AND to_user_id = '"+feedsOwnerId+"'";
			            		db.query(deleteLikeUpdate, function(err, result) 
							    {
								    if(err) 
								    {								
								    	res.send({message: "error"});
								    }
								    else
								    {
								    	res.send({message: "like_deleted", feedsOwnerId : feedsOwnerId});
								    } 
							    })			            		
			            	}
			            	else
			            	{
			            		res.send({message: "error"});
			            	}						    
						});
				    }
				});

	        }
	        else
	        {
	            var sql2 = "INSERT INTO `feed_likes`(`feed_id`, `person_liked_id`, `date_liked`) VALUES('"+theFeedId+"', '"+userId+"', NOW())";
	            db.query(sql2, function(err, resultsLike)
		        {
		            if(err) 
			        { 
			          	res.send('error');
			        }
			        else
			        {
			        	

			        	var getFeedOwner = "SELECT feeds_table.feed_owner from feeds_table WHERE id ='"+theFeedId+"'";
			        	var userToTellAboutLikeUpdate = []; //USER LIST TO SEND TO FRONTEND FOR UPDATING VIA SOCKETS
			        	db.query(getFeedOwner, function (err, getFeedOwnerResult) 
			            {
						    if(getFeedOwnerResult.length) 
						    {
						    	var feedsOwnerId = getFeedOwnerResult[0].feed_owner;

						    	//make update to db for owner to see like by person
						    	var likeUpdateQuery = "INSERT INTO  `feeds_updates`(`update_type`, `by_user_id`, `to_user_id`, `feed_id`, `date_created`) VALUES(2, '"+userId+"', '"+feedsOwnerId+"', '"+theFeedId+"', NOW())";
							    db.query(likeUpdateQuery, function(err, result) 
							    {
								    if(err) 
								    { 
									   db.rollback();
								    }  
								    else
								    {
								    	res.send({message: 'liked', feedsOwnerId : feedsOwnerId});
								    }
							    })						    						
						    }
						    else
						    {
						    	res.send({message: "error"});					  
						    }
						});

			        }		
			    });
	        }
     	});

    }
};

/********************************NEW TAG *****************************************************/
exports.tagFriend = function(req, res, next)
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
    	var notificationType = req.body.notificationType;
    	var friendId = req.body.friendId;
    	var thisFeedId = req.body.thisFeedId; 

    	var checkIfAlreadyTaggedByThisUser = "SELECT feeds_updates.id FROM feeds_updates WHERE feeds_updates.by_user_id = '"+userId+"' AND feeds_updates.feed_id = '"+thisFeedId+"' AND feeds_updates.update_type = 3 AND feeds_updates.to_user_id = '"+friendId+"'";
    	db.query(checkIfAlreadyTaggedByThisUser, function(err, taggedLength)
        {
            if(taggedLength.length > 0) 
	        { 
	          	res.send('already_tagged');
	        }
	        else
	        {
	        	var sqlQuery = "INSERT INTO `feeds_updates`(`update_type`, `by_user_id`, `to_user_id`, `feed_id`, `date_created`) VALUES(3, '"+userId+"', '"+friendId+"', '"+thisFeedId+"', NOW())";
	        	
				db.query(sqlQuery, function(err, doTag)
		        {
		        	
		        	if(err)
		        	{
		        		res.send('error');
		        	}
		        	else
		        	{
		        		res.send('success');
		        	}
		        })
	        }		
	    });


    	
    }
};
/********************insert feed comment***************************************/
exports.insertComment = function(req, res, next)
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
    	var theCommentContent = req.body.theCommentContent;
    	theCommentContent = theCommentContent.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;");
    	var thisFeedId = req.body.thisFeedId;
        var usersToNotify = [];

    	if(theCommentContent == "")
    	{
    		res.send('error');
    		return;
    	}
    	else
    	{
    		/* Begin transaction */
			db.getConnection(function(err, connection) 
			{
		    	connection.beginTransaction(function(err) 
				{
				    if(err) 
				    { 
				  	    connection.rollback(function() 
				        {
				           res.send({message: 'error'});
				           connection.release();
				        });
				    }
				    else
			    	{
						var sql2 = "INSERT INTO `feed_comments`(`feed_id`, `person_commented_id`, `comment_content`, `date_commented`) VALUES(?, ?, ?, NOW() )";
				        connection.query(sql2,[thisFeedId, userId, theCommentContent], function(err, resultsComment)
				        {

				        	
				            if(err) 
				            { 
								connection.rollback(function() 
						        {
						           res.send({message: 'error'});
						           connection.release();
						        });						
					        }
					        else
					        {
								//GET THE COMMENT ID
						        var commentId = resultsComment.insertId;
						        var feedUpdateId;
						        var thisOwnerId;				       
								//GET THE FEED'S OWNER ID AND ALL PEOPLE WHO COMMENTED ON IT TO SEND THEM NOTOFICATION
								var getTheFeedOwner = "SELECT feeds_table.feed_owner FROM feeds_table WHERE feeds_table.id = ?";
					        	connection.query(getTheFeedOwner, [thisFeedId],function(err, resultsfeedOwner)
						        {
								    if(err) 
						            { 
										connection.rollback(function() 
								        {
								           res.send({message: 'error'});
								           connection.release();
								        });						
							        }
							       	else
							       	{
							       		thisOwnerId = resultsfeedOwner[0].feed_owner;
								        //AVOID TELLING OWNER BY HIS COMMENT
								        if(thisOwnerId !== userId)
								        {
									        usersToNotify.push(thisOwnerId);
									        doTheUpdates(thisOwnerId);							       
										}

										//update users about comment
							        	function doTheUpdates(userToTell)
							        	{
							        		var notifyFeedCommenter = "INSERT INTO `feeds_updates`(`update_type`, `by_user_id`, `to_user_id`, `feed_id`, `date_created`) VALUES(1, '"+userId+"', '"+userToTell+"', '"+thisFeedId+"', NOW())";
							        		connection.query(notifyFeedCommenter, function(err, notifyFeedCommenter)
									        {
											    if(err) 
									            { 
													connection.rollback(function() 
													{
											          	throw err;
											        });							
										        }
										        else
										        {
										        	var feedUpdateId = notifyFeedCommenter.insertId;
										        	var theUpdateForCommentToOwner = "INSERT INTO `feed_comments_updates`(`update_id`, `comment_id`) VALUES('"+feedUpdateId+"', '"+commentId+"')";
										    		connection.query(theUpdateForCommentToOwner, function(err, theUpdateForCommentToOwnerResults)
											        {
													    if(err) 
											            { 
															connection.rollback(function() 
															{
													          	throw err;
													        });							
												        }
												    })
												}
											});

							        	}
									   
										//GET ALL WHO COMMENTED HERE HERE
									    var getAllCommentersToThisfeed = "SELECT DISTINCT feed_comments.person_commented_id FROM `feed_comments` WHERE feed_id = '"+thisFeedId+"' AND person_commented_id != '"+thisOwnerId+"'";
					        			connection.query(getAllCommentersToThisfeed, function(err, getAllCommentersToThisfeedResults)
								        {
										    if (err) 
								            { 
												connection.rollback(function() 
												{
										          	throw err;
										        });							
									        }
									        else
									        {

									        	//INSERT UPDATES FOR THEM
									        	for(var i = 0; i < getAllCommentersToThisfeedResults.length; i++)
									        	{
									        		var userToTell = getAllCommentersToThisfeedResults[i].person_commented_id;
									        		if(userToTell !== userId)
									        		{
									        			usersToNotify.push(userToTell);
									        			doTheUpdates(userToTell);	
									        		}		   				

									        	}							        	
									        }
									    })	
									    connection.commit(function(err) 
										{
									        if(err)
									        {
									        	connection.rollback(function() 
										        {
										           res.send({message: 'error'});
										           connection.release();
										        });
									        }
									        else
									        {
									        	res.send({usersToNotify : usersToNotify, commentId : commentId, thisOwnerId : thisOwnerId, commenter_id : userId});
									        	connection.release();
									        }		        
									    });
							       	}
								})
							}
					    });
					}
				});
			}); //end transaction
		}
    }
};

/**********************************get single comment****************************/
exports.getTheSingleFeed = function(req, res, next)
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
    	var feedId = req.body.feedId;
    	var sql = "SELECT checkerForLike.checkIfLiked, views.numberOfViews, comments.numberOfComments, cc.numberOfLikes, fed_user.user_first_name, fed_user.user_last_name, fed_user.msg_user_id, fed_user.msg_user_name, feeds_table.id as thisFeedId, feeds_table.privacy_status, feeds_table.story_type, feeds_table.date_created, feed_post.feed_id, feed_post.feed_postcontent, feeds_media.feed_id, feeds_media.media_name, feed_captions.caption_content FROM fed_user INNER JOIN feeds_table ON fed_user.msg_user_id = feeds_table.feed_owner left JOIN feed_post ON feeds_table.id = feed_post.feed_id left JOIN feeds_media ON feeds_table.id = feeds_media.feed_id left JOIN feed_captions ON feeds_media.id = feed_captions.media_id LEFT JOIN (SELECT COUNT(id) as numberOfLikes, feed_id FROM feed_likes GROUP BY feed_likes.feed_id) as cc ON cc.feed_id = feeds_table.id LEFT JOIN (SELECT COUNT(id) as numberOfComments, feed_id FROM feed_comments GROUP BY feed_comments.feed_id) AS comments ON feeds_table.id = comments.feed_id LEFT JOIN (SELECT COUNT(id) as numberOfViews, feeds_views.feed_id FROM feeds_views GROUP BY feeds_views.feed_id) AS views ON feeds_table.id = views.feed_id LEFT JOIN (SELECT COUNT(id) AS checkIfLiked, feed_likes.feed_id, feed_likes.person_liked_id FROM feed_likes WHERE feed_likes.person_liked_id = '"+userId+"' GROUP BY feed_id) as checkerForLike ON checkerForLike.feed_id = feeds_table.id WHERE feeds_table.id = '"+feedId+"' ORDER BY feeds_table.id DESC";
    	db.query(sql, function(err, feedResults)
    	{
    		if(err)
    		{
    			res.send('error');
    		}
    		else
    		{
    			if(feedResults.length > 0)
    			{
    				var deleteLikeUpdate = "DELETE FROM feeds_updates WHERE feed_id = '"+feedId+"' AND to_user_id = '"+userId+"'";
            		db.query(deleteLikeUpdate, function(err, result) 
				    {
					    if(err) 
					    {								
					    	res.send({message: "error"});
					    }
					    else
					    {
					    	res.send({postsListResults : feedResults});
					    }
					});
    			}
    			else
    			{
    				res.send('post_no_longer_exist');
    			}
    		}
    	});
    }
};

/*********************delete post notification**********************************/
exports.deleteFeedNotification = function(req, res, next)
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
    	var thisUpdateId = req.body.thisUpdateId;
    	var deleteLikeUpdate = "DELETE FROM feeds_updates WHERE id = '"+thisUpdateId+"' AND to_user_id = '"+userId+"'";
		db.query(deleteLikeUpdate, function(err, result) 
	    {
		    if(err) 
		    {								
		    	res.send({message: "error"});
		    }
		    else
		    {
		    	res.send({message: "success"});
		    }
		});

    }
};

/*******************get feed with its comments***********************************/
exports.getSingleWIthComments = function(req, res, next)
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
    	var feedId = req.body.feedUpdateId;
    	var sql = "SELECT checkerForLike.checkIfLiked, views.numberOfViews, comments.numberOfComments, cc.numberOfLikes, fed_user.user_first_name, fed_user.user_last_name, fed_user.msg_user_id, fed_user.msg_user_name, feeds_table.id as thisFeedId, feeds_table.privacy_status, feeds_table.story_type, feeds_table.date_created, feed_post.feed_id, feed_post.feed_postcontent, feeds_media.feed_id, feeds_media.media_name, feed_captions.caption_content FROM fed_user INNER JOIN feeds_table ON fed_user.msg_user_id = feeds_table.feed_owner left JOIN feed_post ON feeds_table.id = feed_post.feed_id left JOIN feeds_media ON feeds_table.id = feeds_media.feed_id left JOIN feed_captions ON feeds_media.id = feed_captions.media_id LEFT JOIN (SELECT COUNT(id) as numberOfLikes, feed_id FROM feed_likes GROUP BY feed_likes.feed_id) as cc ON cc.feed_id = feeds_table.id LEFT JOIN (SELECT COUNT(id) as numberOfComments, feed_id FROM feed_comments GROUP BY feed_comments.feed_id) AS comments ON feeds_table.id = comments.feed_id LEFT JOIN (SELECT COUNT(id) as numberOfViews, feeds_views.feed_id FROM feeds_views GROUP BY feeds_views.feed_id) AS views ON feeds_table.id = views.feed_id LEFT JOIN (SELECT COUNT(id) AS checkIfLiked, feed_likes.feed_id, feed_likes.person_liked_id FROM feed_likes WHERE feed_likes.person_liked_id = '"+userId+"' GROUP BY feed_id) as checkerForLike ON checkerForLike.feed_id = feeds_table.id WHERE feeds_table.id = '"+feedId+"' ORDER BY feeds_table.id DESC";
    	db.query(sql, function(err, feedResults)
    	{
    		if(err)
    		{
    			res.send('error');
    		}
    		else
    		{
    			var sqlStatement = "SELECT fed_user.msg_user_id, fed_user.msg_user_name, fed_user.user_first_name, fed_user.user_last_name, feed_comments.id ,feed_comments.comment_content, feed_comments.date_commented FROM fed_user INNER JOIN feed_comments ON feed_comments.person_commented_id = fed_user.msg_user_id WHERE feed_id =  '"+feedId+"' ORDER BY feed_comments.id DESC";
		    	db.query(sqlStatement, function(err, resultsCommentsList)
		        {
		        	if(resultsCommentsList.length)
		            {

		            	var deleteLikeUpdate = "DELETE FROM feeds_updates WHERE feed_id = '"+feedId+"' AND to_user_id = '"+userId+"'";
	            		db.query(deleteLikeUpdate, function(err, result) 
					    {
						    if(err) 
						    {								
						    	res.send({message: "error"});
						    }
						    else
						    {
						    	res.send({comments : resultsCommentsList, postsListResults : feedResults});
						    }
						});
		            	
		            	
		            }
		            else
		            {
		            	res.send("empty");
		            }
			    });
    		}
    	});
    }
};
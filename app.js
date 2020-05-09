var http = require('http')
var https = require('https')
const fs = require('fs');
var express = require('express')
var app = express();

var path = require('path');
global.bcrypt = require('bcrypt');
global.saltRounds = 10;

//for file upload
var bodyParser = require('body-parser');
app.use(bodyParser.json(
{
    limit: '50mb'
}));
app.use(bodyParser.urlencoded(
{
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
}));

//for time manipulation
var moment = require('moment');
app.locals.moment = require('moment');



var server = https.createServer({
    key: fs.readFileSync("/etc/letsencrypt/live/myplusplus.com/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/myplusplus.com/fullchain.pem"),
    ca: fs.readFileSync("/etc/letsencrypt/live/myplusplus.com/chain.pem")
}, app)


var io = require('socket.io')(server);

var onlineUser = [];
io.on('connection', function(socket)
{
    //SEND THAT THERE'S NEW FEED
    socket.on('newFeedEvent', function(data)
    {
        var userId = data.uid;
        var sql = "SELECT fed_messages.id, fed_messages.sender_user_id, fed_messages.recipient_user_id, fed_messages.msg_text FROM fed_messages WHERE fed_messages.sender_user_id= '" + userId + "' or fed_messages.recipient_user_id = '" + userId + "' ORDER BY fed_messages.id DESC";
        connection.query(sql, function(err, results)
        {
            if (results.length)
            {
                var storeOnlyReciever = [];
                for (var i = 0; i < results.length; i++)
                {
                    if (results[i].recipient_user_id == userId)
                    {
                        results[i].recipient_user_id = results[i].sender_user_id; // make receiver the sender if reciever is equal to loged in user
                    }
                    storeOnlyReciever[i] = results[i].recipient_user_id;
                }
                var maKeUnique = require('array-unique');
                var finalResults = maKeUnique(storeOnlyReciever);
                finalResults.forEach(function(element)
                {
                    //SEND THAT THERE'S NEW FEED
                    io.emit(element,
                    {
                        notificationType: 50
                    });
                });
            }
        });
    });
    socket.on('youAreTaggedNotifier', function(data)
    {
        //socket.emit('youAreTaggedNotifier', {personTagged : friendId, tagger : uid, thisFeedId : thisFeed_id}
        var personTagged = data.personTagged;
        io.emit(personTagged,
        {
            notificationType: 52,
            tagger: data.tagger,
            thisFeedId: data.thisFeedId
        });
    });
    //TELL OWNER OF FEED AND OTHER USERS THAT FEED IS LIKED
    socket.on('updateFeedLiked', function(data)
    {
        var userLiked = data.userLiked
        var thisId = data.thisId;
        var ownerId = data.ownerId
        //check if owner is not person who liked this post
        if (userLiked != ownerId)
        {
            //update owner
            io.emit(ownerId,
            {
                notificationType: 53,
                thisId: data.thisId
            });
        }
        //get all owners friend
        var getAllFriendsIdsToUpdate = "SELECT fed_user.msg_user_id FROM fed_user WHERE fed_user.msg_user_id  != '" + userLiked + "' AND fed_user.msg_user_id IN(SELECT DISTINCT rec FROM (SELECT *, CASE WHEN fed_messages.recipient_user_id = '" + ownerId + "' THEN fed_messages.sender_user_id WHEN fed_messages.sender_user_id = '" + ownerId + "' THEN fed_messages.recipient_user_id END AS rec FROM fed_messages WHERE (fed_messages.sender_user_id = '" + ownerId + "' OR fed_messages.recipient_user_id = '" + ownerId + "')) as newtable ORDER BY id DESC)";
        connection.query(getAllFriendsIdsToUpdate, function(err, getAllFriendsIdsToUpdateResults)
        {
            if (getAllFriendsIdsToUpdateResults.length)
            {
                //update them that
                getAllFriendsIdsToUpdateResults.forEach(function(element)
                {
                    io.emit(element.msg_user_id,
                    {
                        notificationType: 57,
                        thisId: data.thisId
                    });
                });
            }
        });
    }); //unlike uppdate
    socket.on('updateFeedUnliked', function(data)
    {
        var userLiked = data.userLiked
        var thisId = data.thisId;
        var ownerId = data.ownerId
        //check if owner is not person who liked this post
        if (userLiked != ownerId)
        {
            //update owner
            io.emit(ownerId,
            {
                notificationType: 56,
                thisId: data.thisId
            });
        }
        //get all owners friend
        var getAllFriendsIdsToUpdate = "SELECT fed_user.msg_user_id FROM fed_user WHERE fed_user.msg_user_id  != '" + userLiked + "' AND fed_user.msg_user_id IN(SELECT DISTINCT rec FROM (SELECT *, CASE WHEN fed_messages.recipient_user_id = '" + ownerId + "' THEN fed_messages.sender_user_id WHEN fed_messages.sender_user_id = '" + ownerId + "' THEN fed_messages.recipient_user_id END AS rec FROM fed_messages WHERE (fed_messages.sender_user_id = '" + ownerId + "' OR fed_messages.recipient_user_id = '" + ownerId + "')) as newtable ORDER BY id DESC)";
        connection.query(getAllFriendsIdsToUpdate, function(err, getAllFriendsIdsToUpdateResults)
        {
            if (getAllFriendsIdsToUpdateResults.length)
            {
                //update them that
                getAllFriendsIdsToUpdateResults.forEach(function(element)
                {
                    io.emit(element.msg_user_id,
                    {
                        notificationType: 58,
                        thisId: data.thisId
                    });
                });
            }
        });
    });
    //TELL  COMMENTERS OF NEW COMMENT except owner
    socket.on('tellOtherCommentersOnFeed', function(data)
    {
        var usersToNotifyIds = data.usersToNotifyIds;
        var commentId = data.commentId;
        var thisFeedId = data.thisFeedId;
        var commenter = data.commenter;
        //send to all users
        usersToNotifyIds.forEach(function(element)
        {
            io.emit(element,
            {
                notificationType: 55,
                commentId: commentId,
                thisFeedId: thisFeedId,
                commenter: commenter
            });
        });
    })
    socket.on('someoneCommentedOnYourfeed', function(data)
    {
        //inform owner that someone commented on their post
        io.emit(data.thisOwnerId,
        {
            notificationType: 54,
            commenter_id: data.commenter_id,
            commentId: data.commentId,
            thisFeedId: data.thisFeedId
        });
    });
    socket.on('thisUserIsAway', function(data)
    {
        var userId = data.userId;
        // var sqlNew = "SELECT DISTINCT rec FROM (SELECT *, CASE WHEN fed_messages.recipient_user_id = 36 THEN fed_messages.sender_user_id WHEN fed_messages.sender_user_id = 36 THEN fed_messages.recipient_user_id END AS rec FROM fed_messages WHERE (fed_messages.sender_user_id = 36 OR fed_messages.recipient_user_id = 36)) as newtable ORDER BY id DESC";
        var sql = "SELECT fed_messages.id, fed_messages.sender_user_id, fed_messages.recipient_user_id, fed_messages.msg_text FROM fed_messages WHERE fed_messages.sender_user_id= '" + userId + "' or fed_messages.recipient_user_id = '" + userId + "' ORDER BY fed_messages.id DESC";
        connection.query(sql, function(err, results)
        {
            if (results.length)
            {
                var storeOnlyReciever = [];
                for (var i = 0; i < results.length; i++)
                {
                    if (results[i].recipient_user_id == userId)
                    {
                        results[i].recipient_user_id = results[i].sender_user_id; // make receiver the sender if reciever is equal to loged in user
                    }
                    storeOnlyReciever[i] = results[i].recipient_user_id;
                }
                var maKeUnique = require('array-unique');
                var finalResults = maKeUnique(storeOnlyReciever);
                finalResults.forEach(function(element)
                {
                    //SEND STATUS away
                    io.emit(element,
                    {
                        notificationType: 11,
                        statusIdUserId: userId
                    });
                });
            }
        });
    });
    socket.on('statusOnlineReset', function(data)
    {
        //CHECK USERS WHO ARE CHATTING WITH THIS USER
        var userId = data.userToUpdateItsActivity;
        //ADD TO LIST OF ONLINE USERS
        onlineUser.push(userId);
        //    console.log(onlineUser);
        var sql = "SELECT fed_messages.id, fed_messages.sender_user_id, fed_messages.recipient_user_id, fed_messages.msg_text FROM fed_messages WHERE fed_messages.sender_user_id= '" + userId + "' or fed_messages.recipient_user_id = '" + userId + "' ORDER BY fed_messages.id DESC";
        connection.query(sql, function(err, results)
        {
            if (results.length)
            {
                var storeOnlyReciever = [];
                for (var i = 0; i < results.length; i++)
                {
                    if (results[i].recipient_user_id == userId)
                    {
                        results[i].recipient_user_id = results[i].sender_user_id; // make receiver the sender if reciever is equal to loged in user
                    }
                    storeOnlyReciever[i] = results[i].recipient_user_id;
                }
                var maKeUnique = require('array-unique');
                var finalResults = maKeUnique(storeOnlyReciever);
                //tell others I am online
                finalResults.forEach(function(element)
                {
                    //SEND STATUS
                    io.emit(element,
                    {
                        notificationType: 9,
                        statusIdUserId: userId
                    });
                });
            }
        })
    })
    socket.on('statusOnline', function(data)
    {
        //CHECK USERS WHO ARE CHATTING WITH THIS USER
        var userId = data.userToUpdateItsActivity;
        //ADD TO LIST OF ONLINE USERS
        onlineUser.push(userId);
        //    console.log(onlineUser);
        var sql = "SELECT fed_messages.id, fed_messages.sender_user_id, fed_messages.recipient_user_id, fed_messages.msg_text FROM fed_messages WHERE fed_messages.sender_user_id= '" + userId + "' or fed_messages.recipient_user_id = '" + userId + "' ORDER BY fed_messages.id DESC";
        connection.query(sql, function(err, results)
        {
            if (results.length)
            {
                var storeOnlyReciever = [];
                for (var i = 0; i < results.length; i++)
                {
                    if (results[i].recipient_user_id == userId)
                    {
                        results[i].recipient_user_id = results[i].sender_user_id; // make receiver the sender if reciever is equal to loged in user
                    }
                    storeOnlyReciever[i] = results[i].recipient_user_id;
                }
                var maKeUnique = require('array-unique');
                var finalResults = maKeUnique(storeOnlyReciever);
                //tell others I am online
                finalResults.forEach(function(element)
                {
                    //SEND STATUS
                    io.emit(element,
                    {
                        notificationType: 9,
                        statusIdUserId: userId
                    });
                });
                //send online friends
                finalResults.forEach(function(element)
                {
                    var index = onlineUser.join(',').indexOf(element);
                    if (index > -1)
                    {
                        io.emit(userId,
                        {
                            notificationType: 14,
                            markOnlineFriends: element
                        });
                    }
                });
            }
        });
    });
    socket.on('thisUserLeft', function(data)
    {
        var userId = data.id;   
        function removeUserForOnlineUsers(array, item) 
        {
            var i = array.length;
            while (i--) 
            {
                if (array[i] === item) 
                {
                    array.splice(array.indexOf(item), 1);
                }
            }
        }
        removeUserForOnlineUsers(onlineUser, userId);

        var sql = "SELECT fed_messages.id, fed_messages.sender_user_id, fed_messages.recipient_user_id, fed_messages.msg_text FROM fed_messages WHERE fed_messages.sender_user_id= '" + userId + "' or fed_messages.recipient_user_id = '" + userId + "' ORDER BY fed_messages.id DESC";
        connection.query(sql, function(err, results)
        {
            if (results.length)
            {
                var storeOnlyReciever = [];
                for (var i = 0; i < results.length; i++)
                {
                    if (results[i].recipient_user_id == userId)
                    {
                        results[i].recipient_user_id = results[i].sender_user_id; // make receiver the sender if reciever is equal to loged in user
                    }
                    storeOnlyReciever[i] = results[i].recipient_user_id;
                }
                var maKeUnique = require('array-unique');
                var finalResults = maKeUnique(storeOnlyReciever);
                finalResults.forEach(function(element)
                {
                    //SEND STATUS
                    io.emit(element,
                    {
                        notificationType: 10,
                        statusIdUserId: userId
                    });
                });
            }
        });
    });
    socket.on('secretModeAcceptedResponse', function(data)
    {
        io.emit(data.personToRequestedSecreetWithMe,
        {
            notificationType: 32,
            this_user: data.me
        });
    });
    socket.on('secretModeRejectedResponse', function(data)
    {
        io.emit(data.personToRequestedSecreetWithMe,
        {
            notificationType: 31,
            this_user: data.me
        });
    });
    //REQUEST TO GO ONLINE 
    socket.on('requestUserToGoToIncognito', function(data)
    {
        io.emit(data.user_recipient_id,
        {
            notificationType: 30,
            user_sender_id: data.user_sender_id
        });
    });
    socket.on('sendPrivateMessage', function(data)
    {
        io.emit(data.receiverId,
        {
            notificationType: 1,
            senderId: data.sender_id,
            message_content: data.inputMessageContent
        });
    });
    socket.on('sendNewPrivateMessage', function(data)
    {
        io.emit(data.receiverId,
        {
            notificationType: 6,
            message_content: data.inputMessageContent,
            sender_id: data.sender_id
        });
    });
    //UPDATE MESSAGE TO DELETED
    socket.on('updateMessageToFeleted', function(data)
    {
        var userToUpdateId = data.toUserid;
        io.emit(userToUpdateId,
        {
            notificationType: 400,
            thisMessageId: data.thisMessageId,
            theLastMessageId: data.theLastMessageId,
            messageText: data.messageText,
            byUserId: data.byUserId
        });
    });
    socket.on('checkingUpEvent', function(data)
    {
        io.emit(data.userIdToBeNotified,
        {
            notificationType: 2,
            userCheckinUp: data.userCheckinUp
        });
    });
    socket.on('isTypingText', function(data)
    {
        io.emit(data.userIdToBeNotified,
        {
            notificationType: 3,
            userTypingId: data.userTypingId,
            wordCount: data.wordCount
        });
    });
    socket.on('erasingTheMessage', function(data)
    {
        io.emit(data.userChatingWith,
        {
            notificationType: 7,
            userErasingId: data.userErasingId,
            wordCount: data.wordCount
        });
    });
    socket.on('stopedTyping', function(data)
    {
        io.emit(data.userIdToBeNotified,
        {
            notificationType: 4,
            userTypingId: data.userTypingId
        });
    });
    socket.on('stopCheckin', function(data)
    {
        io.emit(data.stopCheckingUpOnUserId,
        {
            notificationType: 5,
            userStopChecking: data.userStopCheckinUp
        });
    });
    socket.on('updateProfilePicture', function(data)
    {
        getFriendsIds(data.profilePictureSetter, data.base64Data);
    });
    //for get friends to notify
    function getFriendsIds(userId, base64Data)
    {
        var finalResults = [];
        var sql = "SELECT fed_messages.id, fed_messages.sender_user_id, fed_messages.recipient_user_id, fed_messages.msg_text FROM fed_messages WHERE fed_messages.sender_user_id= '" + userId + "' or fed_messages.recipient_user_id = '" + userId + "' ORDER BY fed_messages.id DESC";
        connection.query(sql, function(err, results)
        {
            if (results.length)
            {
                var storeOnlyReciever = [];
                for (var i = 0; i < results.length; i++)
                {
                    if (results[i].recipient_user_id == userId)
                    {
                        results[i].recipient_user_id = results[i].sender_user_id; // make receiver the sender if reciever is equal to loged in user
                    }
                    storeOnlyReciever[i] = results[i].recipient_user_id;
                }
                var maKeUnique = require('array-unique');
                var finalResults = maKeUnique(storeOnlyReciever);
                finalResults.forEach(function(element)
                {
                    io.emit(element,
                    {
                        notificationType: 8,
                        userIdUpdatingProfilePicture: userId,
                        base64Data: base64Data
                    });
                });
            }
        });
    };
    // convenience function to log server messages on the client
    function log()
    {
        var array = ['Message from server:'];
        array.push.apply(array, arguments);
        socket.emit('log', array);
    }
    socket.on('message', function(message)
    {
        log('Client said: ', message);
        // for a real app, would be room-only (not broadcast)
        socket.broadcast.emit('message', message);
    });
    socket.on('create or join', function(room)
    {
        log('Received request to create or join room ' + room);
        var clientsInRoom = io.sockets.adapter.rooms[room];
        var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
        log('Room ' + room + ' now has ' + numClients + ' client(s)');
        if (numClients === 0)
        {
            socket.join(room);
            log('Client ID ' + socket.id + ' created room ' + room);
            socket.emit('created', room, socket.id);
        }
        else if (numClients === 1)
        {
            log('Client ID ' + socket.id + ' joined room ' + room);
            io.sockets.in(room).emit('join', room);
            socket.join(room);
            socket.emit('joined', room, socket.id);
            io.sockets.in(room).emit('ready');
        }
        else
        { // max two clients
            socket.emit('full', room);
        }
    });
    socket.on('ipaddr', function()
    {
        var ifaces = os.networkInterfaces();
        for (var dev in ifaces)
        {
            ifaces[dev].forEach(function(details)
            {
                if (details.family === 'IPv4' && details.address !== '127.0.0.1')
                {
                    socket.emit('ipaddr', details.address);
                }
            });
        }
    });
    socket.on('bye', function()
    {
        console.log('received bye');
    });
    socket.on('sendCallRequestSockets', function(data)
    {
        //console.log(data.callReciepient);
        io.emit(data.callReciepient,
        {
            notificationType: 12,
            caller: data.caller,
            room: data.room,
            callReciepient: data.callReciepient
        });
    });
    socket.on('callRejected', function(data)
    {
        io.emit(data.caller,
        {
            notificationType: 13,
            personRejectedCall: data.personRejectedCall
        });
    });
});

var routes = require('./routes');
var user = require('./routes/user');
var messaging = require('./routes/messaging');
var feeds = require('./routes/feeds');
var session = require('cookie-session');
var mysql = require('mysql');
var bodyParser = require("body-parser");

// start mysql pool connection creation
const connection = mysql.createPool( 
{
    user: 'root',
    password: 'Uminathi@2019Afro',   
    database: 'new_db_my_pp',
    charset: 'utf8mb4',
    connectionLimit: 100
});
global.db = connection;

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded(
{
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(
{
    secret: 'keyboard cat_secret_code',
    resave: false,
    saveUninitialized: true
}))

app.get('/', routes.index); //call for main index page
// user routes
app.post('/user/login', user.login);
app.post('/user/logout', user.logout);
app.get('/signup', user.signup_user)
app.post('/user/proccesRegistration', user.signup);
app.post('/user/searchUser', user.searchUser);
app.post('/user/getUserByTheId', user.getUserByTheId);
app.post('/user/getUserByTheId', user.getUserByTheId);
app.post('/user/updateProfilePicture', user.updateProfilePicture);
app.get('/user/recover_account', user.recover_password);
app.post('/user/send_recovery_email', user.send_otp_to_email);
app.get('/user/create_new_password', user.create_new_password);
app.post('/user/save_new_password', user.save_new_password);
app.get('/user/confirm_email', user.confirm_your_email);
app.post('/user/showFriendsProfile', user.showProfileOfFriend);
app.get('/user/*', user.other);


//messages routes
app.post('/messaging/our_chat', messaging.get_chat_by_id);
app.post('/messaging/searchUserOnCat', messaging.searchUserOnChat);
app.get('/messaging/home', messaging.dashboard);
app.post('/messaging/insert_message', messaging.insert_the_message);
app.post('/messaging/getChatByUserId', messaging.fetchMessages);
app.delete('/messaging/deleteChatWith', messaging.deleteChatWith);
app.post('/messaging/deleteMessage', messaging.deleteThisMessage);
app.post('/messaging/getTheUsersToForwardMessageTo', messaging.getTheUsersToForwardThisMessageTo);


//feeds routes
app.post('/feeds/sendPostFeed', feeds.insertFeedPost);
app.post('/feeds/insertFeedImage', feeds.insertFeedImage);
app.post('/feeds/getThePosts', feeds.getPosts);
app.post('/feeds/insertFeedVideo', feeds.insertFeedVideo);
app.post('/feeds/likeFeed', feeds.likeTheFeed);
app.post('/feeds/sendFeedComment', feeds.insertComment);
app.post('/feeds/getFeedComments', feeds.getCommentsForFeed);
app.post('/feeds/getFriendsToTag', feeds.getFriendsToTag);
app.post('/feeds/tagFriend', feeds.tagFriend);
app.post('/feeds/getMyNotifications', feeds.getMyNotifications);
app.post('/feeds/updateFeedSeen', feeds.updateFeedSeen);
app.post('/feeds/viewFeed', feeds.viewFeed);
app.post('/feeds/showFeedsLikes', feeds.showFeedsLikes);
app.post('/feeds/showViewers', feeds.showViewers);
app.post('/feeds/showNewFeeds', feeds.showNewFeeds);
app.post('/feeds/getTheSingleFeed', feeds.getTheSingleFeed);
app.post('/feeds/getSingleWIthComments', feeds.getSingleWIthComments);
app.post('/feeds/deleteFeedNotification', feeds.deleteFeedNotification);


http.createServer(function(req, res) {
    res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url});
    res.end();
}).listen(80);

server.listen(443, function()
{
    console.log("Server started!");
});
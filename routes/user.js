var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport(
{
    host: '197.242.146.191',
    port: 465,
    auth:
    {
        user: 'confirm-email@myplusplus.com',
        pass: 'default123Afro'
    },
    tls:
    {
        rejectUnauthorized: false
    }
});
// page 404
exports.other = function(req, res, next)
{
    res.render('page_404.ejs');
}
exports.showProfileOfFriend = function(req, res, next)
{
    var user = req.session.user,
        userId = req.session.userId;
    var message = '';
    if (userId == null)
    {
        //direct to home page
        res.render('index',
        {
            message: message
        });
        return;
    }
    else
    {
        console.log(req.body.user_id);
    }
}
//for sigbnup
exports.signup_user = function(req, res)
{
    var message = '';
    res.render('index.ejs',
    {
        message: message
    });
};

exports.tcs_and_cs = function(req, res)
{
    res.render('head_with_nav.ejs');
};
//with transactions
exports.save_new_password = function(req, res)
{
    if (req.method == "POST")
    {
        var email = req.body.email;
        var new_password = req.body.new_password;

        db.getConnection(function(err, connection)
        {
            connection.beginTransaction(function(err)
            {
                if (err)
                {
                    connection.rollback(function()
                    {
                        res.send('error');
                        connection.release();
                    });
                }
                else
                {
                    var delete_link = "DELETE FROM `user_account_confirmations` WHERE user_email = ?";
                    connection.query(delete_link, [email], function(err, results)
                    {
                        if (!err)
                        {
                            bcrypt.hash(new_password, saltRounds, function(err, hash)
                            {
                                var update_pass = "UPDATE fed_user SET user_password = ? WHERE user_email = ?";
                                db.query(update_pass, [hash, email], function(err, theResults)
                                {
                                    if (!err)
                                    {
                                        connection.commit(function(err)
                                        {
                                            if (err)
                                            {
                                                connection.rollback(function()
                                                {
                                                    res.send('error');
                                                });
                                            }
                                            else
                                            {
                                                res.send("success");
                                            }
                                            connection.release();
                                        })
                                    }
                                    else
                                    {
                                        connection.rollback(function()
                                        {
                                            res.send('error');
                                            connection.release();
                                        });
                                    }
                                });
                            });
                        }
                        else
                        {
                            connection.rollback(function()
                            {
                                res.send('error');
                                connection.release();
                            });
                        }
                    });
                }
            });
        });
    }
    else
    {
        res.render('page_404.ejs');
    }
};
exports.create_new_password = function(req, res)
{
    if (req.method == "GET")
    {
        var secret_string_pin = req.query.spasnew;
        var the_cmd = "SELECT * FROM `user_account_confirmations` WHERE one_time_pin = ?";
        db.query(the_cmd, [secret_string_pin], function(err, results)
        {
            if (!err)
            {
                if (results.length > 0)
                {
                    var delete_link = "DELETE FROM `user_account_confirmations` WHERE user_email = ?";
                    db.query(delete_link, [results[0].user_email], function(err, results2)
                    {
                        if (!err)
                        {
                            var email = results[0].user_email;
                            res.render('recover_password_newp.ejs',
                            {
                                e_m: email,
                                authorised: "yes",
                                verified: "yes",
                                email: email
                            });
                        }
                        else
                        {
                            res.render('page_not_authorise.ejs');
                        }
                    })
                }
                else
                {
                    res.render('page_not_authorise.ejs');
                }
            }
            else
            {
                res.render('page_not_authorise.ejs');
            }
        });
    }
    else
    {
        res.send('error');
    }
};
exports.send_otp_to_email = function(req, res)
{
    if (req.method == "POST")
    {
        var email = req.body.email;

        var sql = "SELECT user_email FROM fed_user WHERE user_email = ?";
        db.query(sql, [email], function(err, results)
        {
            if (!err)
            {

                if (results.length > 0)
                {
                    var random_six_digits = Math.floor(100000 + Math.random() * 900000);

                    var the_cmd = "SELECT * FROM `user_account_confirmations` WHERE user_email = ?";
                    var the_cmd2 = "SELECT * FROM `fed_user` WHERE user_email = ?";
                    db.query(the_cmd2, [email], function(err, results)
                    {
                        if (!err)
                        {
                            var firstname = results[0].user_first_name;
                            var lastname = results[0].user_last_name;

                            db.query(the_cmd, [email], function(err2, results2)
                            {
                                if (!err2)
                                {
                                    if (results2.length > 0)
                                    {
                                        var sql = "UPDATE `user_account_confirmations` SET `one_time_pin` = '" + random_six_digits + "' WHERE `user_email` =  '" + email + "'"
                                        db.getConnection(function(err, connection)
                                        {
                                            connection.beginTransaction(function(err)
                                            {
                                                if (err)
                                                {
                                                    console.log(err)
                                                    connection.rollback(function()
                                                    {
                                                        res.send(
                                                        {
                                                            message: 'error'
                                                        });
                                                        connection.release();
                                                    });
                                                }
                                                else
                                                {
                                                    connection.query(sql, function(err, result)
                                                    {
                                                        var mailOptions = {
                                                            from: 'confirm-email@myplusplus.com',
                                                            to: email,
                                                            subject: 'Password Reset | mY++ Inc.',
                                                            html: '<div style=\'color: black; box-shadow:0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12); padding: 2%; margin: 3%; font-size: 105%;background-color: #f8f8f8 ;\'> <p> <b> <span style=\'font-weight: 700;  color: #3388bb;\'>Hello ' + firstname + ' ' + lastname + ' <\/span> <\/b> </p> <p>We have received your request to change your password<\/p> <p>To change your <b> <i>mY++ Account<\/i> <\/b> password click on button bellow. <\/p> <a style=\"background-color: #3388bb; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; border-radius: 12px; font-weight: bold; cursor: pointer; -webkit-transition-duration: 0.4s; transition-duration: 0.4s;\" href="http://myplusplus.dedicated.co.za/user/create_new_password?spasnew=' + random_six_digits + '"  onMouseOver=\"this.style[\'boxShadow\']=\'0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)\'\" onMouseOut=\"this.style[\'boxShadow\']=\'none\'\">Reset Password<\/a> <p style=\'font-weight: bold;\'>Thank you for using <span style=\'font-size: 20px;\'>mY <i style=\'color: #fc8a9e;\'>++ <\/i> <\/span> <\/p> <p style=\'font-family: Courier New;\'>mY++ Incorporation <br>Nelson Mandela Drive <br> Walter Sisulu University <br> Mthatha, 5099 <\/p> <\/div>'

                                                        };

                                                        transporter.sendMail(mailOptions, function(error, info)
                                                        {
                                                            if (error)
                                                            {
                                                                connection.rollback(function()
                                                                {
                                                                    res.send('error');
                                                                    connection.release();
                                                                });
                                                            }
                                                            else
                                                            {
                                                                connection.commit(function(err)
                                                                {
                                                                    if (err)
                                                                    {
                                                                        console.log(err)
                                                                        connection.rollback(function()
                                                                        {
                                                                            res.send('error');
                                                                            connection.release()
                                                                        });
                                                                    }
                                                                    else
                                                                    {
                                                                        res.send('sent');
                                                                        connection.release()
                                                                    }
                                                                })
                                                            }
                                                        });
                                                    });
                                                }
                                            });
                                        });
                                    }
                                    else
                                    {
                                        var sql_otp = "INSERT INTO `user_account_confirmations`(`user_email`,`date_time`, `one_time_pin`) VALUES('" + email + "', NOW(), '" + random_six_digits + "')";
                                        db.query(sql_otp, function(err, sendOTPResults)
                                        {
                                            var mailOptions = {
                                                from: 'confirm-email@myplusplus.com',
                                                to: email,
                                                subject: 'Password Reset | mY++ Inc.',
                                                html: '<div style=\'color: black; box-shadow:0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12); padding: 2%; margin: 3%; font-size: 105%;background-color: #f8f8f8 ;\'> <p> <b> <span style=\'font-weight: 700;  color: #3388bb;\'>Hello ' + firstname + ' ' + lastname + ' <\/span> <\/b> </p> <p>We have received your request to change your password<\/p> <p>To change your <b> <i>mY++ Account<\/i> <\/b> password click on button bellow. <\/p> <a style=\"background-color: #3388bb; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; border-radius: 12px; font-weight: bold; cursor: pointer; -webkit-transition-duration: 0.4s; transition-duration: 0.4s;\" href="http://myplusplus.dedicated.co.za/user/create_new_password?spasnew=' + random_six_digits + '"  onMouseOver=\"this.style[\'boxShadow\']=\'0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)\'\" onMouseOut=\"this.style[\'boxShadow\']=\'none\'\">Reset Password<\/a> <p style=\'font-weight: bold;\'>Thank you for using <span style=\'font-size: 20px;\'>mY <i style=\'color: #fc8a9e;\'>++ <\/i> <\/span> <\/p> <p style=\'font-family: Courier New;\'>mY++ Incorporation <br>Nelson Mandela Drive <br> Walter Sisulu University <br> Mthatha, 5099 <\/p> <\/div>'

                                            };

                                            transporter.sendMail(mailOptions, function(error, info)
                                            {
                                                if (error)
                                                {
                                                    res.send('error');
                                                }
                                                else
                                                {
                                                    res.send('sent');
                                                }
                                            });
                                        })
                                    }
                                }
                                else
                                {
                                    res.send('error');
                                }
                            });
                        }
                        else
                        {
                            res.send('error');
                        }
                    })
                }
                else
                {
                    res.send('email_not_exist');
                }
            }
            else
            {
                res.send('error');
            }
        });
    }
    else
    {
        res.send("Not allowed, to reach this page.")
    }
};
//confirm email with transaction
exports.confirm_your_email = function(req, res)
{
    if (req.method == "GET")
    {
        var secret_string_pin = req.query.email_validity;
        var the_cmd = "SELECT * FROM `user_account_confirmations` WHERE one_time_pin = ?";
        db.query(the_cmd, [secret_string_pin], function(err, results)
        {
            if (err)
            {
                console.log("error: " + err)
            }
            else
            {
                if (results.length > 0)
                {
                    var user_email = results[0].user_email;
                    var delete_link = "DELETE FROM `user_account_confirmations` WHERE one_time_pin = ?";
                    db.getConnection(function(err, connection)
                    {
                        connection.beginTransaction(function(err)
                        {
                            if (err)
                            {
                                connection.rollback(function()
                                {
                                    res.send(
                                    {
                                        message: 'error'
                                    });
                                    connection.release();
                                });
                            }
                            else
                            {
                                connection.query(delete_link, [secret_string_pin], function(err, results)
                                {
                                    //update confirmed
                                    if (err)
                                    {
                                        connection.rollback(function()
                                        {
                                            var message = '';
                                            res.render('index',
                                            {
                                                message: message
                                            });
                                            connection.release();
                                        });
                                    }
                                    else
                                    {
                                        var confirmed_sql = "UPDATE `fed_user` SET email_confirmed = ?  WHERE user_email = ?";
                                        connection.query(confirmed_sql, ['yes', user_email], function(err, results)
                                        {
                                            if (!err)
                                            {
                                                connection.commit(function(err)
                                                {
                                                    console.log(err)
                                                    if (err)
                                                    {
                                                        connection.rollback(function()
                                                        {
                                                            res.send(
                                                            {
                                                                data: 'error'
                                                            });
                                                            connection.release();
                                                        });
                                                    }
                                                    else
                                                    {
                                                        var message = '';
                                                        res.render('index',
                                                        {
                                                            message: message
                                                        });
                                                        connection.release();
                                                    }
                                                })
                                            }
                                            else
                                            {
                                                connection.rollback(function()
                                                {
                                                    var message = '';
                                                    res.render('index',
                                                    {
                                                        message: message
                                                    });
                                                    connection.release();
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    });
                }
                else
                {
                    var message = '';
                    res.render('index',
                    {
                        message: message
                    });
                    return;
                }
            }
        });
    }
    else
    {
        res.render('page_404.ejs');
    }
};
//---------------------------------------------Transaction signup page call  with sql injection catered for and validation------------------------------------------------------
exports.signup = function(req, res)
{
    if (req.method == "POST")
    {
        var errorMessage = []; // to contain errors
        var post = req.body; //for variables sent via http
        var pass = post.password;
        var fname = post.firstname;
        var lname = post.lastname;
        var email = post.email;
        var username = post.username;
        var gender = post.gender;

        function sanitizeString(text, textName)
        {
            if (text.indexOf("<") > -1 || text.indexOf(">") > -1 || text.indexOf("'") > -1 || text.indexOf('"') > -1)
            {
                errorMessage.push(textName + " carries unwanted characters");
            }
        }
        // function isPhonumber(inputText) {
        //     var phoneNumber = /^\d{10}$/;
        //     if (!inputText.match(phoneNumber) || inputText.charAt(0) != 0 || inputText.charAt(1) == 0) {
        //         errorMessage.push("Cell-phone number is of invalid input");
        //     }
        // }
        function ValidateEmail(inputText)
        {
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!inputText.match(mailformat))
            {
                errorMessage.push("You have entered an invalid email address!");
            }
        }

        function validateLowerLetters(text)
        {
            var lowerCaseLetters = /[a-z]/g;
            if (!text.match(lowerCaseLetters))
            {
                errorMessage.push("Password must contain atleast one lowercase letter");
            }
        }

        function validateUpperLetters(text)
        {
            var upperCaseLetters = /[A-Z]/g;
            if (!text.match(upperCaseLetters))
            {
                errorMessage.push("Password must contain atleast one upper-case letter");
            }
        }

        function checkIfMoreThanOneLetter(text, textName)
        {
            if (text.length < 2)
            {
                errorMessage.push(textName + " cannot be lesser than 2");
            }
        }

        function checkPasswordIsAtleastEigthCharacter(text)
        {
            if (text.length < 8)
            {
                errorMessage.push("Password must be atleast 8 characters, with only valid symbols");
            }
        }
        sanitizeString(fname, 'Firstname');
        sanitizeString(lname, 'Lastname');
        sanitizeString(username, 'Username');
        sanitizeString(pass, 'Password');
        // isPhonumber(mob);
        ValidateEmail(email);
        checkIfMoreThanOneLetter(fname, "Firstname");
        checkIfMoreThanOneLetter(lname, "Lastname");
        checkIfMoreThanOneLetter(username, "Username");
        if (errorMessage.length)
        {
            res.send(
            {
                data: errorMessage
            });
        }
        else
        {
            var sqlCommand1 = "SELECT user_email FROM fed_user WHERE LOWER(user_email) LIKE ?";
            db.query(sqlCommand1, [email.toLowerCase()], function(err, checkEmailResults)
            {
                if(err)
                {
                    console.log("Error: ", err)
                }
                else
                {
                    if (checkEmailResults && checkEmailResults.length)
                    {
                        errorMessage.push("Email not avaliable.");
                    }
                    var sqlCommand3 = "SELECT msg_user_name FROM fed_user WHERE LOWER(msg_user_name) LIKE ?";
                    db.query(sqlCommand3, [username.toLowerCase()], function(err, checkUsernameResults)
                    {
                        if (checkUsernameResults.length)
                        {
                            errorMessage.push("Username is already taken.");
                        }
                        else
                        {
                            if (errorMessage.length)
                            {
                                res.send(
                                {
                                    data: errorMessage
                                });
                            }
                            else
                            {
                                var pp = "default";
                                bcrypt.hash(pass, saltRounds, function(err, hash)
                                {
                                    db.getConnection(function(err, connection)
                                    {
                                        connection.beginTransaction(function(err)
                                        {

                                            if (err)
                                            {
                                                console.log("Error on begining transaction: ", err)
                                                connection.rollback(function()
                                                {
                                                    res.send(
                                                    {
                                                        data: 'error'
                                                    });
                                                    connection.release();
                                                });
                                            }
                                            else
                                            {
                                                var sql = "INSERT INTO `fed_user`(`user_first_name`,`user_last_name`,`msg_user_name`,`user_email`,`user_gender`,`user_password`, `user_profilepicture`, `msg_user_status`,`user_date_created`, `user_date_modified`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";
                                                connection.query(sql, [fname, lname, username, email, gender, hash, pp, 'Avaliable in mY++'], function(err, result)
                                                {
                                                    if (err)
                                                    {
                                                        console.log("Error inserting user details to few_user: ",err)
                                                        connection.rollback(function()
                                                        {
                                                            res.send(
                                                            {
                                                                data: 'error'
                                                            });
                                                            connection.release();
                                                        });
                                                    }
                                                    else
                                                    {
                                                        var random_six_digits = Math.floor(100000 + Math.random() * 900000);
                                                        var sql_otp = "INSERT INTO `user_account_confirmations`(`user_email`,`date_time`, `one_time_pin`) VALUES(?, NOW(), ?)";
                                                        connection.query(sql_otp, [email, random_six_digits], function(err1, results1)
                                                        {
                                                            if (err1)
                                                            {
                                                                console.log("Error inserting into User Accounts confirmation: ", err1)
                                                                connection.rollback(function()
                                                                {
                                                                    res.send(
                                                                    {
                                                                        data: 'error'
                                                                    });
                                                                    connection.release();
                                                                });
                                                            }
                                                            else
                                                            {
                                                                var mailOptions = {
                                                                    from: 'confirm-email@myplusplus.com',
                                                                    to: email,
                                                                    subject: 'Email Confirmation | mY++ Inc.',
                                                                    html: '<div style=\'color: black; box-shadow:0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12); padding: 2%; margin: 3%; font-size: 105%;background-color: #f8f8f8 ;\'> <p> <b> <span style=\'font-weight: 700;  color: #3388bb;\'>Welcome  ' + fname + ' ' + lname + '  <\/span> <\/b> </p> <p>Thank you for joining <b> <i>mY++ Account<\/i> <\/b><\/p> <p>This was to confirm that this email is valid.<br> Click on button bellow to confirm and head to login <\/p> <a style=\"background-color: #3388bb; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; border-radius: 12px; font-weight: bold; cursor: pointer; -webkit-transition-duration: 0.4s; transition-duration: 0.4s;\" href="http://myplusplus.dedicated.co.za/user/confirm_email?email_validity=' + random_six_digits + '"  onMouseOver=\"this.style[\'boxShadow\']=\'0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)\'\" onMouseOut=\"this.style[\'boxShadow\']=\'none\'\">Login<\/a> <p style=\'font-weight: bold;\'>Thank you, <span style=\'font-size: 20px;\'>mY <i style=\'color: #fc8a9e;\'>++ <\/i> Team <\/span> <\/p> <p style=\'font-family: Courier New;\'>mY++ Incorporation <br>Nelson Mandela Drive <br> Walter Sisulu University <br> Mthatha, 5099 <\/p> <\/div>'
                                                                };
                                                                transporter.sendMail(mailOptions, function(error, info)
                                                                {
                                                                    if(error)
                                                                    {
                                                                        console.log("Error sending email confirmation: ", error)
                                                                        connection.rollback(function()
                                                                        {
                                                                            res.send(
                                                                            {
                                                                                data: 'error'
                                                                            });
                                                                            connection.release();
                                                                        });
                                                                    }
                                                                    else
                                                                    {
                                                                        connection.commit(function(err)
                                                                        {
                                                                            if (err)
                                                                            {
                                                                                console.log("Error commiting: ", err)
                                                                                connection.rollback(function()
                                                                                {
                                                                                    res.send(
                                                                                    {
                                                                                        data: 'error'
                                                                                    });
                                                                                    connection.release();
                                                                                });
                                                                            }
                                                                            else
                                                                            {
                                                                                res.send(
                                                                                {
                                                                                    data: 'registered'
                                                                                });
                                                                                connection.release();
                                                                            }
                                                                        })
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    });
                                });
                            }
                        }
                    });
                }
            });
        }
    }
    else
    {
        res.render('signup');
    }
};
exports.recover_password = function(req, res)
{
    res.render('recover_account.ejs');
};
//-----------------------------------------------login page call with sql injection catered for------------------------------------------------------
exports.login = function(req, res)
{
    var message = '';
    var sess = req.session;
    if (req.method == "POST")
    {
        var post = req.body;
        var name = post.username;
        var pass = post.password;

        var sql = "SELECT * FROM `fed_user` WHERE user_email = ?";

        db.query(sql, [name], function(err, results)
        {
            if (!err)
            {
                if (results.length > 0)
                {
                    if (results[0].email_confirmed == 'yes')
                    {
                        bcrypt.compare(pass, results[0].user_password, function(error, result)
                        {
                            if (result)
                            {
                                message = 'success';
                                req.session.userId = results[0].msg_user_id;
                                req.session.user = results[0];
                                res.send(message);
                            }
                            else
                            {
                                message = 'fail';
                                res.send(message);
                            }
                        });
                    }
                    else
                    {
                        message = 'not_confirmed';
                        res.send(message);
                    }

                }
                else
                {
                    message = 'fail';
                    res.send(message);
                }
            }
            else
            {
                message = 'error: ' + err;
                res.send(message);
            }
        });
    }
    else
    {
        message = 'Not allowed to access this files.';
        res.send(message);
    }
};
//logout
exports.logout = function(req, res)
{
    req.session = null; //destroying sessions
    res.send('logedOut'); //send message
};
//--------------------------------------search user with mysql injection and validation catared for----------------------------------------------------
exports.searchUser = function(req, res, next)
{

    var user = req.session.user,
        userId = req.session.userId;
    if (userId == null)
    {
        res.redirect("/login");
        return;
    }
    else
    {
        var userToSearch = req.body.userToSearch;
        if (userToSearch == "")
        {
            res.send(
            {
                result: 'no one'
            });
        }
        else
        {
            var sqlCommand = "SELECT * FROM fed_user WHERE LOWER(user_last_name) LIKE ? AND msg_user_id != ? OR LOWER(user_first_name) LIKE ? AND msg_user_id != ? OR LOWER(user_email) LIKE ? AND msg_user_id != ?";
            // OR   OR  OR '  OR user_cellnumber = '"+userToSearch+"' AND msg_user_id !=  user_cellnumber
            db.query(sqlCommand, [userToSearch.toLowerCase(), userId, userToSearch.toLowerCase(), userId, userToSearch.toLowerCase(), userId], function(err, theresult)
            {
                if (theresult.length)
                {
                    res.send(
                    {
                        result: theresult
                    });
                }
                else
                {
                    res.send(
                    {
                        result: 'no one'
                    });
                }

            });
        }

    }
};
//-------------------------------update profile picture with validation and sql injection catered for ------------------------------------------------------------
exports.updateProfilePicture = function(req, res)
{
    var user = req.session.user,
        userId = req.session.userId;

    if (userId == null)
    {
        res.redirect("/login");
        return;
    }
    else
    {
        var data = req.body.image;
        //check if submitted valid base64 data
        if (data.indexOf("data:image") > -1)
        {
            var base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");
            var data = req.body.image;

            require("fs").writeFile("public/profile_pictures/"+userId+"_profile.png", base64Data, 'base64', function() 
            {
                // The file upload is complete.
                var sql = "UPDATE fed_user SET user_profilepicture = ? WHERE msg_user_id = ?";
                db.query(sql, [userId, userId], function(err, result)
                {
                    if (result.affectedRows > 0)
                    {
                        res.send(data);
                    }
                    else
                    {
                        res.send("fail")
                    }

                });
            });
        }
        else
        {
            res.send("fail");
        }
    }
};
//------------------------------------------get user by id with sql injection cattered for -----------------------------------------------------------
exports.getUserByTheId = function(req, res)
{
    var userToSearch = req.body.userToSearch;
    var user = req.session.user,
        userId = req.session.userId;


    if (userId == null)
    {
        res.redirect("/login");
        return;
    }
    else
    {
        var sqlCommand = "SELECT * FROM fed_user WHERE msg_user_id = ?";
        var query = db.query(sqlCommand, [userToSearch], function(err, result)
        {
            if (result.length)
            {
                res.send(
                {
                    result: result
                });
            }
            else
            {
                res.send(
                {
                    result: 'User User'
                });
            }
        });
    }
};
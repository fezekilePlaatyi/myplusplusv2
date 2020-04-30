  /*
  *  media recorder
  */


  // 'use strict';

  // /* globals MediaRecorder */

  

  // const mediaSource = new MediaSource();
  // mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
  // let mediaRecorder;
  // let recordedBlobs;
  // let sourceBuffer;

  // const errorMsgElement = document.querySelector('span#errorMsg');
  // const recordedVideo = document.querySelector('video#recorded');
  // const recordButton = document.querySelector('button#record');
  // recordButton.addEventListener('click', () => {
  //   if (recordButton.textContent === 'Start') {

  //     document.querySelector('video#recorded').style.display = 'none';
  //     document.querySelector('video#recorded').pause();
  //     document.querySelector('video#gum').style.display = 'block';
  //     $("#recordingTimerAndImage").show();
  //     $(".captionPlaceForVideo").hide();
  //     document.getElementById("recordingTimerAndImage").style.display = 'block';
  //     startRecording();
  //   } else {
  //     $("#recordingTimerAndImage").hide();
  //     $(".captionPlaceForVideo").show();
  //     stopRecording();
  //     recordButton.textContent = 'Start';
  //     playButton.disabled = false;
  //     downloadButton.disabled = false;
  //   }
  // });

  // const playButton = document.querySelector('button#play');
  // playButton.addEventListener('click', () => {
  //   document.querySelector('video#gum').style.display = 'none';
  //   document.querySelector('video#recorded').style.display = 'block';
  //   const superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
  //   recordedVideo.src = null;
  //   recordedVideo.srcObject = null;
  //   recordedVideo.src = window.URL.createObjectURL(superBuffer);
  //   recordedVideo.controls = true;
  //   recordedVideo.play();
  // });

  // const downloadButton = document.querySelector('button#download');
  // downloadButton.addEventListener('click', () => {
  //   const blob = new Blob(recordedBlobs, {type: 'video/webm'});
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.style.display = 'none';
  //   a.href = url;
  //   a.download = 'test.webm';
  //   document.body.appendChild(a);
  //   a.click();
  //   setTimeout(() => {
  //     document.body.removeChild(a);
  //     window.URL.revokeObjectURL(url);
  //   }, 100);

    
  // });
  // $("#download").unbind().click(function(e)
  // {
  //     e.preventDefault();
  //     e.stopPropagation();

  //     const blob = new Blob(recordedBlobs,
  //     {
  //         type: 'video/mp4'
  //     });
  //     var videoCaptionInputValue = $("#videoCaptionInput").val();
  //     //uploadAudio(blob);
  //     var videoFeedUrl = window.URL.createObjectURL(blob);

  //    // console.log(videoFeedUrl)

  //     var reader = new FileReader();
  //     reader.onload = function(event)
  //     {
  //         var fd = {};
  //         fd["fname"] = "test.mp4";
  //         fd["data"] = event.target.result;
  //         $.ajax
  //         ({
  //             type: 'POST',
  //             url: '/feeds/insertFeedVideo',
  //             data:
  //             {
  //                 fd: fd,
  //                 videoCaptionInputValue: videoCaptionInputValue
  //             },
  //             success : function(response)
  //             {
  //               if(response.message == 'success')
  //               {
  //                   socket.emit('newFeedEvent',
  //                   {
  //                       uid: uid
  //                   });
  //                   lastFeedId = response.feedIdtoSend;
  //                   $(".feedsWillGoHere").prepend("<div class='w3-card' id='feed_" + response.feedIdtoSend + "'><div class='containFeed' id='" + response.feedIdtoSend + "_feedEndBox'>     <div class='w3-row PostHeader'>  <div  class='w3-col' style='position: relative;'> <span class='fontWeight700'>" + response.userDetailsResults[0].user_last_name + " " + response.userDetailsResults[0].user_first_name + "</span> <small class='pointer' style='color: #fc8a9e; text-decoration-line: underline !important;'><i class='fa fa-at'></i>" + lowerFirstLetter(response.userDetailsResults[0].msg_user_name) + "</small>   </div><span  class='w3-right'> " + moment().format('H:mm A | Do MMM') + "</span></div>     <div class='w3-row' style='padding-top: 1%;'><p>" + videoCaptionInputValue + "</p> <div class='videoOnFeedsContainer'> <video  class='exactVideoFeed' id='video" + response.feedIdtoSend + "' src='"+ videoFeedUrl + "'> Your browser does not support HTML5 video. </video> <span class='togglePlayPause'><i class='fa fa-play fa-2x'></i></span> <div class='custom-seekbar' id='seek" + response.feedIdtoSend + "' style='border-radius: 45px !important;'> <span></span> </div> <span class='dragOnVideoContainer mYPink-color' style='font-style: italic;'> <img src='/img/logo.png' width='80px;'> <br><i class='fa fa-at'></i>" + lowerFirstLetter(response.userDetailsResults[0].msg_user_name) + " </span> </div>  <p> <i class='fa fa-heart likeFeedClass'  id='" + response.feedIdtoSend + "' style='font-size: 150%;'></i> <sup class='likesNumber pointer' id='likes_" + response.feedIdtoSend + "'>(<span class='like_value'>0</span>)</sup> &nbsp; &nbsp; <i style='font-size: 150%;' class='fa fa-comments-o toggleFeedCommentClass'   data-toggle='collapse' data-target='#commentsHolder_"+ response.feedIdtoSend +"' aria-hidden='true'></i> <sup class='numberOfComments pointer'  id='numberOfComments_" + response.feedIdtoSend + "'>(0)</sup> &nbsp; &nbsp; <i style='font-size: 120%;' class='glyphicon glyphicon-tags showTagsForFeed' aria-hidden='true'></i>  &nbsp; &nbsp;<span class='showViewers pointer'><span class='numberOfViews pointer'>0</span> Views </span><span class='keepNotificationType' id='3'></span> <div class='input-group'><textarea placeholder='Enter your comment here...' class='commentArea feedCommentInput' ></textarea>&nbsp; &nbsp; <div class='input-group-btn'><button id='" + response.feedIdtoSend + "' class='btn btn-default commentSendBtn postCommentButton' type='submit'><i class='fa fa-send-o fa-2x pointer' ></i></button> </div> </div></p> </div>     <div class='w3-row' style='width: 99.999%;'><div class='col-md-12 collapse theFeedCommentsPlace' id='commentsHolder_"+ response.feedIdtoSend +"'></div></div> </div> </div> <div class='row'><div class='col-md-3'></div>                                                        <div class='col-md-6'><hr class='new1'></div><div class='col-md-3'></div></div>");
  //                   forEventsInFeeds();

  //               }
  //               else
  //               {
  //                   bootbox.alert(
  //                   {
  //                       message: "There was error sending post on server, please try again later!",
  //                       size: 'large'
  //                   });
  //               }
  //               $(".closeModalForInputFeed").click();
  //               $(".feedsInputChanger").hide();
  //               $(".feedsWillGoHere").show();
  //               $("#videoCaptionInput").val("");
  //               videoToTakeStreamFrom.src = null;
  //               videoToTakeStreamFrom.srcObject = null;
  //               videoToTakeStreamFrom.src = null;
  //             },
  //             error : function(data)
  //             {
  //               bootbox.alert(
  //                 {
  //                     message: "There was error  on client, please try again later!",
  //                     size: 'large'
  //                 });
  //             }
  //         });
  //     };
  //     reader.readAsDataURL(blob);
      
  // });

  // function handleSourceOpen(event) {
  //   console.log('MediaSource opened');
  //   sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
  //   console.log('Source buffer: ', sourceBuffer);
  // }

  // function handleDataAvailable(event) {
  //   if (event.data && event.data.size > 0) {
  //     recordedBlobs.push(event.data);
  //   }
  // }

  // function startRecording() {
  //   recordedBlobs = [];
  //   let options = {mimeType: 'video/webm;codecs=vp9'};
  //   if (!MediaRecorder.isTypeSupported(options.mimeType)) {
  //     console.error(`${options.mimeType} is not Supported`);
  //     errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;
  //     options = {mimeType: 'video/webm;codecs=vp8'};
  //     if (!MediaRecorder.isTypeSupported(options.mimeType)) {
  //       console.error(`${options.mimeType} is not Supported`);
  //       errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;
  //       options = {mimeType: 'video/webm'};
  //       if (!MediaRecorder.isTypeSupported(options.mimeType)) {
  //         console.error(`${options.mimeType} is not Supported`);
  //         errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;
  //         options = {mimeType: ''};
  //       }
  //     }
  //   }

  //   try {
  //     mediaRecorder = new MediaRecorder(window.stream, options);
  //   } catch (e) {
  //     console.error('Exception while creating MediaRecorder:', e);
  //     errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
  //     return;
  //   }

  //   console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
  //   recordButton.textContent = 'Stop';
  //   playButton.disabled = true;
  //   downloadButton.disabled = true;
  //   mediaRecorder.onstop = (event) => {
  //     console.log('Recorder stopped: ', event);
  //   };
  //   mediaRecorder.ondataavailable = handleDataAvailable;
  //   mediaRecorder.start(10); // collect 10ms of data
  //   console.log('MediaRecorder started', mediaRecorder);
  // }

  // function stopRecording() {
  //   mediaRecorder.stop();
  //   console.log('Recorded Blobs: ', recordedBlobs);
  // }

  // function handleSuccess(stream) {
  //   recordButton.disabled = false;
  //   console.log('getUserMedia() got stream:', stream);
  //   window.stream = stream;

  //   const gumVideo = document.querySelector('video#gum');
  //   gumVideo.srcObject = stream;
  // }

  // async function init(constraints) {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia(constraints);
  //     handleSuccess(stream);
  //   } catch (e) {
  //     console.error('navigator.getUserMedia error:', e);
  //     errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  //   }
  // }

  // document.querySelector('button#start').addEventListener('click', async () => {
  //   const constraints = {
  //     audio: {
  //       echoCancellation: {exact: true}
  //     },
  //     video: {
  //       width: 1280, height: 720
  //     }
  //   };
  //   console.log('Using media constraints:', constraints);
  //   await init(constraints);
  // });



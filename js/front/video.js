(function ($, Drupal, drupalSettings, _) {
  
  let $wrapper1 = $('#video-wrapper-1');
  let $wrapper2 = $('#video-wrapper-2');
  let topVideo = 0;

  let videos = _.shuffle(drupalSettings.hootie.videos).shift();
  $.each(videos,function(index,value){
    videos[index].video = setVideo(value.name);
  });

  placeAndPlay(0);
  
  function setVideo(filename){
    let path = '/themes/custom/hootie/video/' + filename;
    return $('<video src="'+path+'.mp4" type="video/mp4" muted>');
  }
  
  function placeAndPlay(index){

    let prevIndex = index;
    index = (index + 1) % videos.length;
    let $video = videos[index].video;
    topVideo = (topVideo + 1) % 2;
    if(topVideo){
      $wrapper1.html($video);
    } else {
      $wrapper2.html($video);
    }

    let promise = $video[0].play();
    if (promise !== undefined) {
      promise.then(_ => {
        // Hiding the inactive wrapper upon completion of show() seems unnecessary,
        // but there is a noticeable flicker in Safari otherwise.
        if(topVideo){
          $wrapper1.css("z-index",-1);
            // Reset the video after the wrapper is hidden. This needs to be in a
            // callback for Safari, otherwise it resets before the element is
            // hidden, resulting in a flicker.
            $wrapper2.css("z-index",-2);

        } else {
          $wrapper2.css("z-index",-1);
          // Reset the video after the wrapper is hidden. This needs to be in a
          // callback for Safari, otherwise it resets before the element is
          // hidden, resulting in a flicker.
          $wrapper1.css("z-index",-2).children('video').currentTime = 0;
        }
        videos[prevIndex].video[0].currentTime = 0;
        $('.video-info').html(videos[index].description);
      }).catch(error => {
        // failed to start
      });
    }

    $video.on('ended', function(){
      placeAndPlay(index);
    });   

  }
  
  $('.info-icon').click(function(){
    $(this).next().toggle();
  });

})(jQuery, Drupal, drupalSettings, _);

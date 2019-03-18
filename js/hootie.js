/* MENU TOGGLE */

(function ($, Drupal, drupalSettings, _) {

  let mobile = $(window).width() < 480;
  let front = drupalSettings.path.isFront;

  let navClosedPosition = !mobile && !front ? '-519px' : '-352px';
  let navOpenPosition = 0;
  let navOpen = false;

  Drupal.behaviors.menuToggle = {
    attach: function (context, settings){
      $('.navigation h2', context).click(function () {
        let menuBlock = $(this).parent();
        menuBlock.siblings().children('.menu:visible').each(function(){
            $(this).slideToggle();
        });
        menuBlock.children('.menu').slideToggle();
      });
    }
  }

  $('.login-link').click(function(){
   // alert("Login is currently undergoing maintenance. Please contact webmaster@overlake.org if you have an urgent issue and need help.");
    let base = drupalSettings.path.baseUrl;
    if(drupalSettings.user.uid){
      location.href = base + 'user/logout';
    } else {
      let samlLogin = base + 'saml_login';
      let path = window.location.pathname;
      if(path === '/' || path === '/saml_logout'){
        path = '/myoverlake';
      }
      let loginUrl = samlLogin + '?destination=' + path;
      $.get(loginUrl,function(data,status){
        $('<div>',{
          title: 'Select a login option:',
          html: data,
        }).dialog({modal:true});
      })
    }
  });

  $('#flyouts li').click(function(e){
    $('#sidenav-content .block').hide();
    switch($(e.target).attr('class')){
      case 'flyout-menu':
        $('#block-mobile-search,.block-menu,#block-myoverlake,#block-quicklinks').show();
      break;
      case 'flyout-search':
        $('#block-searchfaq,#block-hootie-search').show();
      break;
      case 'flyout-events':
        $('#block-community-highlights-feed,#block-slider-news').show();
      break;
      default:
        // Do nothing
        return;
    }
    if(!navOpen){
      slideSideNav();
    }

  })

  $('body').click(function(e) {
      $target = $(e.target);
      if ($(e.target).closest('#sidenav').length === 0 && navOpen) {
        slideSideNav()
      }
  });

  $('#nav-close').click(function(){
    slideSideNav();
  });

  $('.main-menu a, #sidenav-content a').click(function(e){

      if(!$(this).attr('href')){
        e.preventDefault();
        $(this).siblings('ul').slideToggle();
        e.stopPropagation();
      }
    });

  function slideSideNav(){
    if(navOpen){
      $('.layout-sidenav').animate({'margin-right':navClosedPosition},function(){
        $('#sidenav-content .block').hide();
        $('.container')
          .css('top',0)
          .css('position','relative');
        $(window).scrollTop(drupalSettings.hootie.scrollTop);
      });
      navOpen = false;
    } else {
      let $container = $('.container');
      drupalSettings.hootie.scrollTop = $(window).scrollTop();
      $('.container')
         .css('position','fixed')
         .css('top',-drupalSettings.hootie.scrollTop);
      $(window).scrollTop(0);
      $('.layout-sidenav').animate({'margin-right':navOpenPosition});
      navOpen = true;
    } 
  }
  
  /* FAQ & DROP OUT TEXT */  
  Drupal.behaviors.toggle = {
    attach: function (context, settings) {
      $(context).find('.toggle-trigger').click(function(){
        $(this).nextAll('.toggle-target').toggle();
      });
    }
  }


})(jQuery, Drupal, drupalSettings, _);
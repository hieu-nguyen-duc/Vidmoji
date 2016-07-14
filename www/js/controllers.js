angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state, $rootScope) {

  $scope.goToPage = function(pageName) {
    $state.go('app.' + pageName);
  };

  $scope.goTerms = function() {
    $state.go('terms');
  };

  $scope.signOut = function() {
    localStorage.setItem('rememberme', 'false');
    $state.go('login');
  };


  $scope.goVideosByCategory = function(categoryName) {
    $rootScope.categotyTitle = categoryName;
    $state.go('app.videosbycategory');
  };

  $scope.goAudioByCategory = function(categoryName) {
    $rootScope.categotyTitle = categoryName;
    $state.go('app.audiobycategory');
  };

  $scope.goPhotosByCategory = function(categoryName) {
    $rootScope.categotyTitle = categoryName;
    $state.go('app.photosbycategory');
  };

})

.controller('LoginCtrl', function($scope, $ionicSideMenuDelegate, $state, $rootScope, AccountService) {
  $rootScope.hideNavBar = false;
  $ionicSideMenuDelegate.canDragContent(false);

  $scope.isChecked = true;

  $scope.login = function() {
    AccountService.login({}, function() {

    });
  }

  $scope.stayLoggedIn = function() {
    if ($scope.isChecked) {
      $scope.isChecked = false;
    } else {
      $scope.isChecked = true;
    }
  };

  $scope.goSettings = function() {
    localStorage.setItem('rememberme', $scope.isChecked);
    $state.go('app.settings');
  };

  $scope.goRegister = function() {
    $state.go('register');
  };
})

.controller('SettingsCtrl', function($scope, $ionicSideMenuDelegate, $state, $rootScope, disqusApi) {

  var params = {
    limit: 5,
    related: 'thread'
  }



  disqusApi.get('forums', 'listPosts', params).then(function(comments) {
    $scope.comments = comments;
    console.log(comments);

  });


  $rootScope.hideNavBar = false;
  $ionicSideMenuDelegate.canDragContent(false);

  $scope.goHome = function() {
    $state.go('app.home');
  };
})

.controller('HomeCtrl', function($scope, $ionicSideMenuDelegate, $rootScope, $interval) {
  $rootScope.hideNavBar = false;
  $ionicSideMenuDelegate.canDragContent(false);
  $scope.recentVideos = [1, 2, 3];



  // Video
  var video = document.getElementById("mainVideo");

  $scope.currTime = video.currentTime;
  $scope.totalDur = video.duration;
  /*$scope.buff=video.buffered.end(0);*/

  $interval(function() {
    $scope.currTime = video.currentTime;
    $scope.totalDur = video.duration;
    $scope.buff = video.buffered.end(0);
  }, 1000);

  // Buttons
  var playButton = document.getElementById("play-pause");
  var muteButton = document.getElementById("mute");
  var fullScreenButton = document.getElementById("full-screen");

  // Sliders
  var seekBar = document.getElementById("seek-bar");
  var volumeBar = document.getElementById("volume-bar");



  // Event listener for the play/pause button
  playButton.addEventListener("click", function() {
    if (video.paused == true) {
      // Play the video
      video.play();

      // Update the button text to 'Pause'
      playButton.className = "ion-pause color-white font-size-20";
    } else {
      // Pause the video
      video.pause();

      // Update the button text to 'Play'
      playButton.className = "ion-play color-white font-size-20";
    }
  });

  // Event listener for the mute button
  muteButton.addEventListener("click", function() {
    if (video.muted == false) {
      // Mute the video
      video.muted = true;

      // Update the button text
      muteButton.className = "ion-volume-mute color-white font-size-20";
    } else {
      // Unmute the video
      video.muted = false;

      // Update the button text
      muteButton.className = "ion-volume-high color-white font-size-20";
    }
  });

  // Event listener for the full-screen button
  /*   fullScreenButton.addEventListener("click", function() {
       if (video.requestFullscreen) {
         video.requestFullscreen();
       } else if (video.mozRequestFullScreen) {
         video.mozRequestFullScreen(); // Firefox
       } else if (video.webkitRequestFullscreen) {
         video.webkitRequestFullscreen(); // Chrome and Safari
       }
     });*/


  // Event listener for the seek bar
  seekBar.addEventListener("change", function() {
    // Calculate the new time
    var time = video.duration * (seekBar.value / 100);

    // Update the video time
    video.currentTime = time;
  });

  // Update the seek bar as the video plays
  video.addEventListener("timeupdate", function() {
    // Calculate the slider value
    var value = (100 / video.duration) * video.currentTime;

    // Update the slider value
    seekBar.value = value;
  });


  // Pause the video when the slider handle is being dragged
  seekBar.addEventListener("mousedown", function() {
    video.pause();
  });

  // Play the video when the slider handle is dropped
  seekBar.addEventListener("mouseup", function() {
    video.play();
  });

  // Event listener for the volume bar
  volumeBar.addEventListener("change", function() {
    // Update the video volume
    video.volume = volumeBar.value;
  });

})

.controller('VideoCtrl', function($scope, $ionicSideMenuDelegate, $state, $rootScope) {
  $rootScope.hideNavBar = false;
  $ionicSideMenuDelegate.canDragContent(false);

  $scope.videoCategories = ['Autos and Vehicles', 'Entertainment', 'Comedy', 'Film and Animation', 'See all'];
  $scope.Archives = ['March 2016', 'February 2016', 'See All'];
  $scope.recentVideos = [1, 2, 3];

})

.controller('AudioCtrl', function($scope, $ionicSideMenuDelegate, $rootScope, $state) {
  $rootScope.hideNavBar = false;
  $ionicSideMenuDelegate.canDragContent(false);

  $scope.audioCategories = ['Songs', 'Entertainment', 'See all'];
  $scope.recentAudio = [1, 2, 3];

})

.controller('PhotoCtrl', function($scope, $ionicSideMenuDelegate, $rootScope, $state) {
  $rootScope.hideNavBar = false;
  $ionicSideMenuDelegate.canDragContent(false);

  $rootScope.categotyTitle = 'Recently Added Photos';

  $scope.photoCategories = ['Abstract', 'Aircraft', 'Animals', 'Anime', 'See all'];
  $scope.Archives = ['March 2016', 'February 2016', 'See All'];
  $scope.recentPhotos = [1, 2, 3];

})

.controller('PhotosByCategoryCtrl', function($scope, $ionicSideMenuDelegate, $rootScope) {
  $rootScope.hideNavBar = false;
  $ionicSideMenuDelegate.canDragContent(false);
  $scope.recentPhotos = [1, 2, 3];

  $scope.cateName = $rootScope.categotyTitle;

  $scope.selectedPage = 1;

  $scope.switchTab = function(tabName) {
    $scope.selectedPage = tabName;
    switch (tabName) {
      case 1:
        $scope.cateName = $rootScope.categotyTitle + ' Photos';;
        break;
      case 2:
        $scope.cateName = $rootScope.categotyTitle + ' - Most Viewed Photos';
        break;
      case 3:
        $scope.cateName = $rootScope.categotyTitle + ' - Most Liked Photos';
        break;
      default:
        console.log("WARNING : unknown tab name")
    }
  };

  $scope.switchTab(1);
})

.controller('VideosByCategoryCtrl', function($scope, $ionicSideMenuDelegate, $rootScope) {
  $rootScope.hideNavBar = false;
  $ionicSideMenuDelegate.canDragContent(false);
  $scope.recentVideos = [1, 2, 3];

  $scope.cateName = $rootScope.categotyTitle;

  $scope.selectedPage = 1;

  $scope.switchTab = function(tabName) {
    $scope.selectedPage = tabName;
    switch (tabName) {
      case 1:
        $scope.cateName = $rootScope.categotyTitle + ' Videos';;
        break;
      case 2:
        $scope.cateName = $rootScope.categotyTitle + ' - Most Viewed Videos';
        break;
      case 3:
        $scope.cateName = $rootScope.categotyTitle + ' - Top Rated Videos';
        break;
      case 4:
        $scope.cateName = $rootScope.categotyTitle + ' - Most Commented Videos';
        break;
      default:
        console.log("WARNING : unknown tab name")
    }
  };

  $scope.switchTab(1);
})

.controller('AudioByCategoryCtrl', function($scope, $ionicSideMenuDelegate, $rootScope) {
  $rootScope.hideNavBar = false;
  $ionicSideMenuDelegate.canDragContent(false);
  $scope.recentAudio = [1, 2, 3];

  $scope.cateName = $rootScope.categotyTitle;

  $scope.selectedPage = 1;

  $scope.switchTab = function(tabName) {
    $scope.selectedPage = tabName;
    switch (tabName) {
      case 1:
        $scope.cateName = $rootScope.categotyTitle + ' Audio Files';;
        break;
      case 2:
        $scope.cateName = $rootScope.categotyTitle + ' - Most Viewed Audio Files';
        break;
      case 3:
        $scope.cateName = $rootScope.categotyTitle + ' - Top Rated Audio Files';
        break;
      case 4:
        $scope.cateName = $rootScope.categotyTitle + ' - Most Commented Audio Files';
        break;
      default:
        console.log("WARNING : unknown tab name")
    }
  };

  $scope.switchTab(1);
})

.controller('VideoDetailCtrl', function($scope, $ionicSideMenuDelegate, $ionicLoading, HTTP, $ionicModal, $ionicScrollDelegate, $rootScope, $state, $timeout) {
  $rootScope.hideNavBar = false;
  $scope.showControlBar = true;

  $ionicSideMenuDelegate.canDragContent(false);

  $rootScope.getComments();

  $scope.openBrowser = function(url) {
    window.open(url, '_blank', 'location=no');
  }

  $scope.playPause = function() {
    // $state.go('videolist');
    $scope.showControlBar = true;

    $timeout(function() {
      $scope.showControlBar = false;
    }, 2000);
  };

  $ionicModal.fromTemplateUrl('templates/vidmojiPopup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.vidmojiModal = modal;
  });

  $scope.openModal = function() {
    $scope.vidmojiModal.show();
  };

  $scope.closeModal = function() {
    $scope.vidmojiModal.hide();
  };

  $scope.selectedPage = "settings";

  $scope.switchTab = function(tabName) {
    $scope.selectedPage = tabName;
    switch (tabName) {
      case 'settings':
        $ionicScrollDelegate.scrollTop();
        break;
      case 'my_library':
        $ionicScrollDelegate.scrollTop();
        break;

      default:
        console.log("WARNING : unknown tab name")
    }
  };

  $scope.videoHeight = document.getElementById('mainVideoNew').offsetHeight + 10 + 'px';

  $scope.aboutGroups = [];
  for (var i = 0; i < 1; i++) {
    $scope.aboutGroups[i] = {
      name: i,
      items: []
    };
    for (var j = 0; j < 1; j++) {
      $scope.aboutGroups[i].items.push(i + '-' + j);
    }
  }

  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };



  // Video
  var video = document.getElementById("detailVideo");

  // Buttons
  var playButton = document.getElementById("play-pause1");
  var muteButton = document.getElementById("mute1");
  var fullScreenButton = document.getElementById("full-screen1");

  // Sliders
  var seekBar = document.getElementById("seek-bar1");
  var volumeBar = document.getElementById("volume-bar1");



  // Event listener for the play/pause button
  playButton.addEventListener("click", function() {
    if (video.paused == true) {
      // Play the video
      video.play();

      /*$timeout(function(){*/
      $scope.showControlBar = false;
      /*   },1000);*/

      // Update the button text to 'Pause'
      playButton.className = "ion-pause color-white font-size-20";
    } else {
      // Pause the video
      video.pause();

      // Update the button text to 'Play'
      playButton.className = "ion-play color-white font-size-20";
    }
  });

  // Event listener for the mute button
  muteButton.addEventListener("click", function() {
    $scope.showControlBar = true;
    if (video.muted == false) {
      // Mute the video
      video.muted = true;

      // Update the button text
      muteButton.className = "ion-volume-mute color-white font-size-20";
    } else {
      // Unmute the video
      video.muted = false;

      // Update the button text
      muteButton.className = "ion-volume-high color-white font-size-20";
    }
  });

  // Event listener for the full-screen button
  fullScreenButton.addEventListener("click", function() {
    $scope.showControlBar = true;
    $state.go('videolist');
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen(); // Firefox
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen(); // Chrome and Safari
    }
  });


  // Event listener for the seek bar
  seekBar.addEventListener("change", function() {
    $scope.showControlBar = true;
    // Calculate the new time
    var time = video.duration * (seekBar.value / 100);

    // Update the video time
    video.currentTime = time;
  });

  // Update the seek bar as the video plays
  video.addEventListener("timeupdate", function() {
    // Calculate the slider value
    var value = (100 / video.duration) * video.currentTime;

    // Update the slider value
    seekBar.value = value;
  });


  // Pause the video when the slider handle is being dragged
  seekBar.addEventListener("mousedown", function() {
    video.pause();
  });

  // Play the video when the slider handle is dropped
  seekBar.addEventListener("mouseup", function() {
    $scope.showControlBar = true;
    video.play();
  });

  // Event listener for the volume bar
  volumeBar.addEventListener("change", function() {
    $scope.showControlBar = true;
    // Update the video volume
    video.volume = volumeBar.value;
  });



})

.controller('AudioDetailCtrl', function($scope, $ionicSideMenuDelegate, $ionicModal, $rootScope, $state, $timeout) {
  $rootScope.hideNavBar = false;
  $scope.showControlBar = true;
  $ionicSideMenuDelegate.canDragContent(false);

  $rootScope.getComments();

  $scope.openBrowser = function(url) {
    window.open(url, '_blank', 'location=no');
  }

  $scope.playPause = function() {
    // $state.go('videolist');
    $scope.showControlBar = true;

    $timeout(function() {
      $scope.showControlBar = false;
    }, 2000);
  };

  $ionicModal.fromTemplateUrl('templates/vidmojiPopup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.vidmojiModal = modal;
  });

  $scope.openModal = function() {
    $scope.vidmojiModal.show();
  };

  $scope.closeModal = function() {
    $scope.vidmojiModal.hide();
  };

  $scope.selectedPage = "settings";

  $scope.switchTab = function(tabName) {
    $scope.selectedPage = tabName;
    switch (tabName) {
      case 'settings':
        $ionicScrollDelegate.scrollTop();
        break;
      case 'my_library':
        $ionicScrollDelegate.scrollTop();
        break;

      default:
        console.log("WARNING : unknown tab name")
    }
  };

  $scope.videoHeight = document.getElementById('mainVideoNew').offsetHeight + 10 + 'px';

  $scope.aboutGroups = [];
  for (var i = 0; i < 1; i++) {
    $scope.aboutGroups[i] = {
      name: i,
      items: []
    };
    for (var j = 0; j < 1; j++) {
      $scope.aboutGroups[i].items.push(i + '-' + j);
    }
  }

  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };



  // audio
  var video = document.getElementById("detailAudio");

  // Buttons
  var playButton = document.getElementById("play-pause2");
  var muteButton = document.getElementById("mute2");
  var fullScreenButton = document.getElementById("full-screen2");

  // Sliders
  var seekBar = document.getElementById("seek-bar2");
  var volumeBar = document.getElementById("volume-bar2");



  // Event listener for the play/pause button
  playButton.addEventListener("click", function() {
    if (video.paused == true) {
      // Play the video
      video.play();

      $scope.showControlBar = false;

      // Update the button text to 'Pause'
      playButton.className = "ion-pause color-white font-size-20";
    } else {
      // Pause the video
      video.pause();

      // Update the button text to 'Play'
      playButton.className = "ion-play color-white font-size-20";
    }
  });

  // Event listener for the mute button
  muteButton.addEventListener("click", function() {
    if (video.muted == false) {
      // Mute the video
      video.muted = true;

      // Update the button text
      muteButton.className = "ion-volume-mute color-white font-size-20";
    } else {
      // Unmute the video
      video.muted = false;

      // Update the button text
      muteButton.className = "ion-volume-high color-white font-size-20";
    }
  });

  // Event listener for the full-screen button
  fullScreenButton.addEventListener("click", function() {
    $state.go('audiolist');
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen(); // Firefox
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen(); // Chrome and Safari
    }
  });


  // Event listener for the seek bar
  seekBar.addEventListener("change", function() {
    // Calculate the new time
    var time = video.duration * (seekBar.value / 100);

    // Update the video time
    video.currentTime = time;
  });

  // Update the seek bar as the video plays
  video.addEventListener("timeupdate", function() {
    // Calculate the slider value
    var value = (100 / video.duration) * video.currentTime;

    // Update the slider value
    seekBar.value = value;
  });


  // Pause the video when the slider handle is being dragged
  seekBar.addEventListener("mousedown", function() {
    video.pause();
  });

  // Play the video when the slider handle is dropped
  seekBar.addEventListener("mouseup", function() {
    video.play();
  });

  // Event listener for the volume bar
  volumeBar.addEventListener("change", function() {
    // Update the video volume
    video.volume = volumeBar.value;
  });

})

.controller('PhotoDetailCtrl', function($scope, $ionicSideMenuDelegate, $ionicModal, $rootScope, $state) {
  $rootScope.hideNavBar = false;
  $ionicSideMenuDelegate.canDragContent(false);

  $rootScope.getComments();

  $scope.openBrowser = function(url) {
    window.open(url, '_blank', 'location=no');
  }

  $scope.goPhotoList = function() {
    $state.go('photolist');
  };

  $ionicModal.fromTemplateUrl('templates/vidmojiPopup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.vidmojiModal = modal;
  });

  $scope.openModal = function() {
    $scope.vidmojiModal.show();
  };

  $scope.closeModal = function() {
    $scope.vidmojiModal.hide();
  };

  $scope.selectedPage = "settings";

  $scope.switchTab = function(tabName) {
    $scope.selectedPage = tabName;
    switch (tabName) {
      case 'settings':
        $ionicScrollDelegate.scrollTop();
        break;
      case 'my_library':
        $ionicScrollDelegate.scrollTop();
        break;

      default:
        console.log("WARNING : unknown tab name")
    }
  };

  $scope.videoHeight = document.getElementById('mainVideoNew').offsetHeight + 10 + 'px';

  $scope.aboutGroups = [];
  for (var i = 0; i < 1; i++) {
    $scope.aboutGroups[i] = {
      name: i,
      items: []
    };
    for (var j = 0; j < 1; j++) {
      $scope.aboutGroups[i].items.push(i + '-' + j);
    }
  }

  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

})

.controller('RegisterCtrl', function($scope, $ionicSideMenuDelegate, $state, $rootScope) {
  $rootScope.hideNavBar = false;
  $ionicSideMenuDelegate.canDragContent(false);

  $scope.goLogin = function() {
    $state.go('login');
  };
})

.controller('ProfileCtrl', function($scope, $ionicSideMenuDelegate, $ionicScrollDelegate, $rootScope) {
  $rootScope.hideNavBar = false;
  $ionicSideMenuDelegate.canDragContent(true);

  $scope.selectedPage = "overview";

  $scope.switchTab = function(tabName) {
    $scope.selectedPage = tabName;
    switch (tabName) {
      case 'overview':
        $ionicScrollDelegate.scrollTop();
        break;
      case 'profile_setup':
        $ionicScrollDelegate.scrollTop();
        break;
      case 'email_option':
        $ionicScrollDelegate.scrollTop();
        break;
      case 'manage':
        $ionicScrollDelegate.scrollTop();
        break;
      case 'settings':
        $ionicScrollDelegate.scrollTop();
        break;
      case 'my_library':
        $ionicScrollDelegate.scrollTop();
        break;
      default:
        console.log("WARNING : unknown tab name")
    }
  };

  $scope.aboutGroups = [];
  $scope.personalGroups = [];
  $scope.hometownGroups = [];
  $scope.jobsGroups = [];
  $scope.educationGroups = [];
  $scope.interestGroups = [];
  $scope.emailAddressGroups = [];
  $scope.emailYouGroups = [];
  $scope.changePasswordGroups = [];
  for (var i = 0; i < 1; i++) {
    $scope.aboutGroups[i] = {
      name: i,
      items: []
    };
    for (var j = 0; j < 1; j++) {
      $scope.aboutGroups[i].items.push(i + '-' + j);
    }
  }

  for (var i = 0; i < 1; i++) {
    $scope.personalGroups[i] = {
      name: i,
      items: []
    };
    for (var j = 0; j < 1; j++) {
      $scope.personalGroups[i].items.push(i + '-' + j);
    }
  }

  for (var i = 0; i < 1; i++) {
    $scope.hometownGroups[i] = {
      name: i,
      items: []
    };
    for (var j = 0; j < 1; j++) {
      $scope.hometownGroups[i].items.push(i + '-' + j);
    }
  }

  for (var i = 0; i < 1; i++) {
    $scope.jobsGroups[i] = {
      name: i,
      items: []
    };
    for (var j = 0; j < 1; j++) {
      $scope.jobsGroups[i].items.push(i + '-' + j);
    }
  }

  for (var i = 0; i < 1; i++) {
    $scope.educationGroups[i] = {
      name: i,
      items: []
    };
    for (var j = 0; j < 1; j++) {
      $scope.educationGroups[i].items.push(i + '-' + j);
    }
  }

  for (var i = 0; i < 1; i++) {
    $scope.interestGroups[i] = {
      name: i,
      items: []
    };
    for (var j = 0; j < 1; j++) {
      $scope.interestGroups[i].items.push(i + '-' + j);
    }
  }

  for (var i = 0; i < 1; i++) {
    $scope.emailAddressGroups[i] = {
      name: i,
      items: []
    };
    for (var j = 0; j < 1; j++) {
      $scope.emailAddressGroups[i].items.push(i + '-' + j);
    }
  }

  for (var i = 0; i < 1; i++) {
    $scope.emailYouGroups[i] = {
      name: i,
      items: []
    };
    for (var j = 0; j < 1; j++) {
      $scope.emailYouGroups[i].items.push(i + '-' + j);
    }
  }

  for (var i = 0; i < 1; i++) {
    $scope.changePasswordGroups[i] = {
      name: i,
      items: []
    };
    for (var j = 0; j < 1; j++) {
      $scope.changePasswordGroups[i].items.push(i + '-' + j);
    }
  }

  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };



})

.controller('UploadCtrl', function($scope, $ionicSideMenuDelegate, $rootScope) {
  $ionicSideMenuDelegate.canDragContent(false);
  $rootScope.hideNavBar = false;
})

.controller('PrivacyCtrl', function($scope, $ionicSideMenuDelegate, $rootScope) {
  $ionicSideMenuDelegate.canDragContent(false);
  $rootScope.hideNavBar = false;
})

.controller('ContactCtrl', function($scope, $ionicSideMenuDelegate, $rootScope) {
  $ionicSideMenuDelegate.canDragContent(false);
  $rootScope.hideNavBar = false;
})

.controller('TermsCtrl', function($scope, $ionicSideMenuDelegate, $rootScope) {
  $ionicSideMenuDelegate.canDragContent(false);
  $rootScope.hideNavBar = false;
})

.controller('SearchResultCtrl', function($scope, $ionicSideMenuDelegate, $rootScope) {
  $ionicSideMenuDelegate.canDragContent(false);
  $rootScope.hideNavBar = false;
})

.controller('VideoListCtrl', function($scope, $rootScope, $state) {


})

.controller('AudioListCtrl', function($scope, $rootScope, $state) {

})

.controller('PhotoListCtrl', function($scope, $rootScope, $state) {

})

;

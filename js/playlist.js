
var playlistId;

playlistId = 'PLxkbCJED9Q4TyjA_CVF9mCYCYae4Lta4P';

function requestUserUploadsPlaylistId() {
  // // See https://developers.google.com/youtube/v3/docs/channels/list
  // var request = gapi.client.youtube.channels.list({
  //   id: 'PLxkbCJED9Q4TyjA_CVF9mCYCYae4Lta4P',
  //   part: 'contentDetails'
  // });
  // request.execute(function(response) {
  //   //playlistId = response.result.items[0].contentDetails.relatedPlaylists.uploads;
  //   playlistId = 'AIzaSyDmYXERKlS-Yh1k2Tu1NDPeK-6ZDXplkEo';
  //   requestVideoPlaylist(playlistId);
  // });
  requestVideoPlaylist(playlistId);
}

function requestVideoPlaylist(playlistId) {
  $('.youtube-result').html('');
  var requestOptions = {
    playlistId: playlistId,
    part: 'snippet',
    maxResults: 10
  };
  // if (pageToken) {
  //   requestOptions.pageToken = pageToken;
  // }
  var request = gapi.client.youtube.playlistItems.list(requestOptions);
  request.execute(function(response) {
    console.log(response.result);
    // Only show pagination buttons if there is a pagination token for the
    // next or previous page of results.

    var playlistItems = response.result.items;
    if (playlistItems) {
      $.each(playlistItems, function(index, item) {
        displayResult(item.snippet);
      });
    } else {
      $('.youtube-result').html('Sorry you have no uploaded videos');
    }
    $('main').addClass('transition-up');
  });
}

function displayResult(videoSnippet) {
  var title = videoSnippet.title.split("-",1);
  var thumbnail = videoSnippet.thumbnails.high.url;
  var str = "<div class='tile'><div class='thumbnail' style='background-image:url("+thumbnail+")'></div><div class='snippet'><span class='video-name'>"+title+"</span><span class='channel-name'></span></div></div>";
  $('.youtube-result').append(str);
}
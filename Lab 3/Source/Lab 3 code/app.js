window.fbAsyncInit = function () {
    FB.init({
        appId: '288705774878388',
        xfbml: true,
        version: 'v2.8'
    });
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            document.getElementById('status').innerHTML = 'We are connected to FaceBook';
        } else if (response.status === 'not_authorized') {
            document.getElementById('status').innerHTML = 'We are not connected to FaceBook';
        } else{
            document.getElementById('status').innerHTML = 'We are not logged into FaceBook';
        }
    });
};
(function(thisdocument, scriptelement, id) {
    var js, fjs = thisdocument.getElementsByTagName(scriptelement)[0];
    if (thisdocument.getElementById(id)) return;
    js = thisdocument.createElement(scriptelement); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js"; //you can use
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
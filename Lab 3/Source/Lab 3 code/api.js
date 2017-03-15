/**
 * Created by bkani on 2/7/2017.
 */
'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [])


    .controller('View1Ctrl', function ($scope, $http) {
        $scope.results = new Array();
        $scope.mostRecentReview;



        $scope.getMovie = function () {
            var placeEntered = document.getElementById("txt_placeName").value;
            alert(placeEntered);
            if (placeEntered != null && placeEntered != "" ) {
                alert("hello");
                document.getElementById('div_ReviewList').style.display = 'none';
                //This is the API that gives the list of venues based on the place and search query.
                $http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=gym&key=AIzaSyCNt-ShhFX0jz3fNOKF1D1XcEV-L6j18cI').success(function (data) {
                    alert(data.results[0].original_title);
                    if (data != null && data.results != null ) {
                        for (var i = 0; i < data.results.length; i++) {
                            $scope.results[i] = {
                                "name": data.results[i].name,

                                "id": data.results[i].vicinity
                            };
                        }
                    }

                })

            }
        }

        $scope.getReviews = function (venueSelected) {
            alert("baba");
            if (venueSelected != null) {
                alert(venueSelected.id);
                $http.get('https://api.themoviedb.org/3/movie/'+venueSelected.id+'?api_key=75d8861e5751a73c0dfb4b17215c95ab&language=en-US').success(function (result) {


                     {
                        $scope.mostRecentReview = result.overview;

                        var callback = $http.get("http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment" +
                            "?apikey=d0e7bf68cdda677938e6c186eaf2b755ef737cd8" +
                            "&outputMode=json&text=" + $scope.mostRecentReview.text);
                        callback.success(function (data) {
                            if(data!=null && data.docSentiment!=null)
                            {
                                $scope.ReviewWithSentiment = {"reviewText" : $scope.mostRecentReview,
                                    "sentiment":data.docSentiment.type,
                                    "score":data.docSentiment.score  };
                                document.getElementById('div_ReviewList').style.display = 'block';


                            }
                        })
                    }
                })

            }

        }

    });

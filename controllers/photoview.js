var args = arguments[0] || {},
    data = [];


if (_.has(args, 'data')){
    _.each(args.data, function(photo){
var photoContainer = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
      });
      var photoClose = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 5,
        right: 5,
        text: '\uf00d',
        font: {
          fontFamily: 'FontAwesome',
          fontSize: 24,
        },
      });
        var photoView = Ti.UI.createImageView({
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            image: photo.image
        });
        photoContainer.add(photoView);
        photoContainer.add(photoClose);
        data.push(photoContainer);
    });
    
    $.photos.setViews(data);
    
    _.has(args, 'index') && $.photos.setCurrentPage(args.index);
}

function autoScroll() {
    var intCurrentIndex = $.photos.getCurrentPage();
    var intTotalViews = $.photos.getViews().length;
    Ti.API.debug("$.photos: " + JSON.stringify($.photos));
    Ti.API.debug("currentIndex: " + intCurrentIndex);
    if (intCurrentIndex === (intTotalViews - 1)) {
        intCurrentIndex = 0;
    } else {
        intCurrentIndex++;
    }
    $.photos.setCurrentPage(intCurrentIndex);
}

if (_.has(args, 'interval') && args.interval !== 0) {
    var intervalId = setInterval(function () {
        autoScroll();
    }, args.interval);
}


$.photos.addEventListener('click', function(){
    $.photos_win.close();
    if (_.has(args, 'interval')) {
        clearInterval(intervalId);
    }
});

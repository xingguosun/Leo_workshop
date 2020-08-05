$(document).mouseup(function (e) {
    var _con = $('#itemlist');
    if (!_con.is(e.target) && _con.has(e.target).length === 0) {
        var isMobile = /Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)
        if (isMobile) {
            _con.removeClass("phone-display");
        }
    } else {
        _con.addClass("phone-display");
    }
});

/*
 *生成UUID,用户唯一访问标识
 */
(function() {
    // Private array of chars to use
    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

    Math.uuid = function(len, radix) {
        var chars = CHARS,
            uuid = [],
            i;
        radix = radix || chars.length;

        if (len) {
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    };
    Math.uuidFast = function() {
        var chars = CHARS,
            uuid = new Array(36),
            rnd = 0,
            r;
        for (var i = 0; i < 36; i++) {
            if (i == 8 || i == 13 || i == 18 || i == 23) {
                uuid[i] = '-';
            } else if (i == 14) {
                uuid[i] = '4';
            } else {
                if (rnd <= 0x02) rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
                r = rnd & 0xf;
                rnd = rnd >> 4;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
        return uuid.join('');
    };

    Math.uuidCompact = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
})();

//======================================UUID=============================end
//页面id,标识唯一一个页面
var url = window.location.href;

var url_arr = url.split(".");

var id = url_arr[url_arr.length - 2];

//获取会员ID
var _memberId = _uid || '';
console.log(_memberId+'_memberId');

//获取订单ID
var _orderId = _oid || '';

//用户标识UUID
var _utmb = $.cookie('_utmb') || '';

//_utmb值为空时，调用Math.uuidFast
if (_utmb == null || _utmb == 'undefined' || _utmb == '') {

    _utmb = Math.uuidFast();

    $.cookie('_utmb', _utmb);

}

//从哪个路径跳转过来
var _ref = document.referrer || '';

var _param = _ref.substring(_ref.indexOf("?"), _ref.length);

var strs = _param.split('&');

var utm_source = '';

for (var i = 0; i < strs.length; i++) {

    if (strs[i].indexOf('utm_source') != -1) {

        utm_source = strs[i].substring(strs[i].indexOf('=') + 1, strs[i].length);

    }

}

//判断，如果utm_source的值不为空，则路径来源取值utm_source，否则取值_ref
if (utm_source != null && utm_source != '' && utm_source != 'undefined') {

    _ref = utm_source;

}
//获取当前访问的页面
var _currentURL = document.URL || '';

console.log($.cookie('_utmc' + id));
console.log($.cookie('_utmb'));
//一秒内连续刷新算一次请求
if ($.cookie('_utmc' + id)) {

} else {

    _utmc = $.cookie('_utmc' + id, true, { expires: 1 / 24 / 60 / 60 }); //expires以天为单位，cookie有效时间1秒钟
    //写入，传到后台
    var img = new Image(); // 创建一个image对象

    //img.src = 'http://localhost:18080/ec-ga/behavior.img?_utmb=' + _utmb + "&_memberId=" + _memberId + "&_orderId=" + _orderId + "&_ref=" + _ref + "&_currentURL=" + _currentURL;

    img.src = 'http://img4q.duitang.com/uploads/item/201409/23/20140923153926_ahK5J.jpeg?_utmb=' + _utmb + "&_memberId=" + _memberId + "&_orderId=" + _orderId + "&_ref=" + _ref + "&_currentURL=" + _currentURL;


    document.body.appendChild(img);
}

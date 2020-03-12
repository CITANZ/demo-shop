/*
 * Prototypes
 * */
 if (!Object.entries) {
     Object.prototype.entries = function( obj )
     {
         var ownProps = Object.keys( obj ),
             i = ownProps.length,
             resArray = new Array(i); // preallocate the Array

         while (i--) {
             resArray[i] = [ownProps[i], obj[ownProps[i]]];
         }

         return resArray;
     };
 }

String.prototype.kmark = function() {
    if (this.length === 0) {
        return this;
    }
    var x = this.split('.'),
        x1 = x[0],
        x2 = x.length > 1 ? '.' + x[1] : '',
        rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
};

Number.prototype.kmark = function() {
    var s = this.toString();
    return s.kmark();
};

String.prototype.toDollar = function toDollar(digits) {
    var n           =   this.toFloat(),
        is_minus    =   n < 0;
    n   =   Math.round(n * 100) / 100;
    n   =   Math.abs(n);
    digits = (digits === null || digits === undefined) ? 2 : digits;
    return (is_minus ? '-$' : '$') + n.toFixed(digits).kmark();
};

Number.prototype.toDollar = function toDollar(digits) {
    var n           =   this,
        is_minus    =   n < 0;
    n   =   Math.round(n * 100) / 100;
    n   =   Math.abs(n);
    digits = (digits === null || digits === undefined) ? 2 : digits;
    return (is_minus ? '-$' : '$') + n.toFixed(digits).kmark();
};

String.prototype.toFloat = function toFloat() {
    var n = this.trim();
    n = n.replace(/\$/gi, '').replace(/,/gi, '');
    if (n.length === 0) {
        return 0;
    }
    return isNaN(parseFloat(n)) ? 0 : parseFloat(n);
};

Number.prototype.toFloat = function toFloat() {
    return this.valueOf();
};

String.prototype.DoubleDigit = function() {
    var n = this.toFloat();

    return n < 10 ? ('0' + this) : this;
};

Number.prototype.DoubleDigit = function() {
    var s = this.toString();

    return this < 10 ? ('0' + s) : s;
};

Date.prototype.now = function() {
    return this.getFullYear() + '-' + (this.getMonth() + 1).DoubleDigit() + '-' + this.getDate().DoubleDigit() + ' ' + this.getHours().DoubleDigit() + ':' + this.getMinutes().DoubleDigit() + ':' + this.getSeconds().DoubleDigit();
};

Date.prototype.yyyymmdd = function() {
    return this.getFullYear() + '-' + (this.getMonth() + 1).DoubleDigit() + '-' + this.getDate().DoubleDigit();
}

String.prototype.toFilesize =   function bytesToSize() {
    var sizes   =   ['Bytes', 'K', 'M', 'G', 'T'],
        bytes   =   parseFloat(this);
    if (bytes == 0) return '0B';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

Number.prototype.toFilesize =   function bytesToSize() {
    var sizes   =   ['Bytes', 'K', 'M', 'G', 'T'],
        bytes   =   this;
    if (bytes == 0) return '0B';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

String.prototype.ltrim = function(charlist)
{
    if (charlist === undefined) {
        charlist = "\s";
    }

    return this.replace(new RegExp("^[" + charlist + "]+"), "");
};

String.prototype.rtrim = function(charlist)
{
    if (charlist === undefined) {
        charlist = "\s";
    }

    return this.replace(new RegExp("[" + charlist + "]+$"), "");
};

/*
 * functions
 * */
function isMobile() {
    var check = false;
    (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(mod) {
    var rand = Math.ceil(Math.random() * 10);
    return rand == mod ? rand % mod : rand;
}

function isAboveViewport(el, offset) {
    offset = offset ? offset : 0;
    if ($(el).offset().top + $(el).outerHeight() <= $(window).scrollTop() + offset) {
        return true;
    }

    return false;
}

function getOrientation(file, callback) {
    var reader = new FileReader();
    reader.onload = function(e) {

        var view = new DataView(e.target.result);
        if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
        var length = view.byteLength,
            offset = 2;
        while (offset < length) {
            var marker = view.getUint16(offset, false);
            offset += 2;
            if (marker == 0xFFE1) {
                if (view.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
                var little = view.getUint16(offset += 6, false) == 0x4949;
                offset += view.getUint32(offset + 4, little);
                var tags = view.getUint16(offset, little);
                offset += 2;
                for (var i = 0; i < tags; i++)
                    if (view.getUint16(offset + (i * 12), little) == 0x0112)
                        return callback(view.getUint16(offset + (i * 12) + 8, little));
            } else if ((marker & 0xFF00) != 0xFF00) break;
            else offset += view.getUint16(offset, false);
        }
        return callback(-1);
    };
    reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
}

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
    var ua = window.navigator.userAgent;

    // Test values; Uncomment to check result …

    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

    // Edge 12 (Spartan)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

    // Edge 13
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

Date.prototype.nzst = function(include_time, include_second) {
    var d = this.getDate().DoubleDigit() + '/' + (this.getMonth() + 1).DoubleDigit() + '/' + this.getFullYear(),
        t = '',
        ampm = this.getHours() >= 12 ? 'pm' : 'am',
        hours = this.getHours() % 12;

    hours = hours ? hours : 12;
    t = ' - ' + hours + '.' + this.getMinutes().DoubleDigit();

    if (include_second) {
        t += '.' + this.getSeconds().DoubleDigit();
    }

    t += ampm;

    return d + (include_time ? t : '');
};

String.prototype.nzst = function(include_time, include_second) {
    let d = new Date(this);

    return d.nzst(include_time, include_second);
};

Number.prototype.toDate = function() {
    if (!isNaN(this)) {
        return new Date(this);
    }

    console.error('You cannot convert NaN!');
    return this;
}

String.prototype.toDate = function() {
    if (this.trim().length > 0) {
        return new Date(parseFloat(this));
    }

    console.error('You cannot convert an empty string!');
    return this;
}

String.prototype.toHHMMSS = function() {
    var sec_num = parseInt(this, 10), // don't forget the second param
        is_minus = sec_num < -0;

    sec_num = Math.abs(sec_num);

    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return (is_minus ? '-' : '') + hours + ':' + minutes + ':' + seconds;
}

Number.prototype.toHHMMSS = function() {
    var sec_num = parseInt(this, 10), // don't forget the second param
        is_minus = sec_num < -0;

    sec_num = Math.abs(sec_num);

    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return (is_minus ? '-' : '') + hours + ':' + minutes + ':' + seconds;
}

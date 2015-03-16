
if(typeof(hh) == "undefined" ){
	hh = {}
}
if(!hh.utils){
    hh.utils={};
}
(function(n){
	n.utils = (function(){

		return{
			getCookie : function(sName) {
				var aCookie = document.cookie.split("; ");
				for (var i=0; i < aCookie.length; i++){
					var aCrumb = aCookie[i].split("=");
					if (sName == aCrumb[0]){
						aCrumb.shift();
						return decodeURIComponent(aCrumb.join("="));
					}
				}
				return '';
			},
			setCookie : function(sName, sValue, sExpires, dm, path) {
				var sCookie = sName + "=" + encodeURIComponent(sValue),
				dm=dm || ".ehaoyao.com",
				sExpires = sExpires || 30,
				path=path || "/";
				if (sExpires != null){
					var today=new Date(),
					d=new Date( today.getTime() + (sExpires* 1000 * 60 * 60 * 24) );
					sCookie += "; expires=" + d.toUTCString()  + "; domain="+dm+"; path="+path;
				}
				document.cookie = sCookie;
			},
			removeCookie : function(sName) {
				document.cookie = sName + "=; expires=Fri, 31 Dec 1999 23:59:59 GMT;";
			},
			/*去除字符串空格*/
			trim: function(val){
				return val.replace(/[ ]/g,"");
			},
			toDate: function(date,split){
				if (typeof(split) == "undefined") {
					split = "-";
				};
				var _n = new Date(date);
				_ny = _n.getFullYear(),
				_nm = _n.getMonth() < 9 ? "0" + (_n.getMonth()+ 1) : (_n.getMonth()+1),
				_nd = _n.getDate() < 10 ? "0" + _n.getDate() : _n.getDate() ,
				_nth = _n.getHours() < 10 ? "0" + _n.getHours() : _n.getHours(),
				_ntm = _n.getMinutes() < 10 ? "0" + _n.getMinutes() : _n.getMinutes(),
				_nts = _n.getSeconds() < 10 ? "0" + _n.getSeconds() : _n.getSeconds();
				return {
					y:_ny,
					m:_nm,
					d:_nd,
					th:_nth,
					tm:_ntm,
					ts:_nts,
					formatL: _ny+split+_nm+split+_nd+" "+_nth+":"+_ntm+":"+_nts,
					formatS: _ny+split+_nm+split+_nd,
					formatCL: _ny+"年"+_nm+"月"+_nd+"日 "+_nth+":"+_ntm+":"+_nts,
					formatCS: _ny+"年"+_nm+"月"+_nd+"日"
				};
			},
			/*获取url参数的值*/
			getUrlParm: function(name){
				var regexS="[\\?&]"+name+"=([^&#]*)",
					regex=new RegExp(regexS),
					tmpURL=window.location.href,
					results=regex.exec(tmpURL);
				if(results==null){
					return ""
				}else{
					return results[1]
				}
			},
			/*获取url参数的键值对*/
			getQueryString: function(){
				var result=[],
					queryString=location.search.substring(1),
					re=/([^&=]+)=([^&]*)/g,
					m;
				while(m=re.exec(queryString)){
					result[decodeURIComponent(m[1])]=decodeURIComponent(m[2]);
				}
				return result;
			},
			/*显示周几或星期几*/
			getCNDay: function(day,Z_XQ){
				varcnDay=['周日','周一','周二','周三','周四','周五','周六'];
				varcnDay1=['星期天','星期一','星期二','星期三','星期四','星期五','星期六'];
				if(typeofZ_XQ=='undefined'||Z_XQ=='Z'){
					returncnDay[day.getDay()];
				}else{
					returncnDay1[day.getDay()];
				}
			}
		}
	})();

})(hh)

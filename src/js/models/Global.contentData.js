/*
	This loads the cms/ json information into JS.
 I think there could be a much better way of doing this loading JSON component.
*/
var ContentData = function(){

	var _loaded = false;
	var _data = {};
	// var callback = null;

	
	return {

		init : function(cb) {

			var xmlhttp = new XMLHttpRequest();
			
			xmlhttp.onreadystatechange=function(e){
				if (xmlhttp.readyState==4 && xmlhttp.status==200){
					_data = JSON.parse( xmlhttp.responseText );
					
					if( cb != null ){
						cb();
					}

					_loaded = true;

				}
			}.bind(this);

			xmlhttp.open("GET","cms/json",true);
			xmlhttp.send();
		},

		data : function(){
			return _data
		},

		loaded : function() {
			return _loaded;
		}
	};
};





module.exports = ContentData();
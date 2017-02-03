function OnCityInput() {

	// http://stackoverflow.com/questions/15764844/jquery-getjson-save-result-into-variable
	var searchTerm = $( "#cityField" ).val();
	var autoURL = "http://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q=";
	autoURL += searchTerm;

	if( searchTerm === "")
		return;

	$.getJSON( autoURL, function( data ) {
		var resultsAsString = "";
		$.each( data, function( i , item ) {

			// http://stackoverflow.com/questions/441018/replacing-spaces-with-underscores-in-javascript
			var temp = data[ i ].city;
			if(typeof temp === 'undefined') {
				return;
			}

			temp = temp.replace( / /g,"_" );

			resultsAsString += "<li "
			+ "onclick=OnClickEntry(\"" + temp + "\") "
			+ "style=\"cursor: pointer\""
			+ ">" 
			+ data[ i ].city;
			+ "</li>";
		});

		$( "#txtHint" ).html(resultsAsString);

	});

};



function OnClickEntry( listValue ) {

	listValue = listValue.replace( /_/g, " " );

	document.getElementById( "cityfield" ).value = listValue;

	OnCityInput();
};

function OnClickSubmit() {
	var cityName = $( "#cityfield" ).val();

	// Get detailed weather information for city
	var myURL = "https://api.wunderground.com/api/6241d9cf04b40a82/geolookup/conditions/q/UT/" + cityName + ".json";

	$.ajax({
		url : myURL,
		dataType : 'jsonp',
		success : function( data ) {
			var weather = data.current_observation.weather;
			var temperature = data.current_observation.temperature_string;


			// Populate the text box
			// http://stackoverflow.com/questions/415602/set-value-of-textarea-in-jquery
			$( "#txtarea" ).val( cityName );

			var weatherDivString = "<br>";
			weatherDivString += "Current weather prediction for " + cityName + ":";
			weatherDivString += "<br>";
			weatherDivString += "Conditions: ";
			weatherDivString += weather;
			weatherDivString += "<br>";
			weatherDivString += "Temperature: ";
			weatherDivString += temperature;
			weatherDivString += "<br>";

			$( "#weather-info" ).html( weatherDivString );
		}
	});
};

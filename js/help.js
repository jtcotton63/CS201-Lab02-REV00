// function OnMouseOverEntry( listValue ) {
// 		console.log( listValue );
// };

function OnClickEntry( listValue ) {

	listValue = listValue.replace( /_/g, " " );

	document.getElementById( "cityfield" ).value = listValue;

	OnCityInput();
};

function OnClickSubmit() {
	var searchTerm = $( "#helpfield" ).val();

	// Get detailed weather information for city
	var myURL = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=" + searchTerm + "&site=stackoverflow";

	$.ajax({
		url : myURL,
		dataType : 'jsonp',
		success : function( data ) {
			var items = data.items;

			var resultsDivString = "<br>";

			$.each(items, function(i , item) {

				resultsDivString += generateResult(item);

			});

			$("#results").html(resultsDivString);
		}
	});
};

function generateResult(item) {
	// console.log(item);

	return "<a href=" + item.link + ">" + item.title + "</a><br>"; 
};

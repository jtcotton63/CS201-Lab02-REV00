function OnClickSubmit() {
	var searchTerm = $("#searchStack").val();

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

			$("#searchResults").html(resultsDivString);
		}
	});
};

function generateResult(item) {
	return "<a href=" + item.link + ">" + item.title + "</a><br>"; 
};

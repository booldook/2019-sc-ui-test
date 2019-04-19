var db = firebase.database();

$("#bt").click(function(){
	var content = $("#content").val();
	db.ref("sample/conts").push({
		content: content,
		wdate: new Date().getTime()
	}).key;
});

function dataRev(obj) {
	var key = $(obj).parent().attr("id");
	db.ref("sample/conts/"+key).remove();
}


db.ref("sample/conts").on("child_added", function(data){
	var html = '<tr id="'+data.key+'">';
	html += '<td onclick="dataRev(this);">'+data.key+'</td>';
	html += '<td>'+data.val().content+'</td>';
	html += '<td>'+data.val().wdate+'</td>';
	html += '</tr>';
	$("#dataTb > tbody").prepend(html);
});

db.ref("sample/conts").on("child_removed", function(data){
	var key = data.key;
	$("#"+key).remove();
});




$(document).ready(function(){
    let list = "<ul>";
    $("h2").each(function(i){
        let id = "h2_" + i;
        $(this).attr("id", id);
        list += "<li><a href='#" + id +"'/>"+$(this).text()+"</li>";
    });
    list += "</ul>";
    console.log(list);
    $("h1").after(list);
});
$("#add_post").submit(function(event){
    alert("CREATE: success")
})

$("#register_user").submit(function(event){
    alert("successfully registered user")
})

$("#login_user").submit(function(event){
    alert("login successful")
})

$("#update_post").submit(function(event) { //post update submission
    event.preventDefault();
    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n) { //mapping data to array
        data[n['name']] = n['value']
    })
    
    var request = { //request to update data
        "url": `http://localhost:3000/pr/api/site/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function(response){ //request done msg
        alert("UPDATE: success");
        window.location = '/pr';
    })
})

if(window.location.pathname == "/pr") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function() {
        var id = $(this).attr("data-id")
        var request = { //request to update data
            "url": `http://localhost:3000/pr/api/site/${id}`,
            "method": "DELETE"
        }
        if(confirm("DELETE: are you sure you want to delete this post?")){
            $.ajax(request).done(function(response) {
                alert("DELETE: success");
                location.reload();
            })
        }
    })
}
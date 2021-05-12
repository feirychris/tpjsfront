if (localStorage.getItem("token") !== null) {
    var postDiv = document.getElementById('posts');

    let data = "";

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this);
            let response = JSON.parse(this.responseText)

            response.forEach((post) => {
                postDiv.innerHTML += `
                    <div class="card logged-out" >
                        <div class="card-header"> ${post.title} </div>
                            <div class="card-body">
                            <p class="card-text">${post.content} </p>
                        </div>
                    </div>
                    <br>
                `;
            });
        }
    });

    xhr.open("GET", "http://localhost:3000/posts");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", localStorage.getItem('token'));

    xhr.send(data);



    document.querySelectorAll('.logged-out').forEach((el) => {
        el.classList.add('d-none');
    });
    document.querySelectorAll('.logged-in').forEach((el) => {
        el.classList.remove('d-none');
    });
}

$(".signup").on("click", function(event) {
    event.preventDefault();
    $.ajax({
        type: "POST",
        beforeSend: function(request) {
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        },
        dataType: "JSON",
        data: $(".tab-body active").serialize(),
        url: "http://localhost:3000/user/register",
        success: function(data) {
            console.log(rep);
            localStorage.setRequestHeader('token', rep);
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
});

$(".signin").on("click", function(event) {
    event.preventDefault();
    $.ajax({
        type: "POST",
        beforeSend: function(request) {
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        },
        dataType: "JSON",
        data: $(".tab-body active").serialize(),
        url: "http://localhost:3000/user/login",
        success: function(data) {
            console.log(rep);
            localStorage.setRequestHeader('token', rep);
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
})

$(".createpost").submit(function (event) {
    event.preventDefault();
    $.ajax({
        type: "POST",
        data: $(".createpost").serialize(),
        url: "http://localhost:3000/posts",
        headers: {
            "Authorization": localStorage.getItem('token')
        },
        error: function(errorThrown) {
            console.log(errorThrown);
        }
    });
})

function logout() {
    console.log("------")
    window.localStorage.clear()
    window.location.href="http://localhost"
}

$(".logout").on("click", logout())
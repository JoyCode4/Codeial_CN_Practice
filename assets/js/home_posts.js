{
    let createPost = function(){
        let newPostForm = $("#new-post-form");
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url : "/posts/posts-create",
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDOM(data.data.post);
                    $("#posts-list-container>ul").prepend(newPost);
                },error:function(error){
                    console.log(error.responseText);
                }
            })
        });
    }


    // method to create a post in DOM
    let newPostDOM = (post)=>{
        return $(`<li id="post-${post._id}">
        <small>
            <a class="delete-post-button" href="/posts/destroy/?id=${post.id}">X</a>
        </small>
        ${post.content}
        <br>
        <span>
            ${post.user.name}
        </span>
        <div class="post-comments">
            <form id="" action="/comments/create-comments" method="post">
                <span>Comments</span>
                <br>
                <input name="content" placeholder="Here place your Comments...." required>
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Add Comment">
                
            </form>

            <div class="post-comments-list">
                <ul id="post-comments-${post._id}">
                </ul>
            </div>
        </div>
    </li>`)
    }
    
    createPost();
}
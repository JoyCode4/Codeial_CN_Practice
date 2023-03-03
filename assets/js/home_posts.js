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
                    deletePost($(' .delete-post-button',newPost));
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
            <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
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



    // method to delete the post from DOM
    let deletePost = (deleteLink)=>{
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    console.log(data);
                    $(`#post-${data.data.post_id}`).remove();
                },
                error:function(error){
                    console.log($(deleteLink).attr('href'));
                    console.log(error);
                }
            })
        })
    }





    
    createPost();
}
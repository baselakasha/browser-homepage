function loadDate(){
    const date_elem = document.getElementById("date");
    const date_controller = new DateController();
    date_controller.putDateIn(date_elem);
}
function loadTime(){
    const time_elem = document.getElementById("time");
    const time_controller = new TimeController(":", time_elem);
    time_controller.startInterval();
}
function loadPosts(){
    const posts_grid = document.getElementById("posts-grid");
    const dev_posts = new DevPosts(posts_grid);
    dev_posts.addPostsToGrid();
}
window.onload = function(){
    loadDate();
    loadTime();
    loadPosts();
}
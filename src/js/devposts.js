class DevPosts{
    constructor(grid_element){
        this.api_url = "https://dev.to/api/articles?top=1&per_page=6"
        this.grid_element = grid_element;
        this.sendRequest();
    }
    addPostsToGrid(){
        this.getPostsArray()
        .then((posts) => {
            posts.forEach(post => {
                this.addPost(post);
            });
        });
    }
    addPost(post){
        this.grid_element.innerHTML += `
        <a class="dev-card" href="${post.url}">
            <h3 class="dev-card__heading">${post.title}</h3>
            <div class="dev-card__footer">
                <div class="dev-card__date">${post.readable_publish_date}</div>
                <div class="dev-card__author">By ${post.user.name}</div>
            </div>
        </a>
        `
    }
    getPostsArray(){
        return new Promise((res, rej) => {
            this.fetch()
            .then((data) => {
                res(JSON.parse(data));
            });
        });
    }
    fetch(){
        return new Promise((res, rej) => {
            let xhr = this.xhr;
            this.xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        res(xhr.responseText);
                    } else {
                        rej(xhr.status);
                    }
                }
            };
        });
    }
    sendRequest(){
        this.xhr = new XMLHttpRequest();
        this.xhr.open('GET', this.api_url);
        this.xhr.send(null);
    }
}
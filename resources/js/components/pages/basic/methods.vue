<template>
    <div>
        <h1>
            we can have some data here {{ counter }}
        </h1>
        <button @click="updateCoutner(1)">Increase</button>
        <button @click="updateCoutner(-1)">Decrease</button>
        <br>
        <br>

        <div v-for="(blog, i) in blogs" :key="i" v-if="blogs.length">
            <h1>{{blog.title}}</h1>
            <p>{{blog.title}}</p>
        </div>

        <br>
        <br>

        <div>
            <h1 v-if="showItem">show this item if "showItem" is true</h1>
            <h1 v-else>show this item if "showItem" is false</h1>

        </div>

<button @click="showItem = !showItem">Change ShowItem</button>

    </div>
</template>


<script>
export default {
    data(){
        return {
            views: 0,
            blogs : [],
            showItem : false
        }
    },
    methods:{
        updateCoutner(number){
            this.views += number
        },
        changeShowItem(){
            this.showItem = !this.showItem
        }

    },
    created() {
        //call the server to get views of this blog post...
        this.counter = 100
        //get the blog posts
        let posts =  [ {title: 'this is blog title 1','post' : 'this is the blog post', id:1},
                {title: 'this is blog title 2','post' : 'this is the blog post', id:2},
                {title: 'this is blog title 3','post' : 'this is the blog post', id:3},
                {title: 'this is blog title 4','post' : 'this is the blog post', id:4}]
                this.blogs = posts
    }
}
</script>

<style>

</style>
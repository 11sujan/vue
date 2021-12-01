<template>
    <div>
        <h1 ref="myref">Hook tutorial</h1>
        <p>This is a {{name}}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: 'hook'
        }
    },

    beforeCreate(){

    },

    created(){
        //call mostly initial data from it...
        console.log('data and other function is available but not html', this.name)

    },
    mounted(){
        //access to html element and session...
        console.log(this.$refs.myref)
    }
}
</script>
<template>
    <div>
        <div class="content">
            <div class="container-fluid">
                <h1>it will do Something</h1>
                <h2>usecom Counter:{{$store.state.counter}}</h2>
                <comA></comA>
                <comB></comB>
                <comC></comC>

                <button class="btn btn-info" @click="changeCounter">Change the state of counter</button>
            </div>
        </div>
    </div>
</template>

<script>
import comA from './comA'
import comB from './compB'
import comC from './compC'



export default {
data(){
    return{

    }
},
methods: {
    changeCounter(){
        this.$store.commit('changeTheCounter',1)
    }
},
created(){

},
components: {
    comA,
    comB,
    comC
}
}

</script>

<template>
    <div>
        <h1>{{title}}</h1>
        <div class="my-4 text-left">
            <router-link to="/">
                <button class="btn btn-md btn-primary">Home</button>
            </router-link>
        </div>
        <div class="emp-form">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <ul>
                        <li v-for="(item, index) in errors" :key="index">
                            <p class="text-danger">{{item}}</p>
                        </li>
                    </ul>
                    <div class="emp-form-inner">
                        <form @submit.prevent="validateBeforeSubmit" novalidate="true">
                            <div class="form-group">
                                <label for="">Name</label>
                                <input type="text" v-model="formData.name" class="form-control">
                                <small v-if="formData.name" class="text-right text-clone">{{formData.name}}</small>
                            </div>
                            <div class="form-group">
                                <label for="">Email</label>
                                <input type="text" v-model="formData.email" class="form-control">
                                <small v-if="formData.email" class="text-right text-clone">{{formData.email}}</small>
                            </div>
                            <div>
                                <label for="">Mobile</label>
                                <input type="text" v-model="formData.mobile" class="form-control">
                                <small v-if="formData.mobile" class="text-right text-clone">{{formData.mobile}}</small>
                            </div>

                            <button type="submit" class="btn btn-md btn-primary mt-4">Submit</button>
                            <!-- <button v-else type="submit" class="btn btn-md btn-primary mt-4">Submit</button> -->
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';


export default{
    name: 'EmployeeForm',
    data(){
        return{
            title: 'Add Employee',
            errors: [],
            formData: {name: '', email: '', mobile: ''}
        }
    },
    methods: {
        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        validateBeforeSubmit(){
            this.errors = [];
            if(!this.formData.name){
                this.errors.push('Name is required');
            }
            if(!this.formData.email){
                this.errors.push('Email is required');
            }else if(!this.validEmail(this.formData.email)){
                this.errors.push('Valid email required');
            }

            if(!this.errors.length){
                if(this.formData.id){
                    this.updateForm();
                }else{
                    this.submitForm();
                }
            }
        },
        submitForm(){
            let reqData = {
                id: this.uid,
                name: this.formData.name,
                email: this.formData.email,
                mobile: this.formData.mobile
            }

            axios.post('http://localhost:3000/addEmployee/', reqData)
                .then(item=>{
                    console.log('item',item);
                    this.$router.push('/');
                })

            return        
        },
        updateForm(){
            let reqData = {
                id: this.formData.id,
                name: this.formData.name,
                email: this.formData.email,
                mobile: this.formData.mobile
            }

            axios.put('http://localhost:3000/employeeData/'+this.formData.id, reqData)
                .then(data=>{
                    console.log(data);
                    this.$router.push('/');
                })
        }
    },
    mounted(){
        let id = this.$route.params.id;
        if(id){
            this.title = 'Update Employee';
            axios.get('http://localhost:3000/employeeData/'+id)
            .then(item=>{
                this.formData = item.data;
            })
        } 
    }
}
</script>

<style>
.emp-form{
    text-align: left;
    background-color: #f9f9f9;
    padding: 50px;
}
.emp-form-inner{
    background-color: #eee;
    padding: 50px;
}
.text-clone{
    background-color: #ccc;
    padding: 5px;
}
</style>
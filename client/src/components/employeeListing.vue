<template>
    <div>
        <h1>{{title}}</h1>
        <div class="my-4 text-right">
            <router-link to="/createEmployee" class="text-right">
                <button class="btn btn-primary btn-md">Add Employee</button>
            </router-link>
        </div>
        <table class="table table-bordered table-hover table-striped">
            <thead>
                <tr>
                    <th>S. No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>mobile</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in employeeData" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.email}}</td>
                    <td>{{item.mobile?item.mobile:'NA'}}</td>
                    <td>
                        <button class="btn btn-sm btn-danger mr-2" @click="deleteEmployee(item)">Delete</button>
                        <router-link :to="{path: '/updateEmployee/'+item.id}">
                            <button class="btn btn-sm btn-success">Edit</button>
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: 'EmployeeListing',
    data: ()=>{
        return{
            title: 'Simple CRUD in VueJS',
            employeeData: null
        }
    },
    mounted(){
        axios
            .get('http://localhost:3000/')
            .then(res=>{
                this.employeeData = res.data;
                console.log('employee data', this.employeeData);
            })
    },
    methods: {
        deleteEmployee(emp){
            // this.employeeData = this.employeeData.filter(item=>item.id!=emp.id)
            axios
                .delete(`http://localhost:3000/deleteEmployee/${emp.id}`)
                .then(res=>{
                    console.log('delete response', res);
                    this.employeeData = res.data;
                })
        }
    }
}
</script>

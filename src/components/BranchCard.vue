<template>
   <div class="card branch-card">
        <div class="image-body">
            <img src="https://st4.depositphotos.com/17828278/24401/v/450/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg" class="card-img-top" alt="Car 1">
        </div>
        <div class="card-body">
            <h5 class="card-title">{{branch.branchName}}</h5>
            <p class="card-text">
                <span>{{branch.location.province}}</span>,
                <span>{{branch.location.city}}</span>,
                <span>{{branch.location.streetNumber}}</span> |
                <span>{{branch.location.streetName}}</span>
            </p>
            <span class="mb-2">{{branch.yearOpened}}</span>

            <br/>

            
            <router-link id="secondary-btn" class="btn mb-2" style="margin-right: .5rem" :to="{name: 'edit-branch', params: {id: branch.branchId}}">
                Edit <i class="bi bi-file-earmark-text"></i>
            </router-link>

            
            <button id="tertiary-btn" class="btn mb-2" style="margin-right: .5rem" @click="handleDelete">Delete <i class="bi bi-trash"></i></button>
        </div>
    </div>
</template>

<script>
import service from '../services/ApiService'
export default {
    props: ['branch'],

    setup(props) {


        const handleDelete = () => {
            //service.delete(props.branch.id, 'branches')
            alert("deleting.." + props.branch.branchId)
        }


        return {
            handleDelete
        }
    }
}
</script>

<style>

</style>
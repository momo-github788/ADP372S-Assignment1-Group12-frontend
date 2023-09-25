<template>
  <div class="mb-3">
    <MultiSelect
      :v-model="selectedOptions"
      :options="options"
      :multiple="true"
      :close-on-select="true"
      placeholder="Pick some"
      label="name"
      track-by="name"
    />
  </div>
</template>

<script>
import { ref, defineProps, watch, onUpdated } from 'vue';

export default {

  props: {
    options: Array,
    selectedOptions: Array
  },
  setup(props, { emit }) {
    
    watch(props, (newVal) => {
      console.log("props")
      console.log(props)
    })


    // You can also watch for changes in the selectedOptions and emit events as needed
    // watch(selectedOptions, (newVal) => {
    //   emit('update:selectedOptions', newVal);
    // });

    return {

    };
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
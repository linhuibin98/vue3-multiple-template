<template>
    <ul class="todo-component">
        <li v-for="(item, index) in list" :key="index">
            <span v-if="!item.slot">{{item.title}}</span>
            <slot v-else :name="item.slot" v-bind="item" :index="index" />
        </li>
    </ul>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Todo',

    props: {
        list: {
            type: Array,
            default: () => [],
        },
    },

    setup() {
        return {
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
});
</script>

<style lang="scss" scoped>

</style>
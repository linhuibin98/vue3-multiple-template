<template>
    <div>
        <p>动态slot name 测试</p>
        <Todo :list="todos">
            <template v-slot:todo2="scopeProps">
                <span class="red">{{scopeProps.title}}</span>
            </template>
            <template v-slot:todo3="scopeProps">
                <span class="blue">{{scopeProps.title}}</span>
            </template>
        </Todo>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import Todo from '@/components/slot/todo.vue';

export default defineComponent({
    name: 'DynamicSlot',

    components: {
        Todo,
    },

    setup() {
        return {
            todos: [
                {
                    title: 'todo1',
                },
                {
                    title: 'todo2',
                    slot: 'todo2',
                },
                {
                    title: 'todo3',
                    slot: 'todo3',
                },
            ]
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
});
</script>

<style lang="scss" scoped>
.red {
    color: red;
}
.blue {
    color: blue;
}
</style>
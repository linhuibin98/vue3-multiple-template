<template>
    <div class="page">
        Page
    </div>
</template>

<script>
// 这是一个组件
export default {
    name: 'Ex',

    props: {
        // 名字
        name: {
            type: String,
            default: ''
        },
        // 年龄
        age: Number
    },

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
.page {
    background: #eee;
}
</style>
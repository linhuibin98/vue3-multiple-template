<template>
    <div class="page">
        Page
    </div>
</template>

<script>// 这是一个组件
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
        return {};
    },

    mounted() {
        this.$modal({
            content: '嗡嗡嗡'
        }).catch(err => {
            console.log(err);
        });

        $toast({
            content: '嗡嗡嗡'
        }).catch(err => {
            console.log(err);
        });
    },

    methods: {}
};
</script>

<style lang="scss" scoped>
.page {
    background: #eee;
}
</style>
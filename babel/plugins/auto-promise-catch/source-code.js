// export default {
//     data() {
//         return {

//         }
//     },
//     created() {

//     },
//     mounted() {

//     },
// }

// this.$modal({
//     content: '这是一个弹窗'
// }).then(() => {}).catch(e => e);

util.$modal({
    content: '这是一个弹窗1'
}).catch(err => {
    console.log(err);
});

$modal({
    content: '这是一个弹窗1.1'
}).catch(e => e);

$modal({
    content: '这是一个弹窗1.2'
})
    .then(() => {})
    .catch(err => {
        console.log(err);
    });

this.$modal({
    content: '这是一个弹窗2'
}).catch(err => {
    console.log(err);
});

util.$modal({
    content: '这是一个弹窗3'
})
    .then(() => {})
    .catch(err => {
        console.log(err);
    });

util.$modal({
    content: '这是一个弹窗4'
})
    .then(() => {})
    .catch(e => e);

util.$modal({
    content: '这是一个弹窗5'
}).catch(e => e);

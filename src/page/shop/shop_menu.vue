<template>
    <div>
        <div class="goods_information flex row" v-for="(item,index) in arr">

            <div>
                <img src="../../assets/images/img_expm.png">
            </div>
            <ul>
                <li class="hiddenT">芝士大装比萨</li>
                <li class="flex a-center">
                    <p>月售5666</p>
                    <img src="../../assets/icons/fill.png">
                    <span>18</span>
                </li>
                <li class="flex a-center">
                    <p>51P</p>
                    <span>52P</span>
                </li>
            </ul>

            <p class="flex j-center a-center">
                <i>
                    <img src="../../assets/icons/remove.png">
                </i>
                <span>6</span>
                <i>
                    <img src="../../assets/icons/add.png">
                </i>
            </p>

        </div>
    </div>
</template>

<script>
    import publicHeader from '../../components/public_header.vue';
    import { setCookie, getCookie, removeCookie } from '../../utils/cookies.js';
    export default {
        name: 'business_shop',
        data() {
            return {
                arr: ['', '', '', '', '', '', '']
            }
        },
        components: {

        },
        computed: {
            choose_address() {
                let choose_address = this.$t('choose_address');
                return choose_address;
            }
        },
        mounted() {

        },
        methods: {

        }
    }
</script>

<style scoped>
    .goods_information {
        width: 100%;
        padding: .3rem;
    }

    .goods_information:last-child {
        margin-bottom: 1.8rem;
    }

    .goods_information>div {
        width: 3.5rem;
        height: 2.7rem;
    }

    .goods_information>div>img {
        width: 3.5rem;
        height: 2.7rem;
    }

    .goods_information>ul {
        width: 5.5rem;
        height: 2.7rem;
    }

    .goods_information>ul>li:nth-child(1) {
        font-size: .5rem;
        color: #111;
        width: 5.5rem;
        padding: 0 .2rem;
    }

    .goods_information>ul>li:nth-child(2) {
        color: #A0A0A0;
        padding: .1rem .2rem;
    }

    .goods_information>ul>li:nth-child(2)>p {
        font-size: .3rem;
        margin-right: .4rem;
    }

    .goods_information>ul>li:nth-child(2)>img {
        width: .4rem;
        height: .4rem;
    }

    .goods_information>ul>li:nth-child(2)>span {
        font-size: .3rem;
    }

    .goods_information>ul>li:nth-child(3) {
        padding: 0 .2rem;
        margin-top: .5rem;
    }

    .goods_information>ul>li:nth-child(3)>p {
        font-size: .55rem;
        color: #FF3C39;
        margin-right: .4rem;
    }

    .goods_information>ul>li:nth-child(3)>span {
        font-size: .3rem;
        color: #A0A0A0;
        text-decoration: line-through
    }

    .goods_information>p {
        width: 3rem;
        height: 2.7rem;
    }

    .goods_information>p>span {
        padding: .2rem;
        font-size: .5rem;
    }

    .goods_information>p>i {
        width: .8rem;
        height: .8rem;
    }

    .goods_information>p>i>img {
        width: 100%;
        height: 100%;
    }
</style>
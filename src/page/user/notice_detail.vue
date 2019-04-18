<template>
    <div class="notice_detail">
        <div class="header">
            <div class="back" @click="back"><img src="../../assets/icons/icon_arrows_left@2x.png" alt=""></div>
            <div class="title">
                {{notice.title}}
            </div>
        </div>
        <div class="content">
            <div class="title">Has been sent order</div>
            <div>dfjklfhjkdfjkdfbjkdbgjkdjkb nmbjksdbfjdksfhbjdskfbdjfbvbv u</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'notice_detail',
    data() {
        return {}
    },
    computed: {
        notice() {
            let notice = this.$t('notice')
            return notice
        }
    },
    methods: {
        back() {
            this.$router.go(-1)
        }
    }
    
}
</script>
<style scoped lang="scss">
    .notice_detail {
        .header {
            text-align: center;
            padding: 12px 15px;
            position: relative;
            border-bottom: 1px solid #DDDDDD;
            .back {
                width: 12px;
                float: left;
                margin-top: 2px;
                img {
                    width: 100%;
                }
            }
            .title {
                font-size: 18px;
                color: #666;
            }
        }
        .content {
            background: #fff;
            height: 94vh;
            padding: 20px 15px;
            .title {
                font-size: 20px;
                font-weight: bold;
                height: 40px;
                line-height: 40px;
                color: #333;
            }
            div {
                &:last-child {
                    margin-top: 10px;
                    color: #666;
                }
            }
        }
    }
</style>

<template>
    <transition name="toast">
        <div class="toast" v-if="visible">
            <!--文字-->
            <div v-if="type == 'message'" class="message">
                {{message}}
            </div>
            <!--成功-->
            <div v-if="type == 'success'" class="with-icon">
                <p>{{message}}</p>
            </div>
            <!--失败-->
            <div v-if="type == 'error'" class="with-icon">
                <p>{{message}}</p>
            </div>
            <!--警告-->
            <div v-if="type == 'warning'" class="with-icon">
                <p>{{message}}</p>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'toast',
        data() {
            return {
                visible: false,
                type: null,
                message: null,
                timer: null,
                duration: 2000,
            }
        },
        methods: {
            show(message) {
                if (this.timer) clearTimeout(this.timer)
                this.type = 'message'
                this.visible = true
                this.message = message
                this.timer = setTimeout(() => {
                    this.close()
                }, this.duration)
            },
            loading(message) {
                if (this.timer) clearTimeout(this.timer)
                this.type = 'loading'
                this.visible = true
                this.message = message
            },
            success(message) {
                if (this.timer) clearTimeout(this.timer)
                this.type = 'success'
                this.visible = true
                this.message = message
                this.timer = setTimeout(() => {
                    this.close()
                }, this.duration)
            },
            error(message) {
                if (this.timer) clearTimeout(this.timer)
                this.type = 'error'
                this.visible = true
                this.message = message
                this.timer = setTimeout(() => {
                    this.close()
                }, this.duration)
            },
            warning(message) {
                if (this.timer) clearTimeout(this.timer)
                this.type = 'warning'
                this.visible = true
                this.message = message
                this.timer = setTimeout(() => {
                    this.close()
                }, this.duration)
            },
            close() {
                if (this.timer) clearTimeout(this.timer)
                this.visible = false
            }
        }
    }
</script>
<style scoped>
    .toast {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, .7);
        padding: 0.2rem 0.6rem;
        border-radius: 6px;
        z-index: 999999;
        color: #fff;
    }

    .message {
        font-size: 14px;
    }

    .with-icon img {
        border-radius: 50%;
        width: 30px;
        height: 30px;
    }

    .with-icon p {
        font-size: 13px
    }

    .loading_gif_box {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 999999;
    }

    .loading_gif {
        width: 100%;
        height: 100%;
        background: #ffffff;
        position: fixed;
        top: 0;
        left: 0;
        text-align: center;
        z-index: 999999;
        padding-top: 40%;
    }

    .loading_gif img {
        margin-bottom: 10px;
    }

    .toast-enter-active,
    .toast-leave-active {
        transition: opacity 0.5s;
    }

    .toast-enter,
    .toast-leave-to {
        opacity: 0;
    }
    @media screen and (max-width: 329px){
        .message {
            font-size: 14px;
        }
    }
</style>
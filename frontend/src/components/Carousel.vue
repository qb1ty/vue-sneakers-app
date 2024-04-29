<template>
    <div class="relative">
        <div @click="leftMove($event)">
            <img ref="arrowLeft" src="/arrow-left.svg" alt="arrow-left" class="absolute top-[140px] left-[35px] z-10 cursor-pointer w-10">
        </div>
            <div ref="container" class="flex justify-center items-center overflow-hidden w-[960.18px] h-[350px] relative mx-auto mt-10">
                <div ref="sidebar" class="transition-transform duration-300 ease flex items-center justify-center absolute left-[0] mb-10">
                    <div class="bg-[url('/carousel.jpeg')] bg-no-repeat h-[300px] w-[960.18px]"></div>
                    <div class="bg-[url('/carousel.jpeg')] bg-no-repeat h-[300px] w-[960.18px]"></div>
                    <div class="bg-[url('/carousel.jpeg')] bg-no-repeat h-[300px] w-[960.18px]"></div>
                </div>
            </div>
        <div @click="rigthMove($event)">
            <img ref="arrowRight" src="/arrow-right.svg" alt="arrow-right" class="absolute top-[140px] right-[36px] z-10 cursor-pointer w-10">
        </div>
    </div>
    
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: 0,
                childrens: 0
            }
        },
        methods: {
            rigthMove() {
                this.moveingSlide('right')
            },
            leftMove() {
                this.moveingSlide('left')
            },
            moveingSlide(direction) {
                this.childrens = this.$refs.sidebar.children.length
                if (direction === 'right') {
                    this.activeIndex++
                    if (this.activeIndex === this.childrens) {
                        this.activeIndex = 0
                    }
                } else if (direction === 'left') {
                    this.activeIndex--
                    if (this.activeIndex < 0) {
                        this.activeIndex = this.childrens - 1
                    }
                }

                const width = this.$refs.container.clientWidth


                this.$refs.sidebar.style.transform = `translateX(-${this.activeIndex * width}px)`
            }
        }
    }
</script>
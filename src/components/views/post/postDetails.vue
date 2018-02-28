<template>
    <div class="">
        <v-goBack></v-goBack>
        {{dispose}}
    </div>
</template>
<script>
import goBack from '@/components/goBack';
export default {
    data () {
        return {
            dispose:""
        }
    },
    created () {
        var dispose=this.$route.query.dispose;
        if (dispose===1) {
            this.dispose="未处理会员"
        }else if(dispose===2)  {
            this.dispose="已处理会员"
        }
    },
    components: {
        "v-goBack":goBack
    }
}
</script>
<style scoped>

</style>
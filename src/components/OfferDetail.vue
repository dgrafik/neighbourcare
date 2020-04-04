<template>
<div>
    <h2>{{selectedOffer.title}}</h2>
    <p>{{selectedOffer.content}}</p>
    <h3>User Info</h3>
    <h4>{{selectedOffer.user.name}}</h4>
    <h4>{{selectedOffer.user.phone}}</h4>
    <h4>{{selectedOffer.user.address}}</h4>
</div>
</template>

<script>
    export default {
        name: "OfferDetail",
        props: {
            selectedOffer: {
                type: Object
            }
        }
    }
</script>

<style scoped>

</style>

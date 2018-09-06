<template>
    <q-tabs color="secondary"  two-lines>
    <q-route-tab
        label="Snacks &amp; Drinks" slot="title"
        to="/shop/snacks" exact
    />
    <q-route-tab
        label="Free Samples" slot="title"
        to="/shop/samples" exact
    />
    <q-route-tab
        label="Electronic Goods" slot="title"
        to="/shop/electronics" exact
    />
    <q-route-tab
        label="Personal Care" slot="title"
        to="/shop/personal" exact
    />
    </q-tabs>
</template>

<script>
export default {
  name: 'StoreMenu',
}
</script>
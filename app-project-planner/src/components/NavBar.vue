<script>
</script>

<template>
    <nav class="main-nav">
        <router-link to="/">Home</router-link>
        <router-link :to="{ name: 'AddProject' }">Add a new project</router-link>
    </nav>
</template>

<style scoped>
.main-nav {
    text-align: center;
    margin: 40px auto;
}
.main-nav a {
    display: inline-block;
    text-decoration: none;
    margin: 0 10px;
    color: #999;
    font-size: 18px;
}
a.router-link-active {
    border-bottom: 2px solid #009986;
    padding-bottom: 4px;
    color: #009986;
    font-weight: bold;
}
</style>

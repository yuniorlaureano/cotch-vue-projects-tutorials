<template>
    <div class="card">
        <div class="card-content">
            <slot name="title"></slot>
            <slot name="content"></slot>            
        </div>
        <footer class="card-footer">
            <a class="card-footer-item" :href="post.link" target="_link">Read More</a>
        </footer>
    </div>
</template>
<script>
export default {
    props:['post']
}
</script>

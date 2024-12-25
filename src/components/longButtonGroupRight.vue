<script setup lang="ts">

</script>

<template>
  <div id="longButtonGroupRight">
    <div class="longButtonGroupRight">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.longButtonGroupRight {
  display: flex;
  margin-bottom: 20px;
  justify-content: right;
}
</style>
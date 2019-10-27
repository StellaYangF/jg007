<template>
    <ul>
        <!-- 默认插槽是没有名字 -->
        <slot name="default"></slot>
    </ul>
</template>
<style>
  ul {
    padding: 5px 20px !important;
    list-style-type: none;
  }
</style>
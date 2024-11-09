<template>
  <div class="dictionary-section">
    <div class="dictionary-container">
      <div v-for="(item, index) in dictionary" 
           :key="index"
           :class="['tag-item', item.type === 'primary' ? 'gray' : 'green']">
        <span class="en">{{ item.en }}</span>
        <span class="zh">{{ item.zh }}</span>
      </div>
    </div>
  </div>
</template> 
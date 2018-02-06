<template>
  <el-color-picker
    class="theme-picker"
    popper-class="theme-picker-dropdown"
    v-model="color">
	</el-color-picker>
</template>

<script>
export default{
	data(){
		return {
			color: '#409EFF',
		}
	}
}
</script>
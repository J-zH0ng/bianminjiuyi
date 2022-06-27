<template>
	<view class="cell-item bg-theme fs-26">
		{{contentText}}
	</view>
</template>

<script>
	export default {
		name: "tag",
		props: ["contentText"],
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.cell-item {
		width: calc(fit-content);
		height: 30rpx;
		border-radius: 12rpx;
		color: #fff;
		line-height: 30rpx;
		text-align: center;
		box-shadow: 2rpx 2rpx 2rpx 2rpx rgba(0, 0, 0, 0.4);
	}
</style>

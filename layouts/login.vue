<template>
  <div>
    <div class="flex h-screen">
      <div class="left-side display-none w-2/4 md:inline">
        <img src="~/assets/images/logo.png" class="px-10 py-10 w-auto h-auto" />
      </div>
      <div class="grid w-2/4 content-center h-screen">
        <slot />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.left-side {
  background-image: url("~/assets/images/backgrounds/login-left.svg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

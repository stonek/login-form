<template>
  <div>
    <div class="flex h-screen">
      <div
        class="left-side display-none w-1/2 md:inline px-10 py-10 justify-items-center align-baseline"
      >
        <div class="mx-auto w-100">
          <img src="~/assets/images/logo.png" class="w-auto h-auto" />
          <div class="content-center py-100">
            <h1
              class="text-stone-700 text-40px font-bold tracking-tight text-gray-900 mb-4 leading-9"
            >
              Digitální kancelář
            </h1>
            <h2
              class="text-stone-700 text-24px racking-tight text-gray-900 mb-4 leading-7"
            >
              Šetří Váš čas i peníze
            </h2>
          </div>
        </div>
      </div>
      <div
        class="grid w-screen h-screen md:w-1/2 content-center bg-white align-baseline justify-items-center"
      >
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

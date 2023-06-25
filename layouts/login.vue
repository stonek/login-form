<template>
  <div>
    <div class="flex h-screen">
      <div
        class="left-side display-none w-1/2 md:inline px-10 py-10 justify-items-center align-baseline"
      >
        <div class="flex flex-col h-100">
          <img src="~/assets/images/logo.png" class="w-fit" />
          <div class="content-center align-text-bottom mt-auto">
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
        class="right-side w-screen h-screen md:w-1/2 bg-white align-baseline justify-items-center px-5px md:px-10 md:py-10"
      >
        <div class="grid h-screen place-items-center">
          <img src="~/assets/images/logo.png" class="w-fit md:display-none" />
          <div>
            <slot />
          </div>
        </div>
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

.right-side {
  .logo {
    display: none;
  }
  @media only screen and (max-width: 767px) {
    background-image: url("~/assets/images/backgrounds/login-right-mobile.png");
    background-repeat: no-repeat;
    background-size: cover;
    .logo {
      display: block;
    }
  }
}
</style>

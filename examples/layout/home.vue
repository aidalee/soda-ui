<template>
  <div>
    <h2>基于vue3的移动端UI组件库</h2>
    <p>更小的体积，更快的响应，更强的拓展性</p>
    <div class="btn-groups">
      <so-button>yyyyy</so-button>
      <so-button>yyyyy</so-button>
    </div>
    <section class="feature">
      <div>
        <h3>更小的体积</h3>
      </div>
      <div>
        <h3>更快的响应</h3>
      </div>
      <div>
        <h3>更强的拓展性</h3>
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped>
h2,
p {
  text-align: center;
}
.btn-groups {
  width: 260px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .so-button {
    width: 120px;
  }
}
.feature {
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    padding: 0 15px;
  }
}
</style>

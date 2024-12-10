<template>
  <div class="card border-0 mb-3 px-2 font-inter">
    <nav class="card-body navbar navbar-expand navbar-light">
      <div class="navbar-nav">
        <router-link class="nav-link position-relative" to="/">Bus Lines</router-link>
        <router-link class="nav-link position-relative" to="/stops">Stops</router-link>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.card-body {
  padding-top: 12px;
  padding-bottom: 12px;
}

.navbar-expand .navbar-nav .nav-link {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  font-size: 14px;
  font-weight: 500;
}

.nav-link:hover,
.router-link-active {
  color: black !important;
}

.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--bs-primary);
}
</style>
<template>
  <main class="main-container-bg">
    <div class="u-container mx-4 xl:mx-auto xl:w-9/12">
      <section class="rounded-3xl overflow-hidden">
        <header>
          <img src="@/assets/images/login-header.png" class="w-full" />
        </header>
        <article class="grid text-center gap-6 bg-white bg-opacity-90 p-6 pb-10">
          <img
            src="@/assets/images/LOGO.png"
            alt="LOGO"
            class="mx-auto w-32 xl:w-auto xl:mb-4"
          />

          <form @submit.prevent="loginAdmin()" class="grid gap-5 w-full xl:w-1/3 mx-auto">
            <label>
              <span class="text-sm xl:text-lg font-bold mb-3 block">Usuario</span>
              <input
                v-model="usuario"
                type="text"
                class="outline-none focus:ring focus:ring-main-red transition-colors py-4 px-4 xl:px-8 rounded-full w-full text-sm xl:text-lg"
                placeholder="Admin"
                required
              />
            </label>
            <label>
              <span class="text-sm xl:text-lg font-bold mb-3 block">Contraseña</span>
              <input
                v-model="password"
                type="password"
                class="outline-none focus:ring focus:ring-main-red transition-colors py-4 px-4 xl:px-8 rounded-full w-full text-sm xl:text-lg"
                placeholder="Contraseña"
                required
              />
            </label>
            <button
              type="submit"
              class="py-3 xl:py-4 px-12 rounded-full text-white bg-main-red xl:text-lg font-bold mt-4 mx-auto w-min"
            >
              Ingresar
            </button>
          </form>
        </article>
      </section>
    </div>
  </main>
</template>
<script>
import { adminService } from "@/service/admin.service";

export default {
  data() {
    return {
      usuario: "",
      password: "",
    };
  },
  methods: {
    async loginAdmin() {
      var admin = new Object();
      admin.name = this.usuario;
      admin.password = this.password;
      var dataAdmin = await adminService.loginAdmin(admin);
      if (dataAdmin.success === true) {
        const token = "TF96581trnmjxsFT30145213985412MAKJHDYYAH5456YJG";
        this.$cookies.set("sessionAdmin", token, 60);
        this.$router.push({ name: "Dashboard" });
      } else {
        alert("Error");
      }
    },
  },
};
</script>

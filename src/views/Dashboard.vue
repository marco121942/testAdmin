<template>
  <main class="main-container-bg">
    <div class="u-container mx-4 xl:mx-0 xl:w-9/12">
      <section class="rounded-3xl overflow-hidden">
        <header class="relative py-6">
          <img
            src="@/assets/images/login-header.png"
            class="absolute inset-0 w-full h-full"
          />
          <div class="bg-black bg-opacity-80 absolute inset-0 z-10"></div>

          <div
            class="flex items-center justify-between gap-4 text-white relative z-20 px-3 xl:px-16"
          >
            <div class="flex items-center justify-center gap-2 xl:gap-6">
              <h1 class="font-berkshire text-4xl xl:text-7xl">Chelómetro</h1>
              <img src="@/assets/images/chelometro-icon.png" class="w-14 xl:w-auto" />
            </div>
            <button
              @click.prevent="logout"
              class="xl:py-4 xl:px-12 xl:rounded-full text-white text-xl xl:bg-main-red font-bold"
            >
              <span class="hidden xl:block">Cerrar Sesión</span>
              <img
                src="@/assets/images/icon-log-out.png"
                alt="Cerrar sesion"
                class="w-12 xl:hidden"
              />
            </button>
          </div>
        </header>
        <article class="bg-white bg-opacity-90 px-8 py-10 xl:p-24 xl:pt-10">
          <!-- Buscador -->
          <form
            @submit.prevent="foundUser()"
            class="flex flex-col xl:flex-row gap-5 xl:gap-6 items-end mb-10 xl:mb-12 xl:px-24"
          >
            <label class="w-full relative">
              <span class="xl:text-2xl font-bold mb-3 block font-bold"
                >Busca al <span class="text-main-red">chelero</span></span
              >
              <input
                v-model="userDni"
                type="text"
                class="outline-none border border-main-brown-light focus:ring focus:ring-main-brown-light transition-colors py-4 px-4 pl-14 xl:px-8 xl:pl-20 rounded-full w-full text-sm xl:text-lg"
                placeholder="73980025"
                required
              />
              <img
                src="@/assets/images/icon-search.png"
                class="absolute bottom-3 xl:bottom-4 left-4 xl:left-6"
              />
            </label>
            <button
              type="submit"
              class="py-3 xl:py-4 px-12 rounded-full text-white bg-main-red xl:text-lg font-bold mx-auto xl:mx-0"
            >
              Buscar
            </button>
          </form>
          <!-- Tabla -->
          <div class="mb-6">
            <header
              class="hidden xl:grid grid-cols-4 gap-4 px-16 py-2 text-white text-xl font-bold bg-main-brown-light rounded-tl-2xl rounded-tr-2xl"
            >
              <h4>Nickname</h4>
              <h4>Documento</h4>
              <h4>Chelas Acumuladas</h4>
              <h4 class="text-center">¿Seleccionar?</h4>
            </header>
            <div
              class="xl:border xl:border-main-brown-light rounded-bl-2xl rounded-br-2xl xl:px-16 xl:py-10"
            >
              <span v-for="user in dataUser" :key="user">
                <div class="h-px w-full bg-main-brown bg-opacity-20 mb-6 xl:hidden"></div>
                <div
                  class="grid grid-cols-2 xl:grid-cols-4 items-start xl:items-center gap-y-10 xl:gap-4 py-2 xl:text-xl mb-3"
                >
                  <p>
                    <span class="text-main-brown-light font-bold block xl:hidden"
                      >Nickname</span
                    >
                    {{ user.nickname }}
                  </p>
                  <p>
                    <span class="text-main-brown-light font-bold block xl:hidden"
                      >Documento</span
                    >
                    {{ user.dni }}
                  </p>
                  <p>
                    <span
                      class="text-xs mt-1 mb-2 text-main-brown-light font-bold block xl:hidden"
                      >Chelas acumuladas</span
                    >
                    {{ user.contador_chela }}
                  </p>
                  <!-- Activo -->
                  <div>
                    <span class="text-main-red font-bold block xl:hidden mb-2"
                      >¿Seleccionar?</span
                    >
                    <div
                      @click.prevent="selectUser(user)"
                      :class="
                        user.status
                          ? 'bg-main-black ring-main-black'
                          : 'bg-gray-300 ring-gray-300'
                      "
                      class="flex items-center justify-center xl:mx-auto h-8 xl:h-12 w-8 xl:w-12 rounded-lg xl:rounded-xl ring ring-offset-2 cursor-pointer transition-colors"
                    >
                      <img
                        :class="user.status ? '' : 'opacity-0'"
                        src="@/assets/images/icon-check.png"
                        class="w-6 xl:w-8 transition-opacity"
                      />
                    </div>
                  </div>
                </div>
                <div class="h-px w-full bg-main-brown bg-opacity-20 mb-6 xl:hidden"></div>
              </span>
            </div>
          </div>
          <!-- Detalles -->
          <footer class="xl:px-24">
            <h2 class="xl:text-2xl font-bold mb-3 block font-bold mb-10 hidden xl:block">
              ¿Cuantas chelas vas a <span class="text-main-red">Canjear</span>?
            </h2>
            <div class="flex flex-col xl:flex-row items-center gap-4">
              <p
                class="underline border shadow-sm rounded-2xl bg-white text-center text-main-red font-bold text-3xl py-3 px-32"
              >
                {{ descontar }}
              </p>
              <button
                @click.prevent="descontarChela()"
                class="py-3 xl:py-4 px-12 rounded-full text-white xl:text-xl bg-main-brown-light font-bold"
              >
                Descontar
              </button>
            </div>
          </footer>
          <footer class="border border-gray-300 shadow-sm py-4 text-center" v-if="error">
            <h2 class="xl:text-2xl font-bold font-bold">
              <span class="text-main-red">Lo sentimos</span>, solo puede canjear 01 chela
              por día. Inténtalo mañana.
            </h2>
          </footer>
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
      userDni: "",
      dataUser: [],
      descontar: 1,
      userSelect: null,
      error: false,
    };
  },
  methods: {
    async descontarChela() {
      this.error = false;
      if (this.userSelect !== null) {
        const fecha = new Date();
        const day = fecha.getDate();
        const mounth = fecha.getMonth() + 1;
        const year = fecha.getFullYear();
        const fechaReclamo = day + "/" + mounth + "/" + year;
        var dataUser = new Object();
        dataUser.user_id = this.userSelect.id;
        dataUser.invitation_code = this.userSelect.invitation_code;
        dataUser.cantidad_chela = this.descontar;
        dataUser.fecha_reclamo = fechaReclamo;
        var dataAdmin = await adminService.descontar(dataUser);
        if (dataAdmin.success === true) {
          alert("Se reclamó una chela");
          this.dataUser = [];
          this.userSelect = null;
          this.error = false;
        }
        if (dataAdmin.success === false) {
          this.dataUser = [];
          this.userSelect = null;
          if (dataAdmin.data === "solo uno") {
            this.error = true;
          } else {
            alert("Error");
          }
        }
      } else {
        alert("Seleccione un usuario");
      }
    },
    selectUser(data) {
      this.dataUser.forEach((value) => {
        if (value.id === data.id) {
          value.status = true;
          this.userSelect = value;
        } else {
          value.status = false;
        }
      });
    },
    async foundUser() {
      this.error = false;
      var dataAdmin = await adminService.foundUser(this.userDni);
      if (dataAdmin.success === true) {
        if (dataAdmin.data.length !== 0) {
          this.dataUser = dataAdmin.data;
          this.dataUser.forEach((value) => {
            value.status = false;
          });
        } else {
          alert("Usuario no Encontrado");
        }
      }
      if (dataAdmin.success === false) {
        this.dataUser = [];
        this.userSelect = null;
        alert("Error");
      }
    },
    logout() {
      this.error = false;
      this.$cookies.remove("sessionAdmin");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

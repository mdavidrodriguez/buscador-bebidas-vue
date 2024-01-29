import { ref, onMounted, reactive, computed } from "vue";
import { defineStore } from "pinia";
import APIService from "../services/APIService";
import { useModalStore } from "./modal";
export const useBebidasStore = defineStore("bebidas", () => {
  const modal = useModalStore();
  const categorias = ref([]);
  const busqueda = reactive({
    nombre: "",
    categoria: "",
  });

  onMounted(async function () {
    const {
      data: { drinks },
    } = await APIService.obtenerCategorias();
    categorias.value = drinks;
  });
  const recetas = ref([]);
  const receta = ref({});

  async function obtenerRecetas() {
    const {
      data: { drinks },
    } = await APIService.buscarRecetas(busqueda);
    recetas.value = drinks;
  }

  async function seleccionarBebida(id) {
    const {
      data: { drinks },
    } = await APIService.buscarReceta(id);
    receta.value = drinks[0];
    modal.handleClikModal();
  }

  const noRecetas = computed(() => recetas.value.length === 0);

  return {
    categorias,
    busqueda,
    recetas,
    receta,
    seleccionarBebida,
    obtenerRecetas,
    noRecetas,
  };
});

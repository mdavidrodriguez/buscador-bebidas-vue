import { ref, computed } from "vue";
import { useFavoritosStore } from "./favoritos";
import { useBebidasStore } from "./bebidas";

import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", () => {
  const favoritos = useFavoritosStore();
  const bebidas = useBebidasStore();
  const modal = ref(false);
  function handleClikModal() {
    modal.value = !modal.value;
  }
  const textoBoton = computed(() => {
    return favoritos.existeFavorito(bebidas.receta.idDrink)
      ? "Eliminar de Favoritos"
      : "Agregar a Favoritos";
  });
  return {
    modal,
    handleClikModal,
    textoBoton,
  };
});

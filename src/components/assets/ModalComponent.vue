<template>
  <transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-container">
        <div class="modal-header">
          <h3>{{ title }}</h3>
          <button class="close-button" @click="closeModal">
            <XMarkIcon class="icon" />
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button @click="closeModal" class="cancel-btn">Fechar</button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { XMarkIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'ModalComponent',
  components: {
    XMarkIcon
  },
  props: {
    isOpen: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: 'Modal'
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  border: 3px solid #d3c8f1;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #d9cff5;
  border-bottom: 2px solid #e7e7e7;
}

.modal-header h3 {
  background-color: transparent;
  color: #f08cae;
  margin: 0 auto;
  font-size: 1.25rem;
}

.modal-header .close-button {
  background-color: transparent;
  color: #5a6472;
}
.modal-header .close-button:hover {
  color: #e74c3c;
  transition: color 0.2s;
}

.icon {
  width: 20px;
  height: 20px;
  background-color: transparent;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
}

.modal-body {
  background-color: #d9cff5;
  padding: 20px;
}

.modal-footer {
  padding: 15px 20px;
  background-color: #d9cff5;
  border-top: 2px solid #e7e7e7;
  text-align: right;
}

.cancel-btn {
  padding: 8px 16px;
}

/* Transições */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>

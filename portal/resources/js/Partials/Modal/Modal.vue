<template>
  <Teleport to="body">
    <div
      class="modal overflow-y-auto"
      :class="{ show: visible }"
      tabindex="-1"
      aria-hidden="false"
      v-bind="$attrs"
      @keydown.esc="handleCloseClick"
    >
      <div
        class="modal-dialog"
        :class="sizeClass"
        :style="[customWidth ? `width: ${customWidth}px` : '']"
      >
        <div class="modal-content relative">
          <section class="modal-header bg-white z-[5] rounded-md" ref="header">
            <slot name="header" />
            <a
              v-if="showClose"
              class="cursor-pointer ml-auto"
              data-test="modal-close-btn"
              @click="handleCloseClick"
            >
              <XIcon class="w-8 h-8 text-slate-400" />
            </a>
          </section>
          <section
            class="modal-body py-0 overflow-y-scroll"
            :class="bodyClass"
            :style="computedBodyStyle"
          >
            <slot name="body" />
          </section>
          <section
            v-if="showFooter"
            class="modal-footer w-full bg-white z-[9] rounded-md"
            ref="footer"
          >
            <slot name="footer" />
          </section>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import useModalBodyHeight from './useModalBodyHeight'
import { isMobile } from '../../Helpers/Mobile'

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'lg' | 'xl' | 'full' | 'fit' | 'cover' | null
    showClose?: boolean
    customWidth?: number | null
    bodyClass?: string | string[] | null
    showFooter?: boolean
  }>(),
  {
    size: null,
    showClose: true,
    customWidth: null,
    bodyClass: null,
    showFooter: true,
  }
)

const header = ref<HTMLElement>()
const footer = ref<HTMLElement>()

const bodyHeight = useModalBodyHeight(header, footer)

const isMob = isMobile()
const computedBodyStyle = computed(() => {
  return isMob ? `height: ${bodyHeight.value}px;` : ''
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return `modal-sm`
    case 'lg':
      return `modal-lg`
    case 'xl':
      return `modal-xl`
    case 'full':
      return `modal-full`
    case 'fit':
      return `modal-fit`
    case 'cover':
      return 'modal-cover'
    default:
      return ''
  }
})

const visible = ref(false)

const emit = defineEmits(['close'])

const handleCloseClick = () => {
  visible.value = false
  setTimeout(() => {
    emit('close')
  }, 400)
}

const disableBodyScroll = () => {
  document.querySelector('body')!.style.overflow = 'hidden'
}
const enableBodyScroll = () => {
  document.querySelector('body')!.style.overflow = 'auto'
}
onMounted(() => {
  setTimeout(() => {
    visible.value = true
  }, 0)
  disableBodyScroll()
})
onBeforeUnmount(() => {
  enableBodyScroll()
})
</script>

<style lang="scss" scoped>
/* styles that would be added to modal automatically if it was opened
by clicking on element with data-tw-toggle="modal" attribute */
.modal {
  display: block;
  margin-top: 0;
  margin-left: 0;
  z-index: 10000;
  visibility: visible;
  opacity: 0;
  transition: opacity 0.4s ease-in-out 0s;

  &.show {
    opacity: 1;
  }
}

.modal-dialog {
  transition: margin-top 0.4s;
  margin-top: -4rem;

  .show {
    margin-top: 4rem;
  }
}

@media (max-width: 767px) {
  .modal {
    .modal-dialog {
      width: 100%;
      margin-top: 0;
      margin-bottom: 0;
    }
    .modal-content {
      border-radius: 0;
      height: 100vh;
    }

    &.show {
      .modal-dialog {
        margin-top: 0;
      }
    }
  }
}

.modal-full {
  width: calc(100% - 64px) !important;
}

@media (min-width: 768px) {
  .modal-fit {
    width: fit-content !important;
  }
}

.modal-cover {
  margin: 0 !important;
  width: 100% !important;
}
</style>

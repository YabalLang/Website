import type { Ref } from 'vue'

export const useEditor = () => {
  return useState<EditorState>('editor', () => ({ visible: false }))
}

export const useSetEditorCode = () => {
  const state = useEditor()

  return (code: string) => {
    state.value.visible = true
    state.value.code = code
    window.dispatchEvent(new CustomEvent('yabal:update_editor'));
  }
}

interface EditorState {
    visible: boolean
    code?: string
}

export const useDarkTheme = () => {
  return useState<boolean>('dark-theme', () => false)
}

export const useWindowEvent = (event: string, callback: () => void, options?: { onMount?: boolean }) => {
  window.addEventListener(event, callback)

  if (options?.onMount) {
    onMounted(callback)
  }

  onUnmounted(() => window.removeEventListener(event, callback))
}
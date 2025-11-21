<template>
  <div class="example-container">
    <h1>Vue Hot Toast Örnekleri</h1>
    
    <div class="button-group">
      <button @click="showBasicToast">Basit Toast</button>
      <button @click="showSuccessToast">Başarı Toast</button>
      <button @click="showErrorToast">Hata Toast</button>
      <button @click="showLoadingToast">Yükleniyor Toast</button>
      <button @click="showCustomToast">Özel Toast</button>
      <button @click="showPromiseToast">Promise Toast</button>
    </div>

    <Toaster />
  </div>
</template>

<script setup>
import { Toaster, toast, successToast, errorToast, loadingToast, customToast, promiseToast, dismissToast } from 'vue-hot-toast'

const showBasicToast = () => {
  toast('Merhaba Dünya!')
}

const showSuccessToast = () => {
  successToast('İşlem başarıyla tamamlandı!')
}

const showErrorToast = () => {
  errorToast('Bir hata oluştu!')
}

const showLoadingToast = () => {
  const id = loadingToast('Yükleniyor...')
  setTimeout(() => {
    dismissToast(id)
    successToast('Yükleme tamamlandı!')
  }, 3000)
}

const showCustomToast = () => {
  customToast('Özel toast mesajı', {
    duration: 5000,
    position: 'bottom-right',
    style: {
      background: '#363636',
      color: '#fff',
    },
    icon: '🎉',
  })
}

const showPromiseToast = () => {
  const fakeApiCall = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Veri başarıyla kaydedildi!' })
      }, 2000)
    })
  }

  promiseToast(
    fakeApiCall(),
    {
      loading: 'Kaydediliyor...',
      success: (data) => data.message,
      error: 'Kaydetme başarısız oldu',
    }
  )
}
</script>

<style scoped>
.example-container {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 2rem;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

button {
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

button:hover {
  background: #2563eb;
}
</style>


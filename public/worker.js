console.log('Service Worker 2')

self.addEventListener('push', e => {
    console.log('push')
    const data = e.data.json()
    console.log('data: ', data)
    self.registration.showNotification(data.title,{
        body: data.message,
        icon: './img/icons/android-chrome-192x192.png'
    })
})

self.addEventListener('notificationclick', e => {
    clients.openWindow('/#/app?travelAccept=1')
})
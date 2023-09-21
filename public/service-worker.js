self.addEventListener('notificationclose', event => {
  	const notification = event.notification;
  	const primaryKey = notification.data.primaryKey;
});

self.addEventListener('notificationclick', event => {

  const notification = event.notification;
  const primaryKey = notification.data.primaryKey;
  const url = notification.data.url;
  const action = event.action;
  
  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow(url);   
    notification.close();
  }
  	self.registration.getNotifications().then(notifications => {
  		notifications.forEach(notification => {
    		notification.close();
  		});
	});

});

self.addEventListener('push', event => {
	var payload = JSON.parse(event.data.text())
	var title = payload.title;
    var body  = payload.body;
	var url = payload.url;
    var icon  = payload.icon;
	
    console.log('Received a push message', payload);
	const options = {
    	body: body,
    	icon: icon,
    	vibrate: [100, 50, 100],
    	data: {
      		dateOfArrival: Date.now(),
      		primaryKey: 1,
          url: url
    	},
    	actions: [
      	{
      		action: 'explore', title: 'Go to the site',
        	icon: 'images/checkmark.png'
        },
      	{
      		action: 'close', title: 'Close the notification',
        	icon: 'images/xmark.png'
        },
    	]
  	};

  	event.waitUntil(
    	clients.matchAll().then(c => {
			self.registration.showNotification(title, options);
  		})
  	);
});


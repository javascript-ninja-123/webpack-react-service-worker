import uuid from 'uuid'


self.addEventListener('message', e => {
  if(e.data === 'shoutdown'){
    self.close();
  }
  self.postMessage(uuid())
})

import { http } from './http'
import  venomService from './services/venom';

http.get('/start', async () => {
  await venomService()

  return console.log('Mensagens Enviadas para Lista de Números')
})
import * as venom from 'venom-bot';
import start from './sendMessage';

const venomStartClient = () => venom.create().then((client) => start(client));

export default venomStartClient
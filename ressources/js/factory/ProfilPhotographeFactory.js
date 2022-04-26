import { Photographe} from '../models/Photographe.js';

class ProfilPhotographeFactory {
  constructor(photographers, idURL) {
    return new Photographe(photographers, idURL);
  }
}

export {ProfilPhotographeFactory};
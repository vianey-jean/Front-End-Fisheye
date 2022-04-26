import { Photographe} from '../models/Photographe.js';

class PhotographesFactory {
  constructor(photographers) {
    return new Photographe(photographers);
  }
}

export {PhotographesFactory};

/** @ServerlessRoute /videogames */
export {create as createVideogame} from './services/videogamesService';

/** @ServerlessRoute /videogames/search */
export {search as searchVideogames} from './services/videogamesService';

/** @ServerlessRoute /es/status */
export {ping} from './services/elasticsearchService';

/** @ServerlessRoute /videogames/bulkDummyData */
export {bulkDummyData as bulkDummyVideogamesData} from './services/videogamesService';

/** @ServerlessRoute /videogames/resetIndex */
export {resetIndex as resetVideogamesIndex} from './services/videogamesService';

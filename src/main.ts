import './style.css'
import { TableCreator } from './ts/TableCreator';
import { CarouselHandler } from './ts/CarouselHanlder';


const tableCreator = new TableCreator();

tableCreator.populateTable(1);
tableCreator.populateTable(2);

const carouselHanlderTeamOne = new CarouselHandler(1);
const carouselHanlderTeamTwo = new CarouselHandler(2);


carouselHanlderTeamOne.init();
carouselHanlderTeamTwo.init();
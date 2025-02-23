import './style.css'
import { TableCreator } from './ts/TableCreator';
import { CarouselHandler } from './ts/CarouselHanlder';
import { TableHandler } from './ts/TableHanlder';


const tableCreator = new TableCreator();
const tableHanlderOne = new TableHandler(1);
const tableHanlderTwo = new TableHandler(2);


tableCreator.populateTable(1);
tableCreator.populateTable(2);

tableHanlderOne.init();
tableHanlderTwo.init();

const carouselHanlderTeamOne = new CarouselHandler(1);
const carouselHanlderTeamTwo = new CarouselHandler(2);


carouselHanlderTeamOne.init();
carouselHanlderTeamTwo.init();



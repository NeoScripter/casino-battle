import { PREFIXES, SelectorConcatenator } from './SelectorConcatenator';
import { cIds } from './TableCreator';

const PATH = 'images/carousel/';
const IMAGE_NAMES = [
    'bandit',
    'bigbass',
    'bonanza',
    'dog',
    'dogmulti',
    'giza',
    'mental',
    'mummy',
    'olympus',
    'sugar',
];

const concatenator = new SelectorConcatenator();

export class CarouselHandler {
    private teamNumber: number;
    private parent: HTMLElement | null;
    private figure: HTMLElement | null;
    public images: HTMLCollection | null;
    private imageLength: number;
    private gap: number;
    private theta: number;
    public currImage: number;
    private bfc: boolean;
    private rotationInterval: number | null = null;
    private isRotating: boolean = false;

    constructor(teamNumber: number) {
        this.teamNumber = teamNumber;
        this.parent = document.getElementById(PREFIXES.CAROUSEL + '-' + this.teamNumber.toString());

        if (!this.parent) {
            throw new Error('Carousel container not found!');
        }

        this.figure = this.parent.querySelector('figure');

        if (!this.figure) {
            throw new Error('Carousel structure is missing `figure`!');
        }

        this.images = this.figure.children;
        this.imageLength = this.images.length;

        this.gap = parseFloat(this.parent.dataset.gap || "10");
        this.bfc = "bfc" in this.parent.dataset;

        this.theta = this.imageLength > 0 ? (2 * Math.PI) / this.imageLength : 0;
        this.currImage = 0;
    }

    init() {
        this.createCarousel(); 
        this.setupCarousel();
        this.initResize();
    }

    getCurrentImagePath() {
        if (!this.images || this.imageLength === 0) return;
    
        const div = this.images[this.currImage % this.imageLength] as HTMLElement;
        if (!div) return;
    
        const img = div.querySelector("img") as HTMLImageElement | null;
        if (!img) return;
    
        return img.src;
    }
    

    createCarousel() {
        if (!this.parent || !this.figure) {
            throw new Error('The figure element is missing!');
        }

        // Clear existing images before adding new ones
        this.figure.innerHTML = '';

        for (const imageName of IMAGE_NAMES) {
            const div = document.createElement('div');
            const img = document.createElement('img');
            img.src = cIds(PATH, imageName, '.png');
            img.classList.add('border-3', 'border-white')
            div.appendChild(img);
            this.figure.appendChild(div);
        }

        // Refresh image references after adding them
        this.images = this.figure.children;
        this.imageLength = this.images.length;
        this.theta = this.imageLength > 0 ? (2 * Math.PI) / this.imageLength : 0;
    }

    setupCarousel() {
        if (!this.images || this.imageLength === 0 || !this.figure) {
            console.error("No valid images found for the carousel!");
            return;
        }

        const firstImage = this.images[0] as HTMLElement | undefined;
        if (!firstImage) {
            console.error("First image not found!");
            return;
        }

        const imageWidth = parseFloat(getComputedStyle(firstImage).width);
        if (isNaN(imageWidth) || imageWidth <= 0) {
            console.error(" Invalid image width detected:", imageWidth);
            return;
        }

        const apothem = imageWidth / (2 * Math.tan(Math.PI / this.imageLength));
        this.figure.style.transformOrigin = `50% 50% ${-apothem}px`;

        for (let i = 0; i < this.imageLength; i++) {
            const imgElement = this.images[i] as HTMLElement;
            imgElement.style.padding = `0 ${this.gap}px`;
            imgElement.style.transformOrigin = `50% 50% ${-apothem}px`;
            imgElement.style.transform = `rotateY(${i * this.theta}rad)`;

            if (this.bfc) {
                imgElement.style.backfaceVisibility = 'hidden';
            }
        }

        this.rotateCarousel(this.currImage);
    }


    rotateCarousel(imageIndex: number) {
        if (!this.figure) {
            console.error("Error: Figure element is missing!");
            return;
        }

        if (isNaN(imageIndex) || isNaN(this.theta) || !isFinite(this.theta)) {
            console.error("Invalid rotation value:", { imageIndex, theta: this.theta });
            return;
        }

        this.figure.style.transform = `rotateY(${imageIndex * -this.theta}rad)`;
    }

    startInfiniteRotation() {
        if (this.isRotating) return; // Prevent multiple clicks
    
        this.isRotating = true;
        let speed = 50; //  Start with a very fast rotation (50ms per step)
        const slowDownDuration = Math.random() * (7000 - 2000) + 4000; //  Random slowdown time (4-7 seconds)
        const startTime = Date.now();
    
        const rotationStep = () => {
            this.currImage++;
            this.rotateCarousel(this.currImage);
    
            const elapsed = Date.now() - startTime;
            const progress = elapsed / slowDownDuration; //  0 to 1 (percentage of slowdown complete)
    
            //  Gradually increase the interval time (slowing effect)
            speed = 50 + progress * 950; //  Starts at 50ms, gradually increases to ~1000ms
    
            if (elapsed >= slowDownDuration) {
                clearInterval(this.rotationInterval!); //  Stop rotation
                this.isRotating = false;
                this.showWinner();
            } else {
                clearInterval(this.rotationInterval!);
                this.rotationInterval = window.setInterval(rotationStep, speed);
            }
        };
    
        //  Start the first fast interval
        this.rotationInterval = window.setInterval(rotationStep, speed);
    }

    showWinner() {
        const select = concatenator.getWinnerImgContainer(this.teamNumber);
        const winnerImgContainer = accessDomElement(`#${select}`, HTMLDivElement);

        const img = accessDomElement('img', HTMLImageElement, winnerImgContainer);

        const newImgPath = this.getCurrentImagePath();

        if (newImgPath == null || this.parent == null) return;
        img.src = newImgPath;

        winnerImgContainer.classList.remove('!hidden');
        
        this.parent.classList.add('absolute');
        this.parent.style.opacity = "0%";
        setTimeout(() => {
            if (this.parent == null) return;
            this.parent.classList.add('!hidden');
            this.parent.style.opacity = "100%";
            this.parent.classList.remove('absolute');
        }, 500)
    }

    resetDisplay() {
        const select = concatenator.getWinnerImgContainer(this.teamNumber);
        const winnerImgContainer = accessDomElement(`#${select}`, HTMLDivElement);

        winnerImgContainer.classList.add('!hidden');
        this.parent?.classList.remove('!hidden');
    }

    initResize() {
        window.addEventListener('resize', () => {
            this.setupCarousel();
        });
    }
}

export function accessDomElement<T extends Element>(selector: string, expectedElementType: new () => T, parent: HTMLElement = document.body): T {
    const element = parent.querySelector(selector);

    if (!element) {
        throw new Error(`Element not found: ${selector}`);
    }

    if (!(element instanceof expectedElementType)) {
        throw new Error(`Expected ${expectedElementType.name}, but found ${element.constructor.name}`);
    }

    return element;
}

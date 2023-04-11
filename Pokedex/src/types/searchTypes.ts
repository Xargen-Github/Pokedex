export class SortingOrder {
    title: string;
    orderingFunction: (a: any, b: any) => number;

    constructor(title: string, orderingFunction: (a: any, b: any) => number) {
        this.title = title;
        this.orderingFunction = orderingFunction;
    }

}
export class SortingOrder {
    title: string
    icon: string
    orderingFunction: (a: any, b: any) => number

    constructor(title: string, icon: string, orderingFunction: (a: any, b: any) => number) {
        this.title = title
        this.icon = icon
        this.orderingFunction = orderingFunction
    }
}

export class Product {
    id:                 number = 0;
    name:               string = "";
    sku:                string = "";
    group_id:            number = 0;
    description:        string = "";
    detailed_description: string = "";
    size:               string = "";
    cost:               number = 0;
    molecule1:          string = "";
    molecule2:          string = "";
    group1:             string = "";
    group2:             string = "";
    category1:          number = 0;
    category2:          number = 0;
    image:              string = "";
    thumbnail:          string = "";
}


export class Molecule {
    id: number = 0;
    name: string = "";
}

export class Group {
    id: number = 0;
    name: string = "";
}

export class Category {
    id: number = 0;
    name: string = "";
    description: string = "";
    image: string = "";
    thumbnail: string = "";
}
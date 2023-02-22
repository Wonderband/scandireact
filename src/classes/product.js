class Product { 
    constructor({ sku, name, price, type }) { 
        this.sku = sku;
        this.name = name;
        this.price = price.toFixed(2);
        this.type = type;
    }
}

export class DVD extends Product { 
    constructor({ sku, name, price, type, size }) { 
        super({ sku, name, price, type });
        this.size = size;
    }
}

export class Book extends Product { 
    constructor({ sku, name, price, type, weight }) { 
        super({ sku, name, price, type });
        this.weight = weight.toFixed(3);
    }
}

export class Furniture extends Product { 
    constructor({ sku, name, price, type, height, width, length }) { 
        super({ sku, name, price, type });
        this.height = height;
        this.width = width;
        this.length = length;
    }
}

const classes = { DVD, Book, Furniture };
 
export class JointClass { 
    constructor(className, params) { 
        return new classes[className](params);
    }
}
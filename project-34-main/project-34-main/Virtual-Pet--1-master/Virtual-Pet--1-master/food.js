class Food {
    constructor(){
         this.foodStock = 0;
         this.image=loadImage("images/Milk.png");
    }
    getfoodStock(){
        return this.foodStock

    }
    updatefoodStock(food){
        this.foodStock-=1
    }
    display(){
        var x=80,y=100
        imageMode(CENTER)
        if(this.foodStock!==0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10===0){
                    x=18
                    y+=50
                }
                image(this.image,x,y,50,50)
                x+=30
            }
        }
    }
}


class podpory {

    constructor(){

        this.podpory = podporyJSON;
        this.vykreslivsechnyPodpory();

    };


    vykreslivsechnyPodpory(){

        var obj = JSON.parse(this.podpory);
        var pocetId;

        pocetId = obj.podpory.length;

        //nacita koty pro jednotliva id
        for (var id = 0; id < pocetId; id++) {
            this.ziskejDataProCanvas(id, obj);
        }

    }


    ziskejDataProCanvas(id, obj){

        var elementId = obj.podpory[id].id;
        if(elementId == ""){    //pokud je id "" pak nacte JSON class

            var trida = obj.podpory[id].class;
            var objClass = JSON.parse(this.class);
            var vsechnaId = objClass.class[trida];

            if(vsechnaId != undefined){

                for (var i = 0; i < vsechnaId.length; i++) {

                    elementId = vsechnaId[i];
                    
                    var c = document.getElementById(elementId);
                    try {
                        var ctx = c.getContext("2d");
                        this.vykreslivsechnyPodporyDaneId(id, ctx, obj);
                    }
                    catch(err) {
                        console.log(elementId + " nenalezen");
                    }

                }
            
            }
            
        }
        else {

            var c = document.getElementById(elementId);

          //  try {
                var ctx = c.getContext("2d");
                this.vykreslivsechnyPodporyDaneId(id, ctx, obj);
          //  }
           // catch(err) {
           //     console.log(elementId + " nenalezen");
            //}
            
        }
     
    }

    
    vykreslivsechnyPodporyDaneId(id, ctx, obj){

        var pocetPodporVodorovnych;
        var pocetPodporSvislych;

        pocetPodporVodorovnych = obj.podpory[id].data.vodorovnyPrut.length;
        pocetPodporSvislych = obj.podpory[id].data.svislyPrut.length;

        var Ox = obj.podpory[id].Ox;
        var Oy = obj.podpory[id].Oy;

        //vykresli vsechny podpory vodorovne
        for (var i = 0; i < pocetPodporVodorovnych; i++) {
            
            var Ax = obj.podpory[id].data.vodorovnyPrut[i].Ax;
            var Ay = obj.podpory[id].data.vodorovnyPrut[i].Ay;
            var velikost = obj.podpory[id].data.vodorovnyPrut[i].velikost;
            var typ = obj.podpory[id].data.vodorovnyPrut[i].typ;
            var podporaZleva = obj.podpory[id].data.vodorovnyPrut[i].podporaZleva;
            var barvaCary = obj.podpory[id].data.vodorovnyPrut[i].barvaCary;
            var tloustkaCary = obj.podpory[id].data.vodorovnyPrut[i].tloustkaCary;

            Ax = Ax + Ox;
            Ay = Ay + Oy;

            if(typ == "vetknuti"){
                this.nakresliVetknutiSvisle(Ax, Ay, velikost, podporaZleva, ctx, barvaCary, tloustkaCary);      
            }
            if(typ == "kloubPevny"){
                this.nakresliPodporuKloubPevny(Ax, Ay, velikost, ctx, barvaCary, tloustkaCary);
            }
            if(typ == "kloubPosun"){
                this.nakresliPodporuKloubPosunSvisly(Ax, Ay, velikost, podporaZleva, ctx, barvaCary, tloustkaCary);
            }

        }

        //vykresli vsechny podpory svisle
        for (var i = 0; i < pocetPodporSvislych; i++) {
            
            var Ax = obj.podpory[id].data.svislyPrut[i].Ax;
            var Ay = obj.podpory[id].data.svislyPrut[i].Ay;
            var velikost = obj.podpory[id].data.svislyPrut[i].velikost;
            var typ = obj.podpory[id].data.svislyPrut[i].typ;
            var podporaDolu = obj.podpory[id].data.svislyPrut[i].podporaDolu;

            Ax = Ax + Ox;
            Ay = Ay + Oy;

            if(typ == "vetknuti"){
                this.nakresliVetknutiVodorovne(Ax, Ay, velikost, podporaDolu, ctx, barvaCary, tloustkaCary);
            }
            if(typ == "kloubPevny"){
                this.nakresliPodporuKloubPevny(Ax, Ay, velikost, ctx, barvaCary, tloustkaCary);
            }
            if(typ == "kloubPosun"){
                this.nakresliPodporuKloubPosunVodorovny(Ax, Ay, velikost, ctx, barvaCary, tloustkaCary);
            }

        }


    }


    nakresliVetknutiSvisle(Ax, Ay, velikost, vetknutiDoleva, ctx, barvaCary, tloustkaCary)
    {

        var P1x;
        var P1y;
        var P2x;
        var P2y;
        var Ps1x;
        var Ps1y;
        var Ps2x;
        var Ps2y;

        var y_;

        //kresli vetknuti orienovane nahoru nebo dolu
        var smer;
        if(vetknutiDoleva == true){
            smer = 1;
        }
        else {
            smer = -1;
        }

        P1x = Ax;
        P1y = Ay-velikost;
        P2x = Ax;
        P2y = Ay+velikost;

        
        //nakresli svislou carku
        ctx.beginPath();
        ctx.moveTo(P1x, P1y);
        ctx.lineTo(P2x, P2y);
        ctx.strokeStyle = barvaCary;
        ctx.lineWidth = tloustkaCary;
        ctx.stroke();


        //dopocita souradnice sikmych carek
        y_ = P1y;
        for (var i = 0; i < 1000; i++) {
            
            Ps1x = P1x;
            Ps1y = y_;
            Ps2x = P1x - smer*10;
            Ps2y = y_+10;

            y_ = Ps2y;

            if(y_ > Ay+velikost){
                break;
            }

            //vykresli sikme carky
            ctx.beginPath();
            ctx.moveTo(Ps1x, Ps1y);
            ctx.lineTo(Ps2x, Ps2y);
            ctx.strokeStyle = barvaCary;
            ctx.lineWidth = tloustkaCary;
            ctx.stroke();

        }

    }


    nakresliVetknutiVodorovne(Ax, Ay, velikost, vetknutiDolu, ctx, barvaCary, tloustkaCary)
    {

        var P1x;
        var P1y;
        var P2x;
        var P2y;
        var Ps1x;
        var Ps1y;
        var Ps2x;
        var Ps2y;

        var x_;

        //kresli vetknuti orienovane nahoru nebo dolu
        var smer;
        if(vetknutiDolu == true){
            smer = 1;
        }
        else {
            smer = -1;
        }


        P1x = Ax-velikost;
        P1y = Ay;
        P2x = Ax+velikost;
        P2y = Ay;

        
        //nakresli vodorovnou carku
        ctx.beginPath();
        ctx.moveTo(P1x, P1y);
        ctx.lineTo(P2x, P2y);
        ctx.strokeStyle = barvaCary;
        ctx.lineWidth = tloustkaCary;
        ctx.stroke();


        //dopocita souradnice sikmych carek
        x_ = P1x;
        for (var i = 0; i < 5; i++) {
            
            Ps1x = x_ + 10;
            Ps1y = P1y;
            Ps2x = x_;
            Ps2y = P1y + smer*10;

            x_ = Ps1x;

            //vykresli sikme carky
            ctx.beginPath();
            ctx.moveTo(Ps1x, Ps1y);
            ctx.lineTo(Ps2x, Ps2y);
            ctx.strokeStyle = barvaCary;
            ctx.lineWidth = tloustkaCary;
            ctx.stroke();

        }

    }


    nakresliPodporuKloubPevny(Ax, Ay, velikost, ctx, barvaCary, tloustkaCary)
    {

        var P1x;
        var P1y;
        var P2x;
        var P2y;
        var P3x;
        var P3y;

        P1x = Ax-velikost;
        P1y = Ay+velikost;
        P2x = Ax+velikost;
        P2y = Ay+velikost;
        P3x = Ax;
        P3y = Ay;

        ctx.beginPath();
        ctx.moveTo(P1x, P1y);
        ctx.lineTo(P2x, P2y);
        ctx.lineTo(P3x, P3y);
        ctx.lineTo(P1x, P1y);
        ctx.strokeStyle = barvaCary;
        ctx.lineWidth = tloustkaCary;
        ctx.stroke();

    }

    nakresliPodporuKloubPosunVodorovny(Ax, Ay, velikost, ctx, barvaCary, tloustkaCary)
    {

        //nakresli jako kloub pevny a k tomu prida carku symbolizujici posun
        this.nakresliPodporuKloubPevny(Ax, Ay, velikost, ctx, barvaCary, tloustkaCary);

        var P1x;
        var P1y;
        var P2x;
        var P2y;

        P1x = Ax-velikost;
        P1y = Ay+velikost + velikost/4;
        P2x = Ax+velikost;
        P2y = Ay+velikost + velikost/4;

        //vodorovna carka
        ctx.beginPath();
        ctx.moveTo(P1x, P1y);
        ctx.lineTo(P2x, P2y);
        ctx.strokeStyle = barvaCary;
        ctx.lineWidth = tloustkaCary;
        ctx.stroke();     

    }

    nakresliPodporuKloubPosunSvisly(Ax, Ay, velikost, carkaVlevo, ctx, barvaCary, tloustkaCary)
    {
        
        var P1x;
        var P1y;
        var P2x;
        var P2y;
        var P3x;
        var P3y;

        var P10x;
        var P10y;
        var P20x;
        var P20y;

        if(carkaVlevo == true){

            P1x = Ax-velikost;
            P1y = Ay-velikost;
            P2x = Ax-velikost;
            P2y = Ay+velikost;
            P3x = Ax;
            P3y = Ay;

            P10x = P1x - velikost/4;
            P10y = P1y;
            P20x = P2x - velikost/4;
            P20y = P2y;

        }
        else {

            P1x = Ax+velikost;
            P1y = Ay-velikost;
            P2x = Ax+velikost;
            P2y = Ay+velikost;
            P3x = Ax;
            P3y = Ay;

            P10x = P1x + velikost/4;
            P10y = P1y;
            P20x = P2x + velikost/4;
            P20y = P2y;

        }


        // nakresli podporu
        ctx.beginPath();
        ctx.moveTo(P1x, P1y);
        ctx.lineTo(P2x, P2y);
        ctx.lineTo(P3x, P3y);
        ctx.lineTo(P1x, P1y);
        ctx.strokeStyle = barvaCary;
        ctx.lineWidth = tloustkaCary;
        ctx.stroke();

        // nakresli svislou carku
        ctx.beginPath();
        ctx.moveTo(P10x, P10y);
        ctx.lineTo(P20x, P20y);
        ctx.strokeStyle = barvaCary;
        ctx.lineWidth = tloustkaCary;
        ctx.stroke();

    }
    
}

$( ".outputs" )
    .change(function () {

        var grafika = new podpory();
    
    })
    .change();    


$( ".inputs" )
    .change(function () {

        var grafika = new podpory();
    
    })
    .change();   


$( ".elementPreview" )
    .change(function () {

        var grafika = new podpory();
    
    })
    .change();  


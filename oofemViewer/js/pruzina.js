
class pruzina {

    constructor(){

        this.pruzina = pruzinaJSON;

        //vykresli vsechny sipky
        this.vykreslivsechnySipky();    
        
    }

    vykreslivsechnySipky(){

        var obj = JSON.parse(this.pruzina);
        var pocetId;

        pocetId = obj.pruzina.length;

        //nacita koty pro jednotliva id
        for (var id = 0; id < pocetId; id++) {
            this.ziskejDataProCanvas(id, obj);
        }    

    }

    ziskejDataProCanvas2(id, obj){

        try {
            var elementId = obj.pruzina[id].id;
            var c = document.getElementById(elementId);
            var ctx = c.getContext("2d");
            
            this.vykreslivsechnySipkyDaneId(id, ctx, obj);
        }
        catch(err) {
            console.log(elementId + " nenalezen");
        }

    }

    ziskejDataProCanvas(id, obj){

        var elementId = obj.pruzina[id].id;
        if(elementId == ""){    //pokud je id "" pak nacte JSON class

            var trida = obj.sipky[id].class;
            var objClass = JSON.parse(this.class);
            var vsechnaId = objClass.class[trida];

            if(vsechnaId != undefined){

                for (var i = 0; i < vsechnaId.length; i++) {

                    elementId = vsechnaId[i];
                    
                    var c = document.getElementById(elementId);
                    try {
                        var ctx = c.getContext("2d");
                        this.vykreslivsechnySipkyDaneId(id, ctx, obj);
                    }
                    catch(err) {
                        console.log(elementId + " nenalezen");
                    }

                }
            
            }
            
        }
        else {

            var c = document.getElementById(elementId);

            try {
                var ctx = c.getContext("2d");
                this.vykreslivsechnySipkyDaneId(id, ctx, obj);
            }
            catch(err) {
                console.log(elementId + " nenalezen");
            }
            
        }
     
    }


    vykreslivsechnySipkyDaneId(id, ctx, obj)
    {

        var pocetPruzinVodorovnych;
        var pocetPruzinSvislych;

        pocetPruzinVodorovnych = obj.pruzina[id].data.vodorovne.length;
        pocetPruzinSvislych = obj.pruzina[id].data.svisle.length;

        
        //vykresli vsechny sipky vodorovne
        for (var i = 0; i < pocetPruzinVodorovnych; i++) {

            var prumerPruziny = obj.pruzina[id].data.vodorovne[i].prumerPruziny;
            var delkaZavitu = obj.pruzina[id].data.vodorovne[i].delkaZavitu;
            var pocetZavitu = obj.pruzina[id].data.vodorovne[i].pocetZavitu;
            var delkaKonce = obj.pruzina[id].data.vodorovne[i].delkaKonce;
            var osa = obj.pruzina[id].data.vodorovne[i].Ay;
            var Xzacatek = obj.pruzina[id].data.vodorovne[i].Ax;

            var tloustkaCary = obj.pruzina[id].data.vodorovne[i].tloustkaCary; 
            var barvaCary = obj.pruzina[id].data.vodorovne[i].barvaCary;

            var nakresliVodorovnouPruzinu = new pruzinaVodorovna(ctx, prumerPruziny, delkaZavitu, pocetZavitu, delkaKonce, osa, Xzacatek, tloustkaCary, barvaCary);

        }
        

        for (var i = 0; i < pocetPruzinSvislych; i++) {

            var prumerPruziny = obj.pruzina[id].data.svisle[i].prumerPruziny;
            var delkaZavitu = obj.pruzina[id].data.svisle[i].delkaZavitu;
            var pocetZavitu = obj.pruzina[id].data.svisle[i].pocetZavitu;
            var delkaKonce = obj.pruzina[id].data.svisle[i].delkaKonce;
            var osa = obj.pruzina[id].data.svisle[i].Ax;
            var Xzacatek = obj.pruzina[id].data.svisle[i].Ay;

            var tloustkaCary = obj.pruzina[id].data.svisle[i].tloustkaCary; 
            var barvaCary = obj.pruzina[id].data.svisle[i].barvaCary;

            var nakresliSvislouPruzinu = new pruzinaSvisla(ctx, prumerPruziny, delkaZavitu, pocetZavitu, delkaKonce, osa, Xzacatek, tloustkaCary, barvaCary);
            
        }

    }
}


class pruzinaVodorovna {

    //##############################################################
    //       Kresli pruzinu vodorovnou

    constructor(ctx, prumerPruziny, delkaZavitu, pocetZavitu, delkaKonce, osaY, Xposledni, tloustkaCary, barvaCary){

        //nakresli pruzinu
        ctx.strokeStyle = barvaCary;
        ctx.lineWidth = tloustkaCary;
        ctx.beginPath();

        Xposledni = this.nakresliZacKonecPruziny(ctx, delkaKonce, Xposledni, osaY);
        Xposledni = this.nakresliPulZavitZleva(ctx, prumerPruziny, delkaZavitu, Xposledni, osaY);

        //vykresli dany pocet zavitu
        for (var id = 0; id < pocetZavitu; id++) {
            Xposledni = this.nakresliJedenZavitPruziny(ctx, prumerPruziny, delkaZavitu, Xposledni, osaY);
        }

        Xposledni = this.nakresliPulZavitZprava(ctx, delkaZavitu, Xposledni, osaY);
        Xposledni = this.nakresliZacKonecPruziny(ctx, delkaKonce, Xposledni, osaY);

        ctx.stroke();

    }


    //nakresli zacatek nebo konec pruziny (vodorovnou caru)
    nakresliZacKonecPruziny(ctx, delkaKonce, X, Y)
    {

        console.log(X);
        ctx.moveTo(X, Y);
        X = X + delkaKonce;
        console.log(X);

        ctx.lineTo(X, Y);
        return(X);
    }

    //nakresli prvni (pul)zavit zleva
    nakresliPulZavitZleva(ctx, prumerPruziny, delkaZavitu, X, osaY)
    {
        X = X + delkaZavitu/2;
        ctx.lineTo(X, osaY-prumerPruziny/2);
        
        return(X);
    }

    //nakresli prvni (pul)zavit zprava
    nakresliPulZavitZprava(ctx, delkaZavitu, X, osaY)
    {
        X = X + delkaZavitu/2;
        ctx.lineTo(X, osaY);
        
        return(X);
    }

    //nakresli jeden zavit pruziny
    nakresliJedenZavitPruziny(ctx, prumerPruziny, delkaZavitu, X, osaY)
    {
        var Y;
        
        X = X + delkaZavitu;
        Y = osaY + prumerPruziny/2;
        ctx.lineTo(X, Y);

        X = X + delkaZavitu;
        Y = osaY - prumerPruziny/2;
        ctx.lineTo(X, Y);

        return(X);
    }


}



class pruzinaSvisla {

    //##############################################################
    //       Kresli pruzinu vodorovnou

    constructor(ctx, prumerPruziny, delkaZavitu, pocetZavitu, delkaKonce, osaX, Yposledni, tloustkaCary, barvaCary){

        //nakresli pruzinu
        ctx.strokeStyle = barvaCary;
        ctx.lineWidth = tloustkaCary;
        ctx.beginPath();

        Yposledni = this.nakresliZacKonecPruziny(ctx, delkaKonce, Yposledni, osaX);
        Yposledni = this.nakresliPulZavitZHora(ctx, prumerPruziny, delkaZavitu, Yposledni, osaX);
        
        //vykresli dany pocet zavitu
        for (var id = 0; id < pocetZavitu; id++) {
            Yposledni = this.nakresliJedenZavitPruziny(ctx, prumerPruziny, delkaZavitu, Yposledni, osaX);
        }
        
        Yposledni = this.nakresliPulZavitZDola(ctx, delkaZavitu, Yposledni, osaX);        
        Yposledni = this.nakresliZacKonecPruziny(ctx, delkaKonce, Yposledni, osaX);

        ctx.stroke();

    }


    //nakresli zacatek nebo konec pruziny (vodorovnou caru)
    nakresliZacKonecPruziny(ctx, delkaKonce, Y, X)
    {
        ctx.moveTo(X, Y);
        Y = Y + delkaKonce;

        ctx.lineTo(X, Y);
        return(Y);
    }

    //nakresli prvni (pul)zavit zleva
    nakresliPulZavitZHora(ctx, prumerPruziny, delkaZavitu, Y, osaX)
    {
        Y = Y + delkaZavitu/2;
        ctx.lineTo(osaX-prumerPruziny/2, Y);
        
        return(Y);
    }

    //nakresli prvni (pul)zavit zprava
    nakresliPulZavitZDola(ctx, delkaZavitu, Y, osaX)
    {
        Y = Y + delkaZavitu/2;
        ctx.lineTo(osaX, Y);
        
        return(Y);
    }

    //nakresli jeden zavit pruziny
    nakresliJedenZavitPruziny(ctx, prumerPruziny, delkaZavitu, Y, osaX)
    {
        var X;
        
        Y = Y + delkaZavitu;
        X = osaX + prumerPruziny/2;
        ctx.lineTo(X, Y);

        Y = Y + delkaZavitu;
        X = osaX - prumerPruziny/2;
        ctx.lineTo(X, Y);

        return(Y);
    }


}



$(document).ready(function() {

    var grafika = new pruzina();

});

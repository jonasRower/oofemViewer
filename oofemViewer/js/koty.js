
class koty {

    constructor(){

        this.vsechnyKoty = kotyJSON;

        //vykresli data (koty)
        this.vypocetVykresleni();
        this.vykresliVsechnyKoty();
        
    }


    vykresliVsechnyKoty(){

        var obj = JSON.parse(this.vsechnyKoty);
        var pocetId;

        pocetId = obj.koty.length;

        //nacita koty pro jednotliva id
        for (var id = 0; id < pocetId; id++) {
            this.ZiskejDataProCanvas(id, obj);
        }    

    }


    ZiskejDataProCanvas(id, obj){

        var elementId = obj.koty[id].id;
        if(elementId == ""){    //pokud je id "" pak nacte JSON class

            var trida = obj.koty[id].class;
            var objClass = JSON.parse(this.class);
            var vsechnaId = objClass.class[trida];

            if(vsechnaId != undefined){

                for (var i = 0; i < vsechnaId.length; i++) {

                    elementId = vsechnaId[i];
                    
                    var c = document.getElementById(elementId);
                    try {
                        var ctx = c.getContext("2d");
                        this.vykresliVsechnyKotyDaneKotyId(id, ctx, obj);
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
                this.vykresliVsechnyKotyDaneKotyId(id, ctx, obj);
            }
            catch(err) {
                console.log(elementId + " nenalezen");
            }
            
        }
     
    }




    vykresliVsechnyKotyDaneKotyId(id, ctx, obj){

        var pocetKotVodorovnych;
        var pocetKotSvislych;

        pocetKotVodorovnych = obj.koty[id].data.vodorovne.length;
        pocetKotSvislych =  obj.koty[id].data.svisle.length;

        
        //vykresli vsechny koty vodorovne
        for (var i = 0; i < pocetKotVodorovnych; i++) {
            
            var AxL = obj.koty[id].data.vodorovne[i].AxL;
            var AxP = obj.koty[id].data.vodorovne[i].AxP;
            var Ay = obj.koty[id].data.vodorovne[i].Ay;
            var kotaNahoru = obj.koty[id].data.vodorovne[i].kotaNahoru;
            var prepsatKotu = obj.koty[id].data.vodorovne[i].prepsatKotu;

            console.log(kotaNahoru);

            var Ox = obj.koty[id].Ox;
            var Oy = obj.koty[id].Oy;
            var meritko = obj.koty[id].meritko;

            AxL = AxL + Ox;
            AxP = AxP + Ox;
            Ay = Ay + Oy;

            this.nakresliVodorovnouKotu(AxL, AxP, Ay, kotaNahoru, ctx, meritko, prepsatKotu);

        }

        //vykresli vsechny koty svisle
        for (var i = 0; i < pocetKotSvislych; i++) {

            var AyH = obj.koty[id].data.svisle[i].AyH;
            var AyD = obj.koty[id].data.svisle[i].AyD;
            var Ax = obj.koty[id].data.svisle[i].Ax;
            var kotaDoleva = obj.koty[id].data.svisle[i].kotaDoleva;
            var prepsatKotu = obj.koty[id].data.svisle[i].prepsatKotu;

            var Ox = obj.koty[id].Ox;
            var Oy = obj.koty[id].Oy;
            var meritko = obj.koty[id].meritko;
    
            AyH = AyH + Oy;
            AyD = AyD + Oy;
            Ax = Ax + Ox;

            this.nakresliSvislouKotu(AyH, AyD, Ax, kotaDoleva, ctx, meritko, prepsatKotu);

        }

    }


    vypocetVykresleni(){
 
        this.odsazeniKotovaciCary = 30;
        this.odsazVynKCE = 10;
        this.delkaVyn = 30;
        this.velSikmeCarky = 5;
        this.odsazeniTextu = 5;

        //dopocita meritko vzdalenost osy a scvisle odsazeni
  
    }


    //vykresli vodorovnou kotovaci caru - tam kde se zapisuje popis
    //souradnice x1, x2, y, jsou souradnice bodu, ktery se bude vykreslovat
    //odsazeni a presahy jsou dopocitavany uvnitr metody
    //pokud je smer +1, pak se vynasi nahoru, pokud -1, pak se vynasi dolu
    kotovaciCaraVodorovna(x1, x2, y, smer, ctx){
        ctx.beginPath();
        ctx.moveTo(x1, y + smer * (this.odsazeniKotovaciCary));
        ctx.lineTo(x2, y + smer * (this.odsazeniKotovaciCary));
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = "0.5";
        ctx.stroke();
    }

    kotovaciCaraSvisla(y1, y2, x, smer, ctx){
        ctx.beginPath();
        ctx.moveTo(x + smer * (this.odsazeniKotovaciCary), y1);
        ctx.lineTo(x + smer * (this.odsazeniKotovaciCary), y2);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = "0.5";
        ctx.stroke();
    }

    //vykresli svislou vynaseci caru (patrici k vodorovne kotovaci care)
    vynaseciCaraSvisla(x, y, smer, ctx){

        var y1;
        var y2;
        var y3;

        y1 = y + smer * (this.odsazVynKCE);
        y2 = y + smer * (this.odsazVynKCE + this.delkaVyn);
        y3 = y + smer * (this.odsazeniKotovaciCary)

        //zakresli vynaseci caru
        ctx.beginPath();
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y2);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = "0.5";
        ctx.stroke();

        //zakresli sikmou carku
        ctx.beginPath();
        ctx.moveTo(x - this.velSikmeCarky, y3 + this.velSikmeCarky);
        ctx.lineTo(x + this.velSikmeCarky, y3 - this.velSikmeCarky);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = "0.5";
        ctx.stroke();
    }

    //vykresli vodorovnou vynaseci caru (patrici k svisle kotovaci care)
    vynaseciCaraVodorovna(x, y, smer, ctx){

        var x1;
        var x2;
        var x3;

        x1 = x + smer * (this.odsazVynKCE);
        x2 = x + smer * (this.odsazVynKCE + this.delkaVyn);
        x3 = x + smer * (this.odsazeniKotovaciCary)

        //zakresli vynaseci caru
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = "0.5";
        ctx.stroke();

        //zakresli sikmou carku
        ctx.beginPath();
        ctx.moveTo(x3 + this.velSikmeCarky, y - this.velSikmeCarky);
        ctx.lineTo(x3 - this.velSikmeCarky, y + this.velSikmeCarky);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = "0.5";
        ctx.stroke();

    }

    //dopisuje text na kotu vodorovnou
    //souradnice x, y udavaji souradnici bodu na konstrukci
    //smer je koeficient, tak jak tomu je u jinych metod
    dopisTextNaKotuVodorovnou(x1, x2, y, smer, ctx, meritko, prepsatKotu){

        var text;
        var xText;
        var yText;

        if(prepsatKotu == ""){
            text = (x2-x1)/(meritko);
            text = (Math.round(text*100))/100;
        }
        else {
            text = prepsatKotu;
        }

        xText = (x1+x2)/2-10;
        yText = y + smer * (this.odsazeniKotovaciCary) - this.odsazeniTextu;

        
        ctx.fillStyle = "black";
        ctx.font = "15px Arial";
        ctx.fillText(text,xText,yText);
    }

    //dopisuje text na kotu svislou
    dopisTextNaKotuSvislou(y1, y2, x, smer, ctx, meritko, prepsatKotu){
       
        var text;
        var xText;
        var yText;

        var delkaStringu;
        
        if(prepsatKotu == ""){
            text = (y2-y1)/(meritko);
            text = (Math.round(text*100))/100;
        }
        else {
            text = prepsatKotu;
        }

        xText = x + smer * (this.odsazeniKotovaciCary);
        yText = (y1+y2)/2 + 5;

        if(smer < 0){
            delkaStringu = String(text).length + 1
            xText = xText - delkaStringu*8;
        }
        else {
            xText = xText + this.odsazeniTextu
        }

        ctx.font = "15px Arial";
        ctx.fillText(text,xText,yText);
    }

    nakresliVodorovnouKotu(AxL, AxP, Ay, kotaNahoru, ctx, meritko, prepsatKotu){

        var smer;
        if(kotaNahoru == true){
            smer = -1;
        }
        else {
            smer = 1;
        }

        //kotovaci cara (nad kterou je popis)
        this.kotovaciCaraVodorovna(AxL, AxP, Ay, smer, ctx);

        //vynaseci cara vlevo
        this.vynaseciCaraSvisla(AxL, Ay, smer, ctx);

        //vynaseci cara vpravo
        this.vynaseciCaraSvisla(AxP, Ay, smer, ctx);

        //doplni text na kotu
        this.dopisTextNaKotuVodorovnou(AxL, AxP, Ay, smer, ctx, meritko, prepsatKotu);

    }

    nakresliSvislouKotu(AyH, AyD, Ax, kotaDoleva, ctx, meritko, prepsatKotu){

        var smer;
        if(kotaDoleva == true){
            smer = -1;
        }
        else {
            smer = 1;
        }

        //SVISLA KOTA - UVNITR KOMORY
        this.kotovaciCaraSvisla(AyH, AyD, Ax, smer, ctx);

        //vynaseci cara k bodu A
        this.vynaseciCaraVodorovna(Ax, AyH, smer, ctx);

        //vynaseci cara k bodu E
        this.vynaseciCaraVodorovna(Ax, AyD, smer, ctx);

        //doplni text na kotu
        this.dopisTextNaKotuSvislou(AyH, AyD, Ax, smer, ctx, meritko, prepsatKotu);

    }

}


$(document).ready(function(){

    var grafika = new koty();
        
});
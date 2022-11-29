
class vykresliLegendu {

    constructor(){

        //ukládá všechna data, aby je mohl porovnávat se souřadnicí myši
        this.vsechnyBarvy = [];
        this.vsechnyHodnotyElementu = [];

        //aby detekoval na jakem elementu se nachazi kurzor mysi, je potreba ziskat pole vsech usecek
        this.poleVsechUsecek = [];
        this.abPole = [];

        //aby zobrazoval spravna cisla uzlu, je treba aby je seskupil do pole
        this.poleVsechUzlu = [];
        this.elementy = elementyJSON;
        

        this.vykresliVsechnyElementy();

        this.vsehnyBarvyIndexyRadkuJedinecne = this.vratPoleJedinecnychIndexuPole(this.vsechnyBarvy)
        this.vsehnyBarvyJedinecne = this.podleJedinecnychRadkuVratPoleHodnot(this.vsechnyBarvy, this.vsehnyBarvyIndexyRadkuJedinecne)
        this.vsehnyHodnotyElementuJedinecne = this.podleJedinecnychRadkuVratPoleHodnot(this.vsechnyHodnotyElementu, this.vsehnyBarvyIndexyRadkuJedinecne)
        //this.vsehnyHodnotyElementuJedinecne = this.vratPoleJedinecnychIndexuPole(this.vsechnyHodnotyElementu)

        console.log(this.vsehnyBarvyIndexyRadkuJedinecne)
        //je potreba pole setridit vzestupne, aby se zobrazovala barevna stupnice
        this.vsehnyBarvyJedinecne.sort();
        this.vsehnyHodnotyElementuJedinecne.sort();

        //console.log(this.vsehnyHodnotyElementuJedinecne);

        //vykresli data sem:
        var x = 50;
        var y = 20;
        var sirka = 40; 
        var vyskaBarvy = 1;
        var hodnotaNtyProuzek = 100;
     
        this.vykresliBarevnouSkaluLegendy(x, y, sirka, vyskaBarvy, this.vsehnyBarvyJedinecne)
        this.vlozHodnotyKBarevneSkale(x, y, sirka, vyskaBarvy, this.vsehnyHodnotyElementuJedinecne, hodnotaNtyProuzek)

    }
    

    vykresliVsechnyElementy(){

        var obj = JSON.parse(this.elementy);
        var pocetId;

        pocetId = obj.elementy.length;

        //nacita koty pro jednotliva id
        for (var id = 0; id < pocetId; id++) {
            this.ziskejDataProCanvas(id, obj);
        }    

    }

    ziskejDataProCanvas(id, obj){

        var elementId = obj.elementy[id].id;
        if(elementId == ""){    //pokud je id "" pak nacte JSON class

            var trida = obj.element[id].class;
            var objClass = JSON.parse(this.class);
            var vsechnaId = objClass.class[trida];
            
            if(vsechnaId != undefined){

                for (var i = 0; i < vsechnaId.length; i++) {

                    elementId = vsechnaId[i];
                    
                    var c = document.getElementById(elementId);
                    try {
                        var ctx = c.getContext("2d");
                        this.vykreslivsechnyElementyDaneId(id, ctx, obj);
                    }
                    catch(err) {
                        console.log(elementId + " nenalezen");
                    }

                }
                
            }
            
        }
        else {

            var c = document.getElementById(elementId);

       //     try {
                var ctx = c.getContext("2d");
                this.vykreslivsechnyElementyDaneId(id, ctx, obj);
      //      }
       //     catch(err) {
      //          console.log(elementId + " nenalezen");
         //   }
            
        }
     
    }

    vykreslivsechnyElementyDaneId(id, ctx, obj){
        
        var pocetElementu;

        //console.log(obj.elementy[0].data.element.length);
        pocetElementu = obj.elementy[0].data.element.length;
        
        this.Ox = obj.elementy[id].Ox;
        this.Oy = obj.elementy[id].Oy;


        //vykresli vsechen popis
        for (var i = 0; i < pocetElementu; i++) {
            
            var barva = obj.elementy[id].data.element[i].barva;
            var HodnotaElementu = obj.elementy[id].data.element[i].HodnotaElementu;
    
            //ukládá všechna data
            this.vsechnyBarvy.push(barva);
            this.vsechnyHodnotyElementu.push(HodnotaElementu)

        }

    }

    //tady je asi nekde chyba
    vratPoleJedinecnychHodnot(poleHodnot){

        var poleHodnotJedinecne = []
        var indexyPoleJedinecne = []

        for (var i = 0; i < poleHodnot.length; i++) {
            var hodnota = poleHodnot[i];
            if(poleHodnotJedinecne.includes(hodnota) == false){
                poleHodnotJedinecne.push(hodnota)
                indexyPoleJedinecne.push(i);
            }

        }

        console.log(poleHodnot);
        console.log(poleHodnotJedinecne);
        console.log(indexyPoleJedinecne);

        return(poleHodnotJedinecne);

    }

    
    //tady je asi nekde chyba
    vratPoleJedinecnychIndexuPole(poleHodnot){

        var indexyPoleJedinecne = []

        for (var i = 0; i < poleHodnot.length; i++) {
            var hodnota = poleHodnot[i];
            if(indexyPoleJedinecne.includes(hodnota) == false){
                indexyPoleJedinecne.push(i);
            }

        }

        return(indexyPoleJedinecne);

    }

    podleJedinecnychRadkuVratPoleHodnot(poleHodnot, jedinecneHodnoty){

        var poleHodnotNew = [];

        for (var i = 0; i < jedinecneHodnoty.length; i++) {
            var index = jedinecneHodnoty[i];
            var hodnota = poleHodnot[index];
            poleHodnotNew.push(hodnota);
        }

        return(poleHodnotNew);

    }


    vykresliBarevnouSkaluLegendy(x, y, sirka, vyskaBarvy, vsehnyBarvyJedinecne){

        for (var i = 0; i < vsehnyBarvyJedinecne.length; i++) {

            var barva = vsehnyBarvyJedinecne[i];
            this.nakresliLegendu(barva, x, y, sirka, vyskaBarvy)

            //zmeni souradnici v nasledujici smycce
            y = y + vyskaBarvy;
            //console.log(y);
           // console.log("--------------");

        }    

        console.log(vsehnyBarvyJedinecne.length);

    }


    vlozHodnotyKBarevneSkale(x, y, sirkaBarvy, vyskaBarvy, vsechnyHodnotyElementuJedinecne, preskocHodnoty){

        //pokud preskocHodnoty = 5 pak vykresluje kazdou 5. hodnotu
        var n = 0

        x = x + sirkaBarvy + 10
        y = y + vyskaBarvy/2

        var vlozHodnotu = true;
        var indexPoVlozeni = 0;
        

       // console.log(vsechnyHodnotyElementuJedinecne);
        for (var i = 0; i < vsechnyHodnotyElementuJedinecne.length; i++) {
            if(indexPoVlozeni == preskocHodnoty){
                vlozHodnotu = true;
                indexPoVlozeni = 0;
            }
            else {
                indexPoVlozeni = indexPoVlozeni + 1
            }
            
            if(vlozHodnotu == true) {
                var text = vsechnyHodnotyElementuJedinecne[i]
                this.vlozpopis(text, x, y)
               
                
                vlozHodnotu = false
            
                //upravi hodnotu y do dalsi smycky
                
            }
            y = y + vyskaBarvy
            //console.log("########################");
            //console.log(y);
        }    

        //console.log(vsechnyHodnotyElementuJedinecne.length);

    }


    nakresliLegendu(barva, x, y, sirka, vyska){

        var c = document.getElementById("test");
        var ctx = c.getContext("2d");
        
        ctx.beginPath();
        ctx.fillStyle = barva;
        ctx.fillRect(x, y, sirka, vyska);
        ctx.stroke();

    }


    vlozpopis(text, textX, textY){

        var c = document.getElementById("test");
        var ctx = c.getContext("2d");
       
        ctx.fillStyle = "black";
        ctx.font = "15px Arial";
        ctx.fillText(text, textX, textY);

    }

}



$(document).ready(function() {

    var legenda = new vykresliLegendu();

});


class elementy {

    constructor(zvolenyJSONStr){

        //ukládá všechna data, aby je mohl porovnávat se souřadnicí myši
        this.vsechnySouradnice = [];
        this.vsechnyCislaElementu = [];
        this.vsechnaCislaVrcholu = [];
        this.vsechnyBarvy = [];
        this.vsechnyHodnotyVrcholu = [];
        this.vsechnyHodnotyElementu = [];
        this.vsechnyBarvyCarElementu = [];
        this.vsechnytloustkyCarElementu = [];
        this.zvolenyJSONStr = zvolenyJSONStr;  //zvoleny JSON je momentalne string

        //aby detekoval na jakem elementu se nachazi kurzor mysi, je potreba ziskat pole vsech usecek
        this.poleVsechUsecek = [];
        this.abPole = [];

        //aby zobrazoval spravna cisla uzlu, je treba aby je seskupil do pole
        this.poleVsechUzlu = [];

        //tady se vybere adekvatni JSON, ten, ktery je zvolen comboboxem
        this.elementy = eval(zvolenyJSONStr);

        //this.elementy = xx;
        this.vykresliVsechnyElementy();

    }


    //getry:
    getVsechnySouradnice(){
        return(this.vsechnySouradnice);
    }

    getVsechnyCislaElementu(){
        return(this.vsechnyCislaElementu);
    }

    getVsechnaCislaVrcholu(){
        return(this.vsechnaCislaVrcholu);
    }

    getPoleVsechUsecek(){
        return(this.poleVsechUsecek);
    }

    getVsechnyBarvy(){
        return(this.vsechnyBarvy);
    }

    getPoleVsechUzlu(){
        return(this.poleVsechUzlu);
    }

    getVsechnyHodnotyVrcholu(){
        return(this.vsechnyHodnotyVrcholu)
    }

    getVsechnyHodnotyElementu(){
        return(this.vsechnyHodnotyElementu)
    }

    getVsechnyBarvyCarElementu(){
        return(this.vsechnyBarvyCarElementu)
    }

    getVsechnytloustkyCarElementu(){
        return(this.vsechnytloustkyCarElementu)
    }

    getABPole(){
        return(this.abPole);
    }

    getCislaVsechUzlu(){
        return(this.cislaVsechUzlu);
    }

    getHodnotyVsechUzlu(){
        return(this.HodnotyVsechUzlu);
    }

    getNasobek(){
        return(this.nasobek);
    }

    getZaokrouhliNaPocetMist(){
        return(this.zaokrouhliNaPocetMist)
    }

    getOx(){
        return(this.Ox);
    }

    getOy(){
        return(this.Oy);
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

        //pokud se ma zvyraznit dany element, zmeni se pouze jeho tloustka a barva cary
        //deje se to tak, ze se prepisou data zde
        var BarvaCaryElementuZvyrazneni = obj.elementy[id].BarvaCaryElementuZvyrazneni;
        var tloustkaCaryElementuZvyrazneni = obj.elementy[id].tloustkaCaryElementuZvyrazneni;
        var cisloElementuZvyrazneni = obj.elementy[id].cisloElementuZvyrazneni;

        //je mozne nezobrazit vypln elementu, udela se to tak, ze u daneho elementu se zmeni barva vyplne na "-1"
        var nevyplnitCisloEelemntu = obj.elementy[id].nevyplnitCisloEelemntu;

        //udava zda popisovat cisla vrcholu
        this.cislaVsechUzlu = obj.elementy[id].cislaVsechUzlu;

        //udava zda popisovat hodnoty vrcholu
        this.HodnotyVsechUzlu = obj.elementy[id].HodnotyVsechUzlu;

        //aby se popisy neprekryvaly, je mozne je vynasobit nasobkem a zaokrouhlit na pocet mist
        this.nasobek = obj.elementy[id].nasobek;
        this.zaokrouhliNaPocetMist = obj.elementy[id].zaokrouhliNaPocetMist;
        


        //vykresli vsechen popis
        for (var i = 0; i < pocetElementu; i++) {
            
            var Souradnice = obj.elementy[id].data.element[i].Souradnice;
            var barva = obj.elementy[id].data.element[i].barva;
            var cisloElementu = obj.elementy[id].data.element[i].cisloElementu;
            var OznaceniVrcholu = obj.elementy[id].data.element[i].OznaceniVrcholu;
            var HodnotyVrcholu = obj.elementy[id].data.element[i].HodnotyVrcholu;
            var HodnotaElementu = obj.elementy[id].data.element[i].HodnotaElementu;
            var BarvaCaryElementu = obj.elementy[id].data.element[i].BarvaCaryElementu;
            var tloustkaCaryElementu = obj.elementy[id].data.element[i].tloustkaCaryElementu;

            //zvyrazni element tak, ze prepise jeho data
            if(cisloElementu == cisloElementuZvyrazneni){
                BarvaCaryElementu = BarvaCaryElementuZvyrazneni;
                tloustkaCaryElementu = tloustkaCaryElementuZvyrazneni;
            }

            //nevykresli vypln elementu
            if(cisloElementu == nevyplnitCisloEelemntu){
                barva = "-1";
            }
           
            //this.vykresliObrysElementu(Souradnice, barva);

            //ukládá všechna data
            this.vsechnySouradnice.push(Souradnice);
            this.vsechnyCislaElementu.push(cisloElementu);
            this.vsechnaCislaVrcholu.push(OznaceniVrcholu);
            this.vsechnyBarvy.push(barva);
            this.vsechnyHodnotyVrcholu.push(HodnotyVrcholu)
            this.vsechnyHodnotyElementu.push(HodnotaElementu)
            this.vsechnyBarvyCarElementu.push(BarvaCaryElementu)
            this.vsechnytloustkyCarElementu.push(tloustkaCaryElementu)

            //vytvari pole vsech usecek elementu
            this.ziskejPoleVsechUsecekElementu(Souradnice, cisloElementu);
            
            //vytvari pole vsech ulu
            this.zapisujUzlyDoPoleUzlu(Souradnice, OznaceniVrcholu)
        }


        //vrati koeficienty "a" a "b"
        this.abPole = this.vratPoleKoeficientuAB(this.poleVsechUsecek);

        //console.log(this.poleVsechUzlu);

    }


    //rozlozi jeden element na usecky
    ziskejPoleVsechUsecekElementu(souradniceJednohoElementu, cisloElementu){

        var Ax;
        var Ay;
        var Bx;
        var By;

        var indexBoduA;
        var indexBoduB;


        //console.log(souradniceJednohoElementu);

        for (var i = 0; i < souradniceJednohoElementu.length; i++) {

            if(i < souradniceJednohoElementu.length-1){
                indexBoduA = i;
                indexBoduB = i + 1;
            }
            else {
                indexBoduA = i;
                indexBoduB = 0;
            }

            var BodA = souradniceJednohoElementu[indexBoduA];
            var BodB = souradniceJednohoElementu[indexBoduB];

            //console.log(BodA);
            Ax = BodA[0];
            Ay = BodA[1];
            Bx = BodB[0];
            By = BodB[1];

            var usecka = [Ax, Ay, Bx, By, cisloElementu];
            this.poleVsechUsecek.push(usecka);

        }

    }


    //vrati pole koeficientu "a" a "b" kazde usecky
    //kazda polozka odpovida dane usecce
    vratPoleKoeficientuAB(poleVsechUsecek){

        var koeficientyAB = [];
        var abPole = []; //dvojice koeficientu pro kazdou usecku

        for (var i = 0; i < poleVsechUsecek.length; i++) {

            var usecka = poleVsechUsecek[i];
            var Ax = usecka[0];
            var Ay = usecka[1];
            var Bx = usecka[2];
            var By = usecka[3];

            var ab = this.spocitejRovniciPrimky(Ax, Ay, Bx, By)

            abPole.push(ab);

        }
        
        return(abPole);

    }


    spocitejRovniciPrimky(Ax, Ay, Bx, By)
    {

        //koeficienty primky y = ax + b
        var a;
        var b;
        var ab = [];

        a = (Ay-By)/(Ax-Bx);
        b = By-Bx*a;

        ab.push(a);
        ab.push(b);

        return(ab);

    }


    //nacte vsechny uzly a seradi je do pole
    //index 1 : x
    //index 2 : y
    //index 3 : cislo uzlu

    zapisujUzlyDoPoleUzlu(Souradnice, OznaceniVrcholu){

        var uzelX;
        var uzelY;
        var cisloUzlu;
        var uzelXY;

        for (var i = 0; i < Souradnice.length; i++) {
            uzelXY = Souradnice[i];
            uzelX = uzelXY[0];
            uzelY = uzelXY[1];
            cisloUzlu = OznaceniVrcholu[i];

            this.zapisUzelDoPoleUzlu(uzelX, uzelY, cisloUzlu);
        }

    }
    

    zapisUzelDoPoleUzlu(uzelX, uzelY, cisloUzlu){
        
        var uzelXYcislo = [];
        var cisloUzluJizJeZapsano;

        cisloUzluJizJeZapsano = this.detekujZdaCisloUzluJeJizZapsano(this.poleVsechUzlu, cisloUzlu);
        
        if(cisloUzluJizJeZapsano == false){
            uzelXYcislo = [uzelX, uzelY, cisloUzlu];
            this.poleVsechUzlu.push(uzelXYcislo);
        }
        
    }


    detekujZdaCisloUzluJeJizZapsano(poleVsechUzlu, cisloUzluReq){

        var cisloUzluAct;
        var uzel;
        var cisloUzluJizJeZapsano = false;

        for (var i = 0; i < poleVsechUzlu.length; i++) {
            uzel = poleVsechUzlu[i];
            cisloUzluAct = uzel[2];
            if(cisloUzluAct == cisloUzluReq){
                cisloUzluJizJeZapsano = true;
                break;
            }
        }

        return(cisloUzluJizJeZapsano);
    }


}


class vykresliVsechnyElementy {

    constructor(vsechnySouradnice, vsechnyBarvy, Ox, Oy, vsechnyBarvyCarElementu, vsechnytloustkyCarElementu){
        this.Ox = Ox;
        this.Oy = Oy;
        this.vykreslujVsechnyElementy(vsechnySouradnice, vsechnyBarvy, vsechnyBarvyCarElementu, vsechnytloustkyCarElementu);
    }

    //vrati ctx, aby mohl vykreslovat popis z jine tridy
    getCtx(){
        return(this.ctx);
    }


    vykreslujVsechnyElementy(vsechnySouradnice, vsechnyBarvy, vsechnyBarvyCarElementu, vsechnytloustkyCarElementu){

        var souradniceElement = [];
        var barvaElement;
        var barvaCaryElementu;
        var tloustkaCaryElementu;

        for (var i = 0; i < vsechnySouradnice.length; i++) {
            souradniceElement = vsechnySouradnice[i];
            barvaElement = vsechnyBarvy[i];
            barvaCaryElementu = vsechnyBarvyCarElementu[i]
            tloustkaCaryElementu = vsechnytloustkyCarElementu[i]
        
            this.vykresliElement(souradniceElement, barvaElement, barvaCaryElementu, tloustkaCaryElementu);
        }
    }


    vykresliElement(souradnice, barva, barvaCaryElementu, tloustkaCaryElementu){

        var c = document.getElementById("test");
        this.ctx = c.getContext("2d");
        this.ctx.beginPath();

        //var souradnice = [[50,160],[70,80],[90,200]];
        var prvniCara;

        //vykresli danou caru
        for (var i = 0; i < souradnice.length; i++) {
            
            if(i == 0){
                prvniCara = true;
            }
            else {
                prvniCara = false;
            }

            this.vykresliDanouCaru(souradnice, i, prvniCara);
            
        }

        this.ctx.closePath();
        this.ctx.strokeStyle = barvaCaryElementu;
        this.ctx.lineWidth = tloustkaCaryElementu;
        this.ctx.stroke();

        if(barva != "-1"){
            this.ctx.fillStyle = barva;
            this.ctx.fill();
        }

    }


    vykresliDanouCaru(souradnice, indexBodu, prvniCara){

        var XYbod1 = souradnice[indexBodu];
        this.vykresliCaru(XYbod1[0], XYbod1[1], prvniCara);

    }


    vykresliCaru(Ax, Ay, prvniCara){

        Ax = Ax + this.Ox;
        Ay = Ay + this.Oy;

        if(prvniCara == true){
            this.ctx.moveTo(Ax, Ay);
        }
        else {
            this.ctx.lineTo(Ax, Ay);
        }
        
    }

}


class popisVsechnyUzly{

    constructor(vsechnySouradnice, vsechnaCislaVrcholu, Ox, Oy, nasobek, zaokrouhliNaPocetMist){

        var c = document.getElementById("test");
        this.ctx = c.getContext("2d");

        this.vsechnySouradnice = vsechnySouradnice;
        this.vsechnaCislaVrcholu = vsechnaCislaVrcholu;
        this.Ox = Ox;
        this.Oy = Oy;

        this.nasobek = nasobek;
        this.zaokrouhliNaPocetMist = zaokrouhliNaPocetMist;
        this.ziskejSouradniceProDanyElement(this.vsechnySouradnice, this.vsechnaCislaVrcholu)

    }

    ziskejSouradniceProDanyElement(vsechnySouradnice, vsechnyPopisyUzlu){

        for (var iEl = 0; iEl < vsechnySouradnice.length; iEl++) {
            var souradniceProDanyElement = vsechnySouradnice[iEl];
            var popisUzluProDanyElement = vsechnyPopisyUzlu[iEl];
        
            this.ziskejSouradniceProDanyUzel(souradniceProDanyElement, popisUzluProDanyElement);

        }
    }

    ziskejSouradniceProDanyUzel(souradniceProDanyElement, popisUzluProDanyElement){

        for (var iUz = 0; iUz < souradniceProDanyElement.length; iUz++) {
            var souradniceProDanyUzel = souradniceProDanyElement[iUz];
            var popisUzlu = popisUzluProDanyElement[iUz]

            //prenasobi hodnotu popisu pozadovanym nasobkem
            popisUzlu = popisUzlu * this.nasobek;

            //zaokrouhli na pocet pozadovanych mist
            if(this.zaokrouhliNaPocetMist > 0){
                var posunNasobek = this.zaokrouhliNaPocetMist*10
                popisUzlu = Math.round(popisUzlu*posunNasobek)/posunNasobek
            }

            var x = souradniceProDanyUzel[0] + this.Ox;
            var y = souradniceProDanyUzel[1] + this.Oy;
            
            this.vlozpopis(popisUzlu, x, y, "black")
        }    
    }

    vlozpopis(text, x, y, barva){

        console.log(text);
       
        this.ctx.fillStyle = barva;
        this.ctx.font = "15px Arial";
        this.ctx.fillText(text, x, y);

    }


}


//popise element nazaklade kliknuti, nebo vyberu
class popisElementu {

    constructor(ctx, x, y, popis, barva){

        var text = popis;
        this.ctx = ctx;
        if(text != undefined){
            this.vlozpopis(text, x, y, barva);
        }
        
    }

    vlozpopis(text, x, y, barva){
       
        this.ctx.fillStyle = barva;
        this.ctx.font = "15px Arial";
        this.ctx.fillText(text, x, y);

    }

}



class pohybMysi {

    constructor(event, poleVsechUsecek, abPole, ctx, poleVsechUzlu, Ox, Oy, vsechnaCislaVrcholu, vsechnyHodnotyVrcholu){

        this.poleVsechUsecek = poleVsechUsecek;
        
        this.a = [];
        this.b = [];


        var x = event.clientX - Ox;
        var y = event.clientY - Oy;


        var nejblizsiUsecky = [];
        var cisloElementu;      //cislo elementu na ktery bylo kliknuto
        var cisloUzlu;          //cislo uzlu na ktery bylo kliknuto

        //vypisuje cislo elementu, na ktere je kliknuto
        //nejblizsiUsecky = this.vratOkrajoveUsecky(x, abPole, poleVsechUsecek);
        //cisloElementu = this.vratCisloElementuNaKteryByloKliknuto(nejblizsiUsecky, y);

        //najde cislo uzlu, na ktery bylo kliknuto
        cisloUzlu = this.vratCisloUzluNaKteryByloKliknuto(poleVsechUzlu, x, y);

        var hodnotyZGrafu = new vyhledejHodnotyZGrafu(vsechnaCislaVrcholu, vsechnyHodnotyVrcholu, cisloUzlu);
        console.log(cisloUzlu);

        //popise element
        if(cisloUzlu == -1){ //pokud neni vybrano cislo uzlu
            //var popisElement = new popisElementu(ctx, x, y, cisloElementu, "#006600");
        }
        else {            //pokud je vybran uzel, pak popise uzel
            var popisUzlu = new popisElementu(ctx, x, y, cisloUzlu, "orange");
        }
   

    }


    vratCisloUzluNaKteryByloKliknuto(poleVsechUzlu, xKlikMysi, yKlikMysi){

        var tolerance = 10;
        var vzdalenost;
        var vzdalenostMin;
        var Ax;
        var Ay;
        var uzel;
        var cisloUzlu;
        var cisloUzluMin;

        for (var i = 0; i < poleVsechUzlu.length; i++) {
            uzel = poleVsechUzlu[i];
            Ax = uzel[0];
            Ay = uzel[1];
            cisloUzlu = uzel[2];

            vzdalenost = this.vratVzdalenostMeziDvemaBody(Ax, Ay, xKlikMysi, yKlikMysi);

            //nastavi vychozi hodnotu
            if(i == 0){
                vzdalenostMin = vzdalenost;
                cisloUzluMin = cisloUzlu;  
            }

            //uvazuje jen kdyz vzdalenost je mensi nez tolerance
            if(vzdalenost < tolerance){
                if(vzdalenost < vzdalenostMin){
                    vzdalenostMin = vzdalenost;
                    cisloUzluMin = cisloUzlu;     
                }
            }
        }

        //pokud je vzdalenostMin > tolerance, prepise na -1
        if(vzdalenostMin > tolerance){
            cisloUzluMin = -1;
        }

        return(cisloUzluMin);

    }


    //vraci vzdalenosti mezi bodem kkliknuti a vsemi uzly
    vratVzdalenostMeziDvemaBody(Ax, Ay, Bx, By){

        var vzdalenost;
        var vzdalenost2;

        vzdalenost2 = (Ax - Bx)*(Ax - Bx) + (Ay - By)*(Ay - By);
        vzdalenost = Math.pow(vzdalenost2, 0.5);

        return(vzdalenost);

    }



    vratCisloElementuNaKteryByloKliknuto(nejblizsiUsecky, yKlikMysi){

        var useckaA = nejblizsiUsecky[0];
        var useckaB = nejblizsiUsecky[1];

        if(useckaA != undefined){
            var indexElementuA = useckaA[2];
            var indexElementuB = useckaB[2];
        }

        var indexElementu = -1;

        if(indexElementuA == indexElementuB){
            indexElementu = indexElementuA;
        }

        //zatim nevim zda pouzivat
        //var nejblizsiNizsiUsecka = this.vratNejblizsiNizsiUsecku(nejblizsiUsecky, yKlikMysi);
        //var nejblizsiVyssiUsecka = this.vratNejblizsiVyssiUsecku(nejblizsiUsecky, yKlikMysi);
    

        return(indexElementu);

    }


    vratNejblizsiNizsiUsecku(nejblizsiUsecky, yKlikMysi){

        var yUsecka;
        var rozdilYUseckaYKlik;
        var rozdilMin;
        var usecka;
        var useckaNejblizsiNizsi;

        for (var i = 0; i < nejblizsiUsecky.length; i++) {
            usecka = nejblizsiUsecky[i];
            yUsecka = usecka[0];
            rozdilYUseckaYKlik = yUsecka - yKlikMysi;

            if(i == 0){
                rozdilMin = rozdilYUseckaYKlik;
                useckaNejblizsiNizsi = nejblizsiUsecky[0];
            }
            else {
                if(rozdilYUseckaYKlik < rozdilMin){
                    rozdilMin = rozdilYUseckaYKlik;
                    useckaNejblizsiNizsi = nejblizsiUsecky[i];
                }
            }

        }  
        
        return(useckaNejblizsiNizsi);

    }


    vratNejblizsiVyssiUsecku(nejblizsiUsecky, yKlikMysi){

        var yUsecka;
        var rozdilYUseckaYKlik;
        var rozdilMin;
        var usecka;
        var useckaNejblizsiVyssi;

        for (var i = 0; i < nejblizsiUsecky.length; i++) {
            usecka = nejblizsiUsecky[i];
            yUsecka = usecka[0];
            rozdilYUseckaYKlik = yKlikMysi - yUsecka;

            if(i == 0){
                rozdilMin = rozdilYUseckaYKlik;
                useckaNejblizsiVyssi = nejblizsiUsecky[0];
            }
            else {
                if(rozdilYUseckaYKlik < rozdilMin){
                    rozdilMin = rozdilYUseckaYKlik;
                    useckaNejblizsiVyssi = nejblizsiUsecky[i];
                }
            }

        }  

        return(useckaNejblizsiVyssi);

    }     

    //vrati pole nejblizsich usecek nad a pod bodem kliknuti
    vratOkrajoveUsecky(XklikMysi, abPole, poleVsechUsecek){

        var y;
        var nejblizsiUsecky = [];
        var yPolePolozka = [];  //obsahuje souradnici y (prusecik svislice) prislusny index usecky a cislo prislusejiciho elementu
        var bodSeNachaziNaUsecce;
       
        for (var i = 0; i < abPole.length; i++) {

            var usecka = poleVsechUsecek[i];
            var Ay = usecka[1];
            var By = usecka[3];
            var cisloElementu = usecka[4];

            var ab = abPole[i];
            var a = ab[0];
            var b = ab[1];

            y = a * XklikMysi + b;

            bodSeNachaziNaUsecce = this.detekujZdaYbodSeNachaziNaUsecce(Ay, By, y);

            if(bodSeNachaziNaUsecce == true){
                yPolePolozka = [y, i, cisloElementu];
                nejblizsiUsecky.push(yPolePolozka);
            }

        }

        
        return(nejblizsiUsecky);

    }



    

    //detekuje, zda y-ova souradnce se skurtecne nachazi na usecce
    //muze se take nacahzet sice na stejne primce, ale mimo dane body, tj. mimo usecku
    detekujZdaYbodSeNachaziNaUsecce(Ay, By, Y){

        var bodSeNachaziNaUsecce = false;
        var vzdalAB;
        var vzdalAY;
        var vzdalBY;

        vzdalAB = Math.abs(Ay-By);
        vzdalAY = Math.abs(Ay-Y);
        vzdalBY = Math.abs(By-Y);

        if(vzdalAY <= vzdalAB){
            if(vzdalBY <= vzdalAB){
                bodSeNachaziNaUsecce = true;
            }
        }


        return(bodSeNachaziNaUsecce);

    }


    napisSour(x, y){

        var coords = "X coords: " + x + ", Y coords: " + y;
        console.log(coords);
       
    }

}


//trida vyhledava hodnoty pro zobrazeni, po kliknuti na uzel
class vyhledejHodnotyZGrafu {

    constructor(vsechnaCislaVrcholu, vsechnyHodnotyVrcholu, cisloUzluExp){

        var indexVPoliVrcholuAVrchol = []
        var hodnotaVrcholu;
        
        indexVPoliVrcholuAVrchol = this.vratRadekSCislemUzlu(vsechnaCislaVrcholu, cisloUzluExp)
        hodnotaVrcholu = this.vratHodnotuVrcholu(vsechnyHodnotyVrcholu, indexVPoliVrcholuAVrchol)

        console.log(hodnotaVrcholu);
        

    }

    //cisla uzlu jsou v JSONu pod: OznaceniVrcholu":[138.0, 157.0, 156.0]
    //metoda vraci cislo radku, kde je prvni uzel nalezen
    vratRadekSCislemUzlu(vsechnaCislaVrcholu, cisloUzluExp){

        var cislaVrcholuradek;
        var indexVPoliVrcholRadek;
        var indexVPoliVrcholuAVrchol = []  //obsahuje dvojici indexu ukazujici na radek pole a index v radku vsechnaCislaVrcholu

        for (var r = 0; r < vsechnaCislaVrcholu.length; r++) {
            cislaVrcholuradek = vsechnaCislaVrcholu[r]
            indexVPoliVrcholRadek = this.vratIndexCislaUzluVeVrcholRadek(cislaVrcholuradek, cisloUzluExp)
            if(indexVPoliVrcholRadek > -1){
                indexVPoliVrcholuAVrchol.push(r);
                indexVPoliVrcholuAVrchol.push(indexVPoliVrcholRadek);
                break;
            }
            
        }   
        
        return(indexVPoliVrcholuAVrchol)

    }

    vratIndexCislaUzluVeVrcholRadek(vrcholRadek, cisloUzluExp){

        var cisloUzlu;
        var indexVPoliVrcholRadek;

        indexVPoliVrcholRadek = -1;

        for (var i = 0; i < vrcholRadek.length; i++) {
            cisloUzlu = vrcholRadek[i];
            if(cisloUzlu == cisloUzluExp){
                indexVPoliVrcholRadek = i;
            }
        }

        return(indexVPoliVrcholRadek);
    }

    vratHodnotuVrcholu(vsechnyHodnotyVrcholu, indexVPoliVrcholuAVrchol){

        var indexRadek;
        var indexNaRadku;
        var hodnotyVrcholuRadek;
        var vrcholHodnota;

        indexRadek = indexVPoliVrcholuAVrchol[0];
        indexNaRadku = indexVPoliVrcholuAVrchol[1];

        if(indexRadek != undefined){
            if(indexNaRadku != undefined){
                hodnotyVrcholuRadek = vsechnyHodnotyVrcholu[indexRadek];
                vrcholHodnota = hodnotyVrcholuRadek[indexNaRadku];
            }
        }

        return(vrcholHodnota);

    }
    
}


//uklada globalni data, aby je mohl porovnavat s daty pri pohybu mysi
var vsechnySouradnice = [];
var vsechnyCislaElementu = [];
var vsechnaCislaVrcholu = [];
var vsechnyBarvy = [];
var poleVsechUsecek = [];
var vsechnyBarvyCarElementu = [];
var vsechnytloustkyCarElementu = [];
var vsechnyHodnotyVrcholu = []
var vsechnyHodnotyElementu = []
var abPole = [];
var ctx;

var Ox;
var Oy;
var cislaVsechUzlu;
var hodnotyVsechUzlu;
var nasobek;
var zaokrouhliNaPocetMist;


function startProgramu(zvolenyJSON){

    var grafika = new elementy(zvolenyJSON);

    vsechnySouradnice = grafika.getVsechnySouradnice();
    vsechnyCislaElementu = grafika.getVsechnyCislaElementu();
    vsechnaCislaVrcholu = grafika.getVsechnaCislaVrcholu();
    vsechnyBarvy = grafika.getVsechnyBarvy();
    poleVsechUsecek = grafika.getPoleVsechUsecek();
    abPole = grafika.getABPole();
    poleVsechUzlu = grafika.getPoleVsechUzlu();
    vsechnyBarvyCarElementu = grafika.getVsechnyBarvyCarElementu();
    vsechnytloustkyCarElementu = grafika.getVsechnytloustkyCarElementu();
    vsechnyHodnotyVrcholu = grafika.getVsechnyHodnotyVrcholu();
    vsechnyHodnotyElementu = grafika.getVsechnyHodnotyElementu();

    console.log(vsechnyHodnotyElementu);

    //globalni nastaveni
    Ox = grafika.getOx();
    Oy = grafika.getOy();

    //prepisuje Ox a Oy
    Ox = 0
    Oy = 20

    cislaVsechUzlu = grafika.getCislaVsechUzlu();
    hodnotyVsechUzlu = grafika.getHodnotyVsechUzlu();
    nasobek = grafika.getNasobek();
    zaokrouhliNaPocetMist = grafika.getZaokrouhliNaPocetMist();

    //vykresli grafiku bez kliknuti (pri prvnim obnoveni)
    var vykresleniElementu = new vykresliVsechnyElementy(vsechnySouradnice, vsechnyBarvy, Ox, Oy, vsechnyBarvyCarElementu, vsechnytloustkyCarElementu);
    
    //popise vsechny uzly, je-li to nastaveno v globalnim nastaveni
    if(cislaVsechUzlu == true){
        var vykresliPopisVsechUzlu = new popisVsechnyUzly(vsechnySouradnice, vsechnaCislaVrcholu, Ox, Oy, nasobek, zaokrouhliNaPocetMist)
    }
    if(hodnotyVsechUzlu == true){
        var vykresliPopisVsechUzlu = new popisVsechnyUzly(vsechnySouradnice, vsechnyHodnotyVrcholu, Ox, Oy, nasobek, zaokrouhliNaPocetMist)
    }

    //vrati ctx aby mohl popisovat elementy (treba na zaklade kliknuti mysi)
    ctx = vykresleniElementu.getCtx();
}


//zacatek programu - nacte data z JSONu
$(document).ready(function(){

   // startProgramu();

});


// JE MOZNE REAGOVAT NA KLIKANI - ZATIM JE TO VYPNUTE
/*
$("#test").click(function(event) {
    var c = document.getElementById("test");
    ctx.clearRect(0, 0, c.width, c.height);

    //vykresli grafiku pri kliknuti
    var vykresleniElementu = new vykresliVsechnyElementy(vsechnySouradnice, vsechnyBarvy, Ox, Oy, vsechnyBarvyCarElementu, vsechnytloustkyCarElementu);
    var souradnice = new pohybMysi(event, poleVsechUsecek, abPole, ctx, poleVsechUzlu, Ox, Oy, vsechnaCislaVrcholu, vsechnyHodnotyVrcholu);

});
*/

//vybira data podle comboboxu
$( "select" )
    .change(function () {
        var zvolenyJSON = "elementyJSON_";

        $( "select option:selected" ).each(function() {
            zvolenyJSON += $( this ).text() + "_";
        });

        zvolenyJSON = zvolenyJSON.substring(0, zvolenyJSON.length - 1);
        zvolenyJSON = zvolenyJSON.replace("+", "p");
        zvolenyJSON = zvolenyJSON.replace("-", "m");
        zvolenyJSON = zvolenyJSON.replace(".", "_");
        
        startProgramu(zvolenyJSON);
    })
    .change();







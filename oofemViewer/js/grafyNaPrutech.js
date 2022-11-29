
//#########################################################################  
//               Trida pro vykreslovani konstrukce


class vykresliKonstrukci {

    constructor(zvolenyJSONStr, vycistiPlatno, vykresliGraf, elementId, vykresliCisloPrutu, zvyraznitCisloPrutu, zobrazCislaUzlu, zvyrazniCisloUzlu, posouvatText){

        this.vycistiPlatno = vycistiPlatno;
        this.grafyKCE = eval(zvolenyJSONStr);
        this.vykresliGraf = vykresliGraf;
        this.posouvatText = posouvatText;

        console.log(zvolenyJSONStr);

        //console.log(zvolenyJSONStr);
        //console.log(this.grafyKCE);

        //uklada souradnice vsech kot, aby mohl detekovat ty souradnice, ktere se prekryvaji
        this.souradnicePopisu = [];

        //zde se nastavuje vykreslovani popisu prutu na poradnici
        //dodelat, aby se zadavalo v rozmezi (0-1) bude to vubec mozne?
        var poradnicePopis = -1;

        //vykresluje vsechny pruty
        this.vykreslujVsechnyPruty(elementId, vykresliCisloPrutu, poradnicePopis, zvyraznitCisloPrutu, zobrazCislaUzlu, zvyrazniCisloUzlu);



        //this.souradnicePopisu se plni v this.vykreslujVsechnyPruty
        //vypocet kolize textu probiha ve tride detekujKoliziTextu

        var kolizeTextu = new detekujKoliziTextu(this.souradnicePopisu);
        var souradnicePopisu = kolizeTextu.getSouradnicePopisu();

        //vykresli posunuty text
        //console.log(souradnicePopisu);
        var vykresliPosunutyText = new vykresliVsechenText(souradnicePopisu, this.ctx);
        
    }


    vykreslujVsechnyPruty(elementId, vykresliCisloPrutu, poradnicePopis, zvyraznitCisloPrutu, zobrazCislaUzlu, zvyrazniCisloUzlu){

        var obj = JSON.parse(this.grafyKCE);
        var pocetId;

        pocetId = obj.grafyKCE.length;

        //nacita koty pro jednotliva id
        for (var id = 0; id < pocetId; id++) {
            this.ZiskejDataProCanvas(id, elementId, vykresliCisloPrutu, poradnicePopis, zvyraznitCisloPrutu, zobrazCislaUzlu, zvyrazniCisloUzlu);
        }    

    }


    ZiskejDataProCanvas(id, elementId, vykresliCisloPrutu, poradnicePopis, zvyraznitCisloPrutu, zobrazCislaUzlu, zvyrazniCisloUzlu){

        var obj = JSON.parse(this.grafyKCE);

        var pocetPrutu;
        pocetPrutu = obj.grafyKCE[id].data.length;
        //console.log(pocetPrutu);

        //var elementId = obj.grafyKCE[id].data[pocetPrutu-2].id;
        //var elementId = "test";

        if(elementId == ""){    //pokud je id "" pak nacte JSON class

            var trida = obj.grafyKCE[id].data[pocetPrutu-1].class;
            var objClass = JSON.parse(this.class);
            var vsechnaId = objClass.class[trida];

            

            if(vsechnaId != undefined){

                for (var i = 0; i < vsechnaId.length; i++) {

                    elementId = vsechnaId[i];

                    var c = document.getElementById(elementId);
                    try {
                        var ctx = c.getContext("2d");
                        this.ctx = ctx;

                        //vycisti platno
                        if(this.vycistiPlatno == true){
                            ctx.clearRect(0, 0, c.width, c.height);   
                        } 
                        
                        //znovu vykresli data
                        this.vykresliVsechnyKotyDaneKotyId(id, ctx, obj, vykresliCisloPrutu, poradnicePopis, zvyraznitCisloPrutu, zobrazCislaUzlu, zvyrazniCisloUzlu);
                    }
                    catch(err) {
                        console.log(elementId + " nenalezen");
                    }

                }

            }
            
        }
        else {

            var c = document.getElementById(elementId);

           // try {
                var ctx = c.getContext("2d");
                this.ctx = ctx;

                //vycisti platno
                if(this.vycistiPlatno == true){
                    ctx.clearRect(0, 0, c.width, c.height); 
                }   

                //znovu vykresli data
                this.vykresliVsechnyKotyDaneKotyId(id, ctx, obj, vykresliCisloPrutu, poradnicePopis, zvyraznitCisloPrutu, zobrazCislaUzlu, zvyrazniCisloUzlu);
            
        }
     
    }


    vykresliVsechnyKotyDaneKotyId(id, ctx, obj, vykresliCisloPrutu, poradnicePopis, zvyraznitCisloPrutu, zobrazCislaUzlu, zvyrazniCisloUzlu){

        var pocetPrutu;
        var prvniIndexPrutu;
        var posledniIndexPrutu;

        pocetPrutu = obj.grafyKCE[id].data.length;
        
        
        var Ox = obj.grafyKCE[id].data[pocetPrutu-5].Ox;
        var Oy = obj.grafyKCE[id].data[pocetPrutu-4].Oy;
        var meritkoGraf = obj.grafyKCE[id].data[pocetPrutu-3].meritkoGraf;

        if(vykresliCisloPrutu == -1){
            prvniIndexPrutu = 0;
            posledniIndexPrutu = pocetPrutu-5;
        }
        else {
            prvniIndexPrutu = vykresliCisloPrutu;
            posledniIndexPrutu = parseInt(vykresliCisloPrutu)+1;
        }

        //vykresli vsechny pruty
        for (var i = prvniIndexPrutu; i < posledniIndexPrutu; i++) {

            var Ax = obj.grafyKCE[id].data[i].prut.kce.Ax;
            var Ay = obj.grafyKCE[id].data[i].prut.kce.Ay;
            var Bx = obj.grafyKCE[id].data[i].prut.kce.Bx;
            var By = obj.grafyKCE[id].data[i].prut.kce.By;
            
            //graf na prutu
            var graf = obj.grafyKCE[id].data[i].prut.kce.graf;
            var delkaKrokuPriblizne = obj.grafyKCE[id].data[i].prut.graf.delkaKrokuPriblizne;
            var nasobkyMocnin = obj.grafyKCE[id].data[i].prut.graf.nasobkyMocnin;

            //cisla uzlu na zacatku a konci elementu
            var uzelStart = obj.grafyKCE[id].data[i].prut.kce.uzelStart;
            var uzelEnd = obj.grafyKCE[id].data[i].prut.kce.uzelEnd;
           
            //parametry cary
            var barvaCaryPrut = obj.grafyKCE[id].data[i].prut.kce.barvaCary;
            var tloustkaCaryPrut = obj.grafyKCE[id].data[i].prut.kce.tloustkaCary;
            var barvaCarySrafy = obj.grafyKCE[id].data[i].prut.graf.barvaCarySrafy;
            var tloustkaCarySrafy = obj.grafyKCE[id].data[i].prut.graf.tloustkaCarySrafa;
            var barvaCaryGraf = obj.grafyKCE[id].data[i].prut.graf.barvaCaryGraf;
            var tloustkaCaryGraf = obj.grafyKCE[id].data[i].prut.graf.tloustkaCaryGraf;

            var vykreslitGraf = obj.grafyKCE[id].data[i].prut.graf.vykreslitGraf;
            var vykreslitSrafu = obj.grafyKCE[id].data[i].prut.graf.vykreslitSrafu;
            var vykreslitPrut = obj.grafyKCE[id].data[i].prut.kce.vykreslitPrut;

            //statusy zda zvyraznit uzel, ci nikoliv, vetsinou bude false
            var zvyrazniUzelStart = false;
            var zvyrazniUzelEnd = false;

            //je-li pozadovano nevykreslovat graf, pak se nastavi delkaKrokuPriblizne = 0
            if(this.vykresliGraf == false){
                delkaKrokuPriblizne = 0;
            }

            //detekuje, ktery uzel se ma zvyraznit, zda uzel na zacatku nebo na konci prutu
            if(uzelStart == zvyrazniCisloUzlu){
                zvyrazniUzelStart = true;
            }
  
            if(uzelEnd == zvyrazniCisloUzlu){
                zvyrazniUzelEnd = true;
            }

            //je-li vykreslovani cisel uzlu vypnuto, pak se "uzelStart" a "uzelEnd" prepisi na -1
            if(zobrazCislaUzlu == false){
                uzelStart = -1;
                uzelEnd = -1;
            }

            //upravi souradnice o stred Ox, Oy
            Ax = Ax + Ox;
            Ay = Ay + Oy;
            Bx = Bx + Ox;
            By = By + Oy;

            //je-li vypnut graf, pak se delkaKrokuPriblizne prepise na 0
            //tim se nevykresli graf prutu
            //to se prenastavi, pokud graf == false;
            if(graf == false){
                delkaKrokuPriblizne = 0; 
            }

            //pokud se nevykresluje srafa, pak se tloustkaCarySrafy prepise na "-1", tim se cara nevykresli
            if(vykreslitSrafu == false){
                tloustkaCarySrafy = "-1";
            }

            //pokud se nevykresluje prut, pak tloustkaCary se prepise na "-1"
            if(vykreslitPrut == false){
                tloustkaCaryPrut = "-1";
            }

            //kdyz je graf vypnuty, nema vyznam prepocitavat zadani
            if(graf == true){
                nasobkyMocnin = this.dopocitejNasobkyMocnin2(Ax, Ay, Bx, By, nasobkyMocnin);
            }

            //vykresli ten prut, ktery bude zvyraznen
            if(i == zvyraznitCisloPrutu){
                var prut = new vykresliPrut(Ax, Ay, Bx, By, nasobkyMocnin, delkaKrokuPriblizne, ctx, Ox, Oy, "red", 6, barvaCarySrafy, tloustkaCarySrafy, barvaCaryGraf, tloustkaCaryGraf, vykreslitGraf, meritkoGraf, poradnicePopis, uzelStart, uzelEnd, zvyrazniUzelStart, zvyrazniUzelEnd, this.posouvatText);
            
                //ziska vsechny souradnice
                var souradnicePopis = prut.getSouradnicePopisu();
                console.log(souradnicePopis);
                this.souradnicePopisu.push(souradnicePopis);

            }

            //vykresli vsechny ostatni (nevybrane pruty)
            else {
                var prut = new vykresliPrut(Ax, Ay, Bx, By, nasobkyMocnin, delkaKrokuPriblizne, ctx, Ox, Oy, barvaCaryPrut, tloustkaCaryPrut, barvaCarySrafy, tloustkaCarySrafy, barvaCaryGraf, tloustkaCaryGraf, vykreslitGraf, meritkoGraf, poradnicePopis, uzelStart, uzelEnd, zvyrazniUzelStart, zvyrazniUzelEnd, this.posouvatText);
            
                //ziska vsechny souradnice
                var souradnicePopis = prut.getSouradnicePopisu();
                //console.log(souradnicePopis);
                this.souradnicePopisu.push(souradnicePopis);

            }
            
        }

    }


    dopocitejNasobkyMocninTriHodnoty(delkaPrutu, X, Y){

        var XY = [];
        
        //1. radek soustavy rovnic
        var RadekABC = this.vratRadekSoustavyRovnicProVypocetABC(X[0]*delkaPrutu);
        XY.push(RadekABC);

        //2. radek soustavy rovnic
        var RadekABC = this.vratRadekSoustavyRovnicProVypocetABC(X[1]*delkaPrutu);
        XY.push(RadekABC);

        //3. radek soustavy rovnic
        var RadekABC = this.vratRadekSoustavyRovnicProVypocetABC(X[2]*delkaPrutu);
        XY.push(RadekABC);


        var XYinv = math.inv(XY);
        var abc = math.multiply(XYinv, Y);

        var a;
        var b;
        var c;

        a = abc[2];
        b = abc[1];
        c = abc[0];

        var vektorAbc = [a, b, c];

        return(vektorAbc);
        
    }


    vratRadekSoustavyRovnicProVypocetABC(x)
    {
        var x2 = x*x;
        var XYbod = [x2, x, 1];

        return(XYbod);
    }


    dopocitejNasobkyMocnin2(Ax, Ay, Bx, By, nasobkyMocnin){

        

        //nasobkyMocnin mohou byt ve tvaru [1,2,3] - pak se jedna o nasobky mocnin, uzivatelsky zadane
        //nebo ve tvaru [[100,200,300],[0,50,0]] - pak se jedna o souradnice x a y - zde je aproximovano parabolou
        
        //jednu nebo druhou variantu uchovava promenna jednaSeOSouradniceXY
        var jednaSeOSouradniceXY;
        var nasobkyMocninNew = [];
        jednaSeOSouradniceXY = Array.isArray(nasobkyMocnin[0])

        if(jednaSeOSouradniceXY == false){
            nasobkyMocninNew = nasobkyMocnin;
        }
        else {
            
            var X = nasobkyMocnin[0];
            var Y = nasobkyMocnin[1];

            var pocetKoeficientu;
            pocetKoeficientu = Y.length;

            

            var delkaPrutu = Math.pow(((Ax - Bx)*(Ax - Bx) + (Ay - By)*(Ay - By)), 0.5);

            if(pocetKoeficientu == 2){
                nasobkyMocninNew = this.dopocitejNasobkyMocninDveHodnoty(delkaPrutu, Y);
            }

            if(pocetKoeficientu == 3){
                nasobkyMocninNew = this.dopocitejNasobkyMocninTriHodnoty(delkaPrutu, X, Y);
            }

        }
        
        
        return(nasobkyMocninNew);

    }

    //dopocita nasobky mocnin, pokud je pozadovano zadani pomoci 2 krajnich bodu
    dopocitejNasobkyMocninDveHodnoty(delkaPrutu, Y){

        var yA = Y[0];
        var yB = Y[1];

        var deltaY = yB-yA;
        
        var a = deltaY/delkaPrutu;
        var b = yA;

        var nasobkyMocnin = [b, a];

        //dopocitava nasobky mocnin pro 3 hodnoty
        //var nasobkyMocnin = this.dopocitejNasobkyMocninTriHodnoty();

        return(nasobkyMocnin);

    }

};


//#########################################################################
//               Trida pro vypocitavani funkcnich hodnot na prutech

//trida vraci pole funkcnich hodnot pro dany element (prut)
//je treba zadat poradnice jako pole
// a pole koeficientu pred mocninami
class funkcniHodnotyNaElementu {

    constructor(koeficientyPredMocninamiFunkce, poradnice){

        this.funkcniHodnoty = [];

        this.koeficientyPredMocninamiFunkce = koeficientyPredMocninamiFunkce;
        this.poradnice = poradnice;

        this.funkcniHodnoty = this.vratFukcniHodnotyProPoradnice(koeficientyPredMocninamiFunkce, poradnice)

    }

    //vraci funkcni hodnoty
    getFunkcniHodnoty()
    {
        return(this.funkcniHodnoty);
    }


    vypocitejFunkcniHodnotu(mocnina, koeficient, poradnice)
    {
        var funkcniHodnota;
        funkcniHodnota = (Math.pow(poradnice, mocnina))*koeficient;

        return(funkcniHodnota);
    }


    vratFunkcniHodnotu(koeficientyPredMocninamiFunkce, poradnice)
    {

        var funkcniHodnota = 0;

        for (var i = 0; i < koeficientyPredMocninamiFunkce.length; i++) {
            var koeficient = koeficientyPredMocninamiFunkce[i];
            var mocnina = i;
            funkcniHodnota = funkcniHodnota + this.vypocitejFunkcniHodnotu(mocnina, koeficient, poradnice);
        }

    
        return(funkcniHodnota);

    }


    vratFukcniHodnotyProPoradnice(koeficientyPredMocninamiFunkce, poradnice)
    {

        var funkcniHodnoty = [];
        var funkcniHodnota;

        for (var i = 0; i < poradnice.length; i++) {
            var poradniceAktualni = poradnice[i];
            funkcniHodnota = this.vratFunkcniHodnotu(koeficientyPredMocninamiFunkce, poradniceAktualni);
            funkcniHodnoty.push(funkcniHodnota);
        }

        return(funkcniHodnoty);

    }

}

//###############################################################################################
//        Trida pro vypocitavani souradnic funkcnich hodnot pro vykreslovani grafu

//zde se dopocitavaji jednotlive souradnice vsech bodu grafu na jednom elementu
//zadaji se souradnice x,y koncu elementu, predpis funkcnich hodnot a zbytek se dopocita sam


class vypocetSouradnicGrafuPrutu {

    //spocitat c podle webu

    constructor(Ax, Ay, Bx, By, koeficientyPredMocninamiFunkce, delkaKrokuPriblizne, Oy, meritkoGraf)
    {

        this.Ax = Ax;
        this.Ay = Ay;
        this.Bx = Bx;
        this.Ny = By;
        this.Oy = Oy;
        this.meritkoGraf = meritkoGraf;

        this.delkaKroku;
        this.pocetKroku;

        this.koeficientyPredMocninamiFunkce = koeficientyPredMocninamiFunkce;
        this.delkaKrokuPriblizne = delkaKrokuPriblizne;

        //koeficienty "a" a "b" pro y=ax + b
        this.a;
        this.b;

        //koeficienty normaly
        this.an;
        //this.bn;  - koeficienty normaly jsou ulozene v poli, jelikoz kazdy koeficient lezi na jine kolmici ( prochazejici poradnici )
        
        //vrati koeficienty "a" a "b" primky
        this.spocitejRovniciPrimky(Ax, Ay, Bx, By);

        var poradnicePrutuVekt = []  // vektor s poradnicemi na prutu (prut je "rozsekan" na dilci intervaly)
        var souradniceXVekt = []     // vektor se souradnicemi X jednotlivych poradnic na prutu
        var souradniceYVekt = []     // vektor se souradnicemi Y jednotlivych poradnic na prutu
        var koeficientyBn = []       // vektor s koeficienty "b", kde kazde "b" nalezi kolmici vztycenou z X a Y dane poradnice

        var funkcniHodnotyXVekt = [] // vektor s funkcnimi hodnotami na prutu - souradnice X
        var funkcniHodnotyYVekt = [] // vektor s funkcnimi hodnotami na prutu - souradnice Y


        this.vratPocetIntervaluNaPrutu(Ax, Ay, Bx, By, this.delkaKrokuPriblizne);
        poradnicePrutuVekt = this.vratVektorSPoradnicemiNaPrutu(this.delkaKroku, this.pocetKroku);
        souradniceXVekt =  this.vratVektorXSouradnicProDaneVzdalenosti(poradnicePrutuVekt);     
        souradniceYVekt = this.vratVektorYSouradnicProDaneVzdalenosti(souradniceXVekt, this.a, this.b);
        koeficientyBn = this.vratVektorKoeficientuBn(souradniceXVekt, souradniceYVekt, this.a);
    
        
        //------------------------------------------------------
        //funkcni hodnoty bude volat a ziskavat sem:
        //var koeficientyPredMocninamiFunkce = [5, 10];
        //var poradnice = [0, 1, 2, 3, 4, 5];

        var funkcniHodnotyElement = new funkcniHodnotyNaElementu(this.koeficientyPredMocninamiFunkce, poradnicePrutuVekt);
        this.funkcniHodnoty = funkcniHodnotyElement.getFunkcniHodnoty();
        
        //uchova data aby je mohl vratit (neprepsana)
        this.funkcniHodnotyNeprepsana = this.funkcniHodnoty
        

        //pronasobi funkcni hodnoty meritkem
        this.funkcniHodnoty = this.pronasobFunkcniHodnotyMeritkem(this.funkcniHodnoty, this.meritkoGraf)

        //------------------------------------------------------
        
        //pokud prut je vodorovny, pak uvazuje ze se neprepocitavaji souradnice x a y grafu, ale vezmou se primo z funkcnich hodnot
        if((By - Ay)==0){
            funkcniHodnotyXVekt = souradniceXVekt;
            funkcniHodnotyYVekt = this.upravFunkcniHodnotyOy(this.funkcniHodnoty, this.Oy);
        }
        else {
            
            funkcniHodnotyXVekt = this.vratFunkcniHodnotySouradniceX(souradniceXVekt, souradniceYVekt, koeficientyBn, this.an, this.funkcniHodnoty);
            funkcniHodnotyYVekt = this.vratFunkcniHodnotySouradniceY(funkcniHodnotyXVekt, this.an, koeficientyBn);
            //funkcniHodnotyYVekt = this.upravFunkcniHodnotyY(funkcniHodnotyYVekt, souradniceYVekt);
        
            //obcas jsou hodnoty spatne, tak se zrcadli
            funkcniHodnotyXVekt = this.zrcadliSouradniceX(funkcniHodnotyXVekt, souradniceXVekt, this.Ax);
            funkcniHodnotyYVekt = this.zrcadliSouradniceY(funkcniHodnotyYVekt, souradniceYVekt, this.Ay);
        }

        //nastavi pole jako clenska data
        this.souradniceXVekt = souradniceXVekt;
        this.souradniceYVekt = souradniceYVekt;
        this.funkcniHodnotyXVekt = funkcniHodnotyXVekt;
        this.funkcniHodnotyYVekt = funkcniHodnotyYVekt;


    }


    //getry
    getSouradniceXVekt()
    {
        
        return(this.souradniceXVekt);
    };

    getSouradniceYVekt()
    {
        return(this.souradniceYVekt);
    };

    getFunkcniHodnotyXVekt()
    {
        return(this.funkcniHodnotyXVekt);
    };

    getFunkcniHodnotyYVekt()
    {
        return(this.funkcniHodnotyYVekt);
    };

    getFunkcniHodnoty()
    {
        return(this.funkcniHodnotyNeprepsana);
    };




    pronasobFunkcniHodnotyMeritkem(funkcniHodnoty, meritkoGraf)
    {
        var funkcniHodnota;
        var funkcniHodnotaMeritko;
        var funkcniHodnotyNew = []

        for (var i = 0; i < funkcniHodnoty.length; i++) {
            funkcniHodnota = funkcniHodnoty[i]
            funkcniHodnotaMeritko = funkcniHodnota * meritkoGraf;
            funkcniHodnotyNew.push(funkcniHodnotaMeritko);
        }    

        return(funkcniHodnotyNew)
    }


    upravFunkcniHodnotyOy(funkcniHodnoty, Oy)
    {
        var funkcniHodnota;
        var funkcniHodnotaOy;
        var funkcniHodnotyOy = [];

        for (var i = 0; i < funkcniHodnoty.length; i++) {
            funkcniHodnota = funkcniHodnoty[i];
            funkcniHodnotaOy = funkcniHodnota + Oy;
            funkcniHodnotyOy.push(funkcniHodnotaOy);
        }

        return(funkcniHodnotyOy);
    }


    //obcas je reseni v jinem kvadrantu, nez je ocekavano, tak se data prepocitavaji
    zrcadliSouradniceX(funkcniHodnotyXVekt, souradniceXVekt, Ax){

        var funkcniHodnota;
        var hodnotaX;
        var vzdalenostX;
        var hodnotaXnew;
        var funkcniHodnotyXVektNew = [];
        var X0;

        for (var i = 0; i < funkcniHodnotyXVekt.length; i++) {

            hodnotaX = funkcniHodnotyXVekt[i]

            //data se prepocitavaji, pokud funkcni hodnota je kladna, jinak ne
            funkcniHodnota = this.funkcniHodnoty[i];
            if(funkcniHodnota > 0){

                X0 = souradniceXVekt[i];

                vzdalenostX = hodnotaX - X0;
                hodnotaXnew = X0 - vzdalenostX;
                
                funkcniHodnotyXVektNew.push(hodnotaXnew);
            }
            else { //jinak zapisuje puvodni hodnotu
                funkcniHodnotyXVektNew.push(hodnotaX);
            }

        }   

        return(funkcniHodnotyXVektNew);

    }

    //zrcadli souradnice Y
    zrcadliSouradniceY(funkcniHodnotyYVekt, souradniceYVekt){

        var funkcniHodnota;
        var hodnotaY;
        var vzdalenostY;
        var hodnotaYnew;
        var funkcniHodnotyYVektNew = [];
        var Y0;

        for (var i = 0; i < funkcniHodnotyYVekt.length; i++) {

            hodnotaY = funkcniHodnotyYVekt[i];

            //data se prepocitavaji, pokud funkcni hodnota je kladna, jinak ne
            funkcniHodnota = this.funkcniHodnoty[i];

            if(funkcniHodnota > 0){
                
                Y0 = souradniceYVekt[i]; 
                vzdalenostY = hodnotaY - Y0;
                hodnotaYnew = Y0 - vzdalenostY;
                
                funkcniHodnotyYVektNew.push(hodnotaYnew);
            }
            else { //jinak zapisuje puvodni hodnotu
                funkcniHodnotyYVektNew.push(hodnotaY);
            }

            
        }   

        return(funkcniHodnotyYVektNew);

    }


    spocitejRovniciPrimky(Ax, Ay, Bx, By)
    {

        //koeficienty primky y = ax + b
        var a;
        var b;

        //smerovy vektor primky
        var u;
        var v;

        a = (Ay-By)/(Ax-Bx);
        b = By-Bx*a;

        u = 1;
        v = -a;

        this.a = a;
        this.b = b;

        this.u = u;
        this.v = v;        


    }

    vratPocetIntervaluNaPrutu(Ax, Ay, Bx, By, krokPriblizne)
    {

        var krok;
        var pocetKroku;
        var delkaPrutu = Math.pow(((Ax - Bx)*(Ax - Bx) + (Ay - By)*(Ay - By)), 0.5);

        pocetKroku = delkaPrutu / krokPriblizne;

        pocetKroku = Math.round(pocetKroku);
        krok = delkaPrutu / pocetKroku;

        this.delkaKroku = krok;
        this.pocetKroku = pocetKroku;

        return(krok);

    }

    vratVektorSPoradnicemiNaPrutu(delkaKroku, pocetKroku)
    {
        var poradnicePrutuVekt = [];
        var aktualniPoradnice = 0;

        //prida 0. poradnici
        poradnicePrutuVekt.push(aktualniPoradnice);

        for (var i = 0; i < pocetKroku; i++) {
            aktualniPoradnice = aktualniPoradnice + delkaKroku;
            poradnicePrutuVekt.push(aktualniPoradnice);
        }     

        return(poradnicePrutuVekt);
    }


    vratVektorXSouradnicProDaneVzdalenosti(vzdalenostiVektor)
    {

        var aktualniPoradnicePrutu;
        var aktualniXSouradnicePrutu;
        var souradniceXVekt = [];

        for (var i = 0; i < vzdalenostiVektor.length; i++) {
            aktualniPoradnicePrutu = vzdalenostiVektor[i];
            aktualniXSouradnicePrutu = this.spocitejSouradniciBoduNaPrimceVDaneVzdalenostiX(this.a, this.b, this.Ax, this.Ay, aktualniPoradnicePrutu, this.Bx);
            souradniceXVekt.push(aktualniXSouradnicePrutu);
        }
        
        return(souradniceXVekt);

    }


    vratVektorYSouradnicProDaneVzdalenosti(souradniceXVektor, a, b)
    {

        var aktualniSouradniceX;
        var aktualniSouradniceY;
        var souradniceYVekt = [];


        for (var i = 0; i < souradniceXVektor.length; i++) {
            aktualniSouradniceX = souradniceXVektor[i];
            aktualniSouradniceY = a * aktualniSouradniceX + b;
            //aktualniSouradniceY = 100 - aktualniSouradniceY;
            souradniceYVekt.push(aktualniSouradniceY);
        }     

        return(souradniceYVekt);

    }


    vratVektorKoeficientuBn(souradniceXVekt, souradniceYVekt, ap)
    {

        //koeficienty "a" a "b" normaly
        var an;
        var bn;

        var Ax;
        var Ay;

        var koeficientyBn = [];

        an = -1/ap;
        //an = -an;

        //an ulozi do clensek promenne rovnou, bn uklada do pole
        this.an = an;  

        //nize dopocitava bn pro kazdou primku zvlast
        for (var i = 0; i < souradniceXVekt.length; i++) {
            Ax = souradniceXVekt[i];
            Ay = souradniceYVekt[i];

            bn = -an*Ax + Ay;  // + 20;
            koeficientyBn.push(bn);

        }

        return(koeficientyBn);

    }


    vratFunkcniHodnotySouradniceX(souradniceXVekt, souradniceYVekt, koeficientyBn, an, funkcniHodnoty)
    {

        //pole kam zapisuje X-souradnice na normale (jako funkcni hodnoty)
        var funkcniHodnotyXVekt = [];

        //funkcni hodnota jako polomer kruznice
        var funkcniHodnota;

        //konkretni hodnota
        var funkcniHodnotaX;

        //Ax je bod jako prusecik prutu a normaly 
        var Ax;
        var Ay;

        //Bx je bod, aby vedel jake ma hledat reseni, zda x1, nebo x2
        var Bx = souradniceXVekt[souradniceXVekt.length];

        //koeficienty "a" a "b" normály
        //var an;   // definovano jako parametr
        var bn;     // nacita se z pole, pro kazdou normalu zvlast

        
        for (var i = 0; i < souradniceXVekt.length; i++) {

            funkcniHodnota = funkcniHodnoty[i];

            Ax = souradniceXVekt[i];
            Ay = souradniceYVekt[i];
            bn = koeficientyBn[i];

            funkcniHodnotaX = this.spocitejSouradniciBoduNaPrimceVDaneVzdalenostiX(an, bn, Ax, Ay, funkcniHodnota, Bx);
            funkcniHodnotyXVekt.push(funkcniHodnotaX);

        }

        return(funkcniHodnotyXVekt);

    }

   
    //upravuje funkcni honoty y, tak aby sedeli jako kdyz KCE neni natocena
    upravFunkcniHodnotyY(funkcniHodnotyYVekt, souradniceYVekt)
    {
        
        var yOpravena;
        var souradniceY;
        var funkcniHodnotaY;
        var funkcniHodnotyYVektNew = [];

        for (var i = 0; i < souradniceYVekt.length; i++) {
            funkcniHodnotaY = funkcniHodnotyYVekt[i];
            souradniceY = souradniceYVekt[i];
            yOpravena =  souradniceY - funkcniHodnotaY;

            funkcniHodnotyYVektNew.push(yOpravena);
        }    

        return(funkcniHodnotyYVektNew);

    }


    vratFunkcniHodnotySouradniceY(funkcniHodnotyXVekt, an, koeficientyBn)
    {

        var funkcniHodnotyYVekt = [];
        var funkcniHodnotaX;
        var funkcniHodnotaY;
        var bn;

        for (var i = 0; i < funkcniHodnotyXVekt.length; i++) {
            funkcniHodnotaX = funkcniHodnotyXVekt[i];
            bn = koeficientyBn[i];

            funkcniHodnotaY = an * funkcniHodnotaX + bn;

            //funkcniHodnotaY = an * funkcniHodnotaX + bn;
            funkcniHodnotyYVekt.push(funkcniHodnotaY);

        }

        return(funkcniHodnotyYVekt);
        
    }    


    spocitejSouradniciBoduNaPrimceVDaneVzdalenostiX(aPrimka, bPrimka, Ax, Ay, r, Bx)
    {
        //spocita kvadratickou rovnici, jejiz koreny jsou pruseciky s primkou
        //kvadraticka rovnice je ve tvaru ax2 + bx + c = 0
        //pozn. Ox a Oy jsou souradnice stredu kruznice

        //aPrimka bPrimka jsou koeficienty "a" a "b" primky
        //koeficienty "a" a "b" jsou koeficienty kruznice

        //bod Bx je predan jen z duvodu, aby rozhodl, ktery koiren je spravny
        //koren musi lezet mezi Ax a Bx
        
        var a;
        var b;
        var c;
        var x1;
        var x2;
        var x;            //uvazovany koren ktery je mezi Ax a Bx
        var Diskriminant;

        //aPrimka = -1/aPrimka;

        var xAbs;

        var vzdalXBx1;     //vzdalenost mezi prusecikem kruznice a primky  a bodem Bx - uvazuje se koren x1 
        var vzdalXBx2;     //vzdalenost mezi prusecikem kruznice a primky  a bodem Bx - uvazuje se koren x2

        a = (Math.pow(aPrimka,2))+1;
        b = 2 * aPrimka * (bPrimka - Ay) - 2 * Ax;
        c = Math.pow((bPrimka - Ay), 2) + Math.pow(Ax, 2) - Math.pow(r, 2);

        //nize resi kvadratickou rovnici
        //x = (-b +-(b2-4ac)^0.5)/2a

        Diskriminant = b*b - 4*a*c;
        x1 = (-b + Math.pow(Diskriminant, 0.5))/(2*a);
        x2 = (-b - Math.pow(Diskriminant, 0.5))/(2*a);

        vzdalXBx1 = Math.abs(x1 - Bx);
        vzdalXBx2 = Math.abs(x2 - Bx);

        //vybere ten koren, ktery je mezi Ax a Bx
        //pozna se to podle vzdalenosti x1/x2 - Bx, ta ktera je mensi, ten koren lezi v intervalu
        if(vzdalXBx2 < vzdalXBx1){
            x = x2;
        }
        else {
            x = x1;
        }

        //pokud r = 0, pak za koren se povazuje Ax
        if(r == 0){
            x = Ax;
        }

        return(x)

    }


}


//POKRACOVAT ZDE A ROZPOZNAT ZDA SE TEXT PREKRYVA...

//###############################################################################################
//       Trida pro detekci, zda se jednotlive texty neprekryvaji, 
//                  pokud ano, pak se upravuji souradnice

class detekujKoliziTextu {

    constructor(souradnicePopisu) {

        //console.log(souradnicePopisu);

        this.souradniceXVlevoVpravo = this.vratSouradniceXVlevoVpravo(souradnicePopisu);
        this.indexyKolidujicichSouradnic = this.vratIndexyKolidujicichTextu(this.souradniceXVlevoVpravo);
       
       
        this.indexyKPosunuti = this.vratVsechnyIndexyTextuKPosunutiPole(this.indexyKolidujicichSouradnic);
        
        //console.log(this.indexyKPosunuti);
        this.souradnicePopisuNew = this.posunVsechnyTextyPodleIndexu(souradnicePopisu, this.indexyKPosunuti);

    }


    // vrati data
    getSouradnicePopisu(){
        //console.log(this.souradnicePopisuNew);
        return(this.souradnicePopisuNew);
    }


    posunVsechnyTextyPodleIndexu(souradnicePopisu, indexyKPosunuti){

        var souradnicePopisuNew = [];
        var index21;
        var souradnicePopisuRadek;

        for (var i = 0; i < souradnicePopisu.length; i++) {

            //pokud index "i" je v poli "indexyKPosunuti", pak se text posouva
            //jinak se neposouva, je tedy treba jej jen prekopirovat do "souradnicePopisuNew" 
            index21 = i*2 + 1;

            souradnicePopisuRadek = this.vratRadekSPosunutouSouradnici(index21, souradnicePopisu, indexyKPosunuti)
            souradnicePopisuNew.push(souradnicePopisuRadek);
            
        }

       // console.log(souradnicePopisuNew);
        return(souradnicePopisuNew);
        
    }


    vratRadekSPosunutouSouradnici(index2, souradnicePopisu, indexyKPosunuti){

        var posunoutSouradnici;
        var souradnicePopisuRadek;
        var souradnicePopisuRadekPosunuty;
        var iModulo;
        var index;

        iModulo = index2 % 2;
        index = (index2 - iModulo) / 2;
        posunoutSouradnici = indexyKPosunuti.includes(index2);
        souradnicePopisuRadek = souradnicePopisu[index];

        if(posunoutSouradnici == true){
            souradnicePopisuRadekPosunuty = this.posunSouradniciY(souradnicePopisuRadek, iModulo);
        }
        else{
            souradnicePopisuRadekPosunuty = souradnicePopisuRadek;
        }

        return(souradnicePopisuRadekPosunuty);
       
    }


    posunSouradniciY(souradnicePopisuRadek, index){

        var souradniceNaKonciPrutu;     
        var text;
        var souradniceX;
        var souradniceY;
        var souradniceYNew;

        var souradniceNaKonciPrutuNew = [];
        var souradnicePopisuRadekNew;
        
        
        souradniceNaKonciPrutu = souradnicePopisuRadek[index];
        text = souradniceNaKonciPrutu[0];
        souradniceX = souradniceNaKonciPrutu[1];
        souradniceY = souradniceNaKonciPrutu[2];
        souradniceYNew = souradniceY - 10;

        //vytvori nova data, s jiz posunutou souradnici y
        souradniceNaKonciPrutuNew.push(text);
        souradniceNaKonciPrutuNew.push(souradniceX);
        souradniceNaKonciPrutuNew.push(souradniceYNew);

        //prepise puvodni data, daty novymi, cimz opravi souradnici
        souradnicePopisuRadekNew = souradnicePopisuRadek;
        souradnicePopisuRadekNew[index] = souradniceNaKonciPrutuNew
        
        return(souradnicePopisuRadekNew)

    }


    //vrati indexy textu v poli, ty ktere maji byt posunuty
    vratVsechnyIndexyTextuKPosunutiPole(indexyKolidujicichSouradnic){

        var indexyKolizePole;
        var indexKolize;
        var indexyKolizi = [];

        for (var i = 0; i < indexyKolidujicichSouradnic.length; i++) {

            indexyKolizePole = indexyKolidujicichSouradnic[i]

            for (var k = 0; k < indexyKolizePole.length; k++) {

                indexKolize = indexyKolizePole[k]
                indexyKolizi.push(indexKolize);

            }     

        } 
        
        return(indexyKolizi);

    }

    //vrati pole, kde jsou vsechny souradnice x
    //kazdy radek obsahuje x-ovou souradnici vlevo a vpravo daneho textu
    vratSouradniceXVlevoVpravo(souradnicePopisu){

        var souradniceJednohoPrutu;
        
        var souradniceStart;
        var souradniceEnd;

        var souradniceStartX;
        var souradniceEndX;
        var souradniceX = [];


        for (var i = 0; i < souradnicePopisu.length; i++) {

            souradniceJednohoPrutu = souradnicePopisu[i];
            souradniceStart = souradniceJednohoPrutu[0];
            souradniceEnd = souradniceJednohoPrutu[1];

            if(souradniceStart != undefined){
                if(souradniceEnd != undefined){
                    souradniceStartX = this.vratZacatekAKonecTextuX(souradniceStart);
                    souradniceEndX = this.vratZacatekAKonecTextuX(souradniceEnd);

                    souradniceX.push(souradniceStartX);
                    souradniceX.push(souradniceEndX);

                    //console.log(souradniceX);
                }
            }
        }

        return(souradniceX);
    }


    //vrati pole s indexy s kterymi dana polozka koliduje
    vratIndexyKolidujicichTextu(souradniceXVlevoVpravo){

        var souradniceA;
        var souradniceObaKoncePrutu;
        var indexyKolidujiciSouradnice;
        var indexyKolidujicichSouradnicPole = [];

        for (var i = 0; i < souradniceXVlevoVpravo.length; i++) {

            souradniceObaKoncePrutu = souradniceXVlevoVpravo[i];
            souradniceA = souradniceObaKoncePrutu[0];
            
            indexyKolidujiciSouradnice = this.vratCislaIndexuSKterymSouradniceKoliduje(souradniceA, souradniceXVlevoVpravo)
            indexyKolidujicichSouradnicPole.push(indexyKolidujiciSouradnice);
            
        }

        return(indexyKolidujicichSouradnicPole);
    }


    //vrati index druhe souradnice s kterym ta prvni koliduje
    vratCislaIndexuSKterymSouradniceKoliduje(souradniceA, souradniceXVlevoVpravo){

        var souradniceTextu;
        var souradniceKoliduje;
        var indexyKolidujiciSouradnice = [];
        var indexKolidujiciSouradnice;

        for (var i = 0; i < souradniceXVlevoVpravo.length; i++) {

            souradniceTextu = souradniceXVlevoVpravo[i];
            souradniceKoliduje = this.detekujKoliziSouradnic(souradniceA, souradniceTextu);
            //console.log(souradniceA);
            //console.log(souradniceTextu);

            if(souradniceKoliduje == true){
                indexKolidujiciSouradnice = i;
                indexyKolidujiciSouradnice.push(indexKolidujiciSouradnice);
            }
        }

        return(indexyKolidujiciSouradnice);

    }


    //pokud je "souradniceA" mezi polozkami pole "souradniceTextu", pak vraci true
    detekujKoliziSouradnic(souradniceA, souradniceTextu){

        var souradniceB1;
        var souradniceB2;
        var kolizeSouradnic = false;

        souradniceB1 = souradniceTextu[0];
        souradniceB2 = souradniceTextu[1];

        if(souradniceA > souradniceB1){
            if(souradniceA < souradniceB2){
                kolizeSouradnic = true;
            }
        }

        //asi je nekde chyba, vsechny statusy by nemely byt false

        //console.log(kolizeSouradnic);
        //console.log(souradniceA);
        //console.log(souradniceTextu);

        return(kolizeSouradnic);

    } 


    // vrati X-souradnici zacatku a konce textu
    vratZacatekAKonecTextuX(souradnice){

        var zacatekX;
        var konecX;
        var text;
        var zacatekAKonecTextuX = [];


        zacatekX = souradnice[1];
        text = souradnice[0];
        konecX = this.dopocitejKonecTextuVPixelech(text, zacatekX);

        zacatekAKonecTextuX.push(zacatekX);
        zacatekAKonecTextuX.push(konecX);

        return(zacatekAKonecTextuX);

    }


    dopocitejKonecTextuVPixelech(text, souradniceXZacatek){

        var delkaTextu;
        var souradniceXKonec;

        text = "" + text;

        delkaTextu = text.length;
        souradniceXKonec = parseInt(souradniceXZacatek) + parseInt(delkaTextu)*3; 

        return(souradniceXKonec);

    }

}


//###############################################################################################
//                Trida pro vykreslovani jednotliveho prutu

class vykresliPrut {

    constructor(Ax, Ay, Bx, By, koeficientyPredMocninamiFunkce, delkaKrokuPriblizne, ctx, Ox, Oy, barvaCaryPrut, tloustkaCaryPrut, barvaCarySrafy, tloustkaCarySrafy, barvaCaryHranice, tloustkaCaryHranice, vykreslitGraf, meritkoGraf, poradnicePopis, uzelStart, uzelEnd, zvrazniUzelStart, zvyrazniUzelEnd, posouvejText){

        //nove - detekuji zda se popis neprekryva
        //k tomu slouzi pole "souradnicePopisu", ktere uchovava vsechny popisy, ktere se budou vykreslovat
        //data popisu se budou nasledne zpracovavat v jine tride
        this.souradnicePopisu = [];

        //pokud se ma posouvat text popisu, je nastaveno "this.posouvejText = true"
        //pokud pobezi kod starou cestou (bez posouvani), pak je nastaveno "this.posouvejText = false"
        this.posouvejText = posouvejText;

        // tudy bezi hlavni kod
        this.hlavniMetoda(Ax, Ay, Bx, By, koeficientyPredMocninamiFunkce, delkaKrokuPriblizne, ctx, Ox, Oy, barvaCaryPrut, tloustkaCaryPrut, barvaCarySrafy, tloustkaCarySrafy, barvaCaryHranice, tloustkaCaryHranice, vykreslitGraf, meritkoGraf, poradnicePopis, uzelStart, uzelEnd, zvrazniUzelStart, zvyrazniUzelEnd)

    }     

    //vraci souradnice vsech popisu, aby mohl detekovat prekryvajicise popisy
    getSouradnicePopisu(){
        //console.log(this.souradnicePopisu);
        return(this.souradnicePopisu);
    }
    

    //obsahuje hlavni cast kodu pro vykreslovani prutu
    hlavniMetoda(Ax, Ay, Bx, By, koeficientyPredMocninamiFunkce, delkaKrokuPriblizne, ctx, Ox, Oy, barvaCaryPrut, tloustkaCaryPrut, barvaCarySrafy, tloustkaCarySrafy, barvaCaryHranice, tloustkaCaryHranice, vykreslitGraf, meritkoGraf, poradnicePopis, uzelStart, uzelEnd, zvrazniUzelStart, zvyrazniUzelEnd){

        //var c = document.getElementById("myCanvas");
        ///var ctx = c.getContext("2d");
        ctx.beginPath();

        //definuje souradnice konce elementu (prutu)
        var Ax;
        var Ay;
        var Bx;
        var By;

        //posune souradnice pro vykresleni grafu na prutu O Ox a Oy (souradnice prutu jsou jiz posunuty)
        this.Ox = Ox;
        this.Oy = Oy;
        this.meritkoGraf = meritkoGraf;

        //vypise popis grafu
        this.popisZacatek;    //zrusit
        this.popisKonec;        //zrusit
        this.poradnicePopis = poradnicePopis;  //nechat

        //definuje pole ktere uchovavaji souradnice o vykresleni grafu po elementu
        this.souradniceXVekt = [];
        this.souradniceYVekt = [];
        this.funkcniHodnotyXVekt = [];
        this.funkcniHodnotyYVekt = [];

        this.hraniceGrafuVykresleni = [];

        
        //nakresli prut
        //prut vykresluje naposled, aby prekryl pripadnou rozdilnou barvu
        this.nakresliPrut(Ax, Ay, Bx, By, ctx, barvaCaryPrut, tloustkaCaryPrut);

        //tzn. je tam graf a nebudou se vypisovat cisla uzlu na prutu
        if(delkaKrokuPriblizne > 0){
            
            //inicializuje tridu pro ziskani souradnic pro vykresleni grafu na elementu
            var souradniceGrafuElementu = new vypocetSouradnicGrafuPrutu(Ax, Ay, Bx, By, koeficientyPredMocninamiFunkce, delkaKrokuPriblizne, this.Oy, this.meritkoGraf)
            
            //data pro vykresleni grafu na elementu
            this.souradniceXVekt = souradniceGrafuElementu.getSouradniceXVekt();
            this.souradniceYVekt = souradniceGrafuElementu.getSouradniceYVekt();
            this.funkcniHodnotyXVekt = souradniceGrafuElementu.getFunkcniHodnotyXVekt();
            this.funkcniHodnotyYVekt = souradniceGrafuElementu.getFunkcniHodnotyYVekt();
            

            //funkcni hodnoty grafu bez meritka, bez posunu souradnic
            this.funkcniHodnoty = souradniceGrafuElementu.getFunkcniHodnoty();
            
            //vrati pole true/false, podle ktereho se vykresluji jednotlive casti grafu
            this.hraniceGrafuVykresleni = this.vratTrueFalseProHraniciGrafu(vykreslitGraf, this.funkcniHodnotyXVekt.length)

            //nakresli hranici grafu
            this.vykreslujHraniciGrafu(this.funkcniHodnotyXVekt, this.funkcniHodnotyYVekt, ctx, barvaCaryHranice, tloustkaCaryHranice, this.hraniceGrafuVykresleni, this.poradnicePopis);

            //vykresluj srafy grafu
            this.vykreslujSrafyGrafu(this.souradniceXVekt, this.souradniceYVekt, this.funkcniHodnotyXVekt, this.funkcniHodnotyYVekt, ctx, barvaCarySrafy, tloustkaCarySrafy);

        }

        else {  //tzn. neni tam graf a budou se vykreslovat cisla uzlu na prutu
            //zapise cisla uzlu na prut
            if(uzelStart > -1){

                //inicializuje tridu pro ziskani souradnic pro vykresleni grafu na elementu
                //jelikoz je delkaKrokuPriblizne = 0, pak se nastavuje 10, aby vubec metoda neco vratila
                //je treba zadat do "koeficientyPredMocninamiFunkce" nejake male smeti, jinak vypocet pada
                var souradniceGrafuElementu = new vypocetSouradnicGrafuPrutu(Ax, Ay, Bx, By, [0, 1.0e-16], 10, this.Oy, this.meritkoGraf)
            
                //data pro vykresleni grafu na elementu
                var funkcniHodnotyXVekt = souradniceGrafuElementu.getFunkcniHodnotyXVekt();
                var funkcniHodnotyYVekt = souradniceGrafuElementu.getFunkcniHodnotyYVekt();

                this.zapisZacatekAKonecPrutu(ctx, uzelStart, uzelEnd, funkcniHodnotyXVekt, funkcniHodnotyYVekt)
            }
        }

        //vetsinou je uzel jen na zacatku nebo jen na konci, nebo neni pozadovano zvyrazneni zadneho uzlu
        //zvyrazni uzel, na zacatku
        if(zvrazniUzelStart == true){

            //polomer kruznice puntiku
            var polomerPuntiku;
            polomerPuntiku = parseInt(tloustkaCaryPrut) + 3

            this.zvyrazniCisloUzlu(ctx, true, this.souradniceXVekt, this.souradniceYVekt, "Red", polomerPuntiku)
        
        }

        //zvyrazni uzel na konci
        if(zvyrazniUzelEnd == true){

            //polomer kruznice puntiku
            var polomerPuntiku;
            polomerPuntiku = parseInt(tloustkaCaryPrut) + 3

            this.zvyrazniCisloUzlu(ctx, false, this.souradniceXVekt, this.souradniceYVekt, "Red", polomerPuntiku)

        }

    }


    //generuje pole, ktere umoznuje vykreslovat jen cast grafu
    vratTrueFalseProHraniciGrafu(vykreslitGraf, delkaPole)
    {

        //pokud je vykreslitGraf = -3, pak se dilky 1-3 nevykresli, pak 4-6 vykresli, 7-9 nevykresli, atd...
        //pokud je vykreslitGraf = +3, pak se dilky 1-3 vykresli, pak 4-6 nevykresli, 7-9 vykresli, atd...
        
        var vykresleniGrafuPole = [];
        var vykreslitGrafIndexZakladni;
        var vykreslitGrafIndex;
        var vykreslovatGraf;
        
        vykreslitGrafIndexZakladni = Math.abs(vykreslitGraf);
        vykreslitGrafIndex = vykreslitGrafIndexZakladni;

        if(Number.isInteger(vykreslitGraf) == true){

            if(vykreslitGraf < 0){
                vykreslovatGraf = false;
            }
            else {
                vykreslovatGraf = true;
            }
    
            for (var i = 0; i < delkaPole; i++) {
               
                if(i > vykreslitGrafIndex){
                    vykreslitGrafIndex = i;
                    vykreslitGrafIndex = vykreslitGrafIndex + vykreslitGrafIndexZakladni - 1;
                    if(vykreslovatGraf == false){
                        vykreslovatGraf = true;
                    }
                    else {
                        vykreslovatGraf = false;
                    }
                }
    
                vykresleniGrafuPole.push(vykreslovatGraf);
            }    
        }

        else {
            for (var i = 0; i < delkaPole; i++) {
                vykresleniGrafuPole.push(vykreslitGraf);
            }
        }

        return(vykresleniGrafuPole);

    }


    nakresliPrut(Ax, Ay, Bx, By, ctx, barvaCary, tloustkaCary)
    {
        if(tloustkaCary != "-1"){
            ctx.moveTo(Ax, Ay);
            ctx.lineTo(Bx, By);
            ctx.strokeStyle = barvaCary;
            ctx.lineWidth = tloustkaCary;
            ctx.stroke();
        }
    }


    //zapise cisla uzlu na zacatku akonci prutu
    zapisZacatekAKonecPrutu(ctx, uzelStart, uzelEnd, funkcniHodnotyXVekt, funkcniHodnotyYVekt)
    {

        var Bx;
        var By;
        var delkaPole;

        delkaPole = funkcniHodnotyXVekt.length;

        //popis na zacatku
        Bx = funkcniHodnotyXVekt[1]-10;  //text posunut o 10 pixelu
        By = funkcniHodnotyYVekt[1]-10;
        this.vlozpopis(uzelStart, Bx, By, ctx);
        
        //popis na konci
        Bx = funkcniHodnotyXVekt[delkaPole-1]-10;
        By = funkcniHodnotyYVekt[delkaPole-1]-10;
        this.vlozpopis(uzelEnd, Bx, By, ctx);

    }


    //zvyrazni cislo uzlu puntikem
    //pokud je "zacatekPrutu == true"  -> jedna se o uzel na zacatku prutu
    //pokud je "zacatekPrutu == false"  -> jedna se o uzel na konci prutu

    zvyrazniCisloUzlu(ctx, zacatekPrutu, funkcniHodnotyXVekt, funkcniHodnotyYVekt, barva, prumer){

        var Bx;
        var By;
        var delkaPole;

        delkaPole = funkcniHodnotyXVekt.length;

        if(zacatekPrutu == true){
            Bx = funkcniHodnotyXVekt[0];  
            By = funkcniHodnotyYVekt[0];
        }
        else {
            Bx = funkcniHodnotyXVekt[delkaPole-1];
            By = funkcniHodnotyYVekt[delkaPole-1];
        }
        
        //nakresli puntik
        this.nakresliKruznici(Bx, By, prumer, ctx, barva, true);

    }


    //vykresluje hranici grafu
    vykreslujHraniciGrafu(funkcniHodnotyXVekt, funkcniHodnotyYVekt, ctx, barvaCary, tloustkaCary, hraniceGrafuVykresleni, poradnicePopis)
    {

        //body hranice grafu Ax, Ay, Bx, By
        var Ax;
        var Ay;
        var Bx;
        var By;
        var vykresleniGrafu;
        var poradnicePopis;
        var delkaPole;

        Ax = funkcniHodnotyXVekt[0];
        Ay = funkcniHodnotyYVekt[0];
        delkaPole = funkcniHodnotyXVekt.length;

        for (var i = 1; i < delkaPole; i++) {

            Bx = funkcniHodnotyXVekt[i];
            By = funkcniHodnotyYVekt[i];
            vykresleniGrafu = hraniceGrafuVykresleni[i];

            if(vykresleniGrafu == true){
                this.nakresliHraniciGrafu(Ax, Ay, Bx, By, ctx, barvaCary, tloustkaCary);
            }

            Ax = Bx;
            Ay = By;

        }


        //popise hodnoty na grafu na zacatku i na konci
        if(poradnicePopis == -1){

            //popis na zacatku
            Bx = funkcniHodnotyXVekt[1]-5;  //text posunut o 5 pixelu
            By = funkcniHodnotyYVekt[1]-5;
            var hodnotaNaZacatku;
            hodnotaNaZacatku = this.funkcniHodnoty[0];

            if(hodnotaNaZacatku != 0){

                //pokud se ma posouvat text, vykreslovani probiha jinde
                if(this.posouvejText == "true"){
                    this.pridejSouradnicePopisuRadekDoDat(hodnotaNaZacatku, Bx, By)
                }
                else {  //vykresluje se popis zde, neni treba nic posouvat
                    this.vlozpopis(hodnotaNaZacatku, Bx, By, ctx);
                }
            }
            
            //popis na konci
            Bx = funkcniHodnotyXVekt[delkaPole-1]-5;
            By = funkcniHodnotyYVekt[delkaPole-1]-5;
            var hodnotaNaKonci;
            hodnotaNaKonci = this.funkcniHodnoty[delkaPole-1];

            if(hodnotaNaKonci != 0){

                //pokud se ma posouvat text, vykreslovani probiha jinde
                if(this.posouvejText == "true"){
                    this.pridejSouradnicePopisuRadekDoDat(hodnotaNaKonci, Bx, By)
                }
                else {  //vykresluje se popis zde, neni treba nic posouvat
                    this.vlozpopis(hodnotaNaKonci, Bx, By, ctx);
                }


            }

        }

        else {    //popise popis na konkretni poradnici

            Bx = funkcniHodnotyXVekt[poradnicePopis];
            By = funkcniHodnotyYVekt[poradnicePopis];
            this.vlozpopis(this.funkcniHodnoty[poradnicePopis], Bx, By, ctx);

        }
        
    }


    pridejSouradnicePopisuRadekDoDat(hodnota, Bx, By){

        var souradnicePopisuRadek = [];

        souradnicePopisuRadek.push(hodnota);
        souradnicePopisuRadek.push(Bx);
        souradnicePopisuRadek.push(By);

        this.souradnicePopisu.push(souradnicePopisuRadek);

    }


    //vykresluje srafy grafu
    vykreslujSrafyGrafu(souradniceXVekt, souradniceYVekt, funkcniHodnotyXVekt, funkcniHodnotyYVekt, ctx, barvaCary, tloustkaCary)
    {

        //body jedne cary-srafy grafu Ax, Ay, Bx, By
        var Ax;
        var Ay;
        var Bx;
        var By;

        for (var i = 0; i < funkcniHodnotyXVekt.length; i++) {
            Ax = souradniceXVekt[i];
            Ay = souradniceYVekt[i];
            Bx = funkcniHodnotyXVekt[i];
            By = funkcniHodnotyYVekt[i];

            this.nakresliCaruSrafy(Ax, Ay, Bx, By, ctx, barvaCary, tloustkaCary);
        }    

    }

    nakresliHraniciGrafu(Ax, Ay, Bx, By, ctx, barvaCary, tloustkaCary)
    {
        if(tloustkaCary != "-1"){
            ctx.moveTo(Ax , Ay);
            ctx.lineTo(Bx , By);

            ctx.strokeStyle = barvaCary;
            ctx.lineWidth = tloustkaCary;
            ctx.stroke();
        }
    }

    nakresliCaruSrafy(Ax, Ay, Bx, By, ctx, barvaCary, tloustkaCary)
    {
        if(tloustkaCary != "-1"){

            ctx.moveTo(Ax , Ay);
            ctx.lineTo(Bx , By);
    
            ctx.strokeStyle = barvaCary;
            ctx.lineWidth = tloustkaCary;
            ctx.stroke();

        }
    }

    //popisuje hodnoty grafu
    vlozpopis(text, textX, textY, ctx){
       
        ctx.fillStyle = "black";
        ctx.font = "15px Arial";
        ctx.fillText(text, textX, textY);

    }

    //nakresli puntik
    nakresliKruznici(stredX, stredY, polomer, ctx, barva, vyplnKruhu){

        ctx.beginPath();
        ctx.arc(stredX, stredY, polomer, 0, 2 * Math.PI);
        ctx.strokeStyle = barva; 
        ctx.fillStyle = barva;

        if(vyplnKruhu == true){
            ctx.fill();    
        }
    
        ctx.stroke();

    }

}


//#############################################################################################    
//               Trida vykresluje text, ktery byl posunut
//              Text neposunuty se vykresluje originalnim kodem

//vykresluje ten text, ktery je posunuty, pokud posunuty neni, nevykresluje se zde, ale jinde
class vykresliVsechenText{

    constructor(souradnicePopisu, ctx){

        //console.log(souradnicePopisu);

        this.ctx = ctx;

        //vykresluje cele pole
        this.vykreslujCelePole(souradnicePopisu);

    }

    vykreslujCelePole(souradnicePopisu){

        var souradniceRadek;
        var souradniceVlevo;
        var souradniceVpravo;

        for (var i = 0; i < souradnicePopisu.length; i++) {

            souradniceRadek = souradnicePopisu[i];
            souradniceVlevo = souradniceRadek[0];
            souradniceVpravo = souradniceRadek[1];

            if(souradniceRadek.length > 0){
                this.vykresliJedenUzel(souradniceVlevo);
                this.vykresliJedenUzel(souradniceVpravo);
            }

        }
    }

    vykresliJedenUzel(souradniceUzel){

        var text;
        var souradniceX;
        var souradniceY;

        if(souradniceUzel != undefined){
            text = souradniceUzel[0];
            souradniceX = souradniceUzel[1];
            souradniceY = souradniceUzel[2];

            this.vlozpopis(text, souradniceX, souradniceY)
        }
        
    }


    //popisuje hodnoty grafu
    vlozpopis(text, textX, textY){

        this.ctx.fillStyle = "black";
        this.ctx.font = "15px Arial";
        this.ctx.fillText(text, textX, textY);

    }

}


//#############################################################################################    
//               Trida zjistujici cisla uzlu k prutum
//       - data se zjistuji, aby bylo mozne nastavit cisla uzlu k prutum do "Element Preview"

class zjistiCislaUzluKPrutum{

    constructor(zvolenyJSONStr, vybranyPrut, vybranyUzel){

        var grafyKCE = eval(zvolenyJSONStr);
        var obj = JSON.parse(grafyKCE);
       
        this.cislaUzluPoPrutech = this.zjistiCislaUzluVsechnyPruty(obj);
        this.polozkyUzly = this.vratObsahComboboxuProUzly(this.cislaUzluPoPrutech, vybranyPrut);

        if(vybranyUzel == -1){
            this.polozkyPruty = this.vratObsahComboboxuProPruty(this.cislaUzluPoPrutech);
        }
        else{
            this.polozkyPruty = this.vratCislaPrutuKDanemuUzlu(this.cislaUzluPoPrutech, vybranyUzel);
        }

        
    }

    //vraci data ven z tridy
    getCislaUzluPoPrutech(){
        return(this.cislaUzluPoPrutech);
    }

    getCislaPrutu(){
        return(this.polozkyPruty);
    }

    getCislaUzlu(){
        return(this.polozkyUzly);
    }

    //zjisti pozadovana data
    zjistiCislaUzluVsechnyPruty(obj){

        var pocetPrutu;
        var cislaUzluPoPrutech = [];
       
        //id bude vzdy 0 , to ze je kod staveny na vic id je pozustatek stareho navrhu
        //  - jelikoz grafyKCE[id] bude vzdy jen jeden 
        // v tomto kodu rovnou nastavuji na grafyKCE[0], v kodu  v "class vykresliKonstrukci" je jeste vice id (ackoliv bude pracdepodobne taky jen jedno)
        pocetPrutu = obj.grafyKCE[0].data.length;


        //zjisti vsechny dvojice cisel uzlu na prutech
        for (var i = 0; i < pocetPrutu-5; i++) {

            var uzlyStartEnd = [];

            //cisla uzlu na zacatku a konci elementu
            var uzelStart = obj.grafyKCE[0].data[i].prut.kce.uzelStart;
            var uzelEnd = obj.grafyKCE[0].data[i].prut.kce.uzelEnd;

            //umisti "uzelStart" a "uzelEnd" na jeden radek do pole
            uzlyStartEnd.push(uzelStart);
            uzlyStartEnd.push(uzelEnd);

            //prida radek do pole
            cislaUzluPoPrutech.push(uzlyStartEnd);

        }    

        return(cislaUzluPoPrutech);

    }

    //vrati obsah comboboxu aby mohl zobrazit polozky cisel prutu
    vratObsahComboboxuProPruty(cislaUzluPoPrutech){

        var polozkyPruty = [];
    
        for (var i = 0; i < cislaUzluPoPrutech.length; i++) {
            polozkyPruty.push(i);
        }
    
        return(polozkyPruty);
    }

    //vrati obsah comboboxu uzlu v zavislosti na vybranem prutu
    vratObsahComboboxuProUzly(cislaUzluPoPrutech, vybranyPrut){

        var polozkyUzly = [];

        //pokud je "vybranyPrut == -1", pak vybere vsechny uzly
        if(vybranyPrut == -1){
            for (var i = 0; i < cislaUzluPoPrutech.length; i++) {
                var uzelStartEnd = cislaUzluPoPrutech[i];
                var uzelStart = uzelStartEnd[0];
                var uzelEnd = uzelStartEnd[1];
    
                polozkyUzly.push(uzelStart);
                polozkyUzly.push(uzelEnd);
            }

            //vrati pouze jedinecne hodnoty pole (uzly)
            polozkyUzly = polozkyUzly.filter((v, i, a) => a.indexOf(v) === i);

        }
        else {
            //vrati dane uzly k vybranemu uzlu (ktery je > -1)
            polozkyUzly = cislaUzluPoPrutech[vybranyPrut]
        }
        
        return(polozkyUzly);

    }    

    //vrati vsechny cisla prutu, dle zadaneho uzlu
    vratCislaPrutuKDanemuUzlu(cislaUzluPoPrutech, cisloUzlu){

        var prutObsahujeDanyUzel;
        var polozkyPruty = [];

        for (var i = 0; i < cislaUzluPoPrutech.length; i++) {
            var cislaUzluNaPrutu = [];
            cislaUzluNaPrutu = cislaUzluPoPrutech[i]

            prutObsahujeDanyUzel = cislaUzluNaPrutu.includes(cisloUzlu);

            if(prutObsahujeDanyUzel == true){
                polozkyPruty.push(i);
            }
        }

        return(polozkyPruty);

    }

    

}


//#############################################################################################    
//               Metody (bez trid) pro zobrazovani dat v Canvasu


//uklada posleden nastaveny "zvolenyJSON"
var zvolenyJSON;

//-------------------------------
//vraci obsah comboboxu
//-------------------------------

function vratObsahComboboxu(comboboxId){

    var options = $( comboboxId + ' option');
    var hodnotyComboboxu = [];

    var values = $.map(options ,function(option) {
        hodnotyComboboxu.push(option.value);
    });

    return(hodnotyComboboxu)

}


//-------------------------------
//vykresluje inputs
//-------------------------------

function vykresliInputs(){

    var selectedLoad;
    var selectedElementPreview;
    var zvolenyJSONInputs;
    var selectedDOF;
    var specifyDOF;

    var zvolenyJSONInputs1;
    var zvolenyJSONInputs3;
    var zvolenyJSONInputs5;

    var zvyrazniCisloUzlu;
    var posouvatText;

    selectedLoad = $( '#selectLoad :selected' ).text();
    selectedDOF = $( '#selectDOFinputs :selected' ).text();
    specifyDOF = ($('input[name=radioName]:checked', '#specifyDOF').val()); 
    selectedElementPreview = $( '#selectElementPreview :selected' ).text();
    zvyrazniCisloUzlu = $( '#selectNode :selected' ).text();

    //zjisti, zda ma posouvat text, ci nikoliv
    posouvatText =  $('input[name=radioName]:checked', '#moveText').val(); 


    if(selectedLoad == "TemperatureLoad"){

        $("#specifyDOF").hide();
        zvolenyJSONInputs = "TemperatureHorni_3"
        var grafika = new vykresliKonstrukci(zvolenyJSONInputs, true, true, "test", -1, selectedElementPreview, false, zvyrazniCisloUzlu, posouvatText);
        zvolenyJSONInputs = "TemperatureDolni_3"
        var grafika = new vykresliKonstrukci(zvolenyJSONInputs, false, true, "test", -1, selectedElementPreview, false, zvyrazniCisloUzlu, posouvatText);

    }
    else {
        
        $("#specifyDOF").show();

    }

    if(selectedLoad == "ElementLoads"){

        $("#specifyDOF").show();
        if(specifyDOF == "All DOF"){
            zvolenyJSONInputs1 = selectedLoad + "_1";
            zvolenyJSONInputs3 = selectedLoad + "_3";
            zvolenyJSONInputs5 = selectedLoad + "_5";  

            var grafika = new vykresliKonstrukci(zvolenyJSONInputs1, true, true, "test", -1, selectedElementPreview, false, zvyrazniCisloUzlu, posouvatText);
            var grafika = new vykresliKonstrukci(zvolenyJSONInputs3, false, true, "test", -1, selectedElementPreview, false, zvyrazniCisloUzlu, posouvatText);
            var grafika = new vykresliKonstrukci(zvolenyJSONInputs5, false, true, "test", -1, selectedElementPreview, false, zvyrazniCisloUzlu, posouvatText);
        }
        else {
            zvolenyJSONInputs = selectedLoad + "_" + selectedDOF;
            var grafika = new vykresliKonstrukci(zvolenyJSONInputs, true, true, "test", -1, selectedElementPreview, false, zvyrazniCisloUzlu, posouvatText);
        }
    }

    //kdyz je vybrano "Nodal Loads" je potreba zobrazit take kontrukci, jelikoz
    //v JSONu obsahujici sipky konstrukce neni
    if(selectedLoad == "NodalLoads"){
        zvolenyJSONInputs = "ElementLoads_1";
        var grafika = new vykresliKonstrukci(zvolenyJSONInputs, true, false, "test", -1, selectedElementPreview, false, zvyrazniCisloUzlu, posouvatText);
    } 

    //to same plati i pro "ForcedDisplacement"
    if(selectedLoad == "ForcedDisplacement"){
        zvolenyJSONInputs = "ElementLoads_1";
        var grafika = new vykresliKonstrukci(zvolenyJSONInputs, true, false, "test", -1, selectedElementPreview, false, zvyrazniCisloUzlu, posouvatText);
    }

    //neni-li nic definovano (pri refresh), pak se nastavi vychozi hodnoty
    if(selectedLoad == "ElementLoads"){
        selectedLoad = "ElementLoads_1";
    }

    return(selectedLoad);

}

//-------------------------------
//vykresluje outputs
//-------------------------------

function vykresliOutputs(){

    var zvolenyJSONOutput;

    var selectedElementPreview;
    var selectedTypeResults;
    var selectedDOF;
    var selectedOFT;

    var zvyrazniCisloUzlu;
    var posouvatText;

    selectedTypeResults = $( '#selectResults :selected' ).text();
    selectedDOF = $( '#selectDOF :selected' ).text();
    selectedOFT = $( '#selectOFT :selected' ).text();
    selectedElementPreview = $( '#selectElementPreview :selected' ).text();
    zvyrazniCisloUzlu = $( '#selectNode :selected' ).text();

    //zjisti, zda ma posouvat text, ci nikoliv
    posouvatText =  $('input[name=radioName]:checked', '#moveText').val(); 

    // jelikoz se zobrazuji sily, je potreba jeste vykreslit konstrukci, ale bez zatizeni
    if(selectedTypeResults == "Reactions"){
        zvolenyJSONInputs = "ElementLoads_1";
        var grafika = new vykresliKonstrukci(zvolenyJSONInputs, true, false, "test", -1, selectedElementPreview, false, zvyrazniCisloUzlu, posouvatText);
    }
    else {  //zde se zobrazuji ostatni moznosti
        zvolenyJSONOutput = selectedTypeResults + "_" + selectedDOF + "_" + selectedOFT;

        zvolenyJSONOutput = zvolenyJSONOutput.replace("+", "p");
        zvolenyJSONOutput = zvolenyJSONOutput.replace("-", "m");
        zvolenyJSONOutput = zvolenyJSONOutput.replace(".", "_");

        var grafika = new vykresliKonstrukci(zvolenyJSONOutput, true, true, "test", -1, selectedElementPreview, false, zvyrazniCisloUzlu, posouvatText);
    }

    return(zvolenyJSONOutput);

}


//-------------------------------
//vykresluje nahled (Preview)
//-------------------------------


//vycisti nahled - canvas (Preview)
function vycistiPreview(){

    var c = document.getElementById("vodorovnyRez");
    try {
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);   
    }
    catch(err) {
        console.log(elementId + " nenalezen");
    }

}

//vykresli nahled
function vykresliPreview(aktualizujInputsOutputs){

    var zobrazGraf;
    var numberValues;
    var selectedElementPreview;

    var posouvatText;

    //zjisti dany prut, ktery ma zvyraznit
    selectedElementPreview = $( '#selectElementPreview :selected' ).text();

    //zjisti, zda ma posouvat text, ci nikoliv
    posouvatText =  $('input[name=radioName]:checked', '#moveText').val(); 

    //vykresli náhled jen v pripade, ze je vybran cislo prutu > -1
    if(selectedElementPreview > -1){
        numberValues = ($('input[name=radioName]:checked', '#numberValues').val()); 

        if(numberValues == "Values"){
            zobrazGraf = true;
        }
        if(numberValues == "Number of nodes"){
            zobrazGraf = false;
        }

        //je-li "zvolenyJSON == NodalLoads, pak nelze zobrazovat prubeh na prutu a je treba prenastavit aby nedochazelo k chybe"
        if(zvolenyJSON == "NodalLoads"){
            zvolenyJSON = "ElementLoads_1";
        }
        if(zvolenyJSON == "ForcedDisplacement"){
            zvolenyJSON = "ElementLoads_1";
        }
        if(zvolenyJSON == "TemperatureLoad"){
            zvolenyJSON = "ElementLoads_1";
        }


        //vykresli Element Preview
        var grafika = new vykresliKonstrukci(zvolenyJSON, true, zobrazGraf, "vodorovnyRez", selectedElementPreview, selectedElementPreview, true, -1, posouvatText);

    }

    //aktualizuje inputs/outputs pokud "aktualizujInputsOutputs == true"
    if(aktualizujInputsOutputs == true){

        //vykresli jiz nastaveny inputs/outputs
        selectedPrePost = $( '#selectPrePost :selected' ).text();
        if(selectedPrePost == "inputs"){
            vykresliInputs();
        }
        if(selectedPrePost == "outputs"){
            vykresliOutputs();
        }

    }


    else {  //neni-li vybran zadny prut, vymaze nahled (vycisti platno)

        vycistiPreview();

    }

}


//-------------------------------
//pomoci JQuery nastavuje comboboxy
//-------------------------------

//jelikoz comboboxu je vic (pruty a uzly), comba se nastavuji v teto metode
function nastavDaneComboPodleId(idComboboxu, polozkyComboboxu){

     //odstrani stavajici polozky z Combo
     $(idComboboxu)
        .find('option')
        .remove()
        .end()
        .append('<option>-1</option>')

    //vlozi nove polozky
    for (var i = 0; i < polozkyComboboxu.length; i++) {
        var polozkaCombo = polozkyComboboxu[i] 
        $(idComboboxu).append("<option>" + polozkaCombo + "</option>");
    }

}


//zde prenastavuje jednotliva comba v zavislosti na vzajemnem vyberu
function nastavComboboxPreview(aktualizujUzly, aktualizujPruty, nastavVychoziHodnotu){

    var selectedElementPreview;
    var selectedNode;
    var polozkyComboUzly

    //trida zjistiCislaUzluKPrutum se inicializuje jen v pripade, ze je to nutne (kdyz se nenastavuje vychozi hodnota)
    if(nastavVychoziHodnotu == false){
        selectedElementPreview = $( '#selectElementPreview :selected' ).text();
        selectedNode = $( '#selectNode :selected' ).text();

        var cislaUzluAPrutu = new zjistiCislaUzluKPrutum(zvolenyJSON, selectedElementPreview, selectedNode);
    }

    //dojde-li ke zmene vyberu v prutech aktualizuji se uzly
    if(aktualizujUzly == true){   //musi byt nastaveno "aktualizujPruty == false" jinak nedava smysl

        //je-li pozadovano nastavit pouze vychozi hodnotu, pak se nastavi pouze -1
        if(nastavVychoziHodnotu == true){
            polozkyComboUzly = [-1];
        }
        else {
            //ziska obsah comboboxu pro uzly
            polozkyComboUzly = cislaUzluAPrutu.getCislaUzlu();
        }

        //nastavi comobox pro uzly
        nastavDaneComboPodleId("#selectNode", polozkyComboUzly);
    }

    //- - - - - - - - - - - - - - - - - - 

    //dojde-li ke zmene vyberu v uzlech aktualizuji se pruty
    if(aktualizujPruty == true){   //musi byt nastaveno "aktualizujUzly == false" jinak nedava smysl

        //je-li pozadovano nastavit pouze vychozi hodnotu, pak se nastavi pouze -1
        if(nastavVychoziHodnotu == true){
            polozkyComboPruty = [-1];
        }
        else {
            //ziska obsah comboboxu pro uzly
            polozkyComboPruty = cislaUzluAPrutu.getCislaPrutu();
        }

        //nastavi comobox pro pruty
        nastavDaneComboPodleId("#selectElementPreview", polozkyComboPruty);
    }

}

 
//skryva nebo zobrazuje DOF
$('#specifyDOF input').on('change', function() {
    specifyDOF = ($('input[name=radioName]:checked', '#specifyDOF').val()); 

    if(specifyDOF == "All DOF"){
        $(".inputsDOF").hide()
        $("#selectDOFinputs").hide()
    }
    else{
        $(".inputsDOF").show()
        $("#selectDOFinputs").show()
    }
});


//skryva/zobrazuje jednotliva nastaveni
$( "#selectPrePost" )
    .change(function () {
        
        selectedPrePost = $( '#selectPrePost :selected' ).text();
        if(selectedPrePost == "inputs"){
            $(".inputsDOF").hide();
            $(".outputs").hide();
            $(".inputs").show();
            $("#selectDOFinputs").hide();
        }
        if(selectedPrePost == "outputs"){
            $(".selectDOFinputs").hide();
            $(".inputsDOF").hide();
            $(".outputs").show();
            $(".inputs").hide();
        }

        //obnovi nahled
        vykresliPreview(true);

    });


//vybira data podle comboboxu - inputs
$( ".inputs" )
    .change(function () {
    
        //vykreslovani inputs probiha v samostatne funkci
        //ulozi posledne zvoleny JSON
        zvolenyJSON = vykresliInputs();
        
        //obnovi nahled
        vykresliPreview(true);
     
    })
    .change();


//vybira data podle comboboxu - outputs
$( ".outputs" )
    .change(function () {
       
        //vykreslovani outputs probiha v samostatne funkci
        //ulozi posledne zvoleny JSON
        zvolenyJSON = vykresliOutputs();
       
        //obnovi nahled
        vykresliPreview(true);

    })
    .change();


//pri zmene comboboxu s pruty dochazi k update comboboxu s uzly
$( "#selectElementPreview" )
.change(function () {

    var filterBy;
    var selectedElementPreview;
    var selectedNode;

    filterBy = ($('input[name=radioName]:checked', '#filterBy').val());
    selectedElementPreview = $( '#selectElementPreview :selected' ).text();
    selectedNode = $( '#selectNode :selected' ).text();

    if(filterBy == "Element -> Node"){
        nastavComboboxPreview(true, false, false);
    }

    //pri prvnim nacteni stranky
    if(selectedElementPreview == -1){

        //neni-li vybran zadny prut, pak vycisti nahled
        vycistiPreview();

        if(selectedNode == -1){
            if(filterBy == "Node -> Element"){
                nastavComboboxPreview(true, false, false);
                nastavComboboxPreview(false, true, true);
            }
        }
    }

    //pri kazde zmene vyberu prutu se prekresli platno
    vykresliPreview(true);

})
.change();


//pri zmene comboboxu s uzly dochazi k update comboboxu s pruty
$( "#selectNode" )
.change(function () {

    var filterBy;
    var selectedElementPreview;
    var selectedNode;

    //var obsahComboboxu;
    
    filterBy = ($('input[name=radioName]:checked', '#filterBy').val());
    selectedElementPreview = $( '#selectElementPreview :selected' ).text();
    selectedNode = $( '#selectNode :selected' ).text();

    if(filterBy == "Node -> Element"){
        nastavComboboxPreview(false, true, false);
    }    
    
    //pri prvnim nacteni stranky
    if(selectedElementPreview == -1){
        if(selectedNode == -1){
            if(filterBy == "Element -> Node"){
                nastavComboboxPreview(false, true, false);
                nastavComboboxPreview(true, false, true);
            }
        }
    }
    
    //pri kazde zmene vyberu uzlu je potreba dany uzel zvyrazni
    vykresliPreview(true);

})
.change();


//pri zmene "filter by" se updatuji comboboxy
$( "#filterBy" )
    .change(function () {

        var filterBy;
        filterBy = ($('input[name=radioName]:checked', '#filterBy').val());

        //zmeni combobox
        if(filterBy == "Element -> Node"){
            nastavComboboxPreview(true, false, true);
            nastavComboboxPreview(false, true, false);
        }

        //zmeni combobox
        if(filterBy == "Node -> Element"){
            nastavComboboxPreview(false, true, true);
            nastavComboboxPreview(true, false, false);
        }

        //vycislti platno (nahled)
        vycistiPreview();
        
    })
    .change();


//pri zmene comboboxu s uzly dochazi k update comboboxu s pruty
$( "#numberValues" )
    .change(function () {

        vykresliPreview(true);

    })
    .change();


//reaguje na nastaveni, zda posouvat text, ci nikoliv
$( "#moveText" )
    .change(function () {

        vykresliPreview(true);

    })
    .change();


//nastavi okno pri spusteni stranky
$( 'document' ).ready(function(){

    //$("#selectPrePost").hide;

    $(".inputsDOF").hide();
    $(".outputs").hide();
    $(".inputs").show();
    $("#selectDOFinputs").hide();

});

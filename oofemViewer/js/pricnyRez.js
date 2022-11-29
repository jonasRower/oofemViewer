
//#########################################################################
//               Trida pro vykreslovani konstrukce


class vykresliKonstrukci {

    constructor(zvolenyJSONStr, souradniceY){

        this.elementyJSON = eval(zvolenyJSONStr);
        this.souradniceY = souradniceY;
        this.vykreslujVsechnyPruty();
        
    }


    vyhledejVsechnyUzlyDaneSouradnice(obj2DElement){

        var indexRadkuElementu;  //odpovida cisluElementu, ale aby se rychleji vyhledavalo, vyhledava se podle indexu radku
        var souradniceYExp;
        var souradniceUzluY;
        var pocetElementu;


        var poleUzluSDanouSouradnici = []

        souradniceYExp = this.souradniceY;
        console.log(souradniceYExp);
        indexRadkuElementu = 0;
        pocetElementu = obj2DElement.elementy[0].data.element.length;
       
        for (var indexRadkuElementu = 0; indexRadkuElementu < pocetElementu; indexRadkuElementu++) {
            for (var uzelPoradi = 0; uzelPoradi < 3; uzelPoradi++) {
                souradniceUzluY = obj2DElement.elementy[0].data.element[indexRadkuElementu].Souradnice[uzelPoradi][1];

                if(souradniceUzluY == souradniceYExp) {
                    poleUzluSDanouSouradnici = this.zapisDataDopoleUzluSDanouSouradnici(poleUzluSDanouSouradnici, indexRadkuElementu, uzelPoradi, obj2DElement)
                }
            }
        }

        console.log(poleUzluSDanouSouradnici);
        return (poleUzluSDanouSouradnici);
    }


    zapisDataDopoleUzluSDanouSouradnici(poleUzluSDanouSouradnici, indexRadkuElementu, uzelPoradi, obj2DElement){

        var souradniceX;
        var souradniceY;
        var cisloElementu;
        var oznaceniVrcholu;
        var hodnotaVrcholu;
        var JSONdataUzlu;
        var JSONdataUzluObj;

        var cisloUzluJeJizObsazeno;

        //zkontroluje, zda cislouzlu jiz nasel, pokud ano, pak jiz nepokracuje zde, ale pokracuje dalsi smyckou
        oznaceniVrcholu = obj2DElement.elementy[0].data.element[indexRadkuElementu].OznaceniVrcholu[uzelPoradi];
        cisloUzluJeJizObsazeno = this.vyhledejZdaSeJednaODuplicitniCisloElementu(poleUzluSDanouSouradnici, oznaceniVrcholu);
        
        if(cisloUzluJeJizObsazeno == false){

            souradniceX = obj2DElement.elementy[0].data.element[indexRadkuElementu].Souradnice[uzelPoradi][0];
            souradniceY = obj2DElement.elementy[0].data.element[indexRadkuElementu].Souradnice[uzelPoradi][1];
            cisloElementu = obj2DElement.elementy[0].data.element[indexRadkuElementu].cisloElementu;
            hodnotaVrcholu = obj2DElement.elementy[0].data.element[indexRadkuElementu].HodnotyVrcholu[uzelPoradi];

            JSONdataUzlu =  '{ "souradniceX" : ' + souradniceX + ',' +
                            '  "souradniceY": ' + souradniceY + ',' +
                            '  "cisloElementu": ' + cisloElementu + ',' +
                            '  "oznaceniVrcholu": ' + oznaceniVrcholu + ',' +
                            '  "hodnotaVrcholu": ' + hodnotaVrcholu + '}' ;

            JSONdataUzluObj = JSON.parse(JSONdataUzlu);
            poleUzluSDanouSouradnici.push(JSONdataUzluObj);

        }

        return(poleUzluSDanouSouradnici)
        
    }


    vyhledejZdaSeJednaODuplicitniCisloElementu(poleUzluSDanouSouradnici, aktualniCisloUzlu){

        var pocetUzlu;
        var cisloUzlu;
        var cisloUzluJeJizObsazeno;

        pocetUzlu = poleUzluSDanouSouradnici.length;
        cisloUzluJeJizObsazeno = false;

        for (var i = 0; i < pocetUzlu; i++) {
            cisloUzlu = poleUzluSDanouSouradnici[i].oznaceniVrcholu;
            if(cisloUzlu == aktualniCisloUzlu){
                cisloUzluJeJizObsazeno = true;
                break;
            }
        }    

        return(cisloUzluJeJizObsazeno);

    }


    vykreslujVsechnyPruty(){

        var c = document.getElementById("vodorovnyRez");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);


        var meritkoGraf = 1;

        var obj2DElement = JSON.parse(this.elementyJSON);
        var poleUzluSDanouSouradnici = [];
        var poleUzluSDanouSouradnici = this.vyhledejVsechnyUzlyDaneSouradnice(obj2DElement);
        var pocetUzlu = poleUzluSDanouSouradnici.length;

        console.log(poleUzluSDanouSouradnici);
        //console.log(pocetUzlu);

        for (var uzelIndex = 0; uzelIndex < pocetUzlu-1; uzelIndex++) {
        //for (var uzelIndex = 0; uzelIndex < 3; uzelIndex++) {

            var Ax = poleUzluSDanouSouradnici[uzelIndex].souradniceX;
            var Bx = poleUzluSDanouSouradnici[uzelIndex+1].souradniceX;
            var Ay = 0;
            var By = 0;

            var Ox = 0;
            var Oy = 20;

            var hodnotaVrcholuA = poleUzluSDanouSouradnici[uzelIndex].hodnotaVrcholu;
            var hodnotaVrcholuB = poleUzluSDanouSouradnici[uzelIndex+1].hodnotaVrcholu;
            var nasobkyMocninZadani = [[0, 1],[hodnotaVrcholuA, hodnotaVrcholuB]];
            var delkaKrokuPriblizne = 10;

            //console.log(nasobkyMocninZadani);
            var nasobkyMocnin = this.dopocitejNasobkyMocnin2(Ax, Ay, Bx, By, nasobkyMocninZadani);
            //console.log(nasobkyMocnin);

            //var prut = new vykresliPrut(Ax, Ay, Bx, By, nasobkyMocnin, delkaKrokuPriblizne, ctx, Ox, Oy, "darkBlue", 3, "#000000", 0.5, "#000000", 1, true, meritkoGraf, this.popisZacatek, this.popisKonec);
            var prut = new vykresliPrut(Ax, Ay, Bx, By, nasobkyMocnin, delkaKrokuPriblizne, ctx, Ox, Oy, "darkBlue", 3, "#000000", 0.5, "#000000", 1, true, meritkoGraf, "", "");
            //console.log(nasobkyMocnin);

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

        //prepisuje data, aby mohl zobrazit popis grafu
        this.popisZacatek = yA
        this.popisKonec = yB

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

        //console.log(koeficientyPredMocninamiFunkce);

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


class vykresliPrut {

    constructor(Ax, Ay, Bx, By, koeficientyPredMocninamiFunkce, delkaKrokuPriblizne, ctx, Ox, Oy, barvaCaryPrut, tloustkaCaryPrut, barvaCarySrafy, tloustkaCarySrafy, barvaCaryHranice, tloustkaCaryHranice, vykreslitGraf, meritkoGraf, popisZacatek, popisKonec){

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
        this.popisZacatek = popisZacatek
        this.popisKonec = popisKonec

        //definuje pole ktere uchovavaji souradnice o vykresleni grafu po elementu
        this.souradniceXVekt = [];
        this.souradniceYVekt = [];
        this.funkcniHodnotyXVekt = [];
        this.funkcniHodnotyYVekt = [];

        this.hraniceGrafuVykresleni = [];

        //nakresli prut
        this.nakresliPrut(Ax, Ay, Bx, By, ctx, barvaCaryPrut, tloustkaCaryPrut);
        //console.log(this.meritkoGraf);

        if(delkaKrokuPriblizne > 0){
            
            //inicializuje tridu pro ziskani souradnic pro vykresleni grafu na elementu
            var souradniceGrafuElementu = new vypocetSouradnicGrafuPrutu(Ax, Ay, Bx, By, koeficientyPredMocninamiFunkce, delkaKrokuPriblizne, this.Oy, this.meritkoGraf)
            
            //data pro vykresleni grafu na elementu
            this.souradniceXVekt = souradniceGrafuElementu.getSouradniceXVekt();
            this.souradniceYVekt = souradniceGrafuElementu.getSouradniceYVekt();
            this.funkcniHodnotyXVekt = souradniceGrafuElementu.getFunkcniHodnotyXVekt();
            this.funkcniHodnotyYVekt = souradniceGrafuElementu.getFunkcniHodnotyYVekt();

            //vrati pole true/false, podle ktereho se vykresluji jednotlive casti grafu
            this.hraniceGrafuVykresleni = this.vratTrueFalseProHraniciGrafu(vykreslitGraf, this.funkcniHodnotyXVekt.length)

            //nakresli hranici grafu
            this.vykreslujHraniciGrafu(this.funkcniHodnotyXVekt, this.funkcniHodnotyYVekt, ctx, barvaCaryHranice, tloustkaCaryHranice, this.hraniceGrafuVykresleni);

            //vykresluj srafy grafu
            this.vykreslujSrafyGrafu(this.souradniceXVekt, this.souradniceYVekt, this.funkcniHodnotyXVekt, this.funkcniHodnotyYVekt, ctx, barvaCarySrafy, tloustkaCarySrafy);

            //console.log(this.funkcniHodnotyYVekt);
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

    //vykresluje hranici grafu
    vykreslujHraniciGrafu(funkcniHodnotyXVekt, funkcniHodnotyYVekt, ctx, barvaCary, tloustkaCary, hraniceGrafuVykresleni)
    {

        //body hranice grafu Ax, Ay, Bx, By
        var Ax;
        var Ay;
        var Bx;
        var By;
        var vykresleniGrafu;

        Ax = funkcniHodnotyXVekt[0];
        Ay = funkcniHodnotyYVekt[0]; 

        for (var i = 1; i < funkcniHodnotyXVekt.length; i++) {

            Bx = funkcniHodnotyXVekt[i];
            By = funkcniHodnotyYVekt[i];
            vykresleniGrafu = hraniceGrafuVykresleni[i];

            //popise hodnoty na grafu
            if(i == 1){
                this.vlozpopis(this.popisZacatek, Bx, By, ctx);
            }

            if(i == funkcniHodnotyXVekt.length-1){
                this.vlozpopis(this.popisKonec, Bx, By, ctx);
            }

            if(vykresleniGrafu == true){
                this.nakresliHraniciGrafu(Ax, Ay, Bx, By, ctx, barvaCary, tloustkaCary);
            }
            
            Ax = Bx;
            Ay = By;

        }

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

            //console.log(By);

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

}


var zvolenyJSON;
var souradniceY = 20;
var intervalY = 20;


$(document).ready(function() {
    //var grafika = new vykresliKonstrukci();
});


$("#buttDown").click(function(){
    souradniceY = souradniceY + intervalY;
    //console.log(souradniceY);
    var grafika = new vykresliKonstrukci(zvolenyJSON, souradniceY);
});

$("#buttUp").click(function(){
    alert("buttUp");
});

$("#buttLeft").click(function(){
    alert("buttLeft");
});

$("#buttRight").click(function(){
    alert("buttRight");
});


//vybira data podle comboboxu
$( "select" )
    .change(function () {
        zvolenyJSON = "elementyJSON_";

        $( "select option:selected" ).each(function() {
            zvolenyJSON += $( this ).text() + "_";
        });

        zvolenyJSON = zvolenyJSON.substring(0, zvolenyJSON.length - 1);
        zvolenyJSON = zvolenyJSON.replace("+", "p");
        zvolenyJSON = zvolenyJSON.replace("-", "m");
        zvolenyJSON = zvolenyJSON.replace(".", "_");
        
        //var grafika = new vykresliKonstrukci(zvolenyJSON);

    })
    .change();
/* import { emberekLISTA } from "./adat.js"; */
import { megjelenit, tablazatLetrehoz } from "./fuggvenyek.js";
import { rendez, szures, torol } from "./adatKezelo.js";
import { sorBeszur } from "./urlapKezelo.js";
import { getAdat } from "./asszinkron.js";
    /*
    jelenisuk meg az adatainkat egy tablazatban az adatk divben
    az urlap div-ben legyen egy urlap, amivel ilyen adatokat tudunk a tablazatba beletenni
    a tablazat fejlecere kattintva rendezzuk a tablazatot nev szerint
    tudjunk torolni a tablazatbol egy sort
    legyen szuromezo, ami segitsegevel nev szerint tudjuk szurni az adatokat 
    
    Fuggvenyek:

    1. tablazatLetrehoz(lista) -> txt
        lista alapján készít html tablazat kodot, visszaadja az elkeszult html szoveget. minden sor mellett egy torles gombbal
    2. megjelenit(txt)
        megjeliniti a parameterben kapott szoveget egy adott html elemben
    3. rendez(lista) -> rendezettLista
        megrendezi a listat adott parameter szerint, a megrendezett listat ujra megjeleniti, megrendezett listat visszaadja
        akkor fut le amikor rakattintunk a tablazat fejlecere
    4. szures(lista, keresoSzoveg) -> szurtLista
        akkor fog lefutni, ha a szuro mezoben valtozas tortenik (keyup) - a listaban a nev mezoben keres egyezeseket es szur ez alapjan
        filter
    5. sorBeszur(lista) -> ujLista
        ha a submit gombra kattintunk akkor fut le
        urlap adatkat atalakitjuk objektumma es hozzaadjuk a listahoz (push)
    6. torol(lista, index)
        torli a lista adott sorat
        minden sor mellett lesz egy torol gomb, amivel megkapjuk az adott sor indexet es meghivodik a torol fuggveny
    
    */
    let rIrany = 1;
    getAdat("http://localhost:3000/emberekLISTA", init);
/*     init(emberekLISTA); */
    szuresNevSzerint();
    sorBeszur("http://localhost:3000/emberekLISTA");

    export function init(lista){
        var txt = tablazatLetrehoz(lista);
        megjelenit(txt);
        rendezesEsemeny();
        torolEsemeny();
        sorBeszur(lista);
    }

    function szuresNevSzerint(){
        const szuroElem = $("#sznev");
        szuroElem.on("keyup", function(){
            let szoveg = szuroElem.val();
            init(szures("http://localhost:3000/emberekLISTA", szoveg));
        });
    }

    /* szorgalmi: egyéb mezőkre szűrés */


    function rendezesEsemeny(){

        /* ha rákattintunk a táblázat fejlécében lévő név mezőre */
        const nevMezoElem = $(".adatok table th").eq(0);
        nevMezoElem.on("click", function(){
            const lista = rendez("http://localhost:3000/emberekLISTA", "nev", rIrany);
            console.log(lista);
            init(lista);
            rIrany*=-1;
        })
    }

    /* szorgalmi: tudjunk rendezni a tobbi mezore is */

    function torolEsemeny(){
        const torolELEM =$(".torol");
        torolELEM.on("click", function(event){
            let index = elem.id;
            /*              ^^az az elem,amelyik kivaltotta az esemenyt  */
            const LISTA = torol("http://localhost:3000/emberekLISTA", index);
            init(LISTA);
        });
    }
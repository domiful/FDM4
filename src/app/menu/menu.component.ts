import { Component, OnInit } from "@angular/core";

@Component({
    selector: "Menu",
    moduleId: module.id,
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {

    locations: { city: string, country: string, imageSrc: string }[] = [
        { city: "Yarlford", country: "Aldorria", imageSrc: "https://placem.at/places?random=1&w=500&txt=0" },
        { city: "Paentmarwy", country: "Bahari", imageSrc: "https://placem.at/places?random=2&w=500&txt=0" },
        { city: "Landow", country: "Erewhon", imageSrc: "https://placem.at/places?random=3&w=500&txt=0" },
        { city: "Penrith", country: "Gilead", imageSrc: "https://placem.at/places?random=4&w=500&txt=0" },
        { city: "Aberystwyth", country: "Mandorra", imageSrc: "https://placem.at/places?random=5&w=500&txt=0" },
        { city: "Macclesfield", country: "Nambutu", imageSrc: "https://placem.at/places?random=6&w=500&txt=0" },
        { city: "Larnwick", country: "Deltora", imageSrc: "https://placem.at/places?random=77&w=500&txt=0" },
        { city: "Snowbush", country: "Islandia", imageSrc: "https://placem.at/places?random=8&w=500&txt=0" },
        { city: "Kelna", country: "Norteguay", imageSrc: "https://placem.at/places?random=55&w=500&txt=0" },
        { city: "Drumnacanvy", country: "Graznavia", imageSrc: "https://placem.at/places?random=44&w=500&txt=0" },
        { city: "Hartlepool", country: "Drasselstein", imageSrc: "https://placem.at/places?random=11&w=500&txt=0" },
        { city: "Timeston", country: "Brungaria", imageSrc: "https://placem.at/places?random=33&w=500&txt=0" }
    ];

    constructor() {
    }

    ngOnInit(): void {
    }
}

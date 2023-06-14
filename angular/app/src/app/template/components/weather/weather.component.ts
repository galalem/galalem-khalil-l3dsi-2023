import { Component, Input, OnInit } from '@angular/core';
import { DateUtils } from 'ngx-core';

const WEATHER_CODES = {
  0: {
    icon: "sun",
    label: "Ciel clair"
  },
  1: {
    icon: "cloud-sun",
    label: "Plutôt clair"
  },
  2: {
    icon: "cloud-sun",
    label: "Partiellement nuageux"
  },
  3: {
    icon: "cloud",
    label: "Nuageux"
  },
  45: {
    icon: "smog",
    label: "Brouillard"
  },
  48: {
    icon: "smog",
    label: "Smog"
  },
  51: {
    icon: "cloud-sun-rain",
    label: "Bruine légère"
  },
  53: {
    icon: "cloud-sun-rain",
    label: "Bruine modérée"
  },
  55: {
    icon: "cloud-sun-rain",
    label: "Bruine intense"
  },
  56: {
    icon: "cloud-sun-rain",
    label: "Bruine verglaçante légère"
  },
  57: {
    icon: "cloud-sun-rain",
    label: "Bruine verglaçante intense"
  },
  61: {
    icon: "cloud-rain",
    label: "Pluie légère"
  },
  63: {
    icon: "cloud-rain",
    label: "Pluie modérée"
  },
  65: {
    icon: "cloud-rain",
    label: "Pluie intense"
  },
  66: {
    icon: "cloud-hail-mixed",
    label: "Pluie légère verglaçante"
  },
  67: {
    icon: "cloud-hail-mixed",
    label: "Pluie intense verglaçante"
  },
  71: {
    icon: "snowflake",
    label: "Chute de neige légère"
  },
  73: {
    icon: "snowflake",
    label: "Chute de neige modérée"
  },
  75: {
    icon: "snowflake",
    label: "Chute de neige intense"
  },
  77: {
    icon: "cloud-hail",
    label: "Grains de neige"
  },
  80: {
    icon: "cloud-showers-heavy",
    label: "Averses de pluie"
  },
  81: {
    icon: "cloud-showers-heavy",
    label: "Averses de pluie"
  },
  82: {
    icon: "cloud-showers-water",
    label: "Averses de pluie intense"
  },
  85: {
    icon: "cloud-meatball",
    label: "Averses de neige"
  },
  86: {
    icon: "cloud-meatball",
    label: "Averses de neige intense"
  },
  95: {
    icon: "bolt-lightning",
    label: "Orage"
  },
  96: {
    icon: "cloud-bolt",
    label: "Orage avec grêle légère"
  },
  99: {
    icon: "cloud-bolt",
    label: "Orage avec grêle forte"
  },
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {

  weather = WEATHER_CODES[0];
  day = "Samedi";
  date = "13 mai 2023, 13:00";

  @Input()
  temperature:number;

  @Input()
  set weathercode(code:keyof typeof WEATHER_CODES) {
    this.weather = WEATHER_CODES[code];
  }

  @Input("date")
  set $date(value:string) {
    if (!value)
      return
    value = new Date(new Date(value).toLocaleString("en-US", {timeZone: "Africa/Tunis"})).toISOString();
    
    this.day = DateUtils.format(value, "dddd");
    this.date = DateUtils.format(value, "DD MMMM YYYY, HH:mm").toLowerCase();
  }
}

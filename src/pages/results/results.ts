import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController, Platform, LoadingController} from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Http } from '@angular/http';

/*
  Generated class for the Results page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-results',
  templateUrl: 'results.html'
})
export class ResultsPage {

    simManha : number;
    simOnibus01 : number;
    simOnibus04 : number;
    simOnibus05 : number;
    simOnibus06 : number;
    simOnibus07 : number;
    simOnibus08 : number;
    simOnibus10 : number;
    simOnibus11 : number;
    simOnibus12 : number;
    simOnibus13 : number;
    simOnibus36 : number;
    naoManha : number;
    naoOnibus01 : number;
    naoOnibus04 : number;
    naoOnibus05 : number;
    naoOnibus06 : number;
    naoOnibus07 : number;
    naoOnibus08 : number;
    naoOnibus10 : number;
    naoOnibus11 : number;
    naoOnibus12 : number;
    naoOnibus13 : number;
    naoOnibus36 : number;
    simTotal : number;
    naoTotal : number;
    loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public toastController: ToastController, private viewController:ViewController, public platform:Platform, public backgroundMode:BackgroundMode, public loadingController:LoadingController) {
  
   
    this.simManha = 0;
    this.simOnibus01 = 0;
    this.simOnibus04 = 0;
    this.simOnibus05 = 0;
    this.simOnibus06 = 0;
    this.simOnibus07 = 0;
    this.simOnibus08 = 0;
    this.simOnibus10 = 0;
    this.simOnibus11 = 0;
    this.simOnibus12 = 0;
    this.simOnibus13 = 0;
    this.simOnibus36 = 0;
    this.naoManha = 0;
    this.naoOnibus01 = 0;
    this.naoOnibus04 = 0;
    this.naoOnibus05 = 0;
    this.naoOnibus06 = 0;
    this.naoOnibus07 = 0;
    this.naoOnibus08 = 0;
    this.naoOnibus10 = 0;
    this.naoOnibus11 = 0;
    this.naoOnibus12 = 0;
    this.naoOnibus13 = 0;
    this.naoOnibus36 = 0;
    this.simTotal = 0;
    this.naoTotal = 0;

    this.loading = this.loadingController.create({
      content: 'Recebendo resultados ...'
    });
    this.results();
  }

  exit(){
    this.backgroundMode.moveToBackground();
  }

  results(){
     console.log("pegar resultados");
      this.loading.present();
      var date = new Date();
      var day  = date.getDate() < 10 ? '0'+date.getDate() : date.getDate(); 
      var month = (date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1); 
      var year = date.getFullYear();
      console.log("dia: " + day +" mes: " + month +  " ano: " + year); 
      var getUrl = 'https://api.thingspeak.com/channels/238824/feeds.json?api_key=DGU23ARIETN4G6WW&start='+year+"-"+month+"-"+day+"%2000:00:00&end="+year+"-"+month+"-"+day+"%2023:59:59&timezone=America/Sao_Paulo";
      this.http.get(getUrl).map(res => res.json())
      .subscribe(
         data => {
           console.log(data.feeds);
           if(data.feeds.length > 0){
              for (var i = 0; i < data.feeds.length; i++ ){
                if(data.feeds[i].field1 == 0 && data.feeds[i].field1 == data.feeds[i].field3){
                  this.simManha +=1;
                }else if(data.feeds[i].field1 == 0 && data.feeds[i].field1 == data.feeds[i].field4){
                  this.naoManha +=1;
                }
                if(data.feeds[i].field1 == 1 && data.feeds[i].field1 == data.feeds[i].field3){
                  this.simOnibus01 += 1;
                 
                }else if (data.feeds[i].field1 == 1 && data.feeds[i].field1 == data.feeds[i].field4){
                  this.naoOnibus01 += 1;
                   
                }
                if(data.feeds[i].field1 == 4 && data.feeds[i].field1 == data.feeds[i].field3){
                  this.simOnibus04 += 1;
                  
                }else if(data.feeds[i].field1 == 4 && data.feeds[i].field1 == data.feeds[i].field4){
                  this.naoOnibus04 += 1;
                  
                }
                if(data.feeds[i].field1 == 5 && data.feeds[i].field1 == data.feeds[i].field3){
                  this.simOnibus05 += 1;
                  
                }else if(data.feeds[i].field1 == 5 && data.feeds[i].field1 == data.feeds[i].field4){
                  this.naoOnibus05 += 1;
                  
                }
                if(data.feeds[i].field1 == 6 && data.feeds[i].field1 == data.feeds[i].field3){
                  this.simOnibus06 += 1;
                }else if(data.feeds[i].field1 == 6 && data.feeds[i].field1 == data.feeds[i].field4){
                  this.naoOnibus06 += 1;
                }
                if(data.feeds[i].field1 == 7 && data.feeds[i].field1 == data.feeds[i].field3){
                  this.simOnibus07 += 1;
                }else if(data.feeds[i].field1 == 7 && data.feeds[i].field1 == data.feeds[i].field4){
                  this.naoOnibus07 += 1;
                }
                if(data.feeds[i].field1 == 8 && data.feeds[i].field1 == data.feeds[i].field3){
                  this.simOnibus08 += 1;
                }else  if(data.feeds[i].field1 == 8 && data.feeds[i].field1 == data.feeds[i].field4){
                  this.naoOnibus08 += 1;
                }
                if(data.feeds[i].field1 == 10 && data.feeds[i].field1 == data.feeds[i].field3){
                  this.simOnibus10 += 1;
                }else  if(data.feeds[i].field1 == 10 && data.feeds[i].field1 == data.feeds[i].field4){
                  this.naoOnibus10 += 1;
                }
                if(data.feeds[i].field1 == 11 && data.feeds[i].field1 == data.feeds[i].field3){
                  this.simOnibus11 += 1;
                }else  if(data.feeds[i].field1 == 11 && data.feeds[i].field1 == data.feeds[i].field4){
                  this.naoOnibus11 += 1;
                }
                if(data.feeds[i].field1 == 12 && data.feeds[i].field1 == data.feeds[i].field3){
                  this.simOnibus12 += 1;
                }else  if(data.feeds[i].field1 == 12 && data.feeds[i].field1 == data.feeds[i].field4){
                  this.naoOnibus12 += 1;
                }
                if(data.feeds[i].field1 == 13 && data.feeds[i].field1 == data.feeds[i].field3){
                  this.simOnibus13 += 1;
                }else  if(data.feeds[i].field1 == 13 && data.feeds[i].field1 == data.feeds[i].field4){
                  this.naoOnibus13 += 1;
                }
                if(data.feeds[i].field1 == 36 && data.feeds[i].field1 == data.feeds[i].field3){
                  this.simOnibus36 += 1;
                }else  if(data.feeds[i].field1 == 36 && data.feeds[i].field1 == data.feeds[i].field4){
                  this.naoOnibus36 += 1;
                }
              }
              this.simTotal = this.simManha + this.simOnibus01 + this.simOnibus04 + this.simOnibus05 + this.simOnibus06 + this.simOnibus07 + this.simOnibus08 + this.simOnibus10 + this.simOnibus11 + this.simOnibus12 + this.simOnibus13 + this.simOnibus36;
              this.naoTotal = this.naoManha + this.naoOnibus01 + this.naoOnibus04 + this.naoOnibus05 + this.naoOnibus06 + this.naoOnibus07 + this.naoOnibus08 + this.naoOnibus10 + this.naoOnibus11 + this.naoOnibus12 + this.naoOnibus13 + this.naoOnibus36;
              this.loading.dismiss();
            }else{
              this.loading.dismiss();
            }
            },
            err => {
              console.log("ERROR!: ", err);
            }
        ); 
    }
}


import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, AlertController, LoadingController, Slides, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import { BackgroundMode } from '@ionic-native/background-mode';

import { ResultsPage } from '../results/results';
import { AboutPage } from '../about/about';
import { Network } from '@ionic-native/network';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

    instituicao = '0';
    first_login;
    storage;
    http;
    toastCtrl;
    localNotifications;
    loading;
    resultsPage;
    answered;
    slidesContent;
    
    @ViewChild(Slides) slides:Slides;

  constructor(public navCtrl: NavController, http: Http,  storage: Storage, public platform: Platform, public alertCtrl: AlertController, public backgroundMode:BackgroundMode, public loadingController: LoadingController, public network: Network, public toastController:ToastController) {
    this.http = http;
    this.storage = storage;

    let conectionToast = this.toastController.create({
        message: 'Sem conexão :(',
        duration: 40000,
        position: 'bottom'
      });

    var disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      conectionToast.present();
      this.disableButtons();
      (<HTMLInputElement> document.getElementById("results")).disabled = true;
    });

    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      this.enableButtons();
      conectionToast.dismiss();
      (<HTMLInputElement> document.getElementById("results")).disabled = false;
      disconnectSubscription.unsubscribe();
      connectSubscription.unsubscribe();
      this.answered();
    });
    
    storage.ready().then(()=>{
      this.initialize();
    });

      this.loading = this.loadingController.create({
        content: 'Enviando resposta ...'
     });
  }
  //methods

    sim(){
      var url = 'https://api.thingspeak.com/update.json?api_key=DGU23ARIETN4G6WW&field1='+this.instituicao+'&field3='+this.instituicao; 
      this.sendInformation(url);  
    }
    nao(){
      var url = 'https://api.thingspeak.com/update.json?api_key=DGU23ARIETN4G6WW&field1='+this.instituicao+'&field4='+this.instituicao;
      this.sendInformation(url);
    }

    sendInformation(url){
      // this.disableButtons();
      this.loading.present();
      this.http.post(url).map(res => res.json())
        .subscribe(
            data => {
              this.loading.dismiss();
              this.storage.remove("dia");
              let date = new Date();
              let today = date.getDate();
              this.storage.set("dia", today);
               this.navCtrl.push(ResultsPage); 
              this.answered = true;
              this.storage.remove("instituicao");
              this.storage.set("instituicao", this.instituicao);
            },
            err => {
              console.log("ERROR!: ", err);
              this.loading.dismiss();
            }
        );
    }

    getNext(){
      this.slides.slideNext(300, false);
    }

      getAnt(){
      this.slides.slidePrev(300, false);
    }

    start(){
      this.first_login = false;
      this.storage.set('first_login', false);
    }

    about(){
      this.navCtrl.push(AboutPage);
    }

    results(){
      this.navCtrl.push(ResultsPage);
    }

    answeredToday(){
      this.storage.get('dia').then((val)=>{
          let date = new Date();
          let today = date.getDate();
          if(val == today){
            this.disableButtons();
            this.answered = true;
          }else{
            this.answered = false;
            this.enableButtons();
          }
      });
    }
    enableButtons(){
      (<HTMLInputElement> document.getElementById("sim")).disabled = false;
      (<HTMLInputElement> document.getElementById("nao")).disabled = false;
    }
    disableButtons(){
      (<HTMLInputElement> document.getElementById("sim")).disabled = true;
      (<HTMLInputElement> document.getElementById("nao")).disabled = true;
    }
    initialize(){
      this.storage.get('first_login').then((val)=>{
          if(val == null){
            this.first_login = true;
          }else{
            this.first_login = false;
            // this.answeredToday();
          }
          console.log('Is it first_login', this.first_login);
      });
      
      this.storage.get('instituicao').then((val)=>{
          if(val == null){
            this.instituicao = '0';
          }else{
            this.instituicao = val;
          }
        });


      this.slidesContent = [
      {
        title: "O que é esse projeto?",
        description: "<b>Este projeto</b> está sendo desenvolvido pelo Programa de Pós-Graduação em  Ciência da Computação - PPGCC da UTFPR-Ponta Grossa em parceria com a Prefeitura Municipal de Pinhão.",
        image: "assets/img/logos.png",
      },
      {
        title: "Para que?",
        description: "Espera-se que sabendo o número <b>parcial</b> de alunos que utilizam o transporte universitário, a Secretaria de Transporte possa utilizar essa informação para gerenciar a quantidade de ônibus utilizados no transporte universitário.",
        image: "assets/img/control.png",
      }];
    }
}


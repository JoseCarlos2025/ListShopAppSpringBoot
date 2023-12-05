import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  Item: Item[]=[];

  constructor(
    private ItemService: ItemService,
    private router: Router,
    private alertController: AlertController,
    private LocalStorage: StorageService
  ) {}

  async presentAlert(id: number) {
    const alert = await this.alertController.create({
      header: 'Ingrese los datos',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre Item',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Operación cancelada');
          },
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            let item = {
              id: 0,
              name: data.name,
              itemListId: this.LocalStorage.getItem('itemlistid'),
            };
            this.updateItem(id,item);
          },
        },
      ],
    });

    await alert.present();
  }

  ngOnInit() {
    this.getItemFromListShopId(this.LocalStorage.getItem('itemlistid'));
  }

  ionViewWillEnter() {
    this.getItemFromListShopId(this.LocalStorage.getItem('itemlistid'));
  }

  getItemFromListShopId(id: number) {
    this.ItemService.getItemFromListShopId(id).subscribe((Item) => {
      this.Item = Item;
      console.log(Item);
    });
  }

  deleteItem(id: number) {
    this.ItemService.deleteItem(id).subscribe(() => {
      this.getItemFromListShopId(this.LocalStorage.getItem('itemlistid'));
    });
    console.log('elimino');
  }

  updateItem(id: number,item: Item) {
    console.log("por aquí pasó")
    this.ItemService.updateItem(id, item)
    .subscribe((res) => {
      console.log("por aquí pasó")
      this.getItemFromListShopId(this.LocalStorage.getItem('itemlistid'));
    });
    
  }

  gotohome() {
    this.router.navigateByUrl("/home")
  }

  gotoadditem() {
    this.router.navigateByUrl("/additem")
  }


}

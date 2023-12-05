import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ListshopService } from '../services/listshop.service';
import { Listshop } from '../models/listshop';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  Listshop!: Listshop[];
  user!: User[];

  constructor(private ListShopService: ListshopService, private router: Router, private alertController: AlertController, private LocalStorage: StorageService, private userService: UserService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getAlllistShop();
    console.log(this.LocalStorage.getItem('id'))
  }

  async presentAlert(id: number) {
    const alert = await this.alertController.create({
      header: 'Ingrese los datos',
      inputs: [
        {
          name: 'namelist',
          type: 'text',
          placeholder: 'Nombre de la lista',
        },
        {
          name: 'dateShop',
          type: 'date',
          placeholder: 'Fecha de compra',
        },
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
            let listshop = {
              id: 0,
              listName: data.namelist,
              dateShop: data.dateShop,
              userId: this.LocalStorage.getItem('id')
            };
            this.updateListShop(id, listshop);
          },
        },
      ],
    });

    await alert.present();
  }

  async mostrarOpciones() {
    const alert = await this.alertController.create({
      header: 'Opciones',
      message: 'Selecciona una opción:',
      buttons: [
        {
          text: 'Cambiar Nombre',
          handler: () => {
            this.mostrarAlertCambiarNombre()
          },
        },
        {
          text: 'Cambiar Contraseña',
          handler: () => {
            this.mostrarAlertCambiarContraseña()
            console.log('Cambiar Contraseña');
          },
        },
        {
          text: 'Cerrar Sesión',
          handler: () => {
            this.LocalStorage.removeItem('id');
            this.LocalStorage.removeItem('itemlistid');
            this.gotoLogin();
            console.log('Cerrar Sesión');
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }

  async mostrarAlertCambiarNombre() {
    const alert = await this.alertController.create({
      header: 'Cambiar Nombre',
      inputs: [
        {
          name: 'nuevoNombre',
          type: 'text',
          placeholder: 'Nuevo Nombre',
        },
      ],
      buttons: [
        {
          text: 'Guardar',
          handler: (data) => {

            let userId = this.LocalStorage.getItem('id');
            let user = new User();
            user.id = 0;
            user.name = data.nuevoNombre;
            console.log(data.nuevoNombre)

            this.userService.getUserId(userId).subscribe((Userold) => {
              user.password = Userold.password;

              this.userService.updateUser(userId, user).subscribe((updatedUser) => {
                console.log('cambio')
              });
            });
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }

  async mostrarAlertCambiarContraseña() {
    const alert = await this.alertController.create({
      header: 'Cambiar contraseña',
      inputs: [
        {
          name: 'nuevaContraseña',
          type: 'password',
          placeholder: 'Nueva contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            let userId = this.LocalStorage.getItem('id');
            let user = new User();
            user.id = 0;
            user.password = data.nuevaContraseña;
            

            this.userService.getUserId(userId).subscribe((Userold) => {
              user.name = Userold.name;

              this.userService.updateUser(userId, user).subscribe((updatedUser) => {
                console.log('cambio')
              });
            });
          }
        }
      ]
    });

    await alert.present();
  }



  getAlllistShop() {
    this.ListShopService.getListFromUserpId(this.LocalStorage.getItem('id')).subscribe(Listshop => {
      this.Listshop = Listshop;
      console.log(Listshop);
    });

  }

  deleteListShop(id: number) {
    this.ListShopService.deleteListShop(id).subscribe(() => {
      this.getAlllistShop();
    })
  }

  gotoLogin() {
    this.router.navigateByUrl("/")
  }

  gotoaddlist() {
    this.router.navigateByUrl("/addlist")
  }

  gotolist(id: number) {
    this.LocalStorage.setItem('itemlistid', id);
    this.router.navigate(['/item']);
  }

  updateListShop(id: number, listshop: Listshop) {
    this.ListShopService.updateListShop(id, listshop)
      .subscribe((res) => {
        console.log("por aquí pasó")
        this.getAlllistShop();
      });

  }
}

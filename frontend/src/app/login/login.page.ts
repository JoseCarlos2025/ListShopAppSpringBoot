import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username!: string;
  password!: string;

  constructor(private navCtrl: NavController, private userService: UserService,private LocalStorage: StorageService) { }

  ngOnInit() {

  }

  login() {
    this.userService.getUser().subscribe(
      (users) => {
        const user = users.find(u => u.name === this.username && u.password === this.password);
        if (user) {
          this.LocalStorage.setItem('id',user.id);
          this.navCtrl.navigateRoot('/home');
        } else {
          alert('Credenciales incorrectas. Inténtalo de nuevo.');
        }
      },
      (error) => {
        alert('Error al obtener la lista de usuarios. Inténtalo de nuevo.');
      }
    );
  }
}

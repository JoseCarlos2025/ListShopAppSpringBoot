import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage implements OnInit {

  username!: string;
  password!: string;
  // Otros campos para el registro, como nombre, correo, etc.

  constructor(private navCtrl: NavController, private userService: UserService) {}

  ngOnInit() {
    
  }

  register() {
    if (!this.username || !this.password) {
      // Verifica si el nombre de usuario o la contraseña están vacíos
      alert('Por favor, completa ambos campos.');
      return; // No continúes con el registro si algún campo está vacío
    }
  
    const userData = {
      id: 0,
      name: this.username,
      password: this.password,
    };
  
    this.userService.addUser(userData).subscribe(
      (response) => {
        this.navCtrl.navigateRoot('/home');
      },
      (error) => {
        // Error en el registro, muestra un mensaje de error
        alert('Error en el registro. Inténtalo de nuevo.');
      }
    );
  }
  
}

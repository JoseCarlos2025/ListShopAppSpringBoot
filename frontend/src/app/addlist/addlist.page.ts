import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ListshopService } from '../services/listshop.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-addlist',
  templateUrl: './addlist.page.html',
  styleUrls: ['./addlist.page.scss'],
})
export class AddlistPage implements OnInit {
  ionicForm!: FormGroup;

  constructor(public formBuilder: FormBuilder, private listshopservice: ListshopService, private router: Router,private LocalStorage: StorageService) {
    this.ionicForm = this.formBuilder.group({
      name: [''],
      date: ['']
    });
  }
  
  ngOnInit() {
  };

  onFormSubmit() {
    if (!this.ionicForm.valid) {
      return false;
    } else {
      let listshop = {
        id: 0,
        listName: this.ionicForm.value.name,
        dateShop: this.ionicForm.value.date,
        userId: this.LocalStorage.getItem('id')
      }
      this.listshopservice.addListShop(listshop)
        .subscribe((res) => {
          console.log("por aquí pasó")
          this.router.navigateByUrl("/home");
        });
        return true;
    }
  }

  gotohome() {
    this.router.navigateByUrl("/home")
  }

}

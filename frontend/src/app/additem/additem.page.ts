import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from '../services/item.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.page.html',
  styleUrls: ['./additem.page.scss'],
})
export class AdditemPage implements OnInit {
  ionicForm!: FormGroup;
  
  constructor(private router: Router, public formBuilder: FormBuilder, private itemService: ItemService, private localStorage: StorageService) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: [''] 
   });
  }

  gotoItem() {
    this.router.navigateByUrl("/item");
  }

  onFormSubmit() {
    if (!this.ionicForm.valid) {
      return false;
    } else {
      let item = {
        id: 0,
        name: this.ionicForm.value.name,
        itemListId: this.localStorage.getItem('itemlistid')
      }
      
      this.itemService.addItem(item)
        .subscribe((res) => {
          this.gotoItem()
        });
      
      return true;
    }
  }
}

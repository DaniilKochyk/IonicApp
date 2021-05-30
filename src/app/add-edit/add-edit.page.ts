import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.page.html',
  styleUrls: ['./add-edit.page.scss'],
})
export class AddEditPage implements OnInit {
 
 
  isedit: boolean;
  type:string
  title: string;
  stitle: string;
  kwota: string;
  id:any;
  loading: boolean;
  constructor( private route: ActivatedRoute, private router: Router, private firebaseService: FirebaseService) { 
    this.route.params.subscribe((data:any) =>{
      /* console.log(data.type); */
      this.id = data.type;

      if(data.type == 'add'){
        this.isedit = false;
      }else{
        this.isedit = true;
        this.firebaseService.get_single_data(data.type).subscribe((data:any)  =>{
          console.log(data);
          this.type= data.type;
          this.title = data.title;
          this.stitle = data.stitle;
          this.kwota= data.kwota;
        })
      }
    })
  }

  ngOnInit() {
  }

  addData(){
    this.loading = true;
    if(this.isedit){
      this.updateData();
      return;
    }
    let data ={
      type: this.type,
      title: this.title,
      stitle: this.stitle,
      kwota: this.kwota,
    }
    this.firebaseService.add_Data(data).then((res:any) => {
      console.log(res);
      this.loading = false;
      this.router.navigateByUrl('/home')
    })
  }

  updateData(){
    let data = {
      type: this.type,
      title: this.title,
      stitle: this.stitle,
      kwota: this.kwota,
    }
    this.firebaseService.update_Data(this.id,data).then((res:any) => {
      console.log(res);
      this.router.navigateByUrl('/home');
    })
  }
}

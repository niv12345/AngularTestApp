import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: any;
  tempdata: any;
  postData = { id: '', title: '', userId: '', body: '' };
  isShow: boolean = true;
  isAdd: boolean = true;
  form: FormGroup;
  addForm: FormGroup;
  isShowCard: boolean = false;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(private myService: ApiService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getPostList();
    this.form = this.fb.group({
      title: [''],
      id: [''],
      body: [''],
      userId: ['']

    })
    this.addForm = this.fb.group({
      title: [''],
      id: [''],
      body: [''],
      userId: ['']

    })
  }
  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;

    this.tempdata = this.data.filter(item => {
      if (item.title.toString().toLowerCase().indexOf(filterValue.toLowerCase()) !== -1) {
        return true;
      }
      return false;
    }
    );

    //  this.tempdata.filter = filterValue.trim().toLowerCase();
  }
  getPostList() {
    this.myService.getPostList().subscribe(res => {
      this.data = res;
      this.tempdata = this.data;

    });
  }

  onClickPost(item) {
    this.isShowCard = !this.isShowCard;
    this.postData = item;


  }
  onClickAddPost() {
    this.isAdd = !this.isAdd;

  }
  onClickEdit(id) {
    this.isShow = !this.isShow;
    this.form = this.fb.group({
      title: [this.postData.title],
      id: [this.postData.id],
      body: [this.postData.body],
      userId: [this.postData.userId]

    })

  }
  onClickSave() {
    let userId;
    let newPost = this.addForm.value;
    let len = Object.keys(this.data).length;
    newPost.id = len + 1;
    this.myService.currentUser.subscribe(res => {
      newPost.userId = res.id;

    });


    this.myService.addPostData(newPost).subscribe(res => {
      this.form.reset();
      this.accordion.closeAll();
      this.getPostList();

    });

  }
  onClickUpdate() {
    this.isShow = !this.isShow;
    this.myService.editPostData(this.form.value).subscribe(res => {
      this.getPostList();
    });
  }
  onClickDelete(id) {
    this.myService.deletePost(id).subscribe(res => {
      this.getPostList();
    });
  }
  onClickCl(){
    this.addForm.reset();
    this.accordion.closeAll();
  }
  onClickCancel(){
    this.isShow = !this.isShow;
  }

}

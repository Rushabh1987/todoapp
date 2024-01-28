import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { Observable } from 'rxjs';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'todoapp';
  readonly APIUrl = 'https://localhost:7297/api/ToDo/';
  notes: any = [];
  isInputEmpty: boolean = true;
  @ViewChild('todoForm') todoForm!: NgForm;
  //notesForm!: FormGroup;

  constructor(private http: HttpClient /*, private fb: FormBuilder*/) {}

  // notes: any = [];

  // getNotes() {
  //   this.http.get<any[]>(this.APIUrl + 'GetNotes').subscribe(
  //     (data) => {
  //       this.notes = data;
  //       console.log(this.notes);
  //     },
  //     (error) => console.error(error)
  //   );
  // }

  //notes$!: Observable<any[]>; // Use an observable
  //newNote$!: Observable<any[]>;

  ngOnInit() {
    //this.createNotesForm();
    this.getNotes();
  }

  onInputChange() {
    this.isInputEmpty = false;
  }

  // createNotesForm() {
  //   this.notesForm = this.fb.group({
  //     newNotes: ['', Validators.required],
  //   });
  // }

  getNotes() {
    this.http.get(this.APIUrl + 'GetNotes').subscribe(
      (data) => (this.notes = data),
      (error) => {
        if (error.status === 404) {
          this.notes = [];
        } else {
          console.error(error);
        }
      }
    );
    //this.notes$ = this.http.get<any[]>(this.APIUrl + 'GetNotes');
  }

  addNotes(data: any) {
    const requestData = { description: data.task };
    return this.http.post(this.APIUrl + 'AddNotes', requestData);
  }

  getTodoFormData(data: any) {
    console.log(data);
    this.addNotes(data).subscribe((res) => {
      console.log(res);
      this.todoForm.reset();
      this.getNotes();
    });
  }

  // addNotes() {
  //   if (this.notesForm.valid) {
  //     const newNotes = this.notesForm.get('newNotes')?.value;
  //     this.newNote$ = this.http
  //       .post(this.APIUrl + 'AddNotes', { newNotes })
  //       .subscribe(
  //         (data) => {
  //           alert(data);
  //           this.getNotes();
  //           this.notesForm.reset();
  //         },
  //         (error) => {
  //           console.error('Error adding notes:', error);
  //         }
  //       );
  //   }
  // }

  // addNotes() {
  //   if (this.notesForm.valid) {
  //     const newNotes = this.notesForm.get('newNotes')?.value;
  //     this.http
  //       .post(this.APIUrl + 'AddNotes', { newNotes })
  //       .pipe(
  //         tap((data) => {
  //           alert(data);
  //           this.getNotes();
  //           this.notesForm.reset();
  //         }),
  //         catchError((error) => {
  //           console.error('Error adding notes:', error);

  //           return of(error);
  //         }),
  //         finalize(() => {
  //           // Any cleanup code can go here
  //         })
  //       )
  //       .subscribe();
  //   }
  // }

  deleteNotes(id: any) {
    this.http.delete(this.APIUrl + 'DeleteNotes?id=' + id).subscribe((data) => {
      //alert(JSON.stringify(data));
      console.log(data);
      //this.notes = this.notes.filter((note) => note.id !== id);
      this.getNotes();
    });
  }
}

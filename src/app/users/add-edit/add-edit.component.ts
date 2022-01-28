import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService, AlertService } from '@app/_services';

@Component({ 
  selector: 'app-add-edit',
  templateUrl: 'add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'] 
})

export class AddEditComponent implements OnInit {
  public form!: FormGroup;
  public id!: string;
  public isAddMode!: boolean;
  public loading = false;
  public submitted = false;
  public age: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
  
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      telephone: ['', Validators.required],
      address: ['', Validators.required],
      birthDate: ['', Validators.required],
      age: [{value:'', disabled: true}, Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    if (!this.isAddMode) {
      this.userService.getById(this.id)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x));
    }
  }

  ageCalculator() {
    if(this.f.birthDate.value){
      const convertAge = new Date(this.f.birthDate.value);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
      this.f.age.setValue(this.age);
    }
  }

  get f() { return this.form.controls; }

  onSubmit() {

    this.submitted = true;

    this.alertService.clear();

    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    if (this.isAddMode) {
        this.createUser();
    } else {
        this.updateUser();
    }
  }

  private createUser() {
    this.userService.create(this.form.value)
      .pipe(first())
      .subscribe(() => {
          this.alertService.success('User added', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
      })
      .add(() => this.loading = false);
  }

  private updateUser() {
    this.userService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.alertService.success('User updated', { keepAfterRouteChange: true });
        this.router.navigate(['../../'], { relativeTo: this.route });
      })
      .add(() => this.loading = false);
  }
}
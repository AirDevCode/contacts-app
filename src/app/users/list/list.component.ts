import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService } from '@app/_services';
import { User } from '@app/_models';

@Component({ 
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.scss'] 
})

export class ListComponent implements OnInit {

  public users!: User[];
  public searchText: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);
  }

  deleteUser(id: string) {
    const user = this.users.find(x => x.id === id);
    if (!user) return;
    user.isDeleting = true;
    this.userService.delete(id)
      .pipe(first())
      .subscribe(() => this.users = this.users.filter(x => x.id !== id));
  }
}
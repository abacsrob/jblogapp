import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, Principal, Account } from 'app/core';
import {JBlogService} from 'app/entities/j-blog';
import {IJBlog, JBlog} from 'app/shared/model/j-blog.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    blogs: JBlog[];

    constructor(private principal: Principal, private loginModalService: LoginModalService, private eventManager: JhiEventManager, private jblogService: JBlogService) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.jblogService.query().subscribe(
            (res: HttpResponse<IJBlog[]>) => {
                this.blogs = res.body;
            },
            (res: HttpErrorResponse) => { console.log(res); }
        );
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}

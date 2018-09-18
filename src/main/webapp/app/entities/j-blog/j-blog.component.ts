import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IJBlog } from 'app/shared/model/j-blog.model';
import { Principal } from 'app/core';
import { JBlogService } from './j-blog.service';

@Component({
    selector: 'jhi-j-blog',
    templateUrl: './j-blog.component.html'
})
export class JBlogComponent implements OnInit, OnDestroy {
    jBlogs: IJBlog[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jBlogService: JBlogService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.jBlogService.query().subscribe(
            (res: HttpResponse<IJBlog[]>) => {
                this.jBlogs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInJBlogs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IJBlog) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInJBlogs() {
        this.eventSubscriber = this.eventManager.subscribe('jBlogListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

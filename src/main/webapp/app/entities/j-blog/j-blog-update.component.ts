import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { IJBlog } from 'app/shared/model/j-blog.model';
import { JBlogService } from './j-blog.service';

@Component({
    selector: 'jhi-j-blog-update',
    templateUrl: './j-blog-update.component.html'
})
export class JBlogUpdateComponent implements OnInit {
    private _jBlog: IJBlog;
    isSaving: boolean;

    constructor(private dataUtils: JhiDataUtils, private jBlogService: JBlogService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ jBlog }) => {
            this.jBlog = jBlog;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.jBlog.id !== undefined) {
            this.subscribeToSaveResponse(this.jBlogService.update(this.jBlog));
        } else {
            this.subscribeToSaveResponse(this.jBlogService.create(this.jBlog));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IJBlog>>) {
        result.subscribe((res: HttpResponse<IJBlog>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get jBlog() {
        return this._jBlog;
    }

    set jBlog(jBlog: IJBlog) {
        this._jBlog = jBlog;
    }
}

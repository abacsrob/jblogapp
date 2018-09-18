import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IJBlog } from 'app/shared/model/j-blog.model';

@Component({
    selector: 'jhi-j-blog-detail',
    templateUrl: './j-blog-detail.component.html'
})
export class JBlogDetailComponent implements OnInit {
    jBlog: IJBlog;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
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
    previousState() {
        window.history.back();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJBlog } from 'app/shared/model/j-blog.model';
import { JBlogService } from './j-blog.service';

@Component({
    selector: 'jhi-j-blog-delete-dialog',
    templateUrl: './j-blog-delete-dialog.component.html'
})
export class JBlogDeleteDialogComponent {
    jBlog: IJBlog;

    constructor(private jBlogService: JBlogService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jBlogService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'jBlogListModification',
                content: 'Deleted an jBlog'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-j-blog-delete-popup',
    template: ''
})
export class JBlogDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ jBlog }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(JBlogDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.jBlog = jBlog;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}

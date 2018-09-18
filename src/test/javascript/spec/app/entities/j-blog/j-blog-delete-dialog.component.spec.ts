/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JblogappTestModule } from '../../../test.module';
import { JBlogDeleteDialogComponent } from 'app/entities/j-blog/j-blog-delete-dialog.component';
import { JBlogService } from 'app/entities/j-blog/j-blog.service';

describe('Component Tests', () => {
    describe('JBlog Management Delete Component', () => {
        let comp: JBlogDeleteDialogComponent;
        let fixture: ComponentFixture<JBlogDeleteDialogComponent>;
        let service: JBlogService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JblogappTestModule],
                declarations: [JBlogDeleteDialogComponent]
            })
                .overrideTemplate(JBlogDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JBlogDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JBlogService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
